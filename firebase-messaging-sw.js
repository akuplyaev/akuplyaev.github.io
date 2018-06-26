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

messaging.setBackgroundMessageHandler(
    function(payload) {
        var title = "Background Message Handler";
        var notificationOptions = {
            body: 'Background'+ payload.data.body,
            icon: '/firebase-logo.png'
          };        
        return self.registration.showNotofication(title, options);
    }
);