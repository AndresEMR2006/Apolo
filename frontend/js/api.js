export async function hacerSolicitud(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
}
