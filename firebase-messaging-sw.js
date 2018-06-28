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
    function (payload) {
        var title = "Background Message Handler";
        var notificationOptions = {
            body: 'Background' + payload.data.body,
            icon: '/firebase-logo.png'
        };
        return self.registration.showNotofication(title, options);
    }
);



// обработка клика на уведомлении
self.addEventListener('notificationclick', function (event) {
    // console.log('User has clicked in the notification');
    // console.log(event.notification.tag);
    if (event.notification.tag === 'user_visible_auto_notification' || !event.notification.data) {
        return;
    }
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function (clientList) {
            var provider = ""
            if ('userAgent' in navigator) {
                var browser = detectBrowser(navigator.userAgent);
                if (browser && browser.name) {
                    provider = browser.name;
                }
            }
            var url = event.notification.data;
            url = url + "?provider=" + provider;
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );

});





var getAKServerLink = function () {
    return "https://" + "cookiesaver.kuplyaev.wip.altkraft.com:27443";
};

var getAKServerPushContentGetSubscriptionLink = function () {
    return getAKServerLink() + "/push" + "/content" + "/get";
};