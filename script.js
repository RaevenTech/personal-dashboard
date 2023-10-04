const unsplashBaseURL = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"

const getUnsplashImage = async () => {
  const resp = await fetch(unsplashBaseURL, {method:"GET"})
  const respData = await resp.json()
  document.body.style.backgroundImage = `url(${respData.urls.regular})`
  document.getElementById("photo-author").innerText = `By: ${respData.user.name}`
  console.log(respData)
}
getUnsplashImage()