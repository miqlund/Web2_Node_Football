$(document).ready(function () {
    $('#sarjataulukko').click(function (event) {
        event.preventDefault();
        $("#mainArticle").load("http://localhost:3000/sarjataulukko", function () {
            console.log('Sarjataulukko haettu.');
        });
    });
    $('#pelaajatjajoukkueet').click(function (event) {
        event.preventDefault();
        $("#mainArticle").load("http://localhost:3000/pelaajatjajoukkueet", function () {
            console.log('Pelaajat ja joukkueet haettu.');
        });
    });
});