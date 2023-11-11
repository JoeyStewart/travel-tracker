


const upcomingContent = document.querySelector('.upcoming-content')

const renderApprovedTrips = (trips) => {
    upcomingContent.classList.remove('hidden')
    
    upcomingContent.innerHTML = '';
    if (trips.length > 0) {
        const trip= trips[0];
    upcomingContent.innerHTML += `
    <p>id: ${trip.id}</p>
    <p>userID: ${trip.userID}</p>
    <p>destinationID: ${trip.destinationID}</p>
    <p>date: ${trip.date}</p>
    <p>duration: ${trip.duration}</p>
    <p>status: ${trip.status}</p>
    <p>activites: ${trip.suggestedActivites}</p>
    `;
  }
}

export {
    renderApprovedTrips
}