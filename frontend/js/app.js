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
  const canciones = await hacerSolicitud("http://localhost:8080/api/tracks");

  if (canciones == null) {
    return [];
  } else {
    return canciones;
  }
}

async function mostrarCanciones() {
  const estadoCanciones = document.getElementById("estado-canciones");
  const listaCanciones = document.getElementById("lista-canciones");

  estadoCanciones.textContent = "Cargando canciones...";
  const canciones = await obtenerCanciones();
  estadoCanciones.textContent = "";

  canciones.forEach((cancion) => {
    const elemento = document.createElement("li");
    elemento.textContent = cancion.name + "-" + cancion.artists;
    listaCanciones.appendChild(elemento);
  });
}

obtenerEstado();
mostrarCanciones();
