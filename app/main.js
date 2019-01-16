import Vue from 'nativescript-vue'
import App from './components/App'
import firebase from 'nativescript-plugin-firebase';
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
    showNotificationsWhenInForeground: true,
    onMessageReceivedCallback: function(message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        // if your server passed a custom property called 'foo', then do this:
        console.log("Value of 'foo': " + message.data.foo);
    },
    onPushTokenReceivedCallback: function(token) {
        console.log("Firebase push token: " + token);
    }
}).then(
    instance => {
        console.log("firebase.init done");
    },
    error => {
        console.log('firebase.init error: ${error}');
    }
);
Vue.prototype.$firebase = firebase;

new Vue({
    render: h => h('frame', [h(App)])
}).$start()