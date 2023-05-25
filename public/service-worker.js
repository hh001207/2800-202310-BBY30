self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Received push notification:', data);
  
    const options = {
      body: data.body,
      icon: '/images/logo.ico',
      data: {
        url: data.url,
      },
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service worker registered:', registration);
      } catch (error) {
        console.error('Error registering service worker:', error);
      }
    });
  }
  