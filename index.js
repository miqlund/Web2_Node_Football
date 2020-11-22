var express = require('express');
var cons = require('consolidate');
var path = require('path');
var handlebars = require('handlebars');
var customerController = require('./footballController');

var app = express();

app.engine('html', cons.handlebars); // Tällä otetaan käyttöön handlebars
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

handlebars.registerHelper('sijoitus', function (index) {
    return index + 1;
})


var toiminto = [];
toiminto.push({key: 1 , name: 'toiminto 1'});
toiminto.push({key: 2 , name: 'toiminto 2'});
toiminto.push({key: 3 , name: 'toiminto 3'});
toiminto.push({key: 4 , name: 'toiminto 4'});
toiminto.push({key: 5 , name: 'toiminto 5'});

var data = [];
data.push({type : 1, title : 'data 1'});
data.push({type : 2, title : 'data 2'});
data.push({type : 3, title : 'data 3'});
data.push({type : 4, title : 'data 4'});

app.get('/', function(req, res) {
    res.render('index', {
        toiminto : toiminto,
        data : data
    });
  });

// Haetaan sarjataulukko
app.get('/sarjataulukko', function (req, res) {
    footballController.haeSarjataulukko().
        then(data => {
            res.render('sarjataulukko', {
                sarjataulukko: data
            });
        }).catch(err => {
            console.log("Virhe: " + JSON.stringify(err));
        });
});

// Haetaan pelaajat ja joukkueet
app.get('/pelaajatjajoukkueet', function (req, res) {
    var pelaajat = footballController.haePelaajat();
    var joukkueet = footballController.haeJoukkueet();

    Promise.all([pelaajat, joukkueet]).
        then(data => {
            console.log('pelaajat = ' + JSON.stringify(data[0]));
            console.log('joukkueet = ' + JSON.stringify(data[1]));

            res.render('pelaajatjajoukkueet', {
                pelaajat: data[0],
                joukkueet: data[1]
            });
        }).catch(err => {
            console.log("Virhe: " + JSON.stringify(err));
        });
});
    
// Virheilmoitus
app.use(function (req, res, next) {
    res.sendStatus(404);
});

// Kuunnellaan
app.listen(3000);
console.log("Server running at http://127.0.0.1:3000/");

