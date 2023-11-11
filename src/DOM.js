


const upcomingContent = document.querySelector('.upcoming-content')

const renderApprovedTrips = (trips) => {
    upcomingContent.classList.remove('hidden')
    
    upcomingContent.innerHTML = '';
    
    const approvedTrips = trips.filter((trip) => trip.status === 'approved');
        approvedTrips.sort((a, b) => new Date(b.date) - new Date(a.date));
   
    if (approvedTrips.length > 0) {
      const mostRecentApprovedTrip = approvedTrips[0];
      upcomingContent.innerHTML += `
        <div class="trip-info">
          <p>Trip ID: ${mostRecentApprovedTrip.id}</p>
          <p>User ID: ${mostRecentApprovedTrip.userID}</p>
          <p>Destination ID: ${mostRecentApprovedTrip.destinationID}</p>
          <p>Date: ${mostRecentApprovedTrip.date}</p>
          <p>Duration: ${mostRecentApprovedTrip.duration}</p>
          <p>Status: ${mostRecentApprovedTrip.status}</p>
          <p>Suggested Activities: ${mostRecentApprovedTrip.suggestedActivities}</p>
        </div>`
  }
}

export {
    renderApprovedTrips
}