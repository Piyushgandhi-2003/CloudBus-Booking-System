const params = new URLSearchParams(window.location.search);

const source = params.get("source") || "Delhi";
const destination = params.get("destination") || "Jaipur";
const travelDate = params.get("date") || "2026-08-15";

document.getElementById("source").textContent = source;
document.getElementById("destination").textContent = destination;
document.getElementById("travelDate").textContent = travelDate;

const API_URL = "https://3s4iiz9bj8.execute-api.ap-south-1.amazonaws.com/prod/buses";

async function loadBuses() {

    const loading = document.getElementById("loading");
    const busList = document.getElementById("busList");

    try {

        const response = await fetch(API_URL);

        console.log("Status :", response.status);

        const text = await response.text();

        console.log("Raw Response :", text);

        let result = JSON.parse(text);

        let buses;

        if (Array.isArray(result)) {
            buses = result;
        } else if (result.body) {
            buses = JSON.parse(result.body);
        } else {
            buses = [];
        }

        console.log("Bus Data :", buses);

        loading.classList.add("hidden");
        busList.classList.remove("hidden");

        busList.innerHTML = "";

        buses.forEach(bus => {

            busList.innerHTML += `

            <div class="bus-card">

                <div class="top">

                    <div class="bus-title">
                        <h2>${bus.busName}</h2>
                        <p>${bus.busNumber}</p>
                    </div>

                    <div class="rating">
                        ${bus.rating}
                    </div>

                </div>

                <div class="details">

                    <div class="item">
                        <h4>Bus Type</h4>
                        <p>${bus.busType}</p>
                    </div>

                    <div class="item">
                        <h4>Departure</h4>
                        <p>${bus.departure}</p>
                    </div>

                    <div class="item">
                        <h4>Arrival</h4>
                        <p>${bus.arrival}</p>
                    </div>

                    <div class="item">
                        <h4>Duration</h4>
                        <p>${bus.duration}</p>
                    </div>

                    <div class="item">
                        <h4>Seats</h4>
                        <p>${bus.availableSeats}</p>
                    </div>

                </div>

                <div class="footer">

                    <div class="price">
                        ₹${bus.fare}
                    </div>

                    <button onclick="viewSeats('${bus.busId}')">
                        View Seats
                    </button>

                </div>

            </div>

            `;

        });

    }
    catch(err){

        console.error(err);

        alert(err);

        loading.innerHTML = "<h2>Unable to load buses.</h2>";

    }

}

function viewSeats(busId){

window.location.href =
`seat-selection.html?busId=${busId}&source=${source}&destination=${destination}&date=${travelDate}`;

}

loadBuses();