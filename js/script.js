let part_selector = $('#partselector');
let video_player = $('video#player');
let video_title = $('#video-title');
let video_section = $('#video-section');
let download_section = $('#download-links');


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
            $(table_id + ' span.tooltip').attr('text', element[4] + '\nPart ' + part + ' ist online');
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
    if (id == undefined)
    {
        video_title.html('<i>Bitte einen Part auswählen</i>');
        video_section.addClass('default');

        return;
    }
    else
        video_section.removeClass('default');

    part_selector.val(id);

    let entry = video_ids[id];
    let path = get_video_url(id);
    let thumbnail = 'thumbs/' + entry[0] + '/' + entry[1] + '.jpg';

    video_title.html(entry[4] + ' (Part ' + entry[2] + ')');
    video_player.attr('poster', thumbnail);
    video_player.attr('src', path);

    scroll_to_anchor('video');
    on_video_updated(id);
}

function on_video_updated(id)
{
    ping_uri(
        get_video_url(id),
        function()
        {
            video_section.removeClass('offline');

            // succ
        },
        function()
        {
            video_section.addClass('offline');
            // fail
        }
    );
}

part_selector.change(function() {
    on_selector_changed(part_selector.val());
});

$('tr:not(.legende) td[--data-video-id]').click(function(event) {
    let id = $(event.target).parent().attr('--data-video-id');

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
    var aTag = $("a[name='"+ aid +"']");

    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 1000);
}
