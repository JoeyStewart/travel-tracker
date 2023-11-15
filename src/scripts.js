import './css/styles.css';
import './images/turing-logo.png';
import { fetchTripsData, fetchDestinationData, postTripData } from './apiCalls';
import { postDestinationInfo, postPastTrips, renderApprovedTrips, renderPendingTrips, renderPastTrips, renderMoney, renderDestinationInfo, findUserPending, findUserApproved } from './DOM';

//querySelectors
const dateInput = document.querySelector(".date-input");
const destinationsInput = document.querySelector("#destinations");
const travelersInput = document.querySelector(".travelers-input");
const durationInput = document.querySelector(".duration-input");
const submitButton = document.querySelector(".submit-button");
const userPageView = document.querySelector(".user-page");
const loginPageView = document.querySelector(".login-page");
const loginButton = document.querySelector(".login-button");
const tripForm = document.querySelector(".pending-trips-container");

//globalvariables
export let userID;
let trips = [];
let destination = [];
let approvedTripData = {};
let pendingTripData = {};
let pastTripData = {};
let moneySpent = {};
let destinationInfo = {};

//EventListeners
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let tripObject = {
    id: generateRandomId(),
    userID: parseInt(userID),
    destinationID: parseInt(destinationsInput.value),
    travelers: parseInt(travelersInput.value),
    date: dateInput.value,
    duration: parseInt(durationInput.value),
    status: "pending",
    suggestedActivities: [],
  };

  if (!dateInput.value || !destinationsInput.value || !durationInput.value || !travelersInput.value) {
    alert("You must fill all information fields before submitting");
  } else {
    postTripData(tripObject)
      .then(() => {
        Promise.all([fetchTripsData(), fetchDestinationData()]) 
          .then(([tripsData, destinationData]) => {
            trips = tripsData
            destination =  destinationData
            renderPendingTrips(trips, destination, userID)
            hideElement(tripForm)
            window.location.reload();
            showElement(tripForm)
          });
      });
  }
  dateInput.value = '';
  destinationsInput.value = '';
  durationInput.value = '';
  travelersInput.value = '';
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
      
      const destinationsSelect = document.getElementById('destinations');

      data[1].forEach(destination => {
        const dropOption = document.createElement('option');
        dropOption.value = destination.id;
        dropOption.textContent = destination.destination;
        destinationsSelect.appendChild(dropOption);
      });
    })
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


//functions
const populateApproved = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  const renderedTrips = renderApprovedTrips(tripsData, destinationData, userID);
  findUserApproved(renderedTrips);
}

const populatePending = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  const pendingTrips = renderPendingTrips(tripsData, destinationData, userID);
  findUserPending(pendingTrips)
}

const populatePast = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations
  const renderPast = renderPastTrips(tripsData, destinationData, userID)
  postPastTrips(renderPast)
}

const populateMoney = (data, userID) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  renderMoney(tripsData, destinationData, userID);
};

const populateDestinationInfo = (data, id) => {
  const tripsData = data.trips;
  const destinationData = data.destinations;
  const postDest = renderDestinationInfo(tripsData, destinationData, id)
  postDestinationInfo(postDest)
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

function hideElement(element) {
  console.log('Hiding element:', element);
  element.style.display = "none";
}

function showElement(element) {
  console.log('Show element:', element)
  element.style.display = 'block';
}


