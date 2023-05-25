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
      lat: 48.563076,
      lng: -123.466542,
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
    {
      name: 'Cronulla Beach',
      lat: -34.028249,
      lng: 151.157507,
      zIndex: 3,
      iconUrl: '/images/flag.png',
    },
    {
      name: 'Manly Beach',
      lat: -33.80010128657071,
      lng: 151.28747820854187,
      zIndex: 2,
      iconUrl: '/images/flag.png',
    },
    {
      name: 'Maroubra Beach',
      lat: -33.950198,
      lng: 151.259302,
      zIndex: 1,
      iconUrl: '/images/flag.png',
    },
  ];

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
