import { getCargo } from "../services/logisticsService.js";

export async function getCargoController(req, res)
{
    try
    {
        const cargo = await getCargo();

        return res.status(200).json(cargo);
    }catch
    {
        return res.status(500).json({
            message: "Error al obtener la carga."
        });
    }
}