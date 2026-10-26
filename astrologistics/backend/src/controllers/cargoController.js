import { getCargo, addCargo, updateCargoUnits, removeCargo } from "../services/logisticsService.js";

export async function getCargoController(req, res) {
    try {
        const cargo = await getCargo();

        return res.status(200).json(cargo);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la carga."
        });
    }
}

export async function addCargoController(req, res) {
    try {
        const equipmentId = Number(req.body?.equipmentId);
        const quantity = Number(req.body?.quantity);

        const cargo = await addCargo(equipmentId, quantity);

        return res.status(200).json({
            message: "Suministro agregado correctamente.",
            cargo
        });
    } catch (error) {
        const validationErrors = [
            "La cantidad debe ser un entero positivo.",
            "El suministro no existe.",
            "Stock en base insuficiente",
            "Créditos insuficientes"
        ];

        if (validationErrors.includes(error.message)) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Error al intentar agregar suministro."
        });
    }
}

export async function updateCargoUnitsController(req, res) {
    try {
        const equipmentId = Number(req.params.id);
        const quantity = Number(req.body?.quantity);

        const cargo = await updateCargoUnits(
            equipmentId,
            quantity
        );

        return res.status(200).json({
            message: "Unidades actualizadas correctamente.",
            cargo
        });
    } catch (error) {
        const validationErrors = [
            "La cantidad debe ser un entero positivo.",
            "El suministro no existe.",
            "El suministro no está en la carga.",
            "Stock en base insuficiente",
            "Créditos insuficientes para esta cantidad"
        ];

        if (validationErrors.includes(error.message)) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Error al actualizar unidades."
        });
    }
}

export async function removeCargoController(req, res) {
    try {
        const equipmentId = Number(req.params.id);

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
            return res.status(400).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Error al eliminar suministro."
        });
    }
}