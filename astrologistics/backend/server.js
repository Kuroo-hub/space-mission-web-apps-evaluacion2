import app from "./src/app.js";

const PORT = 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})