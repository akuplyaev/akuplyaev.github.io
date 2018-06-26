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
            token = messaging.getToken();
            sendSubscriptionToServerForSave(token);
        }
    )
    .then(
        function (token) {
            console.log(token);
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




sendSubscriptionToServerForSave = function (subscription, match, update, customData) {
    fetch("https://cookiesaver.kuplyaev.wip.altkraft.com:27443/pixel?_push_pix=/push/subscription/save", {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(Object.assign({}, customData || {}, {
            'provider': "FirefoxFirebase",
            'endpoint': "",
            'resource_token': "vujNq8yMTDg-8bd58a5e46439e8f",
            'match': JSON.stringify(match || {}),
            'update': JSON.stringify(update || {}),
        })),
    });
};