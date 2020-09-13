
$('#selector-part').on('change', function()
{
    let selected = this.value;
    let video = $('video#player source')

    if (selected.length < 1)
        video.attr('src', '');
    else
    {
        let parts = selected.split('-');

        if (parts[1].length == 1)
            parts[1] = '0' + parts[1];

        video.attr('src', 'videos/' + parts[0] + '/' + parts[1] + '.mp4');
    }
});



video_ids.forEach(function (element)
{
    let table_id = 'td#' + element[0] + element[1];

    $.ajax({
        url : 'videos/' + element[0] + '/' + element[1] + '.mp4',
        type : 'HEAD',
        success : function()
        {
            $(table_id).addClass('online');
            $(table_id + ' span.tooltip').attr('text', element[2] + '\nPart ' + element[1] + ' ist online');
        },
        error : function()
        {
            $(table_id).addClass('offline');
            $(table_id + ' span.tooltip').attr('text', element[2] + '\nPart ' + element[1] + ' ist leider (noch) nicht online');
        }
    });
});


//-------- JQUERY HANDLERS --------//

$('video').click(function(event) {
    var tag = $(event.target).get(0);

    if (tag.paused)
        tag.play();
    else
        tag.pause();
});
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
$('tr:not(.leg)>td.online,tr:not(.leg)>td.offline').click(function(event) {
    var id = $(event.target).parent().attr('id');
    var num = id.substr(3);

    id = id.substr(0, 3);

    $('input#sp_' + id).val(num);

    scrollToAnchor('hpud' + id);

    if (id == 'pva')
        OKDchg_pva();
    else if (id == 'odp')
        OKDchg_odp();
    else
        OKDchg_hlp();
});

//-------- EXTRA FUNCTIONS --------//

function OKDchg_pva() {
    var url = "";

    try {
        url = urlbase + pva_IDs[$('#sp_pva').val() - 1] + urlparams;
    } catch (e) { }

    // $('#pva').attr('src', );
    $('#pva > source').attr('src', url);
    $('#pva')[0].load();
    $('#pva')[0].play();

    $('#pva').attr('height', $('#pva').width() / 16 * 9);
}

function OKDchg_odp() {
    var url = "";

    try {
        url = urlbase + odp_IDs[$('#sp_odp').val() - 1] + urlparams;
    } catch (e) { }

    // $('#odp').attr('src', url;
    $('#odp > source').attr('src', url);
    $('#odp')[0].load();
    $('#odp')[0].play();

    $('#odp').attr('height', $('#odp').width() / 16 * 9);
}

function OKDchg_hlp() {
    var url = "";

    try {
        url = urlbase + odp_IDs[$('#sp_hlp').val() - 1] + urlparams;
    } catch (e) { }

    // $('#odp').attr('src', url;
    $('#hlp > source').attr('src', url);
    $('#hlp')[0].load();
    $('#hlp')[0].play();

    $('#hlp').attr('height', $('#odp').width() / 16 * 9);
}

function isFlashEnabled() {
    var hasFlash = false;

    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');

        if (fo)
            hasFlash = true;
    }
    catch (e) {
        if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined)
            HasFlash = true;
    }

    return hasFlash;
}

function scrollToAnchor(aid) {
    var aTag = $("a[name='"+ aid +"']");

    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 1000);
}