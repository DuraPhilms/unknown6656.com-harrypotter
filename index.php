<?php header('Access-Control-Allow-Origin: *');
    //header('Access-Control-Allow-Methods: GET, POST');
    //header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    $hcaptcha_sitekey = trim(fgets(fopen("hcaptcha.txt", 'r')));
    $videos = [
        "hpues" => ["HP und ein Stein", 1],
        "hpudgpk" => ["HP und der geheime PKeller", 1],
        "hpudpp" => ["HP und der Plastikpokal", 1],
        "hpudfe" => ["HP und der Feuer-Elch", 1],
        "hpudpva" => ["HP und der Penner von Alcatraz", 14],
        "hpudodp" => ["HP und der Orden des Penners", 13],
        "hpudhlp" => ["HP und der Half-Life-Prinz", 1],
    ];
    $video_ids = array();

    foreach ($videos as $key => $info)
        for ($i = 1; $i <= $info[1]; ++$i)
            array_push($video_ids, [$key, str_pad($i, 2, '0', STR_PAD_LEFT), $info[1], $info[0]]);
?>
<!DOCTYPE html>
<html lang="de" prefix="og: http://ogp.me/ns#">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta http-equiv="X-UA-Compatible" content="chrome=1">
<?php
    $iPod   = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
    $iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");

    if ($iPod || $iPhone)
    {
        ?>
        <meta name="viewport" content="width=850, user-scalable=yes"/>
        <?php
    }
    else
    {
        ?>
        <meta name="viewport" content="width=900, user-scalable=yes"/>
        <?php
    }
?>
        <meta name="copyright" content="unknown6656"/>
        <meta name="designer" content="unknown6656"/>
        <meta name="owner" content="unknown6656"/>
        <meta name="url" content="https://unknown6656.com/harrypotter"/>
        <meta name="identifier-url" content="https://unknown6656.com/harrypotter"/>
        <meta name="twitter:site" content="@unknown6656">
        <meta name="fb:page_id" content="381982338582331"/>
        <meta name="og:url" content="https://unknown6656.com/harrypotter"/>
        <meta name="og:site_name" content="unknown6656 | Hаrry Pоttеr Synchronisation by DURAPHILMS / COLDMIRROR"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-touch-fullscreen" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="description" content="Harry Potter Synchronisation by DURAPHILMS"/>
        <meta name="keywords" content="unknown6656, Harry, Potter, Synchro, Sync, Synchronisation, Duraphilms, Orden, Penner, Penners, Alcatraz, Half-Life, Prince, Prinz, Coldmirror, Plastik, Pokal, Stein, geheim, geheimer, Keller"/>
        <meta name="author" content="unknown6656"/>
        <meta property="article:author" content="unknown6656"/>
        <meta name="og:title" content="unknown6656 | Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR"/>
        <meta name="og:description" content="Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR"/>
        <meta name="twitter:title" content="unknown6656 | Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR"/>
        <meta name="twitter:description" content="Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR"/>
        <meta name="og:image" content="https://unknown6656.com/harrypotter/images/banner.png"/>
        <meta name="twitter:image" content="https://unknown6656.com/harrypotter/images/banner.png"/>
        <meta name="twitter:card" content="https://unknown6656.com/harrypotter/images/banner.png"/>
        <title>Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <link rel="stylesheet" type="text/css" href="css/videoplayer.css"/>
        <link rel="index" title="unknown6656 | Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR" href="/harrypotter/"/>
        <!--
            <link rel="author" href="/humans.txt" type="text/plain">
            <link rel="sitemap" type="application/xml" href="/sitemap.xml"/>
            <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="unknown6656.com RSS feed">
        -->
    </head>
    <a name="top"></a>
    <div class="ios-only">
    </div>
    <body>
        <div id="content">
            <div id="title" class="title_font">
                <!--
                Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR
                <div id="title_cover"></div>
                -->
            </div>
            <div id="main" class="main_font">
                <div id="back-blur">
                </div>
                <span class="description">
                    <p>
                        <h2 style="font-size: 2em">
                            Breaking News - <a href="https://discord.gg/ZTzhXAF" target="_blank">Wir haben einen DISCORD Server!</a>
                        </h2>
                        <br/>
<!--
                        <h2>Wichtig: bitte hier abstimmen!</h2>
                        <div class="strawpoll">
                            <iframe src="https://www.strawpoll.me/embed_1/21011398">
                            </iframe>
                        </div>
