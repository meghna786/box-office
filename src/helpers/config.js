const ROOT_URL = 'https://api.tvmaze.com/';

export async function getAPI(url) {
  const r= await fetch(`${ROOT_URL}${url}`).then(response => response.json());
return r;
}