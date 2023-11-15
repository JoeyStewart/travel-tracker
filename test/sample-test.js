
// import chai from 'chai';
const { assert } = require('chai');
// import{renderPendingTrips, renderApprovedTrips, renderPastTrips,  } from './DOM.js'



const trips = [
  {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
  {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
];

const destinations = [
  {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
  {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
];

const  userID = 2;


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

const renderApprovedTrips = (trips, destinations, userID) => {
  const dest = destinations
  const approvedTrips = trips.filter((trip) => trip.status === 'approved');
  approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));

  const findUser = approvedTrips.filter((element) => {
    return parseInt(userID) === element.userID;
  });
  return { findUser, dest }
};