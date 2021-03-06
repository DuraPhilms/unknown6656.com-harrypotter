'use strict';

let part_selector = $('#partselector');
let video_title = $('.video-title');
let video_section = $('#video-section');
let video_controls = $('#video-controls');
let video_player = $('#video-container video');
let video_dom = video_player[0];
let video_player_subtitle = $('#video-container video #video-subtitle');
let download_single = $('#download-single');
let download_all = $('#download-all');
let prev_part_button = $('#prev-part');
let next_part_button = $('#next-part');
let prev_movie_button = $('#prev-movie');
let next_movie_button = $('#next-movie');
let gif_start = $('#gif-creator [name="gif-start"]');
let gif_duration = $('#gif-creator [name="gif-length"]');
let gif_resolution = $('#gif-creator [name="gif-resolution"]');
let gif_create = $('#gif-creator [name="create-gif"]');
let gif_result = $('#gif-creator [name="gif-result"]');
let info_id = $('#info-id');
let info_uri = $('#info-uri');
let info_sub = $('#info-sub');
let info_codec = $('#info-codec');
let info_time = $('#info-time');
let info_dur = $('#info-duration');


jQuery.fn.extend({
    disable: function() { this.each(() => this.attr('disabled', '')); },
    enable: function () { this.each(() => this.removeAttr('disabled')); },
    disabled: function()
    {
        let dis = this.attr('disabled');

        return typeof dis !== typeof undefined && dis !== false;
    }
});


for (var i = 0; i < video_ids.length; ++i)
{
    let element = video_ids[i];
    let table_id = `td[--data-video-id="${i}"]`;

    ping_uri(
        `videos/${element.key}/${element.part}.mp4`,
        function()
        {
            $(table_id).addClass('online');
            $(table_id + ' span.tooltip').attr('text', `${element.name}\nPart ${element.part} ist online!`);
        },
        function()
        {
            $(table_id).addClass('offline');
            $(table_id + ' span.tooltip').attr('text', `${element.name}\nPart ${element.part} ist leider (noch) nicht online.`);
        }
    );
}


let get_video_url = id => `videos/${video_ids[id].key}/${video_ids[id].part}.mp4`;

let get_subtitle_url = id => `subtitles/${video_ids[id].key}/${video_ids[id].part}.vtt`;

let get_thumbnail_url = id => `thumbs/${video_ids[id].key}/${video_ids[id].part}.jpg`;

function ping_uri(uri, success, failure)
{
    $.ajax({
        url : uri,
        type : 'HEAD',
        success : success,
        error : failure
    });
}

function on_selector_changed(id)
{
    if (typeof id != 'number')
        id = parseInt(id);

    gif_start.disable();
    gif_duration.disable();
    gif_resolution.disable();
    gif_create.disable();
    video_dom.pause();
    $(`table#parts td`).removeClass('selected');

    if (id == undefined)
    {
        video_title.html('<i>Bitte ein Video auswählen</i>');
        video_section.addClass('default');
        video_controls.addClass('disabled');
        video_controls.disable();

        return;
    }

    $(`table#parts td[--data-video-id="${id}"]`).addClass('selected');

    video_controls.enable();
    video_controls.removeClass('disabled');
    video_section.removeClass('default');
    video_section.enable();
    part_selector.val(id);

    let path = get_video_url(id);
    let subtitle = get_subtitle_url(id);
    let thumbnail = get_thumbnail_url(id);
    let entry = video_ids[id];
    let friendly = entry.name + (entry.part_num > 1 ? ` (Part ${entry.part})` : '');

    if (entry.part_num > 1)
        prev_part_button.enable();
    else
        prev_part_button.disable();

    if (entry.part_num < entry.total - 1)
        next_part_button.enable();
    else
        next_part_button.disable();

    if (id - video_ids[id].part_num >= 0)
        prev_movie_button.enable();
    else
        prev_movie_button.disable();

    if (id - video_ids[id].part_num + video_ids[id].total < video_ids.length - 1)
        next_movie_button.enable();
    else
        next_movie_button.disable();

    video_section.attr('data-video-name', friendly);
    video_title.text(friendly);
    video_player.attr('poster', thumbnail);
    video_player.attr('src', path);
    video_player_subtitle.attr('src', subtitle);

    scroll_to_video();
    on_video_updated(id);
}

