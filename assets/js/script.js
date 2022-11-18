var APIKey = "81f7db9e6460b4fa649fcff3dd95b096";
var cityEl = document.querySelector("#city");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humid");
var fiveDayForEl = document.querySelector("#fiveDayForcast");
var searchButton = document.querySelector("#search");

function getWeather(cityNameEl) {
  var cityNameEl = document.getElementById("cityName").value;
  
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityNameEl +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      cityEl.textContent =
        currentData.name + moment(currentData.dt, "X ").format(" MM/DD/YYYY ");
      var img = document.createElement("img");
      img.src = `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
      cityEl.appendChild(img);

      tempEl.textContent = currentData.main.temp + "ºF";
      windEl.textContent = currentData.wind.speed + " MPH";
      humidityEl.textContent = currentData.main.humidity + "%";
      getForcast(currentData.coord.lat, currentData.coord.lon);
    });
}


function getForcast(lat, lon) {
  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (fiveDayData) {
      fiveDayForEl.textContent = " ";
      
      console.log(fiveDayData);

      var fiveDayEl = document.createElement("h2");
      fiveDayEl.textContent = "5-Day Forcast";
      fiveDayForEl.appendChild(fiveDayEl);
      

      for (let i = 2; i < fiveDayData.list.length; i += 8) {
        const daily = fiveDayData.list[i];
        var cardEl = document.createElement("h3");
        cardEl.textContent = moment(daily.dt, "X ").format(" MM/DD/YYYY ");
        cardEl.classList.add("card");
        fiveDayEl.appendChild(cardEl);
        var smlImg = document.createElement("img");
        smlImg.src = `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`;
        cardEl.appendChild(smlImg);
        console.log(fiveDayEl, i);
        var fiveTemp = document.createElement("li");
        var fiveWind = document.createElement("li");
        var fiveHumid = document.createElement("li");
        fiveTemp.textContent = daily.main.temp + "ºF";
        fiveWind.textContent = daily.wind.speed + " MPH";
        fiveHumid.textContent = daily.main.humidity + "%";
        cardEl.appendChild(fiveTemp);
        cardEl.appendChild(fiveWind);
        cardEl.appendChild(fiveHumid);
      }
    });
}

searchButton.addEventListener("click", getWeather);