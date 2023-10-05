const unsplashBaseURL = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
const cryptoBaseURL = "https://api.coingecko.com/api/v3"
const timeEl = document.getElementById("time-container")

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
    .then(resp => resp.json())
    .then(respData => console.log(respData))
}

getCryptoData()