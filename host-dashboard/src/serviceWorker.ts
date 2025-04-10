const setup = async () => {
  const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    return;
  }
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            registration.unregister().then(() => {
              window.location.reload();
            });
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log(
                  `New content is available and will be used when all tabs 
                  for this page are closed. See https://bit.ly/CRA-PWA.`,
                );
              } else {
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
      });

    const isAcceptedPermission = await Notification.requestPermission();
    if (isAcceptedPermission === 'denied') {
      console.error('The user explicitly denied the permission request.');
      return;
    }
    const registrations = await navigator.serviceWorker.getRegistrations();
    const registration = registrations[0];
    if (registration) {
      // Send push notifications
      // See https://web.dev/articles/sending-messages-with-web-push-libraries
      // https://www.npmjs.com/package/web-push
      const subscribed = await registration.pushManager.getSubscription();
      if (subscribed) {
        return;
      }
      //TODO: add logic with service worker here
      // if (VITE_WEB_PUSH_PUBLIC) {
      //   const _subscription = await registration.pushManager.subscribe({
      //     userVisibleOnly: true,
      //     applicationServerKey: urlB64ToUint8Array(VITE_WEB_PUSH_PUBLIC),
      //   });
      //   if (_subscription) {
      //     try {
      //       fetch(`${VITE_BASE_API_URL}/notifications/add-subscription`, {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify(_subscription),
      //       }).then(() => {
      //         console.log(`Add subcription success...`);
      //       });
      //     } catch (error) {
      //       console.log(`Add subcription fail...`);
      //     }
      //   }
      // }
    }
  }
};
export default setup;
