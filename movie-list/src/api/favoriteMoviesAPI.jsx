const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6653a537e9msh8b11fc911baa197p1f18e0jsn5fb26cce3a46",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

export const favoriteMoviesAPI = async (movieList) => {
  let moviesList = [];
  console.log(movieList)
  movieList.forEach((element) => {
    if (element.list[0] === "favorites") {
      moviesList.push(element.movieId);
    }
  });

  const moviesString = moviesList.join(",");

  const url = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${encodeURIComponent(
    moviesString
  )}`;
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
