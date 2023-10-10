const unsplashBaseURL = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
const cryptoBaseURL = "https://api.coingecko.com/api/v3"
const timeEl = document.getElementById("time")
const dateEl = document.getElementById("date")
const cryptoEl = document.getElementById("crypto")
const weatherEl = document.getElementById("weather")
//console.log(cryptoEl)

const getUnsplashImage = () => {
  fetch(unsplashBaseURL, {method:"GET"})
    .then(resp => resp.json())
    .then(respData => {
    document.body.style.backgroundImage = `url(${respData.urls.regular})`
    document.getElementById("photo-author").innerText = `By: ${respData.user.name}`
    //console.log(respData)
  })
  .catch( err => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
		document.getElementById("author").textContent = `By: Dodi Achmad`})
}
getUnsplashImage()

const getCryptoData = () => {
  fetch(cryptoBaseURL + "/coins/dogecoin", {method:"GET"})
    .then(resp => {
      if(!resp.ok){
        throw Error("Something went wrong")
      }
      return resp.json()
    })
    .then(respData => {
      cryptoEl.innerHTML = `
        <div class="crypto-img-name">
          <img src="${respData.image.small}" alt="" /><span class="crypto-name">${respData.name}</span>
        </div>
        <p class="current-price crypto-data" id="current-price">Current price: 💶
          <span class="current-amount amount">€ ${respData.market_data.current_price.eur}</span>
        </p>
        <p class="high-price crypto-data" id="current-price">24hour high: ⬆️ 
          <span class="high-amount amount">€ ${respData.market_data.high_24h.eur}</span>
        </p>
        <p class="low-price crypto-data" id="current-price">24hour low: ⬇️
          <span class="low-amount amount">€ ${respData.market_data.low_24h.eur}</span>
        </p>`
    })
    .catch(err => console.error(err))
}
getCryptoData()

const getTime = () => {
  setInterval(function(){
    const time = new Date().toLocaleTimeString("en-pt", {timeStyle: "short"})
    timeEl.innerHTML = time
  },1000)
}
getTime()

const getDate = () => {
  setInterval(function(){
    const date = new Date().toLocaleDateString("en-pt", {dateStyle:"medium"})
    dateEl.innerHTML = date
  },1000)
}
getDate()


const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(resp => {
        if(!resp.ok){
          throw Error("Weather data not available")
        }
        return resp.json()
      })
      .then(respData => {
        const iconURL = `https://openweathermap.org/img/wn/${respData.weather[0].icon}@2x.png`
        weatherEl.innerHTML = `
        <div class="weather-icon-temp">
          <img class="weather-icon" src="${iconURL}" alt="Weather icon"/>
          <h1 class="location-temp" id="location-temp">${Math.round(respData.main.temp)}º</h1>
        </div>
        <h3 class="location-name">${respData.name}</h3>
        `
      const localTemp = document.getElementById("location-temp")  
      if(`${respData.main.temp} > 29` ){
          localTemp.style.color = "orangered"
      }
      else if(`${respData.main.temp} > 29` ){
        localTemp.style.color = "lawngreen"
      }
      else {
        localTemp.style.color = "ornflowerblue"
      }
      })
      .catch(err => console.error(err))
  });
}
getWeatherData()

// position: GeolocationPosition
    // coords: GeolocationCoordinates
        // accuracy: 20
        // altitude: null
        // altitudeAccuracy: null
        // heading: null
        // latitude: 40.5269232
        // longitude: -111.916174
        // speed: null
        // __proto__: GeolocationCoordinates
    // timestamp: 1623170827394