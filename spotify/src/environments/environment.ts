export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDZHrGm45PeAWREsCEwx_UttDRno5TdVf0",
    authDomain: "spotify-scuola.firebaseapp.com",
    projectId: "spotify-scuola",
    storageBucket: "spotify-scuola.firebasestorage.app",
    messagingSenderId: "965883413864",
    appId: "1:965883413864:web:6baf2da3b36bfe700282dd",
    measurementId: "G-S19J43YPZY"
  },
  spotify: {
    clientId: 'c07c32d838864ab8bc6206f905f399dd',
    clientSecret: '45011bf050e54b4ea73cd0e92ca33b4f',
    redirectUri: window.location.origin + '/login'
  }
};
