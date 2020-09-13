<!DOCTYPE html>
<?php
    $videos = [
        "hpues" => ["HP und ein Stein", 1],
        "hpudgpk" => ["HP und der geheime PKeller", 1],
        "hpudpp" => ["HP und der Plastikpokal", 1],
        "hpudfe" => ["HP und der Feuer-Elch", 1],
        "hpudpva" => ["HP und der Penner von Alcatraz", 14],
        "hpudodp" => ["HP und der Orden des Penners", 13],
        "hpudhlp" => ["HP und der Half-Life-Prinz", 1],
    ];
?>
<html lang="de" prefix="og: http://ogp.me/ns#">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <meta name="viewport" content="width=800, user-scalable=yes"/>
        <meta name="copyright" content="unknown6656"/>
        <meta name="designer" content="unknown6656"/>
        <meta name="owner" content="unknown6656"/>
        <meta name="url" content="https://unknown6656.com/harrypotter"/>
        <meta name="identifier-url" content="https://unknown6656.com/harrypotter"/>
        <meta name="twitter:site" content="@unknown6656">
        <meta name="fb:page_id" content="381982338582331"/>
        <meta name="og:url" content="https://unknown6656.com/harrypotter"/>
        <meta name="og:site_name" content="unknown6656 | Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR"/>
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
        <meta name="og:image" content="https://unknown6656.com/harrypotter/src/banner.png"/>
        <meta name="twitter:image" content="https://unknown6656.com/harrypotter/src/banner.png"/>
        <meta name="twitter:card" content="https://unknown6656.com/harrypotter/src/banner.png"/>
        <title>Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <link rel="index" title="unknown6656 | Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR" href="/harrypotter/"/>
        <!--
            <link rel="author" href="/humans.txt" type="text/plain">
            <link rel="sitemap" type="application/xml" href="/sitemap.xml"/>
            <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="unknown6656.com RSS feed">
        -->
    </head>
    <body>
        <a name="top"></a>
        <div id="title" class="title_font">
            <!--
            Harry Potter Synchronisation by DURAPHILMS / COLDMIRROR
            <div id="title_cover"></div>
            -->
        </div>
        <div id="main" class="main_font">
            <span class="description">
                <h2>Willkommen liebe Potter-Fans!</h2>
                <p>
                    Auf dieser Seite könnt Ihr Euch alle Harry Potter Parodien/Synchronisationen von DURAPHILMS und COLDMIRROR anschauen:
                    <ul>
                        <li>Harry Potter und ein Stein (Coldmirror)</li>
                        <li>Harry Potter und der geheime P████keller (Coldmirror)</li>
                        <li>Harry Potter und der Plastikpokal (Coldmirror)</li>
                        <li>Harry Potter und der Penner von Alcatraz (Duraphilms)</li>
                        <li>Harry Potter und der Feuer-Elch (Duraphilms)</li>
                        <li>Harry Potter und der Ordern des Penners (Duraphilms)</li>
                        <li>Harry Potter und der Half-Life-Prinz (Duraphilms)</li>
                    </ul>
                </p>
                <p>
                    Die COLDMIRROR-Parodien liegen in einem zusammenhängenden Video vor &mdash; die Parodien von DURAPHILMS sind jedoch in mehrere Parts aufgeteilt.
                    Um einen spezifischen Part zu sehen, könnt ihr auf den entsprechenden Eintrag in der folgenden Tabelle klicken.
                    Alternativ befindet sich unterhalb jedes Videofensters ein Auswahlmenü der verfügbaren Parts.
                    <!-- Um einen spezifischen Part zu sehen, müsst Ihr die entsprechende Nummer des Parts in das Nummernfeld unterhalb
                    des Videos eintragen und mit <key>ENTER</key> bestätigen. -->
                </p>
                <p>
                    Das eigentliche Video könnt Ihr herunterladen, indem Ihr mit der rechten Maustaste darauf klickt und <key>Speichern unter ...</key> auswählt.
                    <!-- Auf mobilen Endgeräten kann man das Video durch ein [...] -->
                    <!-- Alternativ findet Ihr unter dem Video auch den Download-Link für alle Parts.<br/> -->
                </p>
                <p>
                    Credits und Copyright findet Ihr am <a href="#credits">Ende dieser Seite</a>.
                </p>
                <p>
                    <i>Diese Webseite benötigt HTML5-Unterstützung.</i></i>
                    <a href="https://html5test.com/" target="_blank" class="help">?</a>
                </p>
            </span>
            <br/>
            <hr/>
            <p>
                Folgende Teile sind zurzeit online bzw. offline (Klicke auf die Nummer um den Part anzuschauen):
                <table width="100%" id="parts">
<?php
    foreach ($videos as $key => $info)
    {
?>
                    <tr width="100%">
                        <td class="descr"><?=$info[0]?>:</td>
<?php
        for ($i = 1; $i <= $info[1]; $i++) {
?>
            <td id="<?=$key.$i?>" class="number"><span class="tooltip" text=""><?=$i?></span></td>
<?php
        }
?>
                    </tr>
<?php
    }
?>
                    <tr width="100%" height="17px"></tr>
                    <tr width="100%" class="leg">
                        <td class="leg_desc">STATUS UNBEKANNT:</td>
                        <td class="number"></td>
                    </tr>
                    <tr width="100%" class="leg">
                        <td class="leg_desc">DERZEIT OFFLINE:</td>
                        <td class="number offline" style="cursor: default !important;"></td>
                    </tr>
                    <tr width="100%" class="leg">
                        <td class="leg_desc">KURZZEITIG OFFLINE:</td>
                        <td class="number temporary" style="cursor: default !important;"></td>
                    </tr>
                    <tr width="100%" class="leg">
                        <td class="leg_desc">ONLINE:</td>
                        <td class="number online" style="cursor: default !important;"></td>
                    </tr>
                </table>
            </p>
            <br/>
            <hr/>
            <a name="video"></a>
            <h3 id="video-title"></h3>
            <p>
                <video id="player" width="500" height="300" controls allowfullscreen poster="src/title.png">
                    <source src="" type="video/mp4">
                    Sry, dein Browser rafft kein HTML5. Versuch's mal mit Google Chrome....
                </video>
                <div class="notice">
                    Falls das Video hängen sollte, bitte einige Minuten warten und das Video laden lassen.
                </div>
                <table width="100%">
                    <tr width="100%">
                        <td width="50%" align="left">
                            <select id="selector-part">
                                <option value="">Bitte Part auswählen</option>
<?php
    foreach ($videos as $key => $info)
    {
?>
                                <optgroup label="<?=$info[0]?>">
<?php
        for ($i = 1; $i <= $info[1]; ++$i)
        {
?>
                                    <option value="<?=$key?>-<?=$i?>">Part <?=$i?></option>
<?php
        }
?>
                                </optgroup>
<?php
    }
?>
                            </select> anschauen....
                        </td>
                        <td width="50%" align="right">
<?php
    // if ($info[1] > 1)
    // {
?>
                            <a href="https://mega.co.nz/#!L1IXDRCQ!5U3K8SA_Y4NgC_tTJtFTs3j3ZI-c5RZUobE1wniL3xo" target="_blank">Full Download (Pt. 1-<span id="pva_lim">14</span>)</a>
<?php
    // }
?>
                        </td>
                    </tr>
                </table>
            </p>
            <br/>
            <hr/>
            <!--///////////////////////////////////////////////// CREDIT SECTION /////////////////////////////////////////////////-->
            <a name="credits"></a>
            <br/>
            <table>
                <tr>
                    <td>Videomaterial:</td>
                    <td> &nbsp; </td>
                    <td>&copy; Duraphilms,</td>
                    <td>2009-2015</td>
                    <td> &nbsp; </td>
                    <td>(<a href="https://youtube.com/darthdustinKanal2" target="_blank">YouTube</a>)</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>&copy; Coldmirror,</td>
                    <td>2006-2008</td>
                    <td></td>
                    <td>(<a href="https://youtube.com/coldmirror" target="_blank">YouTube</a>)</td>
                </tr>
                <tr>
                    <td>Webseite:</td>
                    <td></td>
                    <td>&copy; Unknown6656,</td>
                    <td>2014-<?=date("Y")?></td>
                    <td></td>
                    <td>(<a href="https://youtube.com/unknown6656" target="_blank">YouTube</a>, <a href="https://github.com/unknown6656" target="_blank">GitHub</a>)</td>
                </tr>
            </table>
            <br/>
            <table>
                <tr>
                    <td>
                        <a href="https://youtube.com/darthdustinKanal2" target="_blank">
                            <div class="img_container duraphilms"></div>
                        </a>
                    </td>
                    <td>
                        <a href="https://youtube.com/coldmirror" target="_blank">
                            <div class="img_container coldmirror"></div>
                        </a>
                    </td>
                    <td>
                        <a href="https://youtube.com/Unknown6656" target="_blank">
                            <div class="img_container unknown6656"></div>
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
                <a class="sm github" name="GitHub" href="https://github.com/Unknown6656" target="_blank"></a>
                <a class="sm twitter" name="Twitter" href="https://twitter.com/Unknown6656" target="_blank"></a>
                <a class="sm youtube" name="YouTube" href="https://youtube.com/unknown6656/about" target="_blank"></a>
                <a class="sm facebook" name="Facebook" href="https://facebook.com/Unknown6656" target="_blank"></a>
                <br/>
            </span>
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
        <script type="text/javascript" language="javascript">
            let video_ids = [
<?php
    foreach ($videos as $key => $info)
        for ($i = 1; $i <= $info[1]; ++$i)
        {
?>
                ["<?=$key?>", <?=$i?>, "<?=$info[0]?>"],
<?php
        }
?>
            ];
        </script>
        <script type="text/javascript" language="javascript" src="js/jquery-3.5.1.min.js"></script>
        <script type="text/javascript" language="javascript" src="js/script.js"></script>
    </body>
</html>