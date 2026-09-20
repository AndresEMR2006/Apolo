import { hacerSolicitud } from "./api.js";

async function obtenerCanciones() {
  return await hacerSolicitud("http://localhost:8080/api/tracks");
}

export async function mostrarCanciones() {
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
