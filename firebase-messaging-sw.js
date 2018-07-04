importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


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
        console.log("On message: ", payload);
        var title = payload.data.title;
        var notificationOptions = {
            body: payload.data.body,
            icon: 'https://www.kickinghorseford.com/wp-content/uploads/sites/337/2016/09/ford-icon.png'
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
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }
        return clients.openWindow(target);
    }));
});