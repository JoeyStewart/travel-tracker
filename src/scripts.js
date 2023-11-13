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

loginButton.addEventListener('click', () => {
  const submittedUserName = /^(traveler([1-9]|[1-4][0-9]|50))$/;
  const username = document.getElementById('user-name');
  const password = document.getElementById('pass-word');
  
    if (submittedUserName.test(username.value) && password.value === 'travel') {
    userPageView.classList.remove("hidden");
    loginPageView.classList.add("hidden");
    let userID = username.value.match(/^traveler([1-9]|[1-4][0-9]|50)$/)[1];
    // findUserID(userID)
    console.log(userID)
    } else if(username.value === "" && password.value === ""){
      alert("Submit a username and password to login")
    } else {
      alert("Your username of password may be wrong")
    }
    username.value = "";
    password.value = "";
   
    // } else {
    //   const userId = usernameInput.value.match(/^traveler([1-9]|[1-4][0-9]|50)$/)[1];
    //   fetchGetAll(userId)
    //     .then((data) => {
    //       destinations = data[2].destinations;
    //       const trips = makeTripArray(data[1].trips, userId);
    //       currentUser = new User(data[0], trips);
    //     })
    //     .catch((err) => console.log(err));
    
    // }
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

const generateRandomId = () => {
  return Math.floor(Math.random() * (1000000)) + 300; // Adjust the range as needed
}

// const findUserID = (id) => {
//   userID = id
//   console.log(userID, "You did it")
//   return userID
// }
// console.log(userID, "Will it work")

