// ===============================
// CloudBus - Demo Payment
// ===============================

// Read query parameters
const params = new URLSearchParams(window.location.search);

const passengerName = params.get("name") || "Guest";
const seats = params.get("seats") || "";
const totalFare = params.get("fare") || "0";

// Populate page
document.getElementById("passengerName").textContent = passengerName;
document.getElementById("seatNumbers").textContent = seats || "-";
document.getElementById("summarySeats").textContent = seats || "-";
document.getElementById("totalFare").textContent = totalFare;

// -------------------------------
// Payment Method Selection
// -------------------------------

const paymentCards = document.querySelectorAll(".payment-card");

paymentCards.forEach(card => {

    const radio = card.querySelector("input");

    if (radio.checked) {
        card.classList.add("active");
    }

    radio.addEventListener("change", () => {

        paymentCards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

    });

});

// -------------------------------
// Utility Functions
// -------------------------------

function randomNumber(length) {

    let value = "";

    for (let i = 0; i < length; i++) {

        value += Math.floor(Math.random() * 10);

    }

    return value;

}

function generateBookingId() {

    return "BK" + randomNumber(8);

}

function generateTicketNumber() {

    return "TKT" + randomNumber(10);

}

function generatePaymentId() {

    return "PAY" + randomNumber(12);

}

function getCurrentDateTime() {

    const now = new Date();

    return now.toLocaleString();

}

// -------------------------------
// Pay Now
// -------------------------------

const payButton = document.getElementById("payBtn");

payButton.addEventListener("click", () => {

    // Show loading

    document
        .getElementById("loadingOverlay")
        .classList.remove("hidden");

    // Simulate payment processing

    setTimeout(() => {

        document
            .getElementById("loadingOverlay")
            .classList.add("hidden");

        // Generate Booking Details

        const bookingId = generateBookingId();

        const ticketNumber = generateTicketNumber();

        const paymentId = generatePaymentId();

        const bookingDate = getCurrentDateTime();

        // Display Success

        document.getElementById("bookingId").textContent = bookingId;

        document.getElementById("ticketNumber").textContent = ticketNumber;

        document.getElementById("paymentId").textContent = paymentId;

        document.getElementById("bookingDate").textContent = bookingDate;

        document
            .getElementById("successOverlay")
            .classList.remove("hidden");

        // Save Booking (Demo)

        const booking = {

            bookingId: bookingId,

            ticketNumber: ticketNumber,

            paymentId: paymentId,

            bookingDate: bookingDate,

            passengerName: passengerName,

            seats: seats,

            totalFare: totalFare,

            busName: "CloudBus Express",

            busNumber: "CB-101",

            busType: "AC Sleeper"

        };

        sessionStorage.setItem(
            "cloudBusBooking",
            JSON.stringify(booking)
        );

        // Redirect after 3 seconds

        setTimeout(() => {

            window.location.href = "ticket.html";

        }, 3000);

    }, 3000);

});