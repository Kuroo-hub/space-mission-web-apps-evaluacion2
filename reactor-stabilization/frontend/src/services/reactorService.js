const API_URL = "http://localhost:3000";

export async function adjustTemperature(number)
{
    const response = await fetch(`${API_URL}/adjust`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({number})
    });

    const data = await response.json();

    if(!response.ok)
        {
            throw new Error(data.error || "Error al ajustar temperatura.");
        }

    return data;
}

export async function rebootReactor()
{
    const response = await fetch(`${API_URL}/reboot`, {
        method: "POST"
    });

    if(!response.ok)
        {
            throw new Error("Error al reiniciar el reactor.");
        }
    
    return response.json();
}