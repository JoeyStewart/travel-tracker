// Fetch requests
export const fetchTripsData = () => {
    return fetch("http://localhost:3001/api/v1/trips")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response Error");
        } 
        return response.json();
      })
      .then((data) => {
         return data.trips
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

export const fetchDestinationData = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response Error");
      } 
      return response.json();
    })
    .then((data) => {
        return data.destinations
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};

export const fetchTravelerData = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response Error");
      } 
      return response.json();
    })
    .then((data) => {
        return data.destinations
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};

// POST requests
export const postTripData = (tripInput) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripInput)
  })
    .then((response) => {
      return response.json();
    })
};


export const postDestinationData = (destInput) => {
  fetch("http://localhost:3001/api/v1/destinations", {
    method: "POST",
    body: JSON.stringify(destInput),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      return response.json();
    });
};