const baseUrl = 'https://produkter-9dbc3-default-rtdb.europe-west1.firebasedatabase.app/';

const productList = document.getElementById('product-list');
const statusText = document.getElementById('status');
const archivedProducts = [
    {
        name: 'Classic Shirt',
        description: 'Archived sample data shown because the original Firebase endpoint is no longer publicly readable.',
        price: '39 SEK'
    },
    {
        name: 'Weekend Jacket',
        description: 'Fallback product card used to preserve the visual structure of the classroom exercise.',
        price: '89 SEK'
    },
    {
        name: 'Canvas Bag',
        description: 'Simple placeholder data that keeps the public demo understandable on GitHub Pages.',
        price: '24 SEK'
    }
];

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

function setStatus(message, variant = '') {
    statusText.textContent = message;
    statusText.classList.toggle('status-warning', variant === 'warning');
}

function renderProducts(products) {
    productList.innerHTML = '';

    products.forEach((product) => {
        const name = product.Namn ?? product.name ?? 'Product';
        const description = product.Beskrivning ?? product.description ?? 'No description available.';
        const price = product.Pris ?? product.price ?? 'Price unavailable';
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

        if (data && typeof data === 'object' && data.error) {
            setStatus(
                'The original Firebase database now returns a permission error, so this public page is showing archived sample data instead.',
                'warning'
            );
            renderProducts(archivedProducts);
            return;
        }

        const products = normalizeProducts(data);

        if (!products.length) {
            setStatus('No live products were found. Showing archived sample data instead.', 'warning');
            renderProducts(archivedProducts);
            return;
        }

        setStatus(`Showing ${products.length} products.`);
        renderProducts(products);
    } catch (error) {
        setStatus(
            'The live Firebase request could not be completed, so this page is showing archived sample data instead.',
            'warning'
        );
        renderProducts(archivedProducts);
        console.error(error);
    }
}

getProducts();
