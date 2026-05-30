const baseUrl = 'https://produkter-9dbc3-default-rtdb.europe-west1.firebasedatabase.app/';

const productList = document.getElementById('product-list');
const statusText = document.getElementById('status');

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
    productList.innerHTML = '';

    products.forEach((product) => {
        const name = product.Namn ?? product.name ?? 'Produkt';
        const description = product.Beskrivning ?? product.description ?? 'Ingen beskrivning.';
        const price = product.Pris ?? product.price ?? 'Pris saknas';
        const imageUrl = product.url ?? product.image ?? '';

        const card = document.createElement('article');
        card.className = 'product-card';

        card.innerHTML = `
            <h2>${name}</h2>
            <p>${description}</p>
            <strong>${price}</strong>
            ${imageUrl ? `<img src="${imageUrl}" alt="${name}">` : ''}
        `;

        productList.append(card);
    });
}

async function getProducts() {
    try {
        const response = await fetch(baseUrl + '.json');
        const data = await response.json();
        const products = normalizeProducts(data);

        if (!products.length) {
            statusText.textContent = 'Inga produkter hittades.';
            return;
        }

        statusText.textContent = `Visar ${products.length} produkter.`;
        renderProducts(products);
    } catch (error) {
        statusText.textContent = 'Kunde inte ladda produkterna just nu.';
        console.error(error);
    }
}

getProducts();
