// Register service worker
self.addEventListener("install", function(event) {
    console.log("Service Worker installed");
  });
  
  self.addEventListener("fetch", function(event) {
    console.log("Fetch intercepted for:", event.request.url);
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });
  
  // Listen for messages from the client
  self.addEventListener("message", function(event) {
    if (event.data === "get-location") {
      // If the message is to get location, call the getLocation function
      getLocation();
    }
  });
  
  // Function to get the current location
  function getLocation() {
    if ("geolocation" in navigator) {
      // Request the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Send the location data back to the client
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: "location",
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
              });
            });
          });
        },
        (error) => {
          // Handle error if unable to get location
          console.error("Error getting location:", error.message);
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: "location-error",
                message: error.message
              });
            });
          });
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser");
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "location-error",
            message: "Geolocation is not supported by this browser"
          });
        });
      });
    }
  }
  