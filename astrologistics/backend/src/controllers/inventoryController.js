import { getInventory } from "../services/logisticsService.js";

export async function getInventoryController(req, res)
{
    try
    {
        const inventory = await getInventory();

        return res.status(200).json(inventory);
    }catch(error){
        return res.status(500).json({
            message: "Error al obtener el inventario"
        });
    }
}