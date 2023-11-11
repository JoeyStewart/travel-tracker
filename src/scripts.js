import './css/styles.css';
import './images/turing-logo.png'
import { fetchTripsData, fetchDestinationData } from './apiCalls';
import { renderApprovedTrips, renderPendingTrips, renderPastTrips, renderMoney, renderDestinationInfo } from './DOM'

window.addEventListener('load', () => {
    Promise.all([fetchTripsData(), fetchDestinationData()])
      .then((data) => {
        const approvedTripData = data[0];
        const pendingTripData = data[0];
        const pastTripData = data[0];
        const moneySpent = data[0];//Should have index of 0 AND 1 later when calculating total cost
        const destinationInfo = data[1];
        populateApproved(approvedTripData);
        populatePending(pendingTripData);
        populatePast(pastTripData);
        populateDestinationInfo(destinationInfo);
        populateMoney(moneySpent);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

const populateApproved = (data) => {
    renderApprovedTrips(data);
}

const populatePending = (data) => {
    renderPendingTrips(data);
}

const populatePast = (data) => {
    renderPastTrips(data)
}

const populateMoney = (data) => {
    renderMoney(data)
}

const populateDestinationInfo = (data) => {
    renderDestinationInfo(data)
}