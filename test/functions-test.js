
const { assert } = require('chai');




describe('renderApprovedTrips', () => {
  it('should return an object with findUser and dest properties', () => {
    const trips = [
      {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
    ];

    const destinations = [
      {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
      {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
    ];

    const userID = 35;
    const result = renderApprovedTrips(trips, destinations, userID);

    assert.isObject(result);
    assert.property(result, 'findUser');
    assert.property(result, 'dest');

    assert.isArray(result.findUser);
    assert.isArray(result.dest);

    assert.equal(result.findUser.length, 1); 
    assert.equal(result.dest.length, destinations.length); 
  });
});

it('should return an object with empty findUser and dest properties if there are no approved trips', () => {
  const trips = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]},
    {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"pending","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 35;

  const result = renderApprovedTrips(trips, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'findUser');
  assert.property(result, 'dest');

  assert.isArray(result.findUser);
  assert.isArray(result.dest);

  assert.isEmpty(result.findUser);
  assert.equal(result.dest.length, destinations.length);
});

it('should return an object with empty findUser and dest properties if userID does not match any trips', () => {
  const trips = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
    {"id":2,"userID":45,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 35;

  const result = renderApprovedTrips(trips, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'findUser');
  assert.property(result, 'dest');

  assert.isArray(result.findUser);
  assert.isArray(result.dest);

  assert.isEmpty(result.findUser);
  assert.equal(result.dest.length, destinations.length);
});


describe('renderPastTrips', () => {
  it('should render past trips and return an object with pastTrips and destinations properties', () => {
    const tripsWithPast = [
      {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
    ];

    const destinations = [
      {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
      {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
    ];

    const userID = 35;

    const result = renderPastTrips(tripsWithPast, destinations, userID);

    assert.isObject(result);
    assert.property(result, 'pastTrips');
    assert.property(result, 'destinations');

    assert.isArray(result.pastTrips);
    assert.deepEqual(result.destinations, destinations); 
    assert.equal(result.pastTrips.length,  1);

  });
  describe('renderPastTrips', () => {
  it('should render no past trips and return an object with empty pastTrips and destinations properties', () => {
    const tripsWithoutPast = [
      {"id":3,"userID":44,"destinationID":49,"travelers":1,"date":"2023/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":4,"userID":35,"destinationID":25,"travelers":5,"date":"2024/10/04","duration":18,"status":"approved","suggestedActivities":[]},
    ];

    const destinations = [
      {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
      {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
    ];

    const userID = 35;

    const result = renderPastTrips(tripsWithoutPast, destinations, userID);

    assert.isObject(result);
    assert.property(result, 'pastTrips');
    assert.property(result, 'destinations');

    assert.isArray(result.pastTrips);
    assert.deepEqual(result.destinations, destinations); 
    assert.isEmpty(result.pastTrips); 
  });
});

  it('should render past trips with no matching userID and return an object with empty pastTrips array and destinations', () => {
    const tripsWithPast = [
      {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
      {"id":2,"userID":36,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
    ];

    const destinations = [
      {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
      {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
    ];

    const userID = 35;

    const result = renderPastTrips(tripsWithPast, destinations, userID);

    assert.isObject(result);
    assert.property(result, 'pastTrips');
    assert.property(result, 'destinations');

    assert.isArray(result.pastTrips);
    assert.deepEqual(result.destinations, destinations); 
    assert.equal(result.pastTrips.length, 0); 
  });
})


describe('renderPendingTrips', () => {
it('should render pending trips for a user with pending trips', () => {
 
  const pendingTripsData = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]},
    {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"pending","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 35;

  const result = renderPendingTrips(pendingTripsData, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'findUser');
  assert.property(result, 'dest');

  assert.isArray(result.findUser);
  assert.deepEqual(result.dest, destinations);

  assert.equal(result.findUser.length, 1);
});

it('should render no pending trips for a user with no pending trips', () => {
  const pendingTripsData = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
    {"id":2,"userID":36,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 35;

  const result = renderPendingTrips(pendingTripsData, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'findUser');
  assert.property(result, 'dest');

  assert.isArray(result.findUser);
  assert.deepEqual(result.dest, destinations);

  assert.equal(result.findUser.length, 0);
});

it('should render no pending trips for a user with no matching userID', () => {
  const pendingTripsData = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"pending","suggestedActivities":[]},
    {"id":2,"userID":36,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"pending","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 999;

  const result = renderPendingTrips(pendingTripsData, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'findUser');
  assert.property(result, 'dest');

  assert.isArray(result.findUser);
  assert.deepEqual(result.dest, destinations);

  assert.equal(result.findUser.length, 0); 
  });
})


describe('renderDestinationInfo', () => {
it('should render destination info for a user with trips', () => {
  const userTripsData = [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
    {"id":2,"userID":44,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
  ];

  const destinations = [
    {"id":49,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
    {"id":25,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
  ];

  const userID = 44;

  const result = renderDestinationInfo(userTripsData, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'matchingDestination');
  assert.property(result, 'latestTrip');


  assert.deepEqual(result.matchingDestination, destinations[1]); 
  assert.deepEqual(result.latestTrip, userTripsData[1]);
});

it('should render null values for a user with no trips', () => {
  const userTripsData = [];

  const destinations = [
    {"id": 49, "destination": "Lima, Peru", "estimatedLodgingCostPerDay": 70, "estimatedFlightCostPerPerson": 400, "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "alt": "overview of city buildings with a clear sky"},
    {"id": 25, "destination": "Stockholm, Sweden", "estimatedLodgingCostPerDay": 100, "estimatedFlightCostPerPerson": 780, "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "city with boats on the water during the day time"},
  ];

  const userID = 44;

  const result = renderDestinationInfo(userTripsData, destinations, userID);

  assert.isObject(result);
  assert.property(result, 'matchingDestination');
  assert.property(result, 'latestTrip');

  assert.isNull(result.matchingDestination);
  assert.isNull(result.latestTrip); 
});

it('should render null values for a user with no matching userID', () => {
  const userTripsData = [
    {"id": 1, "userID": 10, "destinationID": 49, "travelers": 1, "date": "2022/09/16", "duration": 8, "status": "approved", "suggestedActivities": []},
    {"id": 2, "userID": 20, "destinationID": 25, "travelers": 5, "date": "2022/10/04", "duration": 18, "status": "approved", "suggestedActivities": []},
  ];

  const destinations = [
    {"id": 49, "destination": "Lima, Peru", "estimatedLodgingCostPerDay": 70, "estimatedFlightCostPerPerson": 400, "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80", "alt": "overview of city buildings with a clear sky"},
    {"id": 25, "destination": "Stockholm, Sweden", "estimatedLodgingCostPerDay": 100, "estimatedFlightCostPerPerson": 780, "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "city with boats on the water during the day time"},
  ];

  const nonMatchingUserID = 30;

  const result = renderDestinationInfo(userTripsData, destinations, nonMatchingUserID);

  assert.isObject(result);
  assert.property(result, 'matchingDestination');
  assert.property(result, 'latestTrip');

  assert.isNull(result.matchingDestination); 
  assert.isNull(result.latestTrip); 
  });
})




const renderApprovedTrips = (trips, destinations, userID) => {
  const dest = destinations
  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  return { findUser, dest }
};

const renderPastTrips = (trips, destinations, userID) => {
  const pastTrips = trips
      .filter(trip => trip.status === "approved" && trip.userID === parseInt(userID) && new Date(trip.date) < new Date())
      .sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(pastTrips)
  return {pastTrips, destinations}
}

const renderPendingTrips = (trips, destinations, userID) => {
  const dest = destinations;
  const pendingTrips = trips.filter((trip) => trip.status === 'pending');
  pendingTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = pendingTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });

  return { findUser, dest }
}

const renderDestinationInfo = (trips, destinations, userID) => {
  const userTrips = trips.filter(trip => trip.userID === parseInt(userID));
  userTrips.sort((a, b) => trips.indexOf(b) - trips.indexOf(a));
  
  const latestTrip = userTrips.length > 0 ? userTrips[0] : null;
  
  const matchingDestination = latestTrip ? destinations.find(destination => destination.id === latestTrip.destinationID) : null;
  
  return { matchingDestination, latestTrip };
};