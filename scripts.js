var weatherCond = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;



function getLocation() {
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;


var conditionPath = "https://api.wunderground.com/api/c054de430814c178/conditions/q/"+lat+","+lon+".json";
var forecastPath = "https://api.wunderground.com/api/c054de430814c178/forecast/q/"+lat+","+lon+".json";
console.log(conditionPath);
console.log(forecastPath);
  //GET THE CONDITIONS
  weatherCond.open('GET', conditionPath, true);
  weatherCond.responseType = 'text';
  weatherCond.send();

  //GET THE FORECAST
  weatherForecast.open('GET', forecastPath, true);
  weatherForecast.responseType = 'text';
  weatherForecast.send();

 }
}
weatherCond.onload = function(){
  if (weatherCond.status === 200) {
    cObj = JSON.parse(weatherCond.responseText);
    console.log(cObj);
    document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
    document.getElementById('weather').innerHTML = cObj.current_observation.weather;
    document.getElementById('temperature').innerHTML = cObj.current_observation.temp_c + "°";

    document.getElementById('cels').onclick = changeToCelsius;
    document.getElementById('fahr').onclick = changeToFahrenheit;

  } //end if
}; //end function

weatherForecast.onload = function(){
  if (weatherForecast.status === 200) {
    fObj = JSON.parse(weatherForecast.responseText);
    console.log(fObj);
    document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday["0"].fcttext_metric;
    document.getElementById('cels').onclick = changeToCelsius;
    document.getElementById('fahr').onclick = changeToFahrenheit;

    //day 1
    document.getElementById('r1c1').innerHTML = fObj.forecast.simpleforecast.forecastday[1].date.weekday;
    document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.celsius + "°";
    document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.celsius + "°";
    var imagePath = fObj.forecast.simpleforecast.forecastday[1].icon_url;
    document.getElementById('r1c2').src = imagePath;

    //day 2
    document.getElementById('r2c1').innerHTML = fObj.forecast.simpleforecast.forecastday[2].date.weekday;
    document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.celsius + "°";
    document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.celsius + "°";
    var imagePath = fObj.forecast.simpleforecast.forecastday[2].icon_url;
    document.getElementById('r2c2').src = imagePath;

    //day 3
    document.getElementById('r3c1').innerHTML = fObj.forecast.simpleforecast.forecastday[3].date.weekday;
    document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.celsius + "°";
    document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.celsius + "°";
    var imagePath = fObj.forecast.simpleforecast.forecastday[3].icon_url;
    document.getElementById('r3c2').src = imagePath;

  } // end if
}; //end function

function changeToCelsius(){ // switch up temperature to Celsius
  document.getElementById('temperature').innerHTML = cObj.current_observation.temp_c + "°";
  document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday["0"].fcttext_metric;
  document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.celsius + "°";
  document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.celsius + "°";
  document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.celsius + "°";
  document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.celsius + "°";
  document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.celsius + "°";
  document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.celsius + "°";
}

function changeToFahrenheit(){ //switch up temperature to Fahrenheit
  document.getElementById('temperature').innerHTML = cObj.current_observation.temp_f + "°";
  document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday["0"].fcttext;
  document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.fahrenheit + "°";
  document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.fahrenheit + "°";
  document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.fahrenheit + "°";
  document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.fahrenheit + "°";
  document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.fahrenheit + "°";
  document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.fahrenheit + "°";
}
getLocation();
