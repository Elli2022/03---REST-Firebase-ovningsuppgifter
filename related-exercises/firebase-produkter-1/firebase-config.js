const placeholder = "REPLACE_ME";

export const firebaseProjectConfig = {
    apiKey: placeholder,
    authDomain: "produkter-9dbc3.firebaseapp.com",
    projectId: "produkter-9dbc3",
    appId: placeholder,
    databaseURL: "https://produkter-9dbc3-default-rtdb.europe-west1.firebasedatabase.app"
};

export const productsPath = "products";
export const legacyFallbackPath = "";

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId", "databaseURL"];

export const usingPlaceholderConfig = requiredConfigKeys.some((key) => {
    const value = firebaseProjectConfig[key];
    return typeof value !== "string" || !value.trim() || value.includes(placeholder);
});
