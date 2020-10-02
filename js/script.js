let part_selector = $('#partselector');
let video_player = $('video#player');
let video_player_subtitle = $('video#player #player-subtitle');
let video_title = $('#video-title');
let video_section = $('#video-section');
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


for (i = 0; i < video_ids.length; ++i)
{
    let element = video_ids[i];
    let key = element[0];
    let part = element[1];
    let table_id = 'td[--data-video-id="' + i + '"]';

    ping_uri(
        'videos/' + key + '/' + part + '.mp4',
        function()
        {
            $(table_id).addClass('online');
            $(table_id + ' span.tooltip').attr('text', element[4] + '\nPart ' + part + ' ist online!');
        },
        function()
        {
            $(table_id).addClass('offline');
            $(table_id + ' span.tooltip').attr('text', element[4] + '\nPart ' + part + ' ist leider (noch) nicht online');
        }
    );
}


function get_video_url(id)
{
    return 'videos/' + video_ids[id][0] + '/' + video_ids[id][1] + '.mp4';
}

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

    gif_start.attr('disabled', '');
    gif_duration.attr('disabled', '');
    gif_resolution.attr('disabled', '');
    gif_create.attr('disabled', '');

    if (id == undefined)
    {
        video_title.html('<i>Bitte ein Video auswählen</i>');
        video_section.addClass('default');

        return;
    }

    video_section.removeClass('default');
    part_selector.val(id);

    let entry = video_ids[id];
    let path = get_video_url(id);
    let subtitle = 'subtitles/' + entry[0] + '/' + entry[1] + '.vtt';
    let thumbnail = 'thumbs/' + entry[0] + '/' + entry[1] + '.jpg';
    let friendly = entry[4] + (entry[2] > 1 ? ' (Part ' + entry[2] + ')' : '');

    if (entry[2] > 1)
        prev_part_button.removeAttr('disabled');
    else
        prev_part_button.attr('disabled', '');

    if (entry[2] < entry[3] - 1)
        next_part_button.removeAttr('disabled');
    else
        next_part_button.attr('disabled', '');

    if (id - video_ids[id][2] >= 0)
        prev_movie_button.removeAttr('disabled');
    else
        prev_movie_button.attr('disabled', '');

    if (id - video_ids[id][2] + video_ids[id][3] < video_ids.length - 1)
        next_movie_button.removeAttr('disabled');
    else
        next_movie_button.attr('disabled', '');

    video_section.attr('data-video-name', friendly);
    video_title.text(friendly);
    video_player.attr('poster', thumbnail);
    video_player.attr('src', path);
    video_player_subtitle.attr('src', subtitle);

    scroll_to_anchor('video');
    on_video_updated(id);
}

function on_video_updated(id)
{
    let uri = get_video_url(id);

    ping_uri(
        uri,
        function()
        {
            video_section.removeClass('offline');

            let entry = video_ids[id];

            $('#part-count').text(entry[3]);
            download_all.css('display', entry[3] > 1 ? 'inline' : 'none');
            download_all.attr('href', uri.replace(/\d+\.mp4$/ig, "all.zip"));
            download_single.attr('href', uri);
            gif_start.removeAttr('disabled');
            gif_duration.removeAttr('disabled');
            gif_resolution.removeAttr('disabled');
            gif_create.removeAttr('disabled');
        },
        function()
        {
            video_section.addClass('offline');
        }
    );
}

part_selector.change(function()
{
    on_selector_changed(part_selector.val());
});

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

    id -= video_ids[id][2];

    if (id >= 0 && video_ids[id][2] > 1)
        id -= video_ids[id][2] - 1;

    if (id >= 0)
        on_selector_changed(id);
});

next_movie_button.click(function()
{
    let id = parseInt(part_selector.val());

    id += video_ids[id][3] - video_ids[id][2];

    if (id < video_ids.length - 1)
        on_selector_changed(id + 1);
});

video_player.bind('timeupdate', function()
{
    let time = this.currentTime;
    let hours = Math.floor(time / 6300).toString().padStart(2, "0");
    let minutes = (Math.floor(time / 60) % 60).toString().padStart(2, "0");
    let seconds = (Math.floor(time) % 60).toString().padStart(2, "0");

    gif_start.val(`${hours}:${minutes}:${seconds}`);
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
        let url = `${base_url}/gifmaker.php?h-captcha-response=${captcha_response}&start=${start}&length=${length}&baseid=${entry[0]}&part=${entry[1]}&resolution=${resolution}`;

        gif_create.attr('disabled', '');
        gif_result.attr('data-gif-state', 'loading');

        $.ajax({
            url : url,
            type : 'GET',
            success : function(data)
            {
                gif_result.attr('data-gif-state', 'success');
                gif_result.find('img').attr('src', data);
                gif_result.find('a').attr('href', data);
                gif_create.removeAttr('disabled');
                hcaptcha.reset();
            },
            error : function()
            {
                gif_result.attr('data-gif-state', 'error');
                gif_create.removeAttr('disabled');
                hcaptcha.reset();
            }
        });
    }
});

$('tr:not(.legende) td[--data-video-id]').click(function(event) {
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

function scroll_to_anchor(aid)
{
    let element = $('html');
    let target = Math.floor($("a[name='"+ aid +"']").offset().top);
    let current = Math.floor(element.scrollTop());

    if (target != current)
        element.animate({
            scrollTop: target
        }, 1000);
}
