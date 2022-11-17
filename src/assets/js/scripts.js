Notification.requestPermission().then();

function showNotification(title, img, text, userSelectedToSend) {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, { body: text, icon: img });
    notification.onclick = (event) => {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent('userSelectedToSend', { detail: userSelectedToSend }))
    };
  }
}

function scrollTop() {
  var objDiv = document.getElementById("containerMessage");
  if(objDiv){
    objDiv.scrollTop = objDiv.scrollHeight;
  }
    
}
