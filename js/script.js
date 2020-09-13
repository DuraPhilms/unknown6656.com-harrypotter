var urlbase = "https://dl.dropboxusercontent.com/"; // "//www.dailymotion.com/embed/video/";
var urlparams = ".mp4?dl=0"; // "?api=true&autoplay=1";

var pva_IDs = [
    's/lxwndd282onxifp/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%201', /* 's/p2xvo9tz6a5duvw/pva_1' */
    's/o8ctiw27tqw06d5/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%202', /* 'u/73253367/pva_2' */
    's/gxv8gk0sx1cnsl8/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%203', /* 'u/73253367/pva_3' */
    's/10i1pbz8fauw6h8/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%204', /* 'u/73253367/pva_4' */
    's/lk5pkl09do8ze0x/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%205', /* 'u/73253367/pva_5' */
    's/ox6l2oh265prlsj/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%206', /* 's/voem5t0895tvhjn/pva_6' */
    's/3m3giez3ozzdyhp/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%207', /* 's/20v8p10m2ltf4n7/pva_7' */
    's/v12dtpns1ni90cc/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%208', /* 's/g6ojq3d18cxv71z/pva_8' */
    's/vczzrvvvya955t7/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%209', /* 's/pd6owcjow3s3ef1/pva_9' */
    's/co4hut6zix5ysmo/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%2010', /* 's/6malrmv3dtjqm8c/pva_10' */
    's/gnwjezggvl4pyap/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%2011', /* 's/rxp2xf5opelis6x/pva_11' */
    's/f90245uw35eq54d/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%2012', /* 's/spjjp63035housv/pva_12' */
    's/uk17eeco8lk2gg9/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%2013', /* 's/faeb90rtul74kn4/pva_13' */
    's/q3hfxu7mtd15f0b/Harry%20Potter%20und%20der%20Penner%20von%20Alcatraz%20Part%2014' /* 's/ch9jrf1p535mi3q/pva_14' */
];
var odp_IDs = [
    's/aeidu1nx88ps38f/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%201', /* 'u/73253367/odp_1' */
    's/783cxbfiw3qbv9l/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%202', /* 'u/73253367/odp_2' */
    's/gq21qopqhbprsvn/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%203', /* 'u/73253367/odp_3' */
    's/47s3x5lrqniyh4i/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%204', /* 'u/73253367/odp_4' */
    's/zqva09o03qq6geu/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%205', /* 'u/73253367/odp_5' */
    's/fc2sjs4bek89a47/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%206', /* 'u/73253367/odp_6' */
    's/rr18znfqu0faibz/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%207', /* 'u/73253367/odp_7' */
    's/vnqhv9udkf9lutr/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%208', /* 'u/73253367/odp_8' */
    's/clpkj0vs52zdhn6/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%209', /* 'u/73253367/odp_9' */
    's/9kbbdgkn69mm49c/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%2010', /* 'u/73253367/odp_10' */
    's/p8mobdk1urh9nzn/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%2011', /* 'u/73253367/odp_11' */
    's/mdjhpaw43xg77n7/Harry%20Potter%20und%20der%20Orden%20des%20Penners%20Teil%2012',
    ''
];
var hlp_IDs = [
    ''
];

$('#sp_pva').attr('max', pva_IDs.length);
$('#sp_pva').attr('placeholder', '1 ... ' + pva_IDs.length);
$('#pva_lim').html(pva_IDs.length);

$('#sp_odp').attr('max', odp_IDs.length);
$('#sp_odp').attr('placeholder', '1 ... ' + odp_IDs.length);
$('#odp_lim').html(odp_IDs.length);

$('#sp_hlp').attr('max', hlp_IDs.length);
$('#sp_hlp').attr('placeholder', '1 ... ' + hlp_IDs.length);
$('#hlp_lim').html(hlp_IDs.length);

// var offline_string = "";

var pva_id_str = 'table#parts tr td#pva';
var odp_id_str = 'table#parts tr td#odp';
var hlp_id_str = 'table#parts tr td#hlp';

for (var i = 0; i < pva_IDs.length; i++) {
    if (pva_IDs[i] == '') {
        $(pva_id_str + (i + 1)).addClass('offline');
        $(pva_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudPvA Part ' + (i + 1) + ' ist leider (noch) nicht online');
    } else if (false) {
        // CROSS-DOMAIN SYNCHRON PING

        $(pva_id_str + (i + 1)).addClass('temporary');
        $(pva_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudPvA Part ' + (i + 1) + ' ist zurzeit nicht erreichbar');
    } else {
        $(pva_id_str + (i + 1)).addClass('online');
        $(pva_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudPvA Part ' + (i + 1) + ' ist online');
    }
    // if (pva_IDs[i] == '')
    //	   offline_string += "<br/>&#160;&#160;&#160; - HPudPvA Teil " + (i + 1);
}

for (var i = 0; i < odp_IDs.length; i++) {
    if (odp_IDs[i] == '') {
        $(odp_id_str + (i + 1)).addClass('offline');
        $(odp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudOdP Part ' + (i + 1) + ' ist leider (noch) nicht online');
    } else if (false) {
        // CROSS-DOMAIN SYNCHRON PING

        $(odp_id_str + (i + 1)).addClass('temporary');
        $(odp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudOdP Part ' + (i + 1) + ' ist zurzeit nicht erreichbar');
    } else {
        $(odp_id_str + (i + 1)).addClass('online');
        $(odp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudOdP Part ' + (i + 1) + ' ist online');
    }
    // if (odp_IDs[i] == '')
    //     offline_string += "<br/>&#160;&#160;&#160; - HPudOdP Teil " + (i + 1);
}

for (var i = 0; i < hlp_IDs.length; i++) {
    if (hlp_IDs[i] == '') {
        $(hlp_id_str + (i + 1)).addClass('offline');
        $(hlp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudHLP Part ' + (i + 1) + ' ist leider (noch) nicht online');
    } else if (false) {
        // CROSS-DOMAIN SYNCHRON PING

        $(hlp_id_str + (i + 1)).addClass('temporary');
        $(hlp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudHLP Part ' + (i + 1) + ' ist zurzeit nicht erreichbar');
    } else {
        $(hlp_id_str + (i + 1)).addClass('online');
        $(hlp_id_str + (i + 1) + ' span.tooltip').attr('text',
            'HPudHLP Part ' + (i + 1) + ' ist online');
    }
    // if (hlp_IDs[i] == '')
    //     offline_string += "<br/>&#160;&#160;&#160; - HPudHLP Teil " + (i + 1);
}

// offline_string += "<br/>Einige andere Teile wurden aus Copyright-gründen wieder gelöscht - ich schaue mal in den kommenden Tagen nach einer guten Plattform";
// $('span#offline').html(offline_string);


//-------- PROTOTYPE FUNCTIONS --------//

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.indexOf(str) === 0;
    };
}

//-------- JQUERY HANDLERS --------//

//$('title').html($('div#title').html());
$('video').click(function(event) {
    var tag = $(event.target).get(0);

    if (tag.paused)
        tag.play();
    else
        tag.pause();
});
$('#sp_pva').change(OKDchg_pva);
$('#sp_pva').keydown(function(event) {
    if (event.keyCode == 13)
    {
        OKDchg_pva();

        return false;
    }
});
$('#sp_odp').change(OKDchg_odp);
$('#sp_odp').keydown(function(event) {
    if (event.keyCode == 13)
    {
        OKDchg_odp();

        return false;
    }
});
$('#sp_hlp').change(OKDchg_hlp);
$('#sp_hlp').keydown(function(event) {
    if (event.keyCode == 13)
    {
        OKDchg_hlp();

        return false;
    }
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