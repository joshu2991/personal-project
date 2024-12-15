import { createGraph } from './meteo_graph.js';

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  VITE_WEATHER_API_KEY
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

var current_city_storage = localStorage.getItem('current_city');
var search_bar = document.getElementById('search_bar');
var input_city_selector = document.getElementById('input_city_selector');
let dailyContainer = document.getElementById('daily_container');
let hourlyContainer = document.getElementById('hourlyContainer');
var background_space = document.getElementById('background_space');
var weather_code_text = document.getElementById('weather_code_text');

document.addEventListener('DOMContentLoaded', function(){ 

  // localStorage.clear();

  if(current_city_storage !== null){
    current_city_storage = JSON.parse(current_city_storage);
    weatherRequest(current_city_storage);
  }else{
    getUserCurrentLocation();
  }

  search_bar.addEventListener("keyup", function(){
    if(search_bar.value.length > 3){
      input_city_selector.classList.remove('d-none');
      inputFindCity(search_bar.value);
    }else{
      input_city_selector.classList.add('d-none');
    }
  });


});

async function weatherRequest(obj) {
  let latitude = obj.latitude;
  let longitude = obj.longitude;
  let cityName = document.getElementById("current_city");
  let current_temperature = document.getElementById("current_temperature");

  const graphObj = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    current: 'temperature_2m',
    hourly: 'temperature_2m',
    timezone: 'America/Los_Angeles',
    forecast_days: '1'
  });
  createGraph(graphObj);

  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FLos_Angeles&limit=8`)
    .then((response) => response.json())
    .then((result) => {
      
      var weather_image = getImgAndVideoWheather(result.current.weather_code);
      console.log(weather_image);
      background_space.src = weather_image.image;
      weather_code_text.innerHTML = weather_image.text;

      localStorage.setItem('current_city', JSON.stringify({name:obj.name,latitude:latitude,longitude:longitude,temperature_2m:result.current.temperature_2m}));

      cityName.textContent = obj.name;
      current_temperature.textContent = result.current.temperature_2m+"°C";

      fillDailySection(result);
      fillHourlySection(result);
    })
    .catch(error => console.log(error));
}

async function inputFindCity(value){
  await fetch(`https://api.radar.io/v1/search/autocomplete?query=${value}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
      var result = JSON.parse(result);                
      
      input_city_selector.innerHTML = "";
      inputSelectorCreateOptions(result.addresses);                                     

  })
  .catch((error) => console.error(error));
}

function inputSelectorCreateOptions(addresses){
  if(addresses.length > 0){
    input_city_selector.innerHTML = "";
      addresses.forEach(element => {                
          var option = document.createElement('option');
          option.id = element.formattedAddress;
          option.longitude = element.longitude;
          option.latitude = element.latitude;
          option.name = element.formattedAddress;
          option.value = element.formattedAddress;
          option.innerHTML = element.formattedAddress;     
          option.setAttribute("style", "text-align: start;padding: 5px 0px 3px 15px;cursor: pointer;");
          option.classList.add("selector_option");               

          input_city_selector.append(option);
          
      });

      clickOnOptionSelected(); 

  }else{
      input_city_selector.classList.add("d-none");
  }
    
}

function clickOnOptionSelected(){
    var inputSelectorOptions = document.getElementsByClassName('selector_option');
            
    for (let index = 0; index < inputSelectorOptions.length; index++) {
        const element = inputSelectorOptions[index];

        element.addEventListener("click", function(e){ 
            weatherRequest(e.target);
            input_city_selector.classList.add('d-none');
        })
    }
}

function fillDailySection(result){
  dailyContainer.innerHTML = "";
  console.log(result.daily);
  // for (let i = 0; i < 24; i++) {
  //   var temp = result.hourly.temperature_2m[i];
  //   var newdiv = document.createElement("div");

  //   var hour = document.createElement("h4");
  //   hour.innerHTML = result.hourly.time[i].split("T")[1];
  //   hour.classList.add("black-background");
  //   hour.setAttribute("style", "margin-bottom:0;text-align:center;");

  //   var p = document.createElement("p");
  //   p.innerHTML = temp + " °C";
  //   p.classList.add("black-background");
  //   p.setAttribute(
  //     "style",
  //     "font-size: 16px;margin-top:0;margin-bottom:0;text-align:center;"
  //   );

  //   var divContainer = document.createElement("div");
  //   divContainer.setAttribute("style", "max-width: 100px;display: flex;flex-direction: column;justify-content: space-between;");
  //   divContainer.classList.add("glass-card");
  //   divContainer.append(p);
  //   divContainer.append(hour);

  //   newdiv.append(divContainer);
  //   hourlyContainer.append(newdiv);
  //   i = i + 2;
  // }
}

