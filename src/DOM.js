import {userID, findUserID} from './scripts.js'
//querySelectors
const upcomingContent = document.querySelector('.upcoming-content')
const pendingContent = document.querySelector('.pending-content')
const pastContent = document.querySelector('.past-content')
const moneyContent = document.querySelector('.money-content')
const destinationContent = document.querySelector('.destination-content')

//functions
const renderApprovedTrips = (trips, userID) => {
  upcomingContent.classList.remove('hidden');
  upcomingContent.innerHTML = '';

  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  findUserFunction(findUser);
};

const renderPastTrips = (trips, userID) => {
    pastContent.classList.remove('hidden');
    pastContent.innerHTML = '';
    const firstPastTrip = trips
    .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(trip => true);
    console.log(firstPastTrip.status)
    if (firstPastTrip) {
      pastContent.innerHTML += `
        <div class="trip-info">
        <p>Trip ID: ${firstPastTrip.id}</p>
        <p>User ID: ${firstPastTrip.userID}</p>
        <p>Destination ID: ${firstPastTrip.destinationID}</p>
        <p>Date: ${firstPastTrip.date}</p>
        <p>Duration: ${firstPastTrip.duration}</p>
        <p>Status: ${firstPastTrip.status}</p>
        <p>Suggested Activities: ${firstPastTrip.suggestedActivities}</p>
      </div>`;
    }
};
  
const renderPendingTrips = (trips, userID) => {
    pendingContent.classList.remove('hidden')
    pendingContent.innerHTML = '';
  
    const pendingTrips = trips.filter((trip) => trip.status === 'pending');
      pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const findUser = pendingTrips.filter((element) => {
      return parseInt(userID) === element.userID;
    });

    findUserPending(findUser)
}

//Temporary
//Only used to display destination object
const renderDestinationInfo = (trips) => {
    destinationContent.classList.remove('hidden');
    destinationContent.innerHTML = '';
    if (trips.length > 0) {
        const destination = trips[0];
        destinationContent.innerHTML += `
        <div class="money-info">
          <p>Destination ID: ${destination.id}</p>
          <p>Destination: ${destination.destination}</p>
          <p>Cost Per Day: ${destination.estimatedLodgingCostPerDay}</p>
          <p>Flight Cost p/person: ${destination.estimatedFlightCostPerPerson}</p>
          <img src="${destination.image}" alt="destination-image" class="fit-image">
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
          <p>Overall Total Cost: $${totalCost.toFixed(2)}</p>
        </div>`;
};

function findUserFunction(findUser){
  if (findUser.length > 0) {
    const mostRecentApprovedTrip = findUser[0];
    upcomingContent.innerHTML += `
      <div class="trip-info">
        <p>Trip ID: ${mostRecentApprovedTrip.id}</p>
        <p>User ID: ${mostRecentApprovedTrip.userID}</p>
        <p>Destination ID: ${mostRecentApprovedTrip.destinationID}</p>
        <p>Date: ${mostRecentApprovedTrip.date}</p>
        <p>Duration: ${mostRecentApprovedTrip.duration}</p>
        <p>Status: ${mostRecentApprovedTrip.status}</p>
        <p>Suggested Activities: ${mostRecentApprovedTrip.suggestedActivities}</p>
      </div>`;
  }
}

function findUserPending(findUser){
  if (findUser.length > 0) {
    const mostRecentPendingTrip = findUser[0];
    pendingContent.innerHTML += `
      <p class="trip-info">
        <p>Trip ID: ${mostRecentPendingTrip.id}</p>
        <p>User ID: ${mostRecentPendingTrip.userID}</p>
        <p>Destination ID: ${mostRecentPendingTrip.destinationID}</p>
        <p>Date: ${mostRecentPendingTrip.date}</p>
        <p>Duration: ${mostRecentPendingTrip.duration}</p>
        <p>Status: ${mostRecentPendingTrip.status}</p>
        <p>Suggested Activities: ${mostRecentPendingTrip.suggestedActivities}</p>
      </p>`
  }
}



export {
    renderApprovedTrips,
    renderPendingTrips,
    renderPastTrips,
    renderDestinationInfo,
    renderMoney
}
