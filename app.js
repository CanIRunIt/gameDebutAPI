var express = require('express')
var cors = require('cors')
var app = express()
var fs = require('fs');
const connection = require('./connection');
const port = 3000
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
  res.json(data);
})

var GameSchema = mongoose.Schema({
  title:String,
  OS: String,
  Processor: String,
  Memory: String,
  Graphics: String,
  Storage: String
});

// compile schema to model
var Game = mongoose.model('Game', GameSchema, 'gameDetails');

request('https://www.game-debate.com/games/index.php',(error,
    response,html)=>{
        var result=[];
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            const gameList = $('.srRowFull');
            //console.log(gameList.text())
            const output = gameList.find('a').text();
            //console.log(output)

            $('.srRowFull').each((i,el)=>{
                const item = $(el).find('a').attr('href');
                const title = $(el).find('a').attr('name');
                if(item==undefined){
                    //console.log(item.substr(2,))
                }else{
                    //console.log(item.substr(18,));
                    getSystemReq(item.substr(18,),title);
                }
            })
            
        }
        
    }
    )

 function getSystemReq(_url,title) {
     
    request('https://www.game-debate.com/games/index.php'+_url,(err,
    res,html)=>{
        if(!err && res.statusCode == 200){
            const $ = cheerio.load(html);
            const gameList = $('.game-page-top-grid');
           
            var json = { title : "", OS : "", Processor : "",Memory : "",Graphics : "",Storage:""};

         

            
             $('.devDefSysReqMinWrapper').find('li').each((i,el)=>{
                json['title']=title
                if($(el).text().substr(0,2)=="OS"){
                    json['OS']=$(el).text().substr(4,)
                }else if($(el).text().substr(0,9)=="Processor"){
                    json['Processor']=$(el).text().substr(11,)
                }else if($(el).text().substr(0,6)=="Memory"){
                    json['Memory']=$(el).text().substr(8,)
                }else if($(el).text().substr(0,8)=="Graphics"){
                    json['Graphics']=$(el).text().substr(10,)
                }else if($(el).text().substr(0,7)=="Storage"){
                    json['Storage']=$(el).text().substr(9,)
                }
            })
            console.log(json);
            
           
            
            
            // documents array
            var games = new Game(json);
        
            // save multiple documents to the collection referenced by Book Model
            games.save(function (err, docs) {
              if (err) return console.error(err);
              console.log(" saved to bookstore collection.");
            });
            
        }
    }
    )
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))