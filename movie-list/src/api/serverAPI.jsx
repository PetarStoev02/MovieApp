const host = "http://localhost:3500";

async function request(method, data) {
  let options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }if(method === "DELETE"){
    options.body = ""

  }

  let res = "";
  if (method === "GET") {
    res = await fetch(host + "/movies?owner=petar", options);
  } else if (method === "POST") {
    res = await fetch(host + "/movies", options);
  } else if (method === "PATCH") {
    res = await fetch(host + `/movies/${data.id}`, options);
  } else if (method === "DELETE") {
    console.log(host + `/movies/${data}`)
    res = await fetch(host + `/movies/${data}`, options);
  }

  return res;
}

export const getMovies = () => request("GET");
export const postMovies = (data) => request("POST", data);
export const patchMovies = (data) => request("PATCH", data);
export const deleteMovies = (data) => request("DELETE", data);
