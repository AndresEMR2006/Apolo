async function obtenerEstado() {
  try {
    const response = await fetch("http://localhost:8080/api/status");

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error al obtener el mensaje:", error);
  }
}

obtenerEstado();
