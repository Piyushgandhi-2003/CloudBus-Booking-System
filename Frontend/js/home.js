async function searchBus(){

const source=document.getElementById("source").value.trim();
const destination=document.getElementById("destination").value.trim();
const travelDate=document.getElementById("travelDate").value;

if(!source || !destination || !travelDate){
    alert("Please fill all fields.");
    return;
}

const msg=document.getElementById("message");
msg.innerHTML="Searching buses...";

try{

const response=await fetch("https://jsonplaceholder.typicode.com/posts/1");

const data=await response.json();

console.log(data);

msg.innerHTML="Placeholder API called successfully. Bus search feature will be connected to AWS API Gateway later.";

// Redirect to Search Bus page
window.location.href=`searchbus.html?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(travelDate)}`;

}
catch(error){

console.error(error);

msg.innerHTML="Unable to connect to API.";

}

}