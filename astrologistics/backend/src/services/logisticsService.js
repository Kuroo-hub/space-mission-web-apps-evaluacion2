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


export async function updateCargoUnits(equipmentId, newQuantity) {
    const inventory = await getInventory();
    const cargo = await getCargo();

    // Validación de cantidad
    if (!Number.isInteger(newQuantity) || newQuantity < 0) {
        throw new Error("La cantidad debe ser un entero positivo o cero.");
    }

    const product = inventory.find(item => item.id === equipmentId);
    if (!product) {
        throw new Error("El suministro no existe.");
    }

    const cargoItem = cargo.itemsCargados.find(item => item.id === equipmentId);
    if (!cargoItem) {
        throw new Error("El suministro no está en la carga.");
    }

    const currentQuantity = cargoItem.quantity;
    const diff = newQuantity - currentQuantity; // Diferencia de unidades

    if (diff > 0) {
    
        if (product.stock < diff) {
            throw new Error("Stock en base insuficiente");
        }
        const cost = product.price * diff;
        if (cost > cargo.credits) {
            throw new Error("Créditos insuficientes para esta cantidad");
        }
        
        product.stock -= diff;
        cargo.credits -= cost;
        cargo.total += cost;
    } else if (diff < 0) {

        const refund = product.price * Math.abs(diff);
        product.stock += Math.abs(diff);
        cargo.credits += refund;
        cargo.total -= refund;
    }

    // Actualizacion de la carga.
    cargoItem.quantity = newQuantity;

    await saveJSON(INVENTORY_PATH, inventory);
    await saveJSON(CARGO_PATH, cargo);
    
    return cargo;
}

export async function removeCargo(equipmentId) {
    const inventory = await getInventory();
    const cargo = await getCargo();

    const product = inventory.find(item => item.id === equipmentId);
    if (!product) {
        throw new Error("El suministro no existe.");
    }

    const cargoItemIndex = cargo.itemsCargados.findIndex(item => item.id === equipmentId);
    if (cargoItemIndex === -1) {
        throw new Error("El suministro no está en la carga.");
    }

    const cargoItem = cargo.itemsCargados[cargoItemIndex];
    const refund = product.price * cargoItem.quantity;

    // Devolvemos el stock y los créditos
    product.stock += cargoItem.quantity;
    cargo.credits += refund;
    cargo.total -= refund;

    // Eliminamos el item del arreglo
    cargo.itemsCargados.splice(cargoItemIndex, 1);

    await saveJSON(INVENTORY_PATH, inventory);
    await saveJSON(CARGO_PATH, cargo);
    
    return cargo;
}