var express = require('express')
var cors = require('cors')
var app = express()
var fs = require('fs');
const connection = require('./connection');
var Game = require('./GameSchema');
var GameDetails = require('./GameDetailsSchema')
var bodyParser = require('body-parser')
const request = require('request');
const cheerio = require('cheerio');
//const fs = require('fs');
app.use(cors())
const mongoose = require('mongoose');
// create application/json parser
var jsonParser = bodyParser.json()
let i = 1;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    res.send('Hello World!')
})


app.get('/results', function (req, res) {
    GameDetails.find({}, function (err, docs) {
        if (docs) res.status(200).send(docs)
        else console.log(err)
    });
})


app.get('/scrape', function (req, res) {
    request('https://www.game-debate.com/games/index.php?year=2019', (error,
        response, html) => {
        var result = [];
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const gameList = $('.srRowFull');
            //console.log(gameList.text())
            const output = gameList.find('a').text();
            //console.log(output)

            $('.srRowFull').each((i, el) => {
                const item = $(el).find('a').attr('href');
                const title = $(el).find('a').attr('name');
                if (item == undefined) {
                    //console.log(item.substr(2,))
                } else {
                    //console.log(item.substr(18,));
                    getSystemReq(item.substr(18), title);
                }
            })

        }

    }
    )

    function getSystemReq(_url, title) {

        request('https://www.game-debate.com/games/index.php' + _url, (err,
            res, html) => {
            if (!err && res.statusCode == 200) {
                const $ = cheerio.load(html);
                const gameList = $('.game-page-top-grid');

                var json = { title : "", OS : "", Intel_CPU : "",AMD_CPU : "",NVIDIA_Graphics : "",AMD_Graphics:"",VRAM:"",RAM:"",HDD:""};


                $('.systemRequirementsWrapBox').find('a').each((i, el) => {
                    //console.log(i) 
                    //console.log($(el).text())

                    json['title'] = title
                    if (i == 5) {
                        json['Intel_CPU'] = $(el).text()
                    } else if (i == 6) {
                        json['AMD_CPU'] = $(el).text()
                    } else if (i == 9) {
                        json['NVIDIA_Graphics'] = $(el).text()
                    } else if (i == 10) {
                        json['AMD_Graphics'] = $(el).text()
                    }
                })
                $('.systemRequirementsWrapBox').find('span').each((j, el) => {
                    //console.log(j) 
                    //console.log($(el).text())

                    if (j == 7) {
                        json['VRAM'] = $(el).text()
                    } else if (j == 8) {
                        json['RAM'] = $(el).text()
                    } else if (j == 9) {
                        json['OS'] = $(el).text()
                    } else if (j == 11) {
                        json['HDD'] = $(el).text()
                    }
                })
                console.log(json);

                // documents array
                var games = new GameDetails(json);

                // save multiple documents to the collection referenced by Book Model
                games.save(function (err, docs) {
                    if (err) return console.error(err);
                    console.log(" saved to gameDetails collection.");
                });

            }
        }
        )
    }

})

/* 
app.get('/copyData', function (req, res) {
    Game.find({}, function (err, docs) {
        if (docs) {
            //db.GameDetails.createIndex( { "title": 1 }, { unique: true } )
            //while(docs.length>=0){
            
                var gameDetails = new GameDetails(docs[1])
                gameDetails.save(function (err, docs) {
                    if (err) return console.error(err);
                    console.log(" saved to game_Details collection.");
                }); 
            //}
            
        }
        else console.log(err)
    });
})
 */


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});