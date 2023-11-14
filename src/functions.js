export function renderApprovedTrips(trips, destinations, userID) {
    const dest = destinations;
    const approvedTrips = trips.filter((trip) => trip.status === 'approved');
    approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const findUser = approvedTrips.filter((element) => parseInt(userID) === element.userID);
  
    return findUser.map((mostRecentApprovedTrip) => {
      const showDestination = dest.find((destination) => destination.id === mostRecentApprovedTrip.destinationID);
  
      if (showDestination) {
        return {
          destination: showDestination.destination,
          date: mostRecentApprovedTrip.date,
          duration: mostRecentApprovedTrip.duration,
        };
      }
  
      return null;
    });
  }