// ============================================
// CloudBus Ticket Confirmation
// ticket.js
// ============================================

// Get booking from sessionStorage
const booking = JSON.parse(sessionStorage.getItem("cloudBusBooking"));

// Redirect if booking not found
if (!booking) {

    alert("Booking not found.");

    window.location.href = "home.html";

}

// ----------------------------
// Populate Ticket Details
// ----------------------------

document.getElementById("bookingId").textContent =
    booking.bookingId;

document.getElementById("ticketNumber").textContent =
    booking.ticketNumber;

document.getElementById("bookingDate").textContent =
    booking.bookingDate;

document.getElementById("paymentId").textContent =
    booking.paymentId;

document.getElementById("passengerName").textContent =
    booking.passengerName;

document.getElementById("seatNumbers").textContent =
    booking.seats;

document.getElementById("amountPaid").textContent =
    booking.totalFare;

// Bus Details

document.getElementById("busName").textContent =
    booking.busName || "CloudBus Express";

document.getElementById("busNumber").textContent =
    booking.busNumber || "CB-101";

// Journey Details

document.getElementById("source").textContent =
    booking.source || "Delhi";

document.getElementById("destination").textContent =
    booking.destination || "Jaipur";

document.getElementById("journeyDate").textContent =
    booking.journeyDate || "25 Aug 2026";

document.getElementById("departure").textContent =
    booking.departure || "08:00 AM";

document.getElementById("arrival").textContent =
    booking.arrival || "02:30 PM";

document.getElementById("boarding").textContent =
    booking.boarding || "Kashmere Gate ISBT";

document.getElementById("dropping").textContent =
    booking.dropping || "Jaipur Bus Stand";

// ----------------------------
// Generate QR Code
// ----------------------------

const qrText =

`CloudBus Ticket

Booking ID : ${booking.bookingId}

Passenger : ${booking.passengerName}

Seats : ${booking.seats}

Amount : ₹${booking.totalFare}

Payment ID : ${booking.paymentId}

Status : PAID`;

new QRCode(document.getElementById("qrcode"), {

    text: qrText,

    width:180,

    height:180,

    colorDark:"#1e3a8a",

    colorLight:"#ffffff",

    correctLevel:QRCode.CorrectLevel.H

});

// ----------------------------
// Download PDF
// ----------------------------

document
.getElementById("downloadBtn")
.addEventListener("click",()=>{

    const ticket=document.querySelector(".ticket");

    const options={

        margin:0.4,

        filename:
        `${booking.bookingId}.pdf`,

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2
        },

        jsPDF:{
            unit:"in",
            format:"a4",
            orientation:"portrait"
        }

    };

    html2pdf()

    .set(options)

    .from(ticket)

    .save();

});

// ----------------------------
// Print
// ----------------------------

document
.getElementById("printBtn")
.addEventListener("click",()=>{

    window.print();

});

// ----------------------------
// Home
// ----------------------------

document
.getElementById("homeBtn")
.addEventListener("click",()=>{

    sessionStorage.removeItem("cloudBusBooking");

    window.location.href="home.html";

});