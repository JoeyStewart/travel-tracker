import {userID, findUserID} from './scripts.js'
//querySelectors
const upcomingContent = document.querySelector('.upcoming-content')
const pendingContent = document.querySelector('.pending-content')
const pastContent = document.querySelector('.past-content')
const moneyContent = document.querySelector('.money-content')
const destinationContent = document.querySelector('.destination-content')

//functions
const renderApprovedTrips = (trips, destinations, userID) => {
  upcomingContent.classList.remove('hidden');
  upcomingContent.innerHTML = '';
  const dest = destinations
  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  findUserApproved(findUser, dest);
};

const renderPastTrips = (trips, destinations, userID) => {
  pastContent.classList.remove('hidden');
  pastContent.innerHTML = '';
  
  const pastTrips = trips
      .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  pastTrips.forEach(pastTrip => {
      const showDestination = destinations.find(destination => destination.id === pastTrip.destinationID);

      if (showDestination) {
          pastContent.innerHTML += `
              <div class="trip-info">
                  <p>=================================</p>
                  <p>${showDestination.destination}</p>
                  <p>Date: ${pastTrip.date}</p>
                  <p>Duration: ${pastTrip.duration} Days</p>
                  <p>=================================</p>
              </div>`;
      }
  });
};
  
const renderPendingTrips = (trips, destinations, userID) => {
    pendingContent.classList.remove('hidden')
    pendingContent.innerHTML = '';
    const dest = destinations
    const pendingTrips = trips.filter((trip) => trip.status === 'pending');
      pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const findUser = pendingTrips.filter((element) => {
      return parseInt(userID) === element.userID;
    });

    findUserPending(findUser, dest)
}

const renderDestinationInfo = (trips, destinations, userID) => {
  destinationContent.classList.remove('hidden');
  destinationContent.innerHTML = '';
  let totalCost = 0;
  trips.sort((a, b) => trips.indexOf(b) - trips.indexOf(a));

  const latestTrip = trips[0];
  console.log(latestTrip)
  const matchingDestination = destinations.find(destination => destination.id === latestTrip.destinationID);

  if (matchingDestination) {
    const lodging = matchingDestination.estimatedLodgingCostPerDay * latestTrip.duration;
    const flightCost = matchingDestination.estimatedFlightCostPerPerson * latestTrip.travelers;
    const tripCost = lodging + flightCost;
    const agencyFee = (tripCost * 0.10) + tripCost;
    totalCost += agencyFee;
    
    destinationContent.innerHTML += `
      <div class="trip-info">
        <p>Total cost for ${matchingDestination.destination}: $${agencyFee.toFixed(2)}</p>
        <p>Cost Per Day: ${matchingDestination.estimatedLodgingCostPerDay}</p>
        <p>Flight Cost p/person: ${matchingDestination.estimatedFlightCostPerPerson}</p>
        <img src="${matchingDestination.image}" alt="destination-image" class="fit-image">
      </div>`;

  }
};

const renderMoney = (trips, destinations, userID) => {
    moneyContent.classList.remove('hidden');
    moneyContent.innerHTML = '';

    let totalCost = 0;

    const userMoney = trips.filter(trip => trip.userID === parseInt(userID))
      console.log(userMoney)
    userMoney.forEach((trip) => {
      const destination = destinations.find((dest) => {
          return new Date(trip.date) > new Date(new Date() - 365 * 24 * 60 * 60 * 1000) && dest.id === trip.destinationID;
      });

        if (destination) {
            const lodging = destination.estimatedLodgingCostPerDay * trip.duration;
            const flightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
            const tripCost = lodging + flightCost
            const agencyFee = (tripCost * .10) + tripCost
            // moneyContent.innerHTML += `
            //     <div class="trip-info">
            //       <p>Total cost for ${destination.destination}: $${agencyFee.toFixed(2)}</p>
            //     </div>`;

            totalCost += agencyFee;
        } 
    });
    moneyContent.innerHTML += `
        <div class="overall-total">
          <p>=================================</p>
          <p>Overall Total Cost: $${totalCost.toFixed(2)}</p>
          <p>=================================</p>
        </div>`;
};

function findUserApproved(findUser, dest) {
  if (findUser.length > 0) {
    findUser.forEach(mostRecentApprovedTrip => {
      const showDestination = dest.find(destination => destination.id === mostRecentApprovedTrip.destinationID);

    if (showDestination) {
      upcomingContent.innerHTML += `
        <div class="trip-info">
          <p>=================================</p>
          <p>${showDestination.destination}</p>
          <p>Date: ${mostRecentApprovedTrip.date}</p>
          <p>Duration: ${mostRecentApprovedTrip.duration} Days</p>
          <p>=================================</p>
          </div>`;
      }
    })
  }
}

function findUserPending(findUser, dest) {
  if (findUser.length > 0) {
    findUser.forEach(mostRecentPendingTrip => {
      const showDestination = dest.find(destination => destination.id === mostRecentPendingTrip.destinationID);

      if (showDestination) {
        pendingContent.innerHTML += `
          <div class="trip-info">
            <p>=================================</p>
            <p>${showDestination.destination}</p>
            <p>Date: ${mostRecentPendingTrip.date}</p>
            <p>Duration: ${mostRecentPendingTrip.duration} Days</p>
            <p>=================================</p>
          </div>`;
      }
    });
  }
}

export {
    renderApprovedTrips,
    renderPendingTrips,
    renderPastTrips,
    renderDestinationInfo,
    renderMoney
}


