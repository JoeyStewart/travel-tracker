import './css/styles.css';
import './images/turing-logo.png'
import { fetchTripsData, fetchDestinationData, postTripData } from './apiCalls';
import { renderApprovedTrips, renderPendingTrips, renderPastTrips, renderMoney, renderDestinationInfo } from './DOM'

const dateInput = document.querySelector(".date-input")
const destinationInput = document.querySelector(".destinations-input")
const travelersInput = document.querySelector(".travelers-input")
const durationInput = document.querySelector(".duration-input")
const submitButton = document.querySelector(".submit-button")


console.log(dateInput)
submitButton.addEventListener("click", () => {
  

  let tripObject = {
    id: generateRandomId(),
    userID: generateRandomId(), 
    destinationID: parseInt(destinationInput.value),
    travelers: parseInt(travelersInput.value) ,
    date: dateInput.value,
    duration: parseInt(durationInput.value),
    status: "pending",
    suggestedActivities: [],
    }

  if (
    !dateInput.value || 
    !destinationInput.value || 
    !durationInput.value ||
    !travelersInput.value)
   {
    alert("You must fill all information fields correctly before submitting");
  } else {
    // renderPendingTrips(tripObject);
    postTripData(tripObject);
  }
});

window.addEventListener('load', () => {
    Promise.all([fetchTripsData(), fetchDestinationData()])
      .then((data) => {
        const approvedTripData = data[0];
        const pendingTripData = data[0];
        const pastTripData = data[0];
        const moneySpent = {
            trips: data[0],
            destinations: data[1],
          };
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
    const tripsData = data.trips;
    const destinationData = data.destinations;
    renderMoney(tripsData, destinationData);
};

const populateDestinationInfo = (data) => {
    renderDestinationInfo(data)
}

function generateRandomId() {
  return Math.floor(Math.random() * (1000000)) + 300; // Adjust the range as needed
}

