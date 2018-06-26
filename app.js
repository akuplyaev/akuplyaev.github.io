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
        function () {
            console.log("Have permission.");
            return messaging.getToken();

        }
    )
    .then(
        function (token) {
            console.log(token);
            sendSubscriptionToServerForSave(token);
        }
    )
    .catch(
        function () {
            console.log("Error occured.");
        }
    );

messaging.onMessage(
    function (payload) {
        console.log("On message: ", payload);
        window.alert(payload.notification.title + "\n" + payload.notification.body);
    }
);




sendSubscriptionToServerForSave = function (token) {
    fetch("http://kuplyaev.local/api/v1.1/resources/push_subscribe?token=e36ffb6e4e3b4230a8ef200f7d91a4b6", {
        method: 'post',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(Object.assign({}, {}, {
            "resource_token": "vujNq8yMTDg-8bd58a5e46439e8f",
            "subscriptions": [{
                "provider": "FirefoxFirebase",
                "subscription_id": token
            }]
        })),
    });
};