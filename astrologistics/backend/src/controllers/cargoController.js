import { getCargo, addCargo, updateCargoUnits, removeCargo } from "../services/logisticsService.js";

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



export async function updateCargoUnitsController(req, res) {
    try {
        const equipmentId = parseInt(req.params.id);
        const { quantity } = req.body;

        const cargo = await updateCargoUnits(equipmentId, quantity);
        
        return res.status(200).json({
            message: "Unidades actualizadas correctamente.",
            cargo
        });
    } catch (error) {
        const validationErrors = [
            "La cantidad debe ser un entero positivo o cero.",
            "El suministro no existe.",
            "El suministro no está en la carga.",
            "Stock en base insuficiente",
            "Créditos insuficientes para esta cantidad"
        ];
        
        if (validationErrors.includes(error.message)) {
            return res.status(400).json({ message: error.message });
        }
        
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar unidades" });
    }
}

export async function removeCargoController(req, res) {
    try {
        const equipmentId = parseInt(req.params.id);
        
        const cargo = await removeCargo(equipmentId);
        
        return res.status(200).json({
            message: "Suministro eliminado de la carga.",
            cargo
        });
    } catch (error) {
        const validationErrors = [
            "El suministro no existe.",
            "El suministro no está en la carga."
        ];
        
        if (validationErrors.includes(error.message)) {
            return res.status(400).json({ message: error.message });
        }
        
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar suministro" });
    }
}