// const { data } = require('jquery');
const settings = require('../public/kyubiSettings.json');

/**
 * Code for Broadcast feature
 */

document.addEventListener('DOMContentLoaded', function () {
  if ('serviceWorker' in navigator) {
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        sendFn().catch((e) => console.error('EERR : ', e));
      }
    });
  }
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register the service worker
// Register Push
// Send the push

const sendFn = async () => {
  // Register SErvice Worker
  // console.log('Registering service worker');
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  });

  // console.log('waiting for ready : ', register);
  await navigator.serviceWorker.ready;
  // console.log('register service worker : ', register);
  // console.log(
  //   'Public Vapid key',
  //   urlBase64ToUint8Array(settings.publicVapidKey)
  // );
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(settings.publicVapidKey),
  });
  // console.log('Push registered..', subscription);

  chrome.storage.sync.set(
    {
      subscription: JSON.parse(JSON.stringify(subscription)),
    },
    function (setData) {
      // console.log('setted');
    }
  );

  chrome.storage.sync.get(['subscription'], function (storageData) {
    // console.log('broadcast subscription object', storageData.subscription);
  });
};

/**
 * Code for Broadcast feature Ends
 */
