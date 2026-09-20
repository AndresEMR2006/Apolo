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

  listaCanciones.innerHTML = "";

  canciones.forEach((cancion) => {
    const elemento = document.createElement("li");
    elemento.textContent = cancion.name + "-" + cancion.artists;
    listaCanciones.appendChild(elemento);
  });
}

async function obtenerAudio(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error al obtener el audio:", error);
    return null;
  }
}

async function reproducirCancion(id) {
  const url = `http://localhost:8080/api/tracks/${encodeURIComponent(id)}/audio`;
  const blob = await obtenerAudio(url);

  if (blob == null) {
    console.log("5. El audio no se pudo obtener");
    return;
  }

  const audioUrl = URL.createObjectURL(blob);
  const reproductor = document.getElementById("reproductor");

  reproductor.src = audioUrl;

  await reproductor.play();
}

obtenerEstado();
mostrarCanciones();

const formularioBusqueda = document.getElementById("formulario-busqueda");
const nombreCancion = document.getElementById("nombre-cancion");

formularioBusqueda.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.getElementById("id-cancion");
  const id = input.value.trim();

  if (id === "") {
    return;
  }

  const cancion = await hacerSolicitud(
    `http://localhost:8080/api/tracks/${encodeURIComponent(id)}`,
  );

  if (cancion == null) {
    console.log("No se encontró la canción");
    return;
  }

  nombreCancion.textContent = cancion.name;
  reproducirCancion(cancion.id);
});
