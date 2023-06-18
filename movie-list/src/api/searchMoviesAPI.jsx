const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6653a537e9msh8b11fc911baa197p1f18e0jsn5fb26cce3a46",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

export const searchMovies = async (searchValue) => {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchValue}`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        "Unable to fetch movies. Response status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
