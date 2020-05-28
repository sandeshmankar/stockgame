
export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    console.log("error agyaaaaa", error.response);
  });

  $axios.onResponse(response => {
    console.log("respoonse aya", response);
  });
}
