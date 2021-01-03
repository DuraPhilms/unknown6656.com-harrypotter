'use strict';

let video_container = $('#video-container');
// let video_player = $('#video-container video');
// let video_controls = $('#video-controls');
// let video_dom = video_player[0];

const ua = window.navigator.userAgent;
let is_mobile = ua.indexOf('iPad') > -1
    || (() =>
    {
        if (ua.indexOf('Macintosh') > -1)
            try
            {
                document.createEvent("TouchEvent");

                return true;
            }
            catch (e)
            {
            }

        return false;
    })()
    || /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));


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

        let vc_prev = $('#vc-previous');
        let vc_back15 = $('#vc-back15');
        let vc_playpause = $('#vc-playpause');
        let vc_forw15 = $('#vc-forward15');
        let vc_next = $('#vc-next');
        let vc_nextpart = $('#vc-nextpart');
        let vc_replay = $('#vc-replay');
        let vc_stop = $('#vc-stop');
        let vc_vol_mute = $("#vc-volume-mute");
        var vc_vol_bar = $("#vc-volume");
        let vc_prog_bar = $('#vc-progress');
        let vc_prog_txt = $('#vc-progress-text');
        let vc_subs = $('#vc-subtitle');
        let vc_slow = $('#vc-slower');
        let vc_speed_txt = $('#vc-speed-text');
        let vc_fast = $('#vc-faster');
        let vc_full = $('#vc-fullscreen');
        let vc_pip = video_controls.find('#vc-pip');
        let vc_downl = $('#vc-download');
        let vc_share = $('#vc-share');
        let vc_info = $('#vc-info');

        let share_url = $('#share-url');
        let share_time = $('#share-time');
        let share_checkbox = $('#share-include-time');
        let share_close = $('#share-close');


        if (is_mobile)
        {
            video_container.addClass('native');
            vc_vol_bar.parent().html('<input type="range" id="vc-volume" min="0" max="100" value="100" step="1"/>');
            vc_vol_bar = $('#vc-volume');
        }

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


        var vol_mousedown = 0;
        var bar_mousedown = 0;
        var was_playing = null;

        function fn_update_progress_bar()
        {
            if (bar_mousedown)
            {
                video_dom.currentTime = vc_prog_bar.val();
                video_controls.attr('tooltip', `Video-Zeitstempel: ${to_time(video_dom.currentTime, true)} / ${to_time(video_dom.duration, true)}`);

                setTimeout(fn_update_progress_bar, 50);
            }
        };
        function fn_update_volume_bar_native()
        {
            if (vol_mousedown)
            {
                video_dom.volume = vc_vol_bar.val() / 100.0;
                video_controls.attr('tooltip', `Lautstärke: ${Math.round(vc_vol_bar.val())} %`);

                setTimeout(fn_update_volume_bar_native, 50);
            }
        };


        vc_prog_bar.click(() =>
        {
            was_playing = !(video_dom.paused || video_dom.ended);
            video_dom.currentTime = vc_prog_bar.val();
            bar_mousedown = 0;

            if (was_playing)
                video_dom.play();

            was_playing = null;
        });
        vc_prog_bar.on('mousedown touchstart pointerdown click', () =>
        {
            bar_mousedown = 1;

            if (was_playing == null)
                was_playing = !(video_dom.paused || video_dom.ended);

            video_dom.pause();

            fn_update_progress_bar()
        });
        vc_prog_bar.on('mouseup touchend touchcancel pointerup mouseleave', () =>
        {
            if (was_playing)
                video_dom.play();

            was_playing = null;
            bar_mousedown = 0;
        });

        if (is_mobile)
        {
            vc_vol_bar.click(() => video_dom.volume = vc_prog_bar.val() / 100);
            vc_vol_bar.on('mousedown touchstart pointerdown', () =>
            {
                vol_mousedown = 1;

                fn_update_volume_bar_native()
            });
            vc_vol_bar.on('mouseup touchend touchcancel pointerup mouseleave', () => vol_mousedown = 0);
        }
        else
        {
            let fn_mouse_moved = e =>
            {
                if (e.target == vc_vol_bar[0])
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

            vc_vol_bar.on('mousedown touchstart pointerdown', () => vol_mousedown = 1);
            $(document).on('mousemove touchmove pointermove', fn_mouse_moved);
            $(document).on('mouseup touchend touchcancel pointerup mouseleave', e =>
            {
                fn_mouse_moved(e);

                if (was_playing)
                    video_dom.play();

                bar_mousedown = 0;
                vol_mousedown = 0;
                was_playing = null;
            });
        }


        let update_share_url = () =>
        {
            let entry = video_ids[part_selector.val()];
            var uri = `https://unknown6656.com/harrypotter?v=${entry[0]}${entry[1]}`;

            if (share_checkbox[0].checked)
                uri = `${uri}&t=${share_time.val()}`;

            share_url.val(uri);
        };
        let fn_focus_video = () =>
        {
            video_container.attr('tabindex', '0');
            // video_container[0].contentEditable = true;
            video_container[0].focus();
        };
        let fn_update_volume_controls = () =>
        {
            if (!vol_mousedown)
            {
                let volume = video_dom.volume * 100;

                if (is_mobile)
                {
                    fn_update_volume_bar_native();

                    vc_vol_bar.val(volume);
                    vc_prog_bar.css('background', `linear-gradient(to right, var(--color-progress) ${volume}%, transparent ${volume}%`);
                }
                else
                    vc_vol_bar.css('--percentage', `${volume}%`);
            }

            vc_vol_mute.attr('data-state', video_dom.muted ? 'unmute' : 'mute');

            if (video_dom.muted)
                vc_vol_bar.disable();
            else
                vc_vol_bar.enable();
        };
        let fn_update_time_controls = () =>
        {
            let paused = video_dom.paused || video_dom.ended;
            let percent = video_dom.currentTime / video_dom.duration * 100;

            info_time.text(video_dom.currentTime);
            info_dur.text(video_dom.duration);

            if (!bar_mousedown)
            {
                fn_update_progress_bar();

                vc_prog_bar.prop('max', Math.floor(video_dom.duration));
                vc_prog_bar.val(Math.floor(video_dom.currentTime));
            }

            vc_prog_bar.css('background', `linear-gradient(to right, var(--color-progress) ${percent}%, transparent ${percent}%`);
            vc_prog_txt.html(`${to_time(video_dom.currentTime, true)}<br/>/ ${to_time(video_dom.duration, true)}`);
            vc_speed_txt.text(video_dom.playbackRate + 'x');
            vc_playpause.attr('data-state', paused ? 'play' : 'pause');

            share_time.val(to_time(video_dom.currentTime));
            share_time.attr('max', to_time(video_dom.duration));
            update_share_url();

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
            share_close.click();
            video_container.removeClass('paused');
            video_container.removeClass('finished');

            if (paused)
            {
                video_container.addClass('paused');

                if (video_dom.currentTime == 0)
                    vc_stop.disable();

                if (video_dom.currentTime > video_dom.duration - 1)
                {
                    video_container.addClass('finished');
                    video_container.removeClass('info');
                }
            }
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

        vc_prog_bar.add(vc_vol_bar).change();

        video_player.bind('volumechange', fn_update_volume_controls);
        video_player.bind('loadedmetadata', () =>
        {
            video_container.removeAttr('info');
            video_controls.attr('tooltip', $('.video-title').text());
        });
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
            video_container.removeAttr('info');
        });
        vc_vol_mute.click(() =>
        {
            video_dom.muted = !video_dom.muted;

            fn_update_volume_controls();
        });
        vc_full.click(() => fn_process_fullscreen(fn_is_fullscreen()));
        vc_back15.click(() => video_dom.currentTime = Math.max(0, video_dom.currentTime - 10));
        vc_forw15.click(() => video_dom.currentTime = Math.min(video_dom.duration, video_dom.currentTime + 10));
        vc_subs.click(() => video_dom.textTracks[0].mode = video_dom.textTracks[0].mode == "hidden" ? "showing" : "hidden");
        vc_replay.click(() =>
        {
            vc_stop.click();
            vc_playpause.click();
        });
        vc_nextpart.click(() =>
        {
            vc_next.click();
            setTimeout(() => vc_playpause.click(), 700);
        });
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
        vc_info.click(() =>
        {
            if (video_container.hasClass('info'))
                video_container.removeClass('info');
            else
                video_container.addClass('info');
        });
        vc_share.click(() =>
        {
            if (!video_dom.paused)
                video_dom.pause();

            video_container.addClass('share');
            vc_share.disable();
        });
        video_controls.on('click mousedown mouseup pointerdown pointerup dblclick', fn_focus_video);
        video_player.on('play pause ended loadedmetadata onratechange volumechange', fn_focus_video);
        video_container.bind('keydown', e =>
        {
            e.preventDefault();

            if (e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 75) // [ENTER], [SPACE], [K]
                vc_playpause.click();
            else if (e.keyCode == 83) // [S]
                vc_stop.click();
            else if (e.keyCode == 68) // [D]
                vc_downl.click();
            else if (e.keyCode == 38) // [up]
                video_dom.volume += .1;
            else if (e.keyCode == 40) // [down]
                video_dom.volume -= .1;
            else if (e.keyCode == 37, e.keyCode == 74) // [left], [L]
                vc_back15.click();
            else if (e.keyCode == 39, e.keyCode == 76) // [right], [J]
                vc_forw15.click();
            else if (e.keyCode == 77) // [M]
                vc_vol_mute.click();
            else if (e.keyCode == 40) // [C]
                vc_subs.click();
            else if (e.keyCode == 70) // [F]
                vc_full.click();
            else if (e.keyCode == 73) // [I]
                vc_pip.click();
            else if (e.keyCode == 78) // [N]
                vc_next.click();
            else if (e.keyCode == 80) // [P]
                vc_prev.click();
            else if (e.keyCode == 190) // [.]
                vc_fast.click();
            else if (e.keyCode == 188) // [,]
                vc_slow.click();
            else if (e.keyCode >= 48 && e.keyCode <= 57) // digits [0...9]
                video_dom.currentTime = (e.keyCode - 48) / 9.0 * video_dom.duration;
            else if (e.keyCode >= 96 && e.keyCode <= 105) // numpad [0...9]
                video_dom.currentTime = (e.keyCode - 96) / 9.0 * video_dom.duration;
            else if (e.keyCode == 36) // [Home]
                video_dom.currentTime = 0;
            else if (e.keyCode == 35) // [End]
                video_dom.currentTime = video_dom.duration;
        });

        // TODO: scroll input (?)
        // TODO: fix codec info button
        // TODO: fix touch click bug

        share_time.bind('keyup change paste input blur', update_share_url);
        share_checkbox.click(() =>
        {
            if (share_checkbox[0].checked)
                share_time.enable();
            else
                share_time.disable();

            update_share_url();
        });
        share_close.click(() =>
        {
            if (video_container.hasClass('share'))
                video_container.removeClass('share');

            vc_share.enable();
        });
        video_section.find('details').click(fn_focus_video);
        video_controls.find('button,input').click(fn_focus_video);
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
    else
        video_container.addClass('native');
});
