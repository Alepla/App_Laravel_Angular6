// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  //api_url: 'https://conduit.productionready.io/api'
  api_url: 'http://localhost:8000/api',
  api_url_web: 'http://localhost:8000',
  firebase: {
    apiKey: "AIzaSyCQpwexBIL3i1-DQ9kVu1KQTARLkAnPJUs",
    authDomain: "holupvideos.firebaseapp.com",
    databaseURL: "https://holupvideos.firebaseio.com",
    projectId: "holupvideos",
    storageBucket: "holupvideos.appspot.com",
    messagingSenderId: "363167015208"
  }
};
