export const getData = async (route) => {
  try {
    const response = await fetch(route);
    if (!response.ok) {
      throw new Error("Something went wrong with the request.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
