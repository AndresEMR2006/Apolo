import { hacerSolicitud } from "./api.js";
import { mostrarCanciones } from "./tracks.js";
import { reproducirCancion } from "./player.js";

async function obtenerEstado() {
  const estado = await hacerSolicitud("http://localhost:8080/api/status");
  if (estado != null) {
    console.log(estado);
  }
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
