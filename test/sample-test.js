
import chai from 'chai';
const { expect } = chai;



const trips = [
  {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
  {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
];

const destinations = [
  {"id":1,"destination":"Lima, Peru","estimatedLodgingCostPerDay":70,"estimatedFlightCostPerPerson":400,"image":"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80","alt":"overview of city buildings with a clear sky"},
  {"id":2,"destination":"Stockholm, Sweden","estimatedLodgingCostPerDay":100,"estimatedFlightCostPerPerson":780,"image":"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80","alt":"city with boats on the water during the day time"},
];

const  userID = 2;

export const calculateTripCost = (latestTrip, matchingDestination) => {
  const lodging = matchingDestination.estimatedLodgingCostPerDay * latestTrip.duration;
  const flightCost = matchingDestination.estimatedFlightCostPerPerson * latestTrip.travelers;
  const tripCost = lodging + flightCost;
  const agencyFee = (tripCost * 0.10) + tripCost;
  const totalCost = agencyFee.toFixed(2);
  return {
    lodging,
    flightCost,
    agencyFee,
    totalCost,
  };
};

// describe('calculateTripCost', () => {
//   it('calculates trip cost correctly', () => {
//     const latestTrip = {
//       "id": 2,
//       "userID": 35,
//       "destinationID": 25,
//       "travelers": 5,
//       "date": "2022/10/04",
//       "duration": 18,
//       "status": "approved",
//       "suggestedActivities": [],
//     };

//     const matchingDestination = {
//       "id": 2,
//       "destination": "Stockholm, Sweden",
//       "estimatedLodgingCostPerDay": 100,
//       "estimatedFlightCostPerPerson": 780,
//       "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
//       "alt": "city with boats on the water during the day time",
//     };

//     const result = calculateTripCost(latestTrip, matchingDestination);

//     // Assert the expected values
//     expect(result.lodging).to.equal(100 * 18);  // estimatedLodgingCostPerDay * duration
//     expect(result.flightCost).to.equal(780 * 5);  // estimatedFlightCostPerPerson * travelers
//     expect(result.agencyFee).to.equal(((100 * 18 + 780 * 5) * 0.10) + (100 * 18 + 780 * 5));
//     expect(result.totalCost).to.equal(result.agencyFee.toFixed(2));
//   });
// });


//   return {
//     destinationName: destination.destination,
//     imageSrc: destination.image,
//     lodgingCost: lodgingCost.toFixed(2),
//     flightCost: flightCost.toFixed(2),
//     agencyFee: agencyFee.toFixed(2),
//     totalCost: agencyFee.toFixed(2),
//   };
// }

// describe('calculateTripInfo function', () => {
//   it('should calculate trip information correctly', () => {
//     const trip = {
//       duration: 5,
//       travelers: 2,
//     };
//     const destination = {
//       destination: 'Paris',
//       image: 'paris.jpg',
//       estimatedLodgingCostPerDay: 100,
//       estimatedFlightCostPerPerson: 500,
//     };

//     const result = calculateTripInfo(trip, destination);

//     expect(result.destinationName).to.equal('Paris');
//     expect(result.imageSrc).to.equal('paris.jpg');
//     expect(result.lodgingCost).to.equal('500.00'); // Adjust based on your actual calculation
//     // ... add more assertions based on your expectations
//   });
// });

// describe('calculateTotalCost function', () => {
//   it('should calculate total cost correctly', () => {
//     const trip = {
//       duration: 5,
//       travelers: 2,
//     };
//     const destination = {
//       estimatedLodgingCostPerDay: 100,
//       estimatedFlightCostPerPerson: 500,
//     };

//     const result = calculateTotalCost(trip, destination);

//     expect(result).to.equal(1650); // Adjust based on your actual calculation
//   });
// });

// function calculateTotalCost(trip, destination) {
//   const lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
//   const flightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
//   const tripCost = lodgingCost + flightCost;
//   return (tripCost * 0.10) + tripCost;
// }