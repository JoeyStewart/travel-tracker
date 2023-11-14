import './css/styles.css';
import './images/turing-logo.png'
import { fetchTripsData, fetchDestinationData, postTripData } from './apiCalls';
import { renderApprovedTrips, renderPendingTrips, renderPastTrips, renderMoney, renderDestinationInfo} from './DOM'

const dateInput = document.querySelector(".date-input")
const destinationInput = document.querySelector(".destinations-input")
const travelersInput = document.querySelector(".travelers-input")
const durationInput = document.querySelector(".duration-input")
const submitButton = document.querySelector(".submit-button")
const userPageView = document.querySelector(".user-page")
const loginPageView = document.querySelector(".login-page")
const loginButton = document.querySelector(".login-button")

export let userID

let approvedTripData = {}
let pendingTripData = {}
let pastTripData = {}
let moneySpent = {}
let destinationInfo = {}

submitButton.addEventListener("click", () => {
  

  let tripObject = {
    id: generateRandomId(),
    userID: parseInt(userID), 
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
    postTripData(tripObject)
    // .then(() => {
    //   fetchTripsData()
    //     .then((tripData) => {
    //       trips = tripData;
    //       renderPendingTrips(trips, userID);
    //       hideElement(tripForm);
    //     });
    // });
  }
    dateInput.value = '' 
    destinationInput.value = ''
    durationInput.value = ''
    travelersInput.value = ''
});

window.addEventListener('load', () => {
    Promise.all([fetchTripsData(), fetchDestinationData()])
      .then((data) => {
        approvedTripData["trips"] = data[0];
        approvedTripData["destinations"] = data[1];
        pendingTripData["trips"] = data[0];
        pendingTripData["destinations"] = data[1];
        pastTripData["trips"] = data[0];
        pastTripData["destinations"] = data[1];
        moneySpent["trips"] = data[0];
        moneySpent["destinations"] = data[1];
        destinationInfo["trips"] = data[0];
        destinationInfo["destinations"] = data[1];
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

loginButton.addEventListener('click', () => {
  const submittedUserName = /^(traveler([1-9]|[1-4][0-9]|50))$/;
  const username = document.getElementById('user-name');
  const password = document.getElementById('pass-word');
  
    if (submittedUserName.test(username.value) && password.value === 'travel') {
    userPageView.classList.remove("hidden");
    loginPageView.classList.add("hidden");
    userID = username.value.match(/^traveler([1-9]|[1-4][0-9]|50)$/)[1];
    findUserID(userID)
    } else if(username.value === "" && password.value === ""){
      alert("Submit a username and password to login")
    } else {
      alert("Your username of password may be wrong")
    }
    username.value = "";
    password.value = "";
});

const populateApproved = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  renderApprovedTrips(tripsData, destinationData, userID);
}

const populatePending = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  renderPendingTrips(tripsData, destinationData, userID);
}

const populatePast = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations
  renderPastTrips(tripsData, destinationData, userID)
}

const populateMoney = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  renderMoney(tripsData, destinationData, userID);
};

const populateDestinationInfo = (data, id) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  renderDestinationInfo(tripsData, destinationData, id)
}

const generateRandomId = () => {
  return Math.floor(Math.random() * (1000000)) + 300;
}

export const findUserID = (id) => {
  populateApproved(approvedTripData, id);
  populatePending(pendingTripData ,id);
  populatePast(pastTripData, id);
  populateDestinationInfo(destinationInfo, id);
  populateMoney(moneySpent, id);
  userID = id
  return userID
}


