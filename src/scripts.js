import './css/styles.css';
import './images/turing-logo.png'
import { fetchTripsData } from './apiCalls';
import { renderApprovedTrips } from './DOM'

window.addEventListener('load', () => {
    Promise.all([fetchTripsData()])
      .then((data) => {
        const ApprovedTripData = data[0];
        // const pendingTripData = data[1];
        // const pastTripData = data[2];
        // const moneySpent = data[3];
        populateDOM(ApprovedTripData);
        // populateDOM2(pendingTripData );
        // populateDOM3(pastTripData);
        // populateDOM4(moneySpent);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

  const populateDOM = (data) => {
    renderApprovedTrips(data);
  };
  