function on_video_updated(id)
{
    let uri = get_video_url(id);

    ping_uri(
        uri,
        () =>
        {
            video_section.removeClass('offline');
            video_dom.pause();
            video_dom.currentTime = 0;
            $('#vc-playpause').data('play');

            let entry = video_ids[id];

            $('#part-count').text(entry.total);
            download_all.css('display', entry.total > 1 ? 'inline' : 'none');
            download_all.attr('href', uri.replace(/\d+\.mp4$/ig, "all.zip"));
            download_single.attr('href', uri);
            gif_start.enable();
            gif_duration.enable();
            gif_resolution.enable();
            gif_create.enable();
            info_id.text(`${entry.key}${entry.part} (${id})`);
            info_uri.attr('href', uri);
            info_uri.html(uri);
            info_codec.text('???');
            info_dur.text(video_dom.duration);
            info_time.text(video_dom.currentTime);

            ping_uri(
                get_subtitle_url(id),
                () =>
                {
                    $('#vc-subtitle').enable();
                    info_sub.text('Ja');
                },
                () =>
                {
                    $('#vc-subtitle').disable();
                    info_sub.text('Nein');
                }
            );
        },
        () => video_section.addClass('offline')
    );
}

part_selector.change(() => on_selector_changed(part_selector.val()));

prev_part_button.click(function()
{
    let id = parseInt(part_selector.val());

    if (id > 0)
        on_selector_changed(id - 1);
});

next_part_button.click(function()
{
    let id = parseInt(part_selector.val());

    if (id < video_ids.length - 1)
        on_selector_changed(id + 1);
});

prev_movie_button.click(function()
{
    let id = parseInt(part_selector.val());

    id -= video_ids[id].part_num;

    if (id >= 0 && video_ids[id].part_num > 1)
        id -= video_ids[id].part_num - 1;

    if (id >= 0)
        on_selector_changed(id);
});

next_movie_button.click(function()
{
    let id = parseInt(part_selector.val());

    id += video_ids[id].total - video_ids[id].part_num;

    if (id < video_ids.length - 1)
        on_selector_changed(id + 1);
});

video_player.bind('timeupdate', () =>
{
    gif_start.val(to_time(video_dom.currentTime));
    gif_start.attr('max', to_time(video_dom.duration));
});

gif_create.click(function()
{
    let captcha_response = $('[name=h-captcha-response]').val();

    if (captcha_response === "" || captcha_response == undefined)
        alert("Please complete the hCaptcha");
    else
    {
        let entry = video_ids[part_selector.val()];
        let start = $('[name="gif-start"]').val();
        let length = $('[name="gif-length"]').val();
        let resolution = $('[name="gif-resolution"]').val();
        let base_url = document.URL.substr(0, document.URL.lastIndexOf('/'));
        let url = `${base_url}/gifmaker.php?h-captcha-response=${captcha_response}&start=${start}&length=${length}&baseid=${entry.key}&part=${entry.part}&resolution=${resolution}`;

        gif_start.disable();
        gif_duration.disable();
        gif_resolution.disable();
        gif_create.disable();
        gif_result.attr('data-gif-state', 'loading');

        $.ajax({
            url : url,
            type : 'GET',
            success : function(data)
            {
                gif_result.attr('data-gif-state', 'success');
                gif_result.find('img').attr('src', data);
                gif_result.find('a').attr('href', data);
                gif_start.removeAttr('disabled');
                gif_duration.removeAttr('disabled');
                gif_resolution.removeAttr('disabled');
                gif_create.removeAttr('disabled');
                hcaptcha.reset();
            },
            error : function()
            {
                gif_result.attr('data-gif-state', 'error');
                gif_start.enable();
                gif_duration.enable();
                gif_resolution.enable();
                gif_create.enable();
                hcaptcha.reset();
            }
        });
    }
});

$('tr:not(.legende) td[--data-video-id]').click(function(event)
{
    let id = parseInt($(event.target).parent().attr('--data-video-id'));

    on_selector_changed(id);
});

// $('video').click(function(event) {
//     var tag = $(event.target).get(0);

//     if (tag.paused)
//         tag.play();
//     else
//         tag.pause();
// });

/*
$('a[href*=#]:not([href=#])').click(function() {
    if ((location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')) ||
        (location.hostname == this.hostname)) {

        var target = $(this.hash);

        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
            $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);

            return false;
        }
    }
});
*/

function to_time(total, short = false)
{
    let hours = Math.floor(total / 6300).toString();
    let minutes = (Math.floor(total / 60) % 60).toString();
    let seconds = (Math.floor(total) % 60).toString().padStart(2, "0");

    return short ? hours > 0 ? `${hours}:${minutes.padStart(2, "0")}:${seconds}`
                             : `${minutes}:${seconds}`
                 : `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds}`;
}

function scroll_to_video()
{
    let element = $('html');
    let target = Math.floor($("a[name='video']").offset().top - 75);
    let current = Math.floor(element.scrollTop());

    if (target != current)
        element.animate({ scrollTop: target }, 1000);
}

function start_video(id, time)
{
    part_selector.val(id);
    part_selector.trigger('change');
    video_dom.addEventListener('loadeddata', () =>
    {
        video_dom.currentTime = time;
        video_dom.play();
    }, {
        once: true,
        capture: false
    });
}

