const busLayout = document.getElementById("busLayout");

const selectedSeats = [];

const API_URL = "https://3s4iiz9bj8.execute-api.ap-south-1.amazonaws.com/prod/seats";

let bookedSeats = [];

const farePerSeat = 750;

function renderSeats() {

    busLayout.innerHTML = "";

    for (let row = 0; row < 10; row++) {

        createSeat(row * 4 + 1);
        createSeat(row * 4 + 2);

        const aisle = document.createElement("div");
        aisle.className = "aisle";
        busLayout.appendChild(aisle);

        createSeat(row * 4 + 3);
        createSeat(row * 4 + 4);
    }
}

function createSeat(number) {

    const seat = document.createElement("div");

    seat.classList.add("seat");

    seat.innerText = number;

    if (bookedSeats.includes(number)) {

        seat.classList.add("booked");

    } else {

        seat.classList.add("available");

        seat.addEventListener("click", () => toggleSeat(seat, number));
    }

    busLayout.appendChild(seat);
}

function toggleSeat(element, number) {

    const index = selectedSeats.indexOf(number);

    if (index > -1) {

        selectedSeats.splice(index, 1);

        element.classList.remove("selected");
        element.classList.add("available");

    } else {

        selectedSeats.push(number);

        element.classList.remove("available");
        element.classList.add("selected");
    }

    updateSummary();
}

function updateSummary() {

    selectedSeats.sort((a, b) => a - b);

    document.getElementById("selectedSeats").innerText =
        selectedSeats.length
            ? selectedSeats.join(", ")
            : "None";

    document.getElementById("totalPrice").innerText =
        selectedSeats.length * farePerSeat;
}

document.getElementById("continueBtn").addEventListener("click", () => {

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");
        return;
    }

    const params = new URLSearchParams(window.location.search);

    const busId = params.get("busId");
    const source = params.get("source");
    const destination = params.get("destination");
    const date = params.get("date");

    const seatString = selectedSeats.join(",");

    window.location.href =
        `passenger-details.html?busId=${busId}&source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&seats=${seatString}`;
});

async function loadBookedSeats() {

    try {

        const params = new URLSearchParams(window.location.search);

        const busId = params.get("busId") || "BUS101";
        const journeyDate = params.get("date") || "2026-08-15";

        const response = await fetch(
            `${API_URL}?busId=${busId}&journeyDate=${journeyDate}`
        );

        const data = await response.json();

        bookedSeats = data.bookedSeats || [];

        renderSeats();

    } catch (error) {

        console.error("Error loading seats:", error);

        bookedSeats = [];

        renderSeats();
    }
}

loadBookedSeats();