const unsplashBaseURL = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
const cryptoBaseURL = "https://api.coingecko.com/api/v3"
const timeEl = document.getElementById("time-container")
const cryptoEl = document.getElementById("crypto")
console.log(cryptoEl)

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
}
getCryptoData()

const getTime = new Date().toLocaleTimeString("en-pt", {timeStyle: "short"})
const getDate = new Date().toLocaleDateString("en-pt", {dateStyle:"medium"})
console.log(getDate)