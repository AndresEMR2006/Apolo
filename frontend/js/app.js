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

async function obtenerCanciones() {
  try {
    const response = await fetch("http://localhost:8080/api/tracks");

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    console.log(data[0]);

    const listaCanciones = document.getElementById("lista-canciones");
    data.forEach((cancion) => {
      const elemento = document.createElement("li");
      elemento.textContent = cancion.name + "-" + cancion.artists;
      listaCanciones.appendChild(elemento);
    });
  } catch (error) {
    console.error("Error al obtener el mensaje:", error);
  }
}

obtenerEstado();
obtenerCanciones();
