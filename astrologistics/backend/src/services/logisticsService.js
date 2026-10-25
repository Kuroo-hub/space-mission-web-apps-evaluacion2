import { readFile, writeFile} from "node:fs/promises";

const INVENTORY_PATH = new URL(
    "../data/inventory.json",
    import.meta.url
);

const CARGO_PATH = new URL 
(
    "../data/cargo.json",
    import.meta.url
)

// Aqui obtendremos el inventario
export async function getInventory() 
{
    const content = await readFile(INVENTORY_PATH, "utf-8");

    return JSON.parse(content);
}

// Aca la carga de la nave
export async function getCargo()
{
    const content = await readFile(CARGO_PATH, "utf-8");

    return JSON.parse(content);
}