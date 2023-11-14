import chai from 'chai';
const { expect } = chai;
import { renderApprovedTrips } from "./src/functions.js";  // Update the path accordingly

// Mock data for testing
const trips = [
  { status: 'approved', destinationID: 1, /* other trip properties */ },
  { status: 'approved', destinationID: 2, /* other trip properties */ },
];

const destinations = [
  { id: 1, destination: 'Paris', /* other destination properties */ },
  { id: 2, destination: 'Tokyo', /* other destination properties */ },
];

const userID = 123;  // Replace with a valid user ID

// Test suite for renderApprovedTrips function
describe('renderApprovedTrips function', () => {
  it.skip('should render approved trips correctly', () => {
    // Call the function and store the result
    const result = renderApprovedTrips(trips, destinations, userID);

    // Assert that the result is an array
    expect(result).to.be.an('array');

    // Assert the contents of the result array
    expect(result).to.deep.equal([
      { destination: 'Paris', date: '2023-11-14', duration: 5 },  // Update with expected data
      { destination: 'Tokyo', date: '2023-11-15', duration: 7 },  // Update with expected data
    ]);
  });
});