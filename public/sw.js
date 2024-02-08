// Register service worker
this.addEventListener("install", function(event) {
  console.log("Service Worker installed");
  let cacheData = "appV1";
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/index.html",
        "/",
        "/users",
        "/about",
        "/location"
        // Add more URLs to cache here as needed
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if(!navigator.onLine){
      event.respondWith(
          caches.match(event.request).then((result) => {
           if(result){
              return result
           }
          })
        );
  }

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