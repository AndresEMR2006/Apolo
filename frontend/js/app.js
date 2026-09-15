async function hacerSolicitud(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener el mensaje:", error);
    return null;
  }
}

async function obtenerEstado() {
  const estado = await hacerSolicitud("http://localhost:8080/api/status");
  if (estado != null) {
    console.log(estado);
  }
}

async function obtenerCanciones() {
  return await hacerSolicitud("http://localhost:8080/api/tracks");
}

async function mostrarCanciones() {
  const estadoCanciones = document.getElementById("estado-canciones");
  const listaCanciones = document.getElementById("lista-canciones");

  estadoCanciones.textContent = "Cargando canciones...";
  const canciones = await obtenerCanciones();
  estadoCanciones.textContent = "";

  if (canciones == null) {
    estadoCanciones.textContent = "Error al obtener las canciones";
    return;
  }
  if (canciones.length === 0) {
    estadoCanciones.textContent = "No hay canciones";
    return;
  }

  canciones.forEach((cancion) => {
    const elemento = document.createElement("li");
    elemento.textContent = cancion.name + "-" + cancion.artists;
    listaCanciones.appendChild(elemento);
  });
}

obtenerEstado();
mostrarCanciones();
