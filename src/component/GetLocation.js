import React, { useEffect, useState } from "react";

function GetLocation() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [locationState, setLocation] = useState();

  // Function to handle location response
//   function handleLocationResponse(event) {
//     if (event.data && typeof event.data === "object" && event.data.coords) {
//       const { latitude, longitude } = event.data.coords;
//       console.log("Latitude:", latitude);
//       console.log("Longitude:", longitude);
//       // Do something with the obtained latitude and longitude
//     } else {
//       console.error("Failed to obtain location.");
//     }
//   }

  // useEffect hook to add event listener when component mounts
  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", showPosition);
    // Clean up function to remove event listener when component unmounts
    return () => {
      navigator.serviceWorker.removeEventListener("message", showPosition);
    };
  }, []); // Empty dependency array ensures effect runs only once when component mounts

  // Function to request location from service worker
  function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
//   console.log("check location",locationState,navigator.geolocation.getCurrentPosition())

    } else {
        alert("you are in offline")
      console.log("Geo Location not supported by browser");
    }
  }

  function showPosition(position) {
    let location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    console.log(location)
    setLocation(location)
  }

  console.log("check location",locationState)

  // Function to send message to service worker
 

  return (
    <div>
      <h1>Access GPS Location Example</h1>
     
        <button onClick={getLocation}>Get Location</button>
        <p>Latitude{locationState?.latitude}</p>
        <p>Longitude{locationState?.longitude}</p>
      
    </div>
  );
}

export default GetLocation;
