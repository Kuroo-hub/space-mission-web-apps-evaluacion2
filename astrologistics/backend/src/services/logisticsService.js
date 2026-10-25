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

async function saveJSON(path, data)
{
    await writeFile(
        path,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}

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


export async function addCargo(equipmentId, quantity)
{
    const inventory = await getInventory();
    const cargo = await getCargo();

    if(!Number.isInteger(quantity) || quantity <= 0)
        {
            throw new Error("La cantidad debe ser un entero positivo.");
        }
    
    const product = inventory.find(
        item => item.id === equipmentId
    );

    if(!product)
        {
            throw new Error("El suministro no existe.");
        }

    if(product.stock < quantity)
        {
            throw new Error("Stock insuficiente.");
        }

    const cost = product.price * quantity;

    if(cost > cargo.creditos)
        {
            throw new Error("Créditos insuficientes");
        }
    
    const cargoItem = cargo.itemsCargados.find(
        item => item.id === equipmentId
    );

    if(cargoItem)
        {
            cargoItem.quantity += quantity;
        }else
            {
                cargo.itemsCargados.push({
                    id: equipmentId,
                    quantity: quantity
                });
            }
    
    product.stock -= quantity;

    cargo.total += cost;
    cargo.credits -= cost;

    await saveJSON(INVENTORY_PATH, inventory);
    await saveJSON(CARGO_PATH, cargo);

    return cargo;
}