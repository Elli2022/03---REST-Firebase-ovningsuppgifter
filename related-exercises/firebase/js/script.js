const baseUrl = `https://test2023-02-08-default-rtdb.europe-west1.firebasedatabase.app/`;

async function getAll() {

    const url = baseUrl + 'posts.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

getAll();

async function deleteNode() {
    const url = baseUrl + 'posts/cats/0.json';
    response = await fetch(url, { method: 'DELETE' });

    const data = await response.json();
    console.log(data);

}

deleteNode();


//lägger till objektet igen
async function postCat(obj) {
    const url = baseUrl + 'posts/cats/0.json';

    const init = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };

    const response = await fetch(url, init);
    const data = await response.json();
    console.log(data);
}

const newCat = {
    id: 44,
    title: 'lion'

}

postCat(newCat)



async function put(obj){

    const url = 'https://test2023-02-08-default-rtdb.europe-west1.firebasedatabase.app/posts/cats/5/-NNkcarn9egxeoWuT9Pk.json'

    const init = {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }

    };

    const response = await fetch(url, init);
    const data = await response.json();
    console.log(data);
}

const putObj = {
    id: 66,
    title: 'Bamse i trollskogen'
};

put(putObj);

