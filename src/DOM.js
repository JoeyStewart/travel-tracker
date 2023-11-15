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
  console.log(findUser)
  return { findUser, dest }
};

function findUserApproved({ findUser, dest }) {
  upcomingContent.classList.remove('hidden');
  upcomingContent.innerHTML = '';
console.log(findUser)
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


// const renderPastTrips = (trips, destinations, userID) => {
//   pastContent.classList.remove('hidden');
//   pastContent.innerHTML = '';

//   const pastTrips = filterAndSortPastTrips(trips, destinations, userID);
//   renderPastTripsContent(pastTrips, destinations);
// };

// const filterAndSortPastTrips = (trips, destinations, userID) => {
//   return trips
//     .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
//     .sort((a, b) => new Date(b.date) - new Date(a.date));
// };

// const renderPastTripsContent = (pastTrips, destinations) => {
//   pastTrips.forEach(pastTrip => {
//     const showDestination = destinations.find(destination => destination.id === pastTrip.destinationID);

//     if (showDestination) {
//       pastContent.innerHTML += `
//         <div class="trip-info">
//           <p>=================================</p>
//           <p>${showDestination.destination}</p>
//           <p>Date: ${pastTrip.date}</p>
//           <p>Duration: ${pastTrip.duration} Days</p>
//           <p>=================================</p>
//         </div>`;
//     }
//   });
// };
const renderPastTrips = (trips, destinations, userID) => {
  pastContent.classList.remove('hidden');
  pastContent.innerHTML = '';
  
  const pastTrips = trips
      .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  return pastTrips, destinations
}
function postPastTrips(pastTrips, destinations){
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
  const dest = destinations;
  const pendingTrips = trips.filter((trip) => trip.status === 'pending');
  pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = pendingTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });

  return findUser, dest
}

function findUserPending(findUser, dest) {
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

  

// const trips = [
//   {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
//   {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
// ];

// const destinations = [
//   {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
//   {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
// ];

// describe('renderApprovedTrips', () => {
//   beforeEach(() => {
//     upcomingContent.classList.remove.mockClear();
//     upcomingContent.innerHTML = '';
//   });

//   it('renders approved trips for a user', () => {
//     renderApprovedTrips(trips, destinations, 35);


//     expect(upcomingContent.classList.remove).toHaveBeenCalledWith('hidden');
//     expect(upcomingContent.innerHTML).toContain('Stockholm, Sweden');
//     expect(upcomingContent.innerHTML).toContain('2022/10/04');
//     expect(upcomingContent.innerHTML).toContain('18 Days');
//     expect(upcomingContent.innerHTML).not.toContain('Lima, Peru');
//   });

//   it('handles case with no approved trips for a user', () => {
//     renderApprovedTrips(trips, destinations, 999); 

//     expect(upcomingContent.classList.remove).toHaveBeenCalledWith('hidden');
//     expect(upcomingContent.innerHTML).toEqual('');
//   });
// });


// describe('renderApprovedTrips', () => {
//   beforeEach(() => {
//     upcomingContent.classList.remove('hidden');
//     upcomingContent.innerHTML = '';
//   });

//   it('renders approved trips for a user', () => {
//     renderApprovedTrips(trips, destinations, 35);

//     expect(upcomingContent.classList.contains('hidden')).toBeFalsy();
//     expect(upcomingContent.innerHTML).toContain('Stockholm, Sweden');
//     expect(upcomingContent.innerHTML).toContain('2022/10/04');
//     expect(upcomingContent.innerHTML).toContain('18 Days');
//     expect(upcomingContent.innerHTML).not.toContain('Lima, Peru');
//   });
// });

// describe('renderPastTrips', () => {
//   beforeEach(() => {
//     pastContent.classList.remove('hidden');
//     pastContent.innerHTML = '';
//   });

//   it('renders past trips for a user', () => {
//     renderPastTrips(trips, destinations, 44);
//     expect(pastContent.classList.contains('hidden')).toBeFalsy();
//   });

// });

// describe('renderPendingTrips', () => {
//   beforeEach(() => {
//     pendingContent.classList.remove('hidden');
//     pendingContent.innerHTML = '';
//   });

//   it('renders pending trips for a user', () => {
//     renderPendingTrips(trips, destinations, 35);
//     expect(pendingContent.classList.contains('hidden')).toBeFalsy();
//   });

// });

// const renderApprovedTrips = (trips, destinations, userID) => {
//   upcomingContent.classList.remove('hidden');
//   upcomingContent.innerHTML = '';

//   const approvedTrips = trips.filter((trip) => trip.status === 'approved' && trip.userID === userID);
//   approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

//   approvedTrips.forEach((approvedTrip) => {
//     const showDestination = destinations.find((destination) => destination.id === approvedTrip.destinationID);

//     if (showDestination) {
//       upcomingContent.innerHTML += `
//         <div class="trip-info">
//           <p>=================================</p>
//           <p>${showDestination.destination}</p>
//           <p>Date: ${approvedTrip.date}</p>
//           <p>Duration: ${approvedTrip.duration} Days</p>
//           <p>=================================</p>
//         </div>`;
//     }
//   });
// };

