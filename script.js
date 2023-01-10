const popup = document.querySelector(".popup");
wifiIcon = document.querySelector(".icon i");
popupTitle = document.querySelector(".popup .title");
popupDesc = document.querySelector(".desc");
recconectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try {
        // Trying to fetch random data from the API
        // 200 and 300, the network connection is considered online
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
        console.log(isOnline)
    } catch (error) {
        isOnline = false; // If there is an error, the connection is considered offline
    }
    timer = 10;
    clearInterval((intervalId))
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if (status) {
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show", "online"), 2000);
    }
        // the case status is false(offline), update the icon, title and description respectively
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";

    intervalId = setInterval(() => { // Set an interval to decrease the timer by 1 every second
        timer--;
        if (timer === 0) checkConnection(); // if the timer reaches 0, check the connection again
        popup.querySelector(".desc b").innerHTML = timer;
    }, 1000)
}

/**
 * An alternative method for checking network connectivity is to use
 * the navigator.onLine property. However, this method may not always
 * be reliable, and a better approach is to call an API and check
 * the response status.
 * */

// Check the connection every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
recconectBtn.addEventListener("click", checkConnection);