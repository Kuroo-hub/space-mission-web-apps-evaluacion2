const API_URL = "http://localhost:3000/api";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Error del servidor: ${response.status}`
    );
  }

  return data;
}

export function getInventory() {
  return request(`${API_URL}/inventario`);
}

export function getCargo() {
  return request(`${API_URL}/carga`);
}

export function addCargo(equipmentId, quantity) {
  return request(`${API_URL}/carga/agregar`, {
    method: "POST",
    body: JSON.stringify({
      equipmentId,
      quantity
    })
  });
}

export function updateCargoUnits(equipmentId, quantity) {
  return request(
    `${API_URL}/carga/actualizar-unidades/${equipmentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ quantity })
    }
  );
}

export function removeCargo(equipmentId) {
  return request(
    `${API_URL}/carga/eliminar/${equipmentId}`,
    {
      method: "DELETE"
    }
  );
}