function initMap() {
  const mapElement = document.getElementById('map');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = createMap(mapElement, userLatLng);
        addMarker(userLatLng, 'You are here', map);
        setMarkers(map);
      },
      (error) => {
        console.error("Error getting user's location:", error);
        const defaultLatLng = { lat: -33.866, lng: 151.196 };
        const map = createMap(mapElement, defaultLatLng);
        setMarkers(map);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    const defaultLatLng = { lat: -33.866, lng: 151.196 };
    const map = createMap(mapElement, defaultLatLng);
    setMarkers(map);
  }
}

function createMap(mapElement, centerLatLng) {
  const map = new google.maps.Map(mapElement, {
    center: centerLatLng,
    zoom: 15,
  });

  return map;
}

function addMarker(position, title, map) {
  new google.maps.Marker({
    position: position,
    map: map,
    title: title,
  });
}

function setMarkers(map) {
  const locations = [
    {
      name: 'Brentwood station',
      lat: 49.26774,
      lng: -123.00272,
      zIndex: 4,
      iconUrl: '/images/flag.png',
    },
    {
      name: 'Burnaby Museum',
      lat: 49.2392512284724,
      lng: -122.96579117439661,
      zIndex: 5,
      iconUrl: '/images/flag.png',
    },
  ];

  const numRandomPoints = 1000; // Number of random points to generate

  for (let i = 0; i < numRandomPoints; i++) {
    const randomLat = getRandomNumber(49.0, 49.5); // Random latitude within the Vancouver area
    const randomLng = getRandomNumber(-123.3, -122.5); // Random longitude within the Vancouver area

    locations.push({
      name: `Random Location ${i + 1}`,
      lat: randomLat,
      lng: randomLng,
      zIndex: i + 6, // Increase zIndex for each random point to ensure proper layering
      iconUrl: '/images/flag.png',
    });
  }

  // Rest of your code to set markers on the map

  // Helper function to generate a random number within a specified range
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }


  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly',
  };

  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      icon: {
        url: location.iconUrl,
        origin: new google.maps.Point(0, 0),
      },
      shape: shape,
      title: location.name,
      zIndex: location.zIndex,
    });
  });
}

window.initMap = initMap;