-->
                    <p>
                    <hr/>
                    <h1>Willkommen liebe Potter-Fans!</h1>
                    <p>
                        Auf dieser Seite könnt Ihr Euch alle Hаrry Pоttеr Parodien/Synchronisationen von DURAPHILMS und COLDMIRROR anschauen.
                        <br/>
                        Die COLDMIRROR-Parodien liegen in einem zusammenhängenden Video vor &mdash; die Parodien von DURAPHILMS sind jedoch in mehrere Parts aufgeteilt.
                        Um einen spezifischen Part zu sehen, könnt ihr auf den entsprechenden Eintrag in der folgenden Tabelle klicken.
                        Alternativ befindet sich unterhalb des Videofensters ein Auswahlmenü der verfügbaren Parts.
                        <!--
                            Um einen spezifischen Part zu sehen, müsst Ihr die entsprechende Nummer des Parts in das Nummernfeld unterhalb
                            des Videos eintragen und mit <key>ENTER</key> bestätigen.
                            Das eigentliche Video könnt Ihr herunterladen, indem Ihr mit der rechten Maustaste darauf klickt und <key>Speichern unter ...</key> auswählt.
                        -->
                    </p>
                    <p>
                        Eine Kopie aller DURAPHILMS-Parts findet ihr auch auf der Webseite <a href="https://duraphilms.tk/" target="_blank">duraphilms.tk</a>!
                        <!-- <br/>
                        Credits und Copyright findet Ihr am <a href="#credits">Ende dieser Seite</a>. -->
                    </p>
                    <!--
                        <p>
                            <i>Diese Webseite benötigt HTML5-Unterstützung.</i></i>
                            <a href="https://html5test.com/" target="_blank" class="help">?</a>
                        </p>
                    -->
                </span>
                <hr/>
                <p>
                    <!-- Folgende Teile sind zurzeit online bzw. offline (Klicke auf die Nummer um den Part anzuschauen): -->
                    <table width="100%" id="parts">
                        <tr width="100%">
<?php
    $last = "";

    foreach ($video_ids as $key => $values)
    {
        if ($last != $values[0])
        {
            ?>
                        <td class="descr"><?=$values[3]?>:</td>
            <?php
        }

        ?>
                            <td --data-video-id="<?=$key?>" class="number"><span class="tooltip" text=""><?=$values[1]?></span></td>
        <?php

        $last = $values[0];

        if ($key + 1 < count($video_ids) && $last != $video_ids[$key + 1][0])
        {
            ?>
                    </tr>
                    <tr width="100%">
            <?php
        }
    }
