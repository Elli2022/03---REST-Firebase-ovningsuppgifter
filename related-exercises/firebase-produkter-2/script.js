// Products 2
// JavaScript
// Create a new product object with the same shape as the existing entries.
// Use POST to add the product to the Firebase database.
// Request the products again and render them in the browser.

const baseUrl = `https://produkt-2-default-rtdb.europe-west1.firebasedatabase.app/products`;

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
        console.log(element.name);
        console.log(element.description);
        console.log(element.price);
        console.log(element.url);

        let div = document.createElement("div");
        document.body.append(div);
        div.innerHTML = `${element.name}, ${element.description}, ${element.price} <img src="${element.url}" /> `


    });

}

getProducts();


async function addProduct(postObj){

    const url = baseUrl + '.json';;

    const init = {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }

    const response = await fetch(url, init);
    const post = await response.json();
    console.log(post);

}

const newProduct = {
    name: 'shirt',
    description:'Black',
    price: '39',
    url: `https://imgproxy.johnhenric.com/preset:sharp/resize:fit:1023/gravity:nowe/quality:80/aHR0cHM6Ly9qb2huaGVucmljLmNlbnRyYWNkbi5uZXQvY2xpZW50L2R5bmFtaWMvaW1hZ2VzLzI1XzA2NzNiYzIzZDMtYTAwMDQ2LTAyLTEtb3JpZ2luYWwuanBn`
 
}

addProduct(newProduct);
