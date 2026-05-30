import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { get, getDatabase, ref } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import {
    firebaseProjectConfig,
    legacyFallbackPath,
    productsPath,
    usingPlaceholderConfig
} from "./firebase-config.js";

const productList = document.getElementById("product-list");
const statusText = document.getElementById("status");
const authState = document.getElementById("auth-state");
const setupPanel = document.getElementById("setup-panel");
const setupSummary = document.getElementById("setup-summary");

function normalizeProducts(data) {
    if (!data || typeof data !== "object") {
        return [];
    }

    return Object.values(data)
        .flatMap((value) => {
            if (value && typeof value === "object" && !Array.isArray(value)) {
                return Object.values(value);
            }

            return [value];
        })
        .filter((item) => item && typeof item === "object");
}

function setStatus(message, variant = "") {
    statusText.textContent = message;
    statusText.className = variant ? `status status-${variant}` : "status";
}

function setAuthState(message, variant = "") {
    authState.textContent = message;
    authState.className = variant ? `auth-pill auth-pill-${variant}` : "auth-pill";
}

function showSetupPanel(summary) {
    setupPanel.hidden = false;
    setupSummary.textContent = summary;
}

function renderProducts(products) {
    productList.innerHTML = "";

    products.forEach((product) => {
        const name = product.Namn ?? product.name ?? "Product";
        const description = product.Beskrivning ?? product.description ?? "No description available.";
        const price = product.Pris ?? product.price ?? "Price unavailable";
        const imageUrl = product.url ?? product.image ?? "";

        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <h2>${name}</h2>
            <p>${description}</p>
            <strong>${price}</strong>
            ${imageUrl ? `<img src="${imageUrl}" alt="${name}">` : ""}
        `;

        productList.append(card);
    });
}

async function readProducts(database) {
    const pathsToTry = [productsPath];

    if (legacyFallbackPath) {
        pathsToTry.push(legacyFallbackPath);
    }

    for (const path of pathsToTry) {
        const snapshot = await get(ref(database, path));

        if (!snapshot.exists()) {
            continue;
        }

        const products = normalizeProducts(snapshot.val());

        if (products.length) {
            return {
                products,
                path: path || "/"
            };
        }
    }

    return {
        products: [],
        path: productsPath
    };
}

async function startSecureDemo() {
    if (usingPlaceholderConfig) {
        setAuthState("Firebase config required", "warning");
        setStatus(
            "The secure Firebase architecture is ready, but the live demo still needs your real Firebase web app config before it can authenticate.",
            "warning"
        );
        showSetupPanel(
            "Add the real apiKey and appId in firebase-config.js, then enable Anonymous sign-in in Firebase Authentication."
        );
        return;
    }

    try {
        setAuthState("Creating anonymous session...", "neutral");
        const app = initializeApp(firebaseProjectConfig);
        const auth = getAuth(app);
        await signInAnonymously(auth);

        setAuthState("Anonymous session active", "success");
        setStatus("Authenticated successfully. Loading protected product data...", "neutral");

        const database = getDatabase(app);
        const { products, path } = await readProducts(database);

        if (!products.length) {
            setStatus(
                "Authentication worked, but no product records were found at the configured database path yet.",
                "warning"
            );
            showSetupPanel(
                "Anonymous auth is working. The next step is to store your product data under /products or update the configured path in firebase-config.js."
            );
            return;
        }

        setStatus(`Showing ${products.length} protected products from ${path}.`, "success");
        renderProducts(products);
    } catch (error) {
        const message = error?.code === "auth/admin-restricted-operation"
            ? "Firebase rejected anonymous sign-in. Enable Anonymous authentication in the Firebase console to complete the secure demo."
            : error?.code === "PERMISSION_DENIED"
                ? "Authentication worked, but the database rules still block reads. Allow authenticated users to read your products path."
                : "The secure Firebase connection could not be completed yet. Check the Firebase config, anonymous auth setting, and database rules.";

        setAuthState("Secure connection blocked", "warning");
        setStatus(message, "warning");
        showSetupPanel(message);
        console.error(error);
    }
}

startSecureDemo();
