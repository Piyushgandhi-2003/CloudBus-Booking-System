const farePerSeat = 750;

const params = new URLSearchParams(window.location.search);

const seatParam = params.get("seats");

const seats = seatParam
    ? seatParam.split(",").filter(Boolean)
    : [];

document.getElementById("seatNumbers").textContent =
    seats.length ? seats.join(", ") : "No Seats Selected";

document.getElementById("totalFare").textContent =
    seats.length * farePerSeat;

const form = document.getElementById("passengerForm");

const API_URL = "https://3s4iiz9bj8.execute-api.ap-south-1.amazonaws.com/prod/bookingticket";

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const emergency = document.getElementById("emergency").value.trim();

    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!fullName){
        alert("Please enter your full name.");
        return;
    }

    if(!age || age < 1 || age > 120){
        alert("Please enter a valid age.");
        return;
    }

    if(!gender){
        alert("Please select your gender.");
        return;
    }

    if(!mobileRegex.test(mobile)){
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if(!emailRegex.test(email)){
        alert("Please enter a valid email address.");
        return;
    }

    if(emergency && !mobileRegex.test(emergency)){
        alert("Please enter a valid emergency contact number.");
        return;
    }

    const body = {

        busId: params.get("busId"),
        journeyDate: params.get("date"),
        passengerName: fullName,
        mobile: mobile,
        email: email,
        seatNumbers: seats.map(Number),
        amount: seats.length * farePerSeat

    };

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(body)

        });

        const data = await response.json();

        const query =
        `?busId=${encodeURIComponent(params.get("busId"))}` +
        `&date=${encodeURIComponent(params.get("date"))}` +
        `&seats=${encodeURIComponent(seats.join(","))}` +
        `&fare=${seats.length * farePerSeat}` +
        `&name=${encodeURIComponent(fullName)}` +
        `&bookingId=${encodeURIComponent(data.bookingId)}`;

        window.location.href="payment.html"+query;

    }

    catch(error){

        console.error(error);

        alert("Booking Failed");

    }

});