function fillHourlySection(result){
  hourlyContainer.innerHTML = "";
  for (let i = 0; i < 24; i++) {
        var temp = result.hourly.temperature_2m[i];
        var newdiv = document.createElement("div");

        var hour = document.createElement("h4");
        hour.innerHTML = result.hourly.time[i].split("T")[1];
        hour.classList.add("black-background");
        hour.setAttribute("style", "margin-bottom:0;text-align:center;");

        var p = document.createElement("p");
        p.innerHTML = temp + " °C";
        p.classList.add("black-background");
        p.setAttribute(
          "style",
          "font-size: 16px;margin-top:0;margin-bottom:0;text-align:center;"
        );

        var divContainer = document.createElement("div");
        divContainer.setAttribute("style", "max-width: 100px;display: flex;flex-direction: column;justify-content: space-between;");
        divContainer.classList.add("glass-card");
        divContainer.append(p);
        divContainer.append(hour);

        newdiv.append(divContainer);
        hourlyContainer.append(newdiv);
        i = i + 2;
      }
}

async function getUserCurrentLocation() {
  return new Promise((result, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let obj = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            name: "",
            stateCode: "",
            countryCode: "",
            formattedAddress: "",
          };

          getCityFromCoordinates(obj.latitude, obj.longitude).then((city) => {
            obj.name = city.city ?? "Vancouver";
            obj.stateCode = city.stateCode ?? "BC";
            obj.countryCode = city.countryCode ?? "CA";
            obj.formattedAddress = obj.name + ", " + obj.stateCode+" "+obj.countryCode;
            weatherRequest(obj);
            result(obj);
          });
        },
        (error) => {
          reject(new Error("Error getting location: " + error.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      let obj = {
        latitude: 49.2819,
        longitude: -123.11874,
        name: "Vancouver",
        stateCode: "BC",
        countryCode: "CA",
        formattedAddress: "Vancouver, BC CA",
      };
      weatherRequest(obj);
      result(obj);
    }
  });
}

async function getCityFromCoordinates(latitude, longitude) {  
  return await fetch(
    `https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.addresses[0];
    })
    .catch((error) => console.error(error));
}

function getImgAndVideoWheather(value) {
  switch (value) {
    case 0:
      var image = "/src/media/images/sunny.jpg";
      var text = "Clear sky";
      break;
    case 1:
    case 2:
    case 3:
      var image = "/src/media/images/cloudy.jpg";
      var text = "Mainly clear and partly cloudy";
      break;
    case 45:
    case 48:
      var image = "/src/media/images/cloudy.jpg";
      var text = "Fog and depositing rime fog";
      break;
    case 51:
    case 53:
    case 55:
      var image = "/src/media/images/rain.jpg";
      var text = "Moderate drizzle";
      break;
    case 56:
    case 57:
      var image = "/src/media/images/storm.jpg";
      var text = "Freezing drizzle";
      break;
    case 61:
    case 63:
    case 65:
      var image = "/src/media/images/rain.jpg";
      var text = "Moderate rain";
      break;
    case 66:
    case 67:
      var image = "/src/media/images/storm.jpg";
      var text = "Freezing rain";
      break;
    case 71:
    case 73:
    case 75:
      var image = "/src/media/images/rain.jpg";
      var text = "Snow fall";
      break;
    case 77:
      var image = "/src/media/images/rain.jpg";
      var text = "Snow grains";
      break;
    case 80:
    case 81:
    case 82:
      var image = "/src/media/images/rain.jpg";
      var text = "Rain showers";
      break;
    case 85:
    case 86:
      var image = "/src/media/images/storm.jpg";
      var text = "Snow showers";
      break;
    case 95:
    case 96:
    case 99:
      var image = "/src/media/images/rain.jpg";
      var text = "Thunderstorm";
      break;
    default:
      var image = "/src/media/images/sunny.jpg";
      var text = "Clear sky";
      break;
  }
  let finalObj = {
    image: image,
    text: text
  };

  return finalObj;
}