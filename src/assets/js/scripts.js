Notification.requestPermission()
    .then()

function showNotification(title, img, text) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body: text, icon: img });
    }
}