## Duraphilms/Coldmirror parody streaming site

[https://unknown6656.com/harrypotter](https://unknown6656.com/harrypotter)

[https://discord.gg/byd5qP6](https://discord.gg/byd5qP6)

This code is licenced under the Giant Penis License (GPL).
<br/><sup>get rekt.</sup>



# Comment API

GET https://unknown6656.com/harrypotter/comments.php
Required parameters:
 - `key`: muss einer dieser strings sein: "hpues", "hpudgpk", "hpudpp", "hpudpva", "hpudodp", "hpudfe", "hpudhlp"
 - `part`: numerische Zahl (kann zero-padded sein)

Response:
 - HTTP `401`: Fehlende oder falsch formatierte Parameter
 - HTTP `400`: Youtube-video zu den Parametern nicht gefunden
 - HTTP `200`: OK

Response Content-Type: `application/json`

Es kann eine Weile dauern, bis alle comments gefetched wurden --> am besten async aufrufen.
Wurde die Seite vor länger als 45min nicht aufgerufen, dann werden die comments neu gefetched.

Return Format:
```json
{
    "created": 1611693545,                      // unix timestamp from last fetch/update
    "comment_count": 3154,                      // number of comments
    "comments": [                               // array of comments
        {
            "id": "Ugx2B2kO6UuzA-yqgw94AaABAg", // unique comment id
            "html": "....",                     // HTML-escaped comment content
            "author_name": "....",              // comment author name (not escaped)
            "author_image": "https://...",      // uri pointing to profile picture
            "author_url": "http://...",         // uri pointing to user profile
            "likes_count": 9,                   // numeric like count
            "date": "2018-01-26T03:04:51Z",     // timestamp
            "reply_count": 1,                   // reply count
            "replies": [                        // array of replies
                {
                    "id": "...",
                    "html": "...",
                    "author_name": "...",
                    "author_image": "https://...",
                    "author_url": "http://...",
                    "likes_count": 0,
                    "date": "..."
                }
            ]
        },
        // .....
    ]
}
```
