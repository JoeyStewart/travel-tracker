import {userID, findUserID} from './scripts.js'
//querySelectors
const upcomingContent = document.querySelector('.upcoming-content')
const pendingContent = document.querySelector('.pending-content')
const pastContent = document.querySelector('.past-content')
const moneyContent = document.querySelector('.money-content')
const destinationContent = document.querySelector('.destination-content')

// functions
const renderApprovedTrips = (trips, destinations, userID) => {
  const dest = destinations
  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  return { findUser, dest }
};

function findUserApproved({ findUser, dest }) {
  upcomingContent.classList.remove('hidden');
  upcomingContent.innerHTML = '';
  if (findUser.length > 0) {
    findUser.forEach(mostRecentApprovedTrip => {
      const showDestination = dest.find(destination => destination.id === mostRecentApprovedTrip.destinationID);

      if (showDestination) {
        const tripInfo = document.createElement('div');
        tripInfo.classList.add('trip-info');
        tripInfo.innerHTML = `
          <p>=================================</p>
          <p>${showDestination.destination}</p>
          <p>Date: ${mostRecentApprovedTrip.date}</p>
          <p>Duration: ${mostRecentApprovedTrip.duration} Days</p>
          <p>=================================</p>
        `;
        upcomingContent.appendChild(tripInfo);
      }
    });
  }
}
  const renderPastTrips = (trips, destinations, userID) => {
  const pastTrips = trips
      .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(pastTrips)
  return {pastTrips, destinations}
}

function postPastTrips({pastTrips, destinations}){
  if(pastTrips.length > 0){
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
  }
};

  
const renderPendingTrips = (trips, destinations, userID) => {
  const dest = destinations;
  const pendingTrips = trips.filter((trip) => trip.status === 'pending');
  pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = pendingTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });

  return { findUser, dest }
}

function findUserPending({ findUser, dest }) {
  pendingContent.classList.remove('hidden');
  pendingContent.innerHTML = '';

  if (findUser.length > 0) {
    findUser.forEach(mostRecentPendingTrip => {
      const showDestination = dest.find(destination => destination.id === mostRecentPendingTrip.destinationID);

      if (showDestination) {
        const tripInfo = document.createElement('div');
        tripInfo.classList.add('trip-info');
        tripInfo.innerHTML = `
          <p>=================================</p>
          <p>${showDestination.destination}</p>
          <p>Date: ${mostRecentPendingTrip.date}</p>
          <p>Duration: ${mostRecentPendingTrip.duration} Days</p>
          <p>=================================</p>
        `;
        pendingContent.appendChild(tripInfo);
      }
    });
  }
}

const renderDestinationInfo = (trips, destinations, userID) => {
  destinationContent.classList.remove('hidden');
  destinationContent.innerHTML = '';
  const userTrips = trips.filter(trip => trip.userID === parseInt(userID));
  let totalCost = 0;
  userTrips.sort((a, b) => trips.indexOf(b) - trips.indexOf(a));
  console.log(userTrips)
  const latestTrip = userTrips[0];
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
      <p>${matchingDestination.destination}</p>
      <img src="${matchingDestination.image}" alt="destination-image" class="fit-image">
      <p>Cost Per Day: $${matchingDestination.estimatedLodgingCostPerDay} * ${latestTrip.duration} Days</p>
      <p>${"+"}</p>
      <p>Flight Cost: $${matchingDestination.estimatedFlightCostPerPerson} * ${latestTrip.travelers} Travelers</p>
      <p>${"+ 10% Agency Fee"}</p>
      <p>${"="}</p>
      <p>Total cost for ${matchingDestination.destination}: $${agencyFee.toFixed(2)}</p>
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



export {
    renderApprovedTrips,
    renderPendingTrips,
    renderPastTrips,
    renderDestinationInfo,
    renderMoney,
    findUserPending,
    findUserApproved,
    postPastTrips
}

import chai from 'chai';
const { expect } = chai;



