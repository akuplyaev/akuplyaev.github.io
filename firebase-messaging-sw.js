importScripts("https://www.gstatic.com/firebasejs/5.1.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.1.0/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyAZM-FlQNjcyHlRdnaK6gvpogs7JyhTR2w",
    authDomain: "testfirefoxpush.firebaseapp.com",
    databaseURL: "https://testfirefoxpush.firebaseio.com",
    projectId: "testfirefoxpush",
    storageBucket: "testfirefoxpush.appspot.com",
    messagingSenderId: "677094341418"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();

// ÐÐµ Ð¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾, Ð´Ð»Ñ Ð¾ÑÐ¾Ð±Ñ‹Ñ… ÑÐ»ÑƒÑ‡Ð°ÐµÐ²
messaging.setBackgroundMessageHandler(
    function(payload) {
        const title = "Background Message Handler";
        const options = {"body": "Background: " + payload.data.body};
        return self.registration.showNotofication(title, options);
    }
);