import { getCargo, addCargo } from "../services/logisticsService.js";

export async function getCargoController(req, res)
{
    try
    {
        const cargo = await getCargo();

        return res.status(200).json(cargo);
    }catch(error)
    {
        return res.status(500).json({
            message: "Error al obtener la carga."
        });
    }
}

export async function addCargoController(req, res)
{
    try
    {
        // Aplicamos desestructuracion
        const {equipmentId, quantity} = req.body;

        // cargo sera la variable que contendra lo que devuelve la funcion
        const cargo = await addCargo(equipmentId, quantity);

        // Se agrega correctamente el suministro
        res.status(200).json({
            message: "Suministro agregado correctamente.",
            cargo
        });
    }catch(error)
    {
        // Creamos el arreglo que contendra los mensajes de las validaciones
        const validationErrors =
        [
            "Cantidad debe ser enteros positivos",
            "El suministro no existe",
            "Stock en base insuficiente",
            "Creditos insuficientes"
        ];

        // Y aqui validamos para que se ejecute
        if(validationErrors.includes(error.message))
            {
                return res.status(400).json({
                    message: error.message
                });
            }
        
        console.error(error);

        return res.status(500).json({
            message: "Error al intentar agregar suministro"
        });
    }
    

}