// Skapa en ett nytt projekt och databas per ovning.
// ____________________Produkter - 1_____________________________
// Firebase
// Skapa en databas med minst 5 produkter. (Utga fran en butik som existerar om du vill.)
// Varje produkt ska innehalla:
// Namn
// En kort beskrivning
// Pris
// url till en bild som visar produkten

// JS
// Hamta alla produkter och visa dem i product cards i browsern.

const baseUrl = 'https://produkter-9dbc3-default-rtdb.europe-west1.firebasedatabase.app/';

function normalizeProducts(data) {
    if (!data || typeof data !== 'object') {
        return [];
    }

    return Object.values(data)
        .flatMap((value) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                return Object.values(value);
            }

            return [value];
        })
        .filter((item) => item && typeof item === 'object');
}

function renderProducts(products) {
    document.body.innerHTML = '';

    products.forEach((product) => {
        const name = product.Namn ?? product.name ?? 'Produkt';
        const description = product.Beskrivning ?? product.description ?? '';
        const price = product.Pris ?? product.price ?? '';
        const imageUrl = product.url ?? product.image ?? '';

        const card = document.createElement('div');
        const imageMarkup = imageUrl ? '<img src="' + imageUrl + '" alt="' + name + '" />' : '';
        card.innerHTML = name + ', ' + description + ', ' + price + ' ' + imageMarkup;
        document.body.append(card);
    });
}

async function getProducts() {
    try {
        const url = baseUrl + '.json';
        const response = await fetch(url);
        const data = await response.json();
        const products = normalizeProducts(data);

        renderProducts(products);
    } catch (error) {
        document.body.textContent = 'Could not load products.';
        console.error(error);
    }
}

getProducts();
