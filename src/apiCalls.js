export const fetchUserData = () => {
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