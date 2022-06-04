var filmovi = [
    {
        odledan: false,
        naziv : "Nemoguca misija",
        godina : 2004,
        drzava : "USA",
        napomena : "Akcioni film",
        glumci : ["Tom Cruise", "Henry Czermi", "Simon Pegg"]
    },
    {
        odledan : false,
        naziv : "Apsolutnih 100",
        godina : 2001,
        drzava : "Srbija",
        napomena : "Akcioni film",
        glumci : ["Vuk Kostic", "Srdjan Todorovic", "Slavko Labovic"]
    },
    {
        odgledan: false,
        naziv : "Lajanje na zvijezde",
        godina : 1998,
        drzava : "SR Jugoslavija",
        napomena : "Komedija",
        glumci : ["Dragan Micanovic", "Natasa Tapuskovic", "Dragan Jovanovic"]
    }
];

function prikaziFilmove(){

    let pomFilmovi = "";
     filmovi.forEach((film,index) =>{

        pomChecked = "";
        pomClass = "bg-danger";
        if(film.odgledan){
            pomChecked = "checked";
            pomClass = "bg-success";
        }
         pomFilmovi += `<div class = "row mt-4 ${pomClass}" id="${index}b">`;
         pomFilmovi += `<div class = "col-2"><input type = "checkbox" id = "${index}" onclick="odgledani(${index})" ${pomChecked}></div>`;
         pomFilmovi += `<div class = "col-2">${film.naziv}</div>`;
         pomFilmovi += `<div class = "col-2">${film.godina}</div>`;
         pomFilmovi += `<div class = "col-2">${film.drzava}</div>`;
         pomFilmovi += `<div class = "col-2">${film.napomena}</div>`;
         pomFilmovi += `<div class = "col-2">`;
         film.glumci.forEach(glumac => {
         pomFilmovi += `${glumac},`;
         })
         pomFilmovi += `</div></div>`;
     })

     document.getElementById('tableBody').innerHTML = pomFilmovi;

}

function preuzmiUnos(){
    let unosNaziv = document.getElementById('naziv').value;
    let unosDrzava = document.getElementById('drzava').value;
    let unosNapomena = document.getElementById('napomena').value;
    let unosGodina = document.getElementById('godina').value;
    let unosGlumci= document.getElementById('glumci').value;
    let unosOdgledan = document.getElementById('odgledan').checked;
    let godinaInd = true; 

    document.getElementById('greskaGlumci').innerHTML = '';
    document.getElementById('greskaGodina').innerHTML = '';
    
    if( unosGlumci == ''){
        document.getElementById('greskaGlumci').innerHTML = 'Unesite minimum jednog glumca';
    }

    if(unosGodina < 1930 || unosGodina > 2021){
        document.getElementById('greskaGodina').innerHTML = 'Unesite godinu izmedju 1930 i 2021';
        godinaInd = false; 
    }
    

    if(godinaInd && unosGlumci != ''){
        unosGlumci = unosGlumci.split(',');

        return {
            odgledan : unosOdgledan,
            naziv : unosNaziv,
            godina : unosGodina,
            drzava : unosDrzava,
            napomena : unosNapomena,
            glumci : unosGlumci
        }
    }
}

function ocistiUnos(){
    let unosNaziv = document.getElementById('naziv').value = '';
    let unosDrzava = document.getElementById('drzava').value = '';
    let unosNapomena = document.getElementById('napomena').value = '';
    let unosGodina = document.getElementById('godina').value = '';
    let unosGlumci= document.getElementById('glumci').value = '';
    let unosOdgledan = document.getElementById('odgledan').checked = false;
}

function dodajFilm(){
    film = preuzmiUnos();
    if(film != null){
        filmovi.push(film);
        ocistiUnos();
        prikaziFilmove();
        var modalEl = document.getElementById('staticBackdrop');
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}

function odgledani(check){
    pom = document.getElementById(check).checked;
    pomRed = document.getElementById(check + 'b');

    if(pom == false){
        
        pomRed.classList.remove('bg-success');
        pomRed.classList.add('bg-danger');
    }
    if(pom == true){
        
        pomRed.classList.remove('bg-danger');
        pomRed.classList.add('bg-success');
    }
}


document.getElementById('dodajDugme').addEventListener('click', dodajFilm)

prikaziFilmove();