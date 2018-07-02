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

self.addEventListener('notificationclick', function (event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clientList) {
        // clientList почему-то всегда пуст!?
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        // Открываем новое окно
        return clients.openWindow(target);
    }));
});





var getAKServerLink = function () {
    return "https://" + "cookiesaver.kuplyaev.wip.altkraft.com:27443";
};

var getAKServerPushContentGetSubscriptionLink = function () {
    return getAKServerLink() + "/push" + "/content" + "/get";
};