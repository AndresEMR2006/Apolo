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

export async function reproducirCancion(id) {
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