?>
                        </tr>
                        <tr width="100%" height="17px"></tr>
                        <tr width="100%" class="legende">
                            <td class="legende_desc">STATUS UNBEKANNT:</td>
                            <td class="number"></td>
                        </tr>
                        <tr width="100%" class="legende">
                            <td class="legende_desc">NOCH NICHT / NICHT MEHR ONLINE:</td>
                            <td class="number offline" style="cursor: default !important;"></td>
                        </tr>
                        <!--
                            <tr width="100%" class="legende">
                                <td class="legende_desc">TEMPORÄR (KURZZEITIG) OFFLINE:</td>
                                <td class="number temporary" style="cursor: default !important;"></td>
                            </tr>
                        -->
                        <tr width="100%" class="legende">
                            <td class="legende_desc">ONLINE:</td>
                            <td class="number online" style="cursor: default !important;"></td>
                        </tr>
                    </table>
                </p>
                <br/>
                <hr/>
                <!--///////////////////////////////////////////////// VIDEO SECTION /////////////////////////////////////////////////-->
                <div id="video-section" class="default">
                    <a name="video"></a>
                    <h2 id="video-title">
                        <i>Bitte ein Video auswählen</i>
                    </h2>
                    <figure id="video-container">
                        <video controls playsinline allowfullscreen autoPictureInPicture="true" preload="metadata" type="video/mp4" src="">
                            <track id="video-subtitle" type="text/vtt" src="" label="Deutsche Untertitel" srclang="de" default hidden/>
                        </video>
                        <div id="video-finished">
                            <button id="vc-replay"></button>
                            <button id="vc-nextpart"></button>
                        </div>
                        <div id="video-info">
                            <div class="content">
                                <table>
                                    <tr>
                                        <td>ID:</td>
                                        <td id="info-id">---</td>
                                    </tr>
                                    <tr>
                                        <td>URL:</td>
                                        <td><a id="info-uri" href target="_blank" style="color:white">---</a></td>
                                    </tr>
                                    <tr>
                                        <td>Untertitel:</td>
                                        <td id="info-sub">---</td>
                                    </tr>
                                    <tr>
                                        <td>Codec:</td>
                                        <td id="info-codec">---</td>
                                    </tr>
                                    <tr>
                                        <td>Länge:</td>
                                        <td id="info-duration">---</td>
                                    </tr>
                                    <tr>
                                        <td>Zeitstempel:</td>
                                        <td id="info-time">---</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <table id="video-controls" class="disabled">
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                                <col width="100%"/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <tr class="slim">
                                <td><button id="vc-previous" tooltip="Vorheriger Part/Film"></button></td>
                                <td><button id="vc-stop" tooltip="Wiedergabe anhalten"></button></td>
                                <td><button id="vc-next" tooltip="Nächster Part/Film"></button></td>
                                <td>
                                    <table width="100%">
                                        <tr width="100%">
                                            <td><button id="vc-slower" tooltip="Wiedergabe um 0.25x verlangsamen"></button></td>
                                            <td><span id="vc-speed-text">1x</span></td>
                                            <td><button id="vc-faster" tooltip="Wiedergabe um 0.25x beschleunigen"></button></td>
                                            <td style="width: 100%"></td>
                                            <td tooltip="">
                                                <div id="vc-volume" style="--percentage:100%" value="100"></div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td><button id="vc-volume-mute" data-state="mute" tooltip="Wiedergabe stumm schalten"></button></td>
                                <td><button id="vc-info" tooltip="Videoinformationen"></button></td>
                                <td><button id="vc-download" tooltip="Film/Part herunterladen"></button></td>
                            </tr>
                            <tr class="slim">
                                <td><button id="vc-back15" tooltip="Um 15 Sekunden zurückspulen"></button></td>
                                <td><button id="vc-playpause" tooltip="Wiedergabe pausieren/fortsetzen" data-state="play"></button></td>
                                <td><button id="vc-forward15" tooltip="Um 15 Sekunden vorspulen"></button></td>
                                <td>
                                    <table width="100%">
                                        <tr width="100%">
                                            <td>
                                                <span id="vc-progress-text">
                                                    0:00
                                                    <br/>
                                                    / 0:00
                                                </span>
                                            </td>
                                            <td style="width: 100%" tooltip="">
                                                <input type="range" id="vc-progress" min="0" max="0" value="0" step="0.05"/>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td><button id="vc-subtitle" tooltip="Untertitel einblenden/ausblenden" data-state="subtitles"></button></td>
                                <td><button id="vc-pip" tooltip="Picture-in-Picture einschalten/ausschalten" data-state="enter"></button></td>
                                <td><button id="vc-fullscreen" tooltip="Vollbildmodus einschalten/ausschalten" data-state="enter"></button></td>
                            </tr>
                        </table>
                    </figure>
                    <table width="100%">
                        <tr width="100%">
                            <td width="70%" valign="top">
                                <i style="font-size: 10pt">
                                    Falls das Video hängen sollte, bitte einige Minuten warten und das Video laden lassen.
                                    <br/>
                                    <details>
                                        <summary>Tastaturbefehle für das Videofenster.</summary>
                                        <table class="keycuts">
                                            <tr>
                                                <td><kbd>[SPACE]</kbd>, <kbd>[ENTER]</kbd>, <kbd>[K]</kbd></td>
                                                <td>Wiedergabe pausieren oder fortsetzen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[S]</kbd></td>
                                                <td>Wiedergabe stoppen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[D]</kbd></td>
                                                <td>Video herunterladen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[↑]</kbd></td>
                                                <td>Lautstärke um 10% erhöhen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[↓]</kbd></td>
                                                <td>Lautstärke um 10% verringern</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[←]</kbd>, <kbd>[L]</kbd></td>
                                                <td>Um 15 Sekunden zurückspulen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[→]</kbd>, <kbd>[J]</kbd></td>
                                                <td>Um 15 Sekunden vorspulen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[M]</kbd></td>
                                                <td>Lautstärke stumm schalten</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[C]</kbd></td>
                                                <td>Untertitel ein-/ausblenden</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[F]</kbd></td>
                                                <td>Vollbildmodus ein-/ausschalten</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[I]</kbd></td>
                                                <td>PiP-Modus ein-/ausschalten</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[N]</kbd></td>
                                                <td>Nächsten Part/Film anschauen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[P]</kbd></td>
                                                <td>Vorherigen Part/Film anschauen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[.]</kbd></td>
                                                <td>Geschwindigkeit um 25% erhöhen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[,]</kbd></td>
                                                <td>Geschwindigkeit um 25% verringern</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[0]</kbd> ... <kbd>[9]</kbd></td>
                                                <td>Durch den Film scrollen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[Pos1]</kbd></td>
                                                <td>Zum Filmanfang springen</td>
                                            </tr>
                                            <tr>
                                                <td><kbd>[End]</kbd></td>
                                                <td>Zum Filmende springen</td>
                                            </tr>
                                        </table>
                                    </details>
                                </i>
                            </td>
                            <td width="30%" valign="top" align="right">
                                <div id="download-links">
                                    <a id="download-single" download>Dieses Video herunterladen</a>
                                    <br/>
                                    <a id="download-all" download>Alle Parts (1-<span id="part-count"></span>) herunterladen</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <br/>
                <!--///////////////////////////////////////////////// NAVIGATION + GIF CREATOR /////////////////////////////////////////////////-->
                <div class="navigation">
                    <button id="prev-movie" disabled>
                        <div class="triangle-left"></div>
                        <div class="triangle-left"></div>
                        &nbsp;
                        Vorheriger Film
                    </button>
                    <button id="prev-part" disabled>
                        <div class="triangle-left"></div>
                        &nbsp;
                        Vorheriger Part
                    </button>
                    <select id="partselector" width="200">
                        <option selected disabled>Bitte Video auswählen</option>
