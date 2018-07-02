var config = {
    apiKey: "AIzaSyAZM-FlQNjcyHlRdnaK6gvpogs7JyhTR2w",
    authDomain: "testfirefoxpush.firebaseapp.com",
    databaseURL: "https://testfirefoxpush.firebaseio.com",
    projectId: "testfirefoxpush",
    storageBucket: "testfirefoxpush.appspot.com",
    messagingSenderId: "677094341418"
};

firebase.initializeApp(config);



var currenToken = localStorage.getItem("current_token");
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
            if (currenToken != token) {
                console.log(token);
                sendSubscriptionToServerForSave(token);
            }
            localStorage.setItem("current_token", token);
        }
    )
    .catch(
        function (err) {
            console.log("Error occured.");
            console.log(err);
        }
    );

messaging.onMessage(
    function (payload) {
        console.log("On message: ", payload);
        var options = {
            body: payload.data.message + " " + payload.data.key,
            icon: 'firebase/firebase-logo.png',
            "click_action": payload.data.action
        };
    }
);




sendSubscriptionToServerForSave = function (token, customData) {
    fetch("https://cookiesaver.kuplyaev.wip.altkraft.com:27443" + "/pixel" + "?" + "_push_pix" + "=" + "/push" + "/subscription" + "/save", {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(Object.assign({}, customData || {}, {
            'provider': "FirefoxFirebase",
            'endpoint': token,
            'resource_token': "vujNq8yMTDg-8bd58a5e46439e8f",
            'match': JSON.stringify({}),
            'update': JSON.stringify({}),
        })),

    });
};