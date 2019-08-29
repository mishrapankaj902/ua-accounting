// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  origin: 'http://localhost:5000/',
  base_url: 'http://localhost:5000/api/v1/',
  //  firebaseConfig : {
  //   apiKey: "AIzaSyBT4RKAipgguTqqFyFubCDYx_V3XSptRqU",
  //   authDomain: "ua-mvp-dev.firebaseapp.com",
  //   databaseURL: "https://ua-mvp-dev.firebaseio.com",
  //   projectId: "ua-mvp-dev",
  //   storageBucket: "ua-mvp-dev.appspot.com",
  //   messagingSenderId: "77396774333"
  // }

  firebaseConfig: {
    apiKey: "AIzaSyDntv-oMGwVPBbswycyL-NP7ORn1ctu7Yc",
    authDomain: "ua-dev-66614.firebaseapp.com",
    databaseURL: "https://ua-dev-66614.firebaseio.com",
    projectId: "ua-dev-66614",
    storageBucket: "",
    messagingSenderId: "898427982571",
    appId: "1:898427982571:web:a0b94a3353f210b6"
  }
};
