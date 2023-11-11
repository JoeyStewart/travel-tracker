


const upcomingContent = document.querySelector('.upcoming-content')

const renderApprovedTrips = (trips) => {
    upcomingContent.classList.remove('hidden')
    
    upcomingContent.innerHTML = '';
  
    upcomingContent.innerHTML += `
    <p>${trips.id}</p>
    <p>${trips.userID}</p>
    <p>${trips.destinationID}</p>
    <p>${trips.date}</p>
    <p>${trips.duration}</p>
    <p>${trips.status}</p>
    <p>${trips.suggestedActivites}</p>
    `;
  }

export {
    renderApprovedTrips
}