export async function getCityData(latitude, longitude) {
  const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
