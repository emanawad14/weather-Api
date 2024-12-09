
getforecast("cairo");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.querySelector("form").addEventListener("submit" ,function(e)
{
   e.preventDefault()
});

let current;
let city;
let forecast;

let btnFind =document.getElementById("btnFind");
let SearchInput =document.getElementById("SearchInput");

btnFind.addEventListener("click" ,function()
{
   getforecast(SearchInput.value);
   
})

async function getforecast(term) {
   let response = await fetch(
     `https://api.weatherapi.com/v1/forecast.json?key=54a600c068ab4ceea7962243240912&q=${term}&days=7&aqi=no&alerts=no`
   );
   let responseData = await response.json();
 
   if (response.status >= 200 && response.status < 300) 
   {
     current = responseData.current;
     city = responseData.location;
     forecast = responseData.forecast.forecastday;
 
     displayCurrent(current, city);
   
   }
 }

 function displayCurrent(c, l) {
   var e = new Date(l.localtime.replace(" ", "T"));
   let current = `
   <div >
     <div class="forecast">
       <div class="today">
         <div class="header d-flex justify-content-center align-items-center">
           <div class="day text-white fs-2">${days[e.getDay()]}</div>
           <div class="date ps-5 text-white fs-2">${e.getDate() +" "+ monthNames[e.getMonth()]}</div>
         </div>
         <div class="body my-4">
           <h1 class="location h1 pb-3 fs-1 text-white ">${l.name}</h1>
           <div class="degree">
             <div class="num h1 fs-1 text-white">${c.temp_c} <sup>o</sup>C</div>
           </div>
           <div class="condition d-flex justify-content-center align-items-center pt-2">
            <div class="condition-text fs-1 text-black">${c.condition.text}</div>
           <div class="condition-img "><img src="https:${c.condition.icon}" alt="" width=90></div>
           </div>
          
         </div>
         <div class="footer pb-3">
          <span class="humidity pe-2"><i class="fa-solid fa-water"></i> ${c.humidity}%</span>
          <span class="wind-speed pe-2  "><i class="fa-solid fa-wind"></i> ${c.wind_kph}km/h</span>
          <span class="wind-dir"><i class="fa-regular fa-compass"></i> ${c.wind_dir}</span>
         </div>
         </div>
       </div>
     </div>`;
 
   document.getElementById("current").innerHTML = current;
 }
