function submitReservation() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const partySize = document.getElementById('party-size').value;

    if (date && time && partySize) {
        alert(`Reservation confirmed for ${date} at ${time} for ${partySize} people.`);
        
        document.getElementById('reservation-form').reset();
    } else {
        alert('Please fill out all fields.');
    }
}
