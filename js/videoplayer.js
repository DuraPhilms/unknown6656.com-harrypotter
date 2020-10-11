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
        let vc_subs = video_controls.find('#vc-subtitle');
        let vc_slow = video_controls.find('#vc-slower');
        let vc_speed_txt = video_controls.find('#vc-speed-text');
        let vc_fast = video_controls.find('#vc-faster');
        let vc_full = video_controls.find('#vc-fullscreen');
        let vc_pip = video_controls.find('#vc-pip');
        let vc_downl = video_controls.find('#vc-download');


        // video_controls.enable();
        video_player.prop('controls', false);
        video_dom.playbackRate = 1;


        var move_timeout = null;
        let move_handler = () =>
        {
            clearTimeout(move_timeout);

            video_container.removeClass('hidden-controls');
            move_timeout = setTimeout(() => video_container.addClass('hidden-controls'), 3000);
        };

        video_container.mousemove(move_handler).mouseleave(() =>
        {
            clearTimeout(move_timeout);

            video_container.addClass('hidden-controls');
        });

        $('#video-controls [tooltip]').hover(
            e => video_controls.attr('tooltip', $(e.target).attr('tooltip')),
            () => video_controls.removeAttr('tooltip')
        );


        let fn_focus_video = () =>
        {
            video_container.attr('tabindex', '0');
            // video_container[0].contentEditable = true;
            video_container[0].focus();
        };
        let fn_update_volume_controls = () =>
        {
            vc_vol_bar.css('--percentage', `${video_dom.volume * 100}%`);
            vc_vol_mute.attr('data-state', video_dom.muted ? 'unmute' : 'mute');

            if (video_dom.muted)
                vc_vol_bar.disable();
            else
                vc_vol_bar.enable();
        };
        let fn_update_time_controls = () =>
        {
            let paused = video_dom.paused || video_dom.ended;

            vc_prog_bar.css('--progress', video_dom.currentTime / video_dom.duration);
            vc_prog_txt.html(`${to_time(video_dom.currentTime, true)}<br/>/ ${to_time(video_dom.duration, true)}`);
            vc_speed_txt.text(video_dom.playbackRate + 'x');
            vc_playpause.attr('data-state', paused ? 'play' : 'pause');

            if (video_dom.currentTime > 0)
                vc_back15.enable();
            else
                vc_back15.disable();

            if (video_dom.currentTime < video_dom.duration - 1)
                vc_forw15.enable();
            else
                vc_forw15.disable();

            if (video_dom.playbackRate <= .25)
                vc_slow.disable();
            else
                vc_slow.enable();

            if (video_dom.playbackRate >= 4)
                vc_fast.disable();
            else
                vc_fast.enable();

            vc_stop.enable();

            if (paused)
            {
                video_container.addClass('paused');

                if (video_dom.currentTime == 0)
                    vc_stop.disable();

                if (video_dom.currentTime < video_dom.duration - 1)
                {
                    // show next part
                }
            }
            else
                video_container.removeClass('paused');
        };
        let fn_is_fullscreen = () => !!(document.fullScreen ||
                                        document.webkitIsFullScreen ||
                                        document.mozFullScreen ||
                                        document.msFullscreenElement ||
                                        document.fullscreenElement);
        let fn_set_fullscreen = fullscreen =>
        {
            vc_full.attr('data-state', !!fullscreen ? 'exit' : 'enter');
            video_player.focus();

            if (!!fullscreen)
                video_container.addClass('fullscreen');
            else
                video_container.removeClass('fullscreen');
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
                    try
                    {
                        elem.webkitRequestFullScreen();
                    }
                    catch (e)
                    {
                        video_dom.webkitRequestFullScreen();
                    }
                else if (elem.msRequestFullscreen)
                    elem.msRequestFullscreen();
            }

            fn_set_fullscreen(!exit);
        };


        video_player.bind('volumechange', fn_update_volume_controls);
        video_player.on('play pause ended timeupdate loadedmetadata onratechange', fn_update_time_controls);
        video_player.dblclick(() => fn_process_fullscreen(fn_is_fullscreen()));
        video_player.add(vc_playpause).click(() =>
        {
            if (video_dom.paused || video_dom.ended)
            {
                video_dom.play();
                move_handler();
            }
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
        vc_downl.click(() => download_single[0].click());
        vc_slow.click(() => video_dom.playbackRate = Math.max(video_dom.playbackRate - 0.25, 0.25));
        vc_fast.click(() => video_dom.playbackRate = Math.min(video_dom.playbackRate + 0.25, 4));
        video_controls.on('click mousedown mouseup pointerdown pointerup', fn_focus_video);
        video_player.on('play pause ended timeupdate loadedmetadata onratechange volumechange', fn_focus_video);
        video_container.bind('keydown', e =>
        {
            if (e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 75) // [ENTER], [SPACE], [K]
            {
                e.preventDefault();
                vc_playpause.click();
            }
            else if (e.keyCode == 83) // [S]
                vc_stop.click();
            else if (e.keyCode == 68) // [D]
                vc_downl.click();
            else if (e.keyCode == 38) // [up]
                video_dom.volume += .1;
            else if (e.keyCode == 40) // [down]
                video_dom.volume -= .1;
            else if (e.keyCode == 37, e.keyCode == 76) // [left], [L]
                vc_back15.click();
            else if (e.keyCode == 74, e.keyCode == 39) // [right], [J]
                vc_forw15.click();
            else if (e.keyCode == 77) // [M]
                vc_vol_mute.click();
            else if (e.keyCode == 40) // [C]
                vc_subs.click();
            else if (e.keyCode == 70) // [F]
                vc_full.click();
            else if (e.keyCode == 78) // [N]
                vc_next.click();
            else if (e.keyCode == 80) // [P]
                vc_prev.click();
            else if (e.keyCode == 190) // [.]
                vc_fast.click();
            else if (e.keyCode == 188) // [,]
                vc_slow.click();

            // TODO : numpad
            // TODO : digit
        });


        // TODO: test on touch
        // TODO: scroll input (?)
        // TODO: fix codec info button
        // TODO: add keyboard help


        var vol_mousedown = 0;
        var bar_mousedown = 0;
        var bar_timeout = null;

        let fn_mouse_moved = e =>
        {
            if (e.target == vc_prog_bar_track[0])
            {
                let w = vc_prog_bar_track.width();
                let x = e.clientX - vc_prog_bar_track.offset().left - 7.5;
                let p = x < 0 ? 0 : x > w ? 1 : x / w;

                video_controls.attr('tooltip', `Video-Zeitstempel: ${to_time(p * video_dom.duration, true)} / ${to_time(video_dom.duration, true)}`);

                if (bar_mousedown)
                {
                    clearTimeout(bar_timeout);
                    bar_timeout = setTimeout(() => video_dom.currentTime = p * video_dom.duration, 0);
                }
            }
            else if (e.target == vc_vol_bar[0])
            {
                let w = vc_vol_bar.width();
                let x = e.clientX - vc_vol_bar.offset().left;
                let p = x < 0 ? 0 : x > w ? 1 : x / w;

                video_controls.attr('tooltip', `Lautstärke: ${Math.round(p * 100)} %`);

                if (vol_mousedown)
                {
                    vc_vol_bar.css('--percentage', `${p * 100}%`);
                    video_dom.volume = p;
                }
            }

            // if (!!video_container.attr('data-fullscreen'))
            // {
            // }
        };

        // vc_prog_bar.add(vc_vol_bar).click(fn_mouse_moved);
        vc_vol_bar.on('mousedown touchstart pointerdown', () => vol_mousedown = 1);
        vc_prog_bar.on('mousedown touchstart pointerdown', () => bar_mousedown = 1);
        $(document).on('mousemove touchmove pointermove', fn_mouse_moved);
        $(document).on('mouseup touchend touchcancel pointerup mouseleave', e =>
        {
            fn_mouse_moved(e);

            bar_mousedown = 0;
            vol_mousedown = 0;
        });
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
            video_player.bind('enterpictureinpicture', e =>
            {
                video_container.addClass('pip');
                vc_pip.attr('data-state', 'exit');
            });
            video_player.bind('leavepictureinpicture', e =>
            {
                video_container.removeClass('pip');
                vc_pip.attr('data-state', 'enter');
            });
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

        fn_focus_video();
    }
});
