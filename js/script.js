// Skapa en ett nytt projekt och databas per övning.
//____________________Produkter - 1_____________________________
// Firebase
// Skapa en databas med minst 5 produkter. (Utgå från en butik som existerar om du vill.) 
// Varje produkt ska innehålla 
// Namn
// En kort beskrivning
// Pris
// url till en bild som visar produkten

// JS
// Hämta alla produkter och visa dem i product cards i browsern.


const baseUrl = `https://produkter-9dbc3-default-rtdb.europe-west1.firebasedatabase.app/`;

async function getProducts() {

    const url = baseUrl + '.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);


    let objKeys = Object.keys(data);
    let objValue = Object.values(data);
    console.log(objKeys);
    console.log(objValue);

    objValue.forEach ((element) =>{
        console.log(element.Namn);
        console.log(element.Beskrivning);
        console.log(element.Pris);
        console.log(element.url);

        let div = document.createElement("div");
        document.body.append(div);
        div.innerHTML = `${element.Namn}, ${element.Beskrivning}, ${element.Pris} <img src="${element.url}" /> `

    

    });

}

getProducts();