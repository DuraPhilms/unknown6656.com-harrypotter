
video_ids.forEach(function (element)
{
    let key = element[0];
    let part = element[1];
    let table_id = 'td#' + key + part;

    $.ajax({
        url : 'videos/' + key + '/' + part + '.mp4',
        type : 'HEAD',
        success : function()
        {
            $(table_id).addClass('online');
            $(table_id + ' span.tooltip').attr('text', element[2] + '\nPart ' + part + ' ist online');
        },
        error : function()
        {
            $(table_id).addClass('offline');
            $(table_id + ' span.tooltip').attr('text', element[2] + '\nPart ' + part + ' ist leider (noch) nicht online');
        }
    });
});

function on_selector_changed(selected)
{
    if (selected == undefined)
        return;
    else
        $('#partselector').val(selected);

    let video = $('video#player');
    var result = null;
    var part = null;
    var key = null;
    var path = "";
    var thumbnail = "";

    if (selected.length > 0)
    {
        part = selected.substr(-2);
        key = selected.substr(0, selected.length - 2);
        path = 'videos/' + key + '/' + part + '.mp4';
        thumbnail = 'thumbs/' + key + '/' + part + '.jpg';
    }

    video_ids.some(function(el, i) { return el[0] == key && el[1] == part ? (result = el, true) : false; });

    $('#video-title').html(result == null ? '<i>Bitte einen Part auswählen</i>' : result[2] + ' (Part ' + part + ')');
    video.attr('poster', thumbnail);
    video.attr('src', path);

    scrollToAnchor('video');
}

$('#partselector').change(function() {
    on_selector_changed($('#partselector').val());
});
$('tr:not(.legende) td').click(function(event) {
    let id = $(event.target).parent().attr('id');

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

function scrollToAnchor(aid) {
    var aTag = $("a[name='"+ aid +"']");

    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 1000);
}
