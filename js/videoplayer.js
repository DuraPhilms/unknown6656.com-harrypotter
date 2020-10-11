'use strict';

let video_container = $('#video-container');
// let video_player = $('#video-container video');
// let video_controls = $('#video-controls');
// let video_dom = video_player[0];


$(document).ready(function()
{
    if ((document.createElement('progress').max !== undefined) &&
        !!document.createElement('video').canPlayType &&
        !!(document.fullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled ||
            document.webkitSupportsFullscreen ||
            document.webkitFullscreenEnabled ||
            document.createElement('video').webkitRequestFullScreen
        ))
    {
        const attr = "data-state";

        const volume_cmd = { UP: 1, DOWN: 2, TOGGLE_MUTE: 3 };

        let vc_prev = video_controls.find('#vc-previous');
        let vc_back15 = video_controls.find('#vc-back15');
        let vc_playpause = video_controls.find('#vc-playpause');
        let vc_forw15 = video_controls.find('#vc-forward15');
        let vc_next = video_controls.find('#vc-next');
        let vc_stop = video_controls.find('#vc-stop');
        let vc_vol_bar = video_controls.find("#vc-volume");
        let vc_vol_mute = video_controls.find("#vc-volume-mute");
        let vc_prog_bar = video_controls.find('#vc-progress');
        let vc_prog_bar_track = video_controls.find('#vc-progress .track');
        let vc_prog_txt = video_controls.find('#vc-progress-text');
        let vc_dur_txt = video_controls.find('#vc-duration');
        let vc_subs = video_controls.find('#vc-subtitle');
        let vc_slow = video_controls.find('#vc-slower');
        let vc_speed_txt = video_controls.find('#vc-speed-text');
        let vc_fast = video_controls.find('#vc-faster');
        let vc_full = video_controls.find('#vc-fullscreen');
        let vc_pip = video_controls.find('#vc-pip');
        let vc_downl = video_controls.find('#vc-download');


        // video_controls.enable();
        video_player.prop('controls', false);


        let fn_update_volume_controls = () =>
        {
            vc_vol_bar.css('--percentage', `${video_dom.volume * 100}%`);
            vc_vol_mute.attr(attr, video_dom.muted ? 'unmute' : 'mute');

            if (video_dom.muted)
                vc_vol_bar.disable();
            else
                vc_vol_bar.enable();
        };
        let fn_update_time_controls = () =>
        {
            vc_prog_bar.css('--progress', video_dom.currentTime / video_dom.duration);
            vc_prog_txt.text(to_time(video_dom.currentTime));
            vc_dur_txt.text(to_time(video_dom.duration));

            if (video_dom.currentTime < video_dom.duration - 1)
                vc_forw15.enable();
            else
                vc_forw15.enable();

        };
        let fn_update_playpause = () =>
        {
            vc_playpause.attr(attr, video_dom.paused || video_dom.ended ? 'play' : 'pause');

            fn_update_time_controls();
        };
        let fn_is_fullscreen = () => !!(document.fullScreen ||
                                        document.webkitIsFullScreen ||
                                        document.mozFullScreen ||
                                        document.msFullscreenElement ||
                                        document.fullscreenElement);
        let fn_set_fullscreen = fullscreen =>
        {
            video_container.attr('data-fullscreen', !!fullscreen);
            vc_full.attr(attr, !!fullscreen ? 'exit' : 'enter');
        };
        let fn_process_fullscreen = exit =>
        {
            if (exit)
                try
                {
                    if (document.exitFullscreen)
                        document.exitFullscreen();
                    else if (document.mozCancelFullScreen)
                        document.mozCancelFullScreen();
                    else if (document.webkitCancelFullScreen)
                        document.webkitCancelFullScreen();
                    else if (document.msExitFullscreen)
                        document.msExitFullscreen();
                }
                catch (e)
                {
                }
            else
            {
                let elem = video_container[0];

                if (elem.requestFullscreen)
                    elem.requestFullscreen();
                else if (elem.mozRequestFullScreen)
                    elem.mozRequestFullScreen();
                else if (elem.webkitRequestFullScreen)
                    // elem.webkitRequestFullScreen();
                    video_dom.webkitRequestFullScreen();
                else if (elem.msRequestFullscreen)
                    elem.msRequestFullscreen();
            }

            fn_set_fullscreen(!exit);
        };


        video_player.bind('play', fn_update_playpause);
        video_player.bind('pause', fn_update_playpause);
        video_player.bind('ended', fn_update_playpause);
        video_player.bind('timeupdate', fn_update_time_controls);
        video_player.bind('volumechange', fn_update_volume_controls);
        video_player.bind('loadedmetadata', fn_update_time_controls);

        vc_playpause.click(() =>
        {
            if (video_dom.paused || video_dom.ended)
                video_dom.play();
            else
                video_dom.pause();
        });
        vc_stop.click(() =>
        {
            video_dom.pause();
            video_dom.currentTime = 0;
        });
        vc_vol_mute.click(() =>
        {
            video_dom.muted = !video_dom.muted;

            fn_update_volume_controls();
        });
        vc_full.click(() => fn_process_fullscreen(fn_is_fullscreen()));
        // vc_vol_bar.click(() => video_dom.volume = vc_vol_bar.val() / 100.0);
        vc_back15.click(() => video_dom.currentTime = Math.max(0, video_dom.currentTime - 10));
        vc_forw15.click(() => video_dom.currentTime = Math.min(video_dom.duration, video_dom.currentTime + 10));
        vc_subs.click(() => video_dom.textTracks[0].mode = video_dom.textTracks[0].mode == "hidden" ? "showing" : "hidden");
        vc_next.click(() =>
        {
            vc_stop.click();
            vc_next.blur();

            var id = part_selector.val();

            if (typeof id != 'number')
                id = parseInt(id);

            if (id < video_ids.length - 1)
                on_selector_changed(id + 1);
        });
        vc_prev.click(() =>
        {
            vc_stop.click();
            vc_prev.blur();

            var id = part_selector.val();

            if (typeof id != 'number')
                id = parseInt(id);

            if (id > 0)
                on_selector_changed(id - 1);
        });
        vc_downl.click(() => download_single.click());



        var bar_mousedown = 0;

        let fn_progress_moved = e =>
        {
            if (bar_mousedown)
            {
                let w = vc_prog_bar_track.width();
                let x = e.clientX - vc_prog_bar_track.offset().left - 7.5;
                let p = x < 0 ? 0 : x > w ? 1 : x / w;

                // vc_prog_bar.css('--progress', p);
                video_dom.currentTime = p * video_dom.duration;
            }
        };

        $(document).bind('mousemove', fn_progress_moved);
        // vc_prog_bar.click(fn_progress_moved);
        vc_prog_bar.bind('mousedown', () => bar_mousedown = 1);
        $(document).bind('mouseup', e =>
        {
            fn_progress_moved(e);

            bar_mousedown = 0;
        });

        // startEvent: ['mousedown', 'touchstart', 'pointerdown'],
        // moveEvent: ['mousemove', 'touchmove', 'pointermove'],
        // endEvent: ['mouseup', 'touchend', 'pointerup']


        // .draggable({
        //     axis: "x", 
        //     containment: "parent",
        //     drag: function(event, ui)
        //     {
        //         ui.position.left = Math.min(ui.position.left, ui.helper.next().offset().left + ui.helper.next().width() - dragDistance); 
        //         ui.position.left = Math.max(ui.position.left, ui.helper.prev().offset().left + dragDistance);

        //         resize();
        //     }
        // });



        $(document).bind('fullscreenchange', e => fn_set_fullscreen(document.fullScreen || document.fullscreenElement));
        $(document).bind('webkitfullscreenchange', () => fn_set_fullscreen(!!document.webkitIsFullScreen));
        $(document).bind('mozfullscreenchange', () => fn_set_fullscreen(!!document.mozFullScreen));
        $(document).bind('msfullscreenchange', () => fn_set_fullscreen(!!document.msFullscreenElement));

        if ('pictureInPictureEnabled' in document)
        {
            let update_pip_button = () =>
            {
                let disabled = video_dom.readyState === 0 || !document.pictureInPictureEnabled || video_dom.disablePictureInPicture;

                if (disabled)
                    vc_pip.disable();
                else
                    vc_pip.enable();
            };

            video_player.bind('emptied', update_pip_button);
            video_player.bind('loadedmetadata', update_pip_button);
            video_player.bind('enterpictureinpicture', e => vc_pip.attr(attr, 'exit'));
            video_player.bind('leavepictureinpicture', e => vc_pip.attr(attr, 'enter'));
            vc_pip.click(async e =>
            {
                vc_pip.disable();

                try
                {
                    if (video_dom !== document.pictureInPictureElement)
                        await video_dom.requestPictureInPicture();
                    else
                        await document.exitPictureInPicture();
                }
                catch (error)
                {
                }
                finally
                {
                    vc_pip.enable();
                }
            });
        }
        else
            vc_pip.disable();
    }
});






