'use strict'

var mysql = require('mysql');

var con = mysql.createConnection({
  host : 'localhost',         // tietokantapalvelimen osoite
  user : 'root',              // kehitysatarkoituksessa voidaan käyttää root-käyttäjää. Tuotannossa ei saa käyttää root-käyttäjää
  password : 'Jalkapallo20',  // voi olla tyhjäkin, käyttäkää sitä mikä teillä on
  database : 'jalkapallo'     // tai asiakas_woj
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
  haeSarjataulukko: function () {
    return new Promise((resolve, reject) => {
        con.query('SELECT sarjataulukko.Id, Nimi, Ottelumaara, Voittoja, Tasapeleja, Tappioita, Tehdyt_maalit, Paastetyt_maalit, Pisteet FROM sarjataulukko LEFT JOIN joukkue ON sarjataulukko.Joukkue_id = Joukkue.id ORDER BY Pisteet DESC', function (err, result, fields) {
            if (err) {
                console.log("Virhe haettaessa dataa Sarjataulukko-taulusta, syy: " + err);
                reject("Virhe haettaessa dataa Sarjataulukko-taulusta, syy: " + err);
            } else {
                console.log("Sarjataulukko = " + JSON.stringify(result));
                resolve(result);
            }
        })
    })
  },

  haePelaajat: function () {
    return new Promise((resolve, reject) => {
        con.query('SELECT pelaaja.Id, Sukunimi, Etunimi, Pelinumero, Nimi AS Joukkue FROM pelaaja LEFT JOIN joukkue ON pelaaja.Joukkue_id = Joukkue.id ORDER BY Sukunimi ASC', function (err, result, fields) {
            if (err) {
                console.log("Virhe haettaessa dataa Pelaaja-taulusta, syy: " + err);
                reject("Virhe haettaessa dataa Pelaaja-taulusta, syy: " + err);
            } else {
                console.log("Pelaajat = " + JSON.stringify(result));
                resolve(result);
            }
        })
    })
  },

  haeJoukkueet: function () {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM joukkue', function (err, result, fields) {
            if (err) {
                console.log("Virhe haettaessa dataa Joukkue-taulusta, syy: " + err);
                reject("Virhe haettaessa dataa Joukkue-taulusta, syy: " + err);
            } else {
                console.log("Joukkueet = " + JSON.stringify(result));
                resolve(result);
            }
        })
    })
  } 
}
