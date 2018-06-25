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

messaging.requestPermission()
    .then( 
        function() { 
            console.log("Have permission.");
            return messaging.getToken();
        }
    )
        .then(
            function(token) {
                console.log(token);
            }
        )
    .catch( 
        function() { 
            console.log("Error occured."); 
        }
    );

messaging.onMessage(
    function(payload) {
        console.log("On message: ", payload);
        window.alert(payload.notification.title + "\n" + payload.notification.body);
    }
);