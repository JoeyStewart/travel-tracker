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
  console.log(userID, "Approved"); 

  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  findUserFunction(findUser);
};


function findUserFunction(findUser){
  if (findUser.length > 0) {
    const mostRecentApprovedTrip = findUser[0];
    console.log('Element UserID:', mostRecentApprovedTrip.userID);

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
const renderPastTrips = (trips) => {
    pastContent.classList.remove('hidden');
    pastContent.innerHTML = '';

    const mostRecentPastTrip = trips
      .filter(trip => new Date(trip.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
    if (mostRecentPastTrip) {
      pastContent.innerHTML += `
        <div class="trip-info">
          <p>Trip ID: ${mostRecentPastTrip.id}</p>
          <p>User ID: ${mostRecentPastTrip.userID}</p>
          <p>Destination ID: ${mostRecentPastTrip.destinationID}</p>
          <p>Date: ${mostRecentPastTrip.date}</p>
          <p>Duration: ${mostRecentPastTrip.duration}</p>
          <p>Status: ${mostRecentPastTrip.status}</p>
          <p>Suggested Activities: ${mostRecentPastTrip.suggestedActivities}</p>
        </div>`;
    }
  };


const renderPendingTrips = (trips) => {
    pendingContent.classList.remove('hidden')
    
    pendingContent.innerHTML = '';
    
    const pendingTrips = trips.filter((trip) => trip.status === 'pending');
    pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (pendingTrips.length > 0) {
      const mostRecentPendingTrip = pendingTrips[0];
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
          <p>Alt: ${destination.alt}</p>
        </div>`;
    }
};

const renderMoney = (trips, destinations) => {
    moneyContent.classList.remove('hidden');
    moneyContent.innerHTML = '';

    let totalCost = 0;

    trips.forEach((trip) => {
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



export {
    renderApprovedTrips,
    renderPendingTrips,
    renderPastTrips,
    renderDestinationInfo,
    renderMoney
}