<?php
    $group = "";

    foreach ($video_ids as $key => $values)
        if ($values[2] < 2)
        {
            ?>
                        <option value="<?=$key?>"><?=$values[3]?></option>
            <?php
        }
        else
        {
            if ($group != $values[0])
            {
                ?>
                        <optgroup label="<?=$values[3]?>">
                <?php
            }

            ?>
                            <option value="<?=$key?>"><?=$values[0]?> Part <?=$values[1]?></option>
            <?php

            if ($values[1] > $values[2] - 1)
            {
                ?>
                        </optgroup>
                <?php
            }

            $group = $values[0];
        }
?>
                    </select>
                    <button id="next-part" disabled>
                        Nächster Part
                        &nbsp;
                        <div class="triangle-right"></div>
                    </button>
                    <button id="next-movie" disabled>
                        Nächster Film
                        &nbsp;
                        <div class="triangle-right"></div>
                        <div class="triangle-right"></div>
                    </button>
                </div>
                <br/>
                <br/>
                <div id="gif-creator">
                    <br/>
                    <b>GIF erstellen ⟨beta⟩</b>
                    <table style="margin-left: 40px">
                        <tr>
                            <td>Start-Zeitstempel:</td>
                            <td>
                                <input type="time" name="gif-start" step="1" disabled value="00:00:00"/>
                            </td>
                            <td rowspan="3">
                                <div class="h-captcha" data-sitekey="<?=$hcaptcha_sitekey?>" data-theme="dark" data-size="todo-compact"></div>
                                <button name="create-gif" disabled> >> ERSTELLEN << </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Länge (Sekunden, zw. 1 und 15):</td>
                            <td>
                                <input type="number" name="gif-length" step="1" min="1" max="15" disabled value="5"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Horizontale Auflösung:</td>
                            <td>
                                <select name="gif-resolution" disabled>
                                    <option value="240">240p</option>
                                    <option value="360">360p</option>
                                    <option value="480" selected>480p</option>
                                    <option value="560">560p</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <div name="gif-result" data-gif-state="empty">
                        <hr/>
                        <br/>
                        <img/>
                        <br/>
                        <a href download>GIF speichern</a>
                    </div>
                </div>
                <br/>
                <hr/>
                <!--///////////////////////////////////////////////// CREDIT SECTION /////////////////////////////////////////////////-->
                <a name="credits"></a>
                <br/>
                <table id="copyrights">
                    <tr>
                        <td>Videomaterial:</td>
                        <td>&copy; Duraphilms, LNJ</td>
                        <td>2009-2015</td>
                        <td>(<a href="https://youtube.com/darthdustinKanal2" target="_blank">YouTube</a>)</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&copy; Coldmirror</td>
                        <td>2006-2008</td>
                        <td>(<a href="https://youtube.com/coldmirror" target="_blank">YouTube</a>)</td>
                    </tr>
                    <tr>
                        <td>Thumbnails:</td>
                        <td>&copy; Duraphilms, LNJ, JBB</td>
                        <td>2009-2020</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Untertitel:</td>
                        <td>&copy; Unknown6656, LNJ, JBB</td>
                        <td>2020</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Webseite:</td>
                        <td>&copy; Unknown6656</td>
                        <td>2014-<?=date("Y")?></td>
                        <td>(<a href="https://youtube.com/unknown6656/" target="_blank">YouTube</a>, <a href="https://github.com/unknown6656" target="_blank">GitHub</a>)</td>
                    </tr>
                </table>
                <br/>
                <br/>
                <table id="credit-icons" width="100%">
                    <tr>
                        <td>
                            <a href="https://youtube.com/darthdustinKanal2" target="_blank">
                                <div class="img_container duraphilms"></div>
                                <br/>
                                DURAPHILMS
                            </a>
                        </td>
                        <td>
                            <a href="https://youtube.com/coldmirror" target="_blank">
                                <div class="img_container coldmirror"></div>
                                <br/>
                                COLDMIRROR
                            </a>
                        </td>
                        <td>
                            <a href="https://youtube.com/Unknown6656" target="_blank">
                                <div class="img_container unknown6656"></div>
                                <br/>
                                unknown6656
                            </a>
                        </td>
                        <td>
                            <a href="https://github.com/lnjX" target="_blank">
                                <div class="img_container lnj"></div>
                                <br/>
                                LNJ
                            </a>
                        </td>
                        <td>
                            <a href="https://github.com/JBBgameich" target="_blank">
                                <div class="img_container jbb"></div>
                                <br/>
                                JBB
                            </a>
                        </td>
                    </tr>
                </table>
                <br/>
                <hr/>
                <br/>
                <div id="feedback">
                    <smc>
                        Fragen? Probleme? Kritik? Verbesserungsvorschläge?
                    </smc>
                    <br/>
                    <a class="sm github" name="GitHub" href="https://github.com/DuraPhilms/unknown6656.com-harrypotter/" target="_blank"></a>
                    <a class="sm twitter" name="Twitter" href="https://twitter.com/Unknown6656" target="_blank"></a>
                    <a class="sm youtube" name="YouTube" href="https://youtube.com/unknown6656/about" target="_blank"></a>
                    <a class="sm facebook" name="Facebook" href="https://facebook.com/Unknown6656" target="_blank"></a>
                    <br/>
                </span>
                <br/>
                <br/>
                <hr/>
                <br/>
                <a href="#top">Zurück zum Seitenanfang</a>
            </div>
            <div id="sidebar">
                <span class="content main_font">
                    <a href="http://www.youtube.com/subscription_center?add_user=darthdustinKanal2" target="_blank">
                        <div class="img_container duraphilms"></div>
                        DURAPHILMS abonnieren
                    </a>
                    <br/>
                    <br/>
                    <a href="http://www.youtube.com/subscription_center?add_user=coldmirror" target="_blank">
                        <div class="img_container coldmirror"></div>
                        COLDMIRROR abonnieren
                    </a>
                    <br/>
                    <br/>
                    <a href="http://www.youtube.com/subscription_center?add_user=unknown6656" target="_blank">
                        <div class="img_container unknown6656"></div>
                        UNKNOWN6656 abonnieren
                    </a>
                    <br/>
                </span>
            </div>
        </div>
        <script type="text/javascript" language="javascript">
            let video_ids = [
<?php
    foreach ($video_ids as $key => $values)
    {
?>
                    ["<?=$values[0]?>", "<?=$values[1]?>", <?=$values[1]?>, <?=$values[2]?>, "<?=$values[3]?>"],
<?php
    }
?>
            ];
        </script>
        <script type="text/javascript" language="javascript" src="js/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" language="javascript" src="js/script.js"></script>
        <script type="text/javascript" language="javascript" src="js/videoplayer.js"></script>
        <script type="text/javascript" language="javascript" src="https://hcaptcha.com/1/api.js" async defer></script>
    </body>
</html>