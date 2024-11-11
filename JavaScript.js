const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));


const countryNameInput = document.getElementById('countryName');



const search = async () => {
  console.log(countryName.value);


 
  myModal.hide();

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName.value}&appid=a4c447db95b96214d027f589b389daf7`)





  response.json().then((data) => {
    console.log(data);







    let temperature = data.main.temp
    let nameCity = data.name
    let countryName = data.sys.country
    let feelslike = data.main.feels_like
    let weatherCondition = data.weather[0].description
    let pressure = data.main.pressure
    let humidity = data.main.humidity
    let windspeed = Math.round(data.wind.speed) * 3.6
    let longitude = data.coord.lon
    let latitude = data.coord.lat




    name1.innerHTML = `${nameCity}`

    hot.innerHTML = `${Math.round((temperature - 273) * 100) / 100}`

    country.innerHTML = `${countryName}`

    feels.innerHTML = `${Math.round((feelslike - 273) * 100) / 100}`

    wcondition.innerHTML = `${weatherCondition}`

    press.innerHTML = `${pressure}`

    humid.innerHTML = `${humidity}`

    wind.innerHTML = `${windspeed}`

    log.innerHTML = `${longitude}`
    lat.innerHTML = `${latitude}`

    setCityBackgroundImage(nameCity);

    
    countryNameInput.value = '';

  }
  )
}

countryNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});



async function setCityBackgroundImage(city) {
  const apiKeyImage = 'sCrV4VwLUd6GtpgEMD5bbCRubtqeyQlr6YNpmlXEyR8'; 
  const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyImage}`);
  const imageData = await imageResponse.json();

  if (imageData.results.length > 0) {
    const imageUrl = imageData.results[0].urls.full;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } else {
    console.log('No image found for this city.');
    setBackgroundImage();
  }
}











function getTime() {
  let now = new Date();
  let currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  Currenttime.innerHTML = `${currentTime}`

  let d = new Date();

  let d1 = d.toDateString();

  Currentdate.innerHTML = `${d1}`


  setTimeout(() => {
    getTime(), 1000
  })
}
getTime()


function setBackgroundImage() {
  const hour = new Date().getHours();
  console.log(hour);

  let backgroundImage;

  if (hour >= 6 && hour < 9) {
    backgroundImage = 'url("images/sunrise.png")';
  } else if (hour >= 9 && hour < 17) {
    backgroundImage = 'url("images/day.jpeg.jpg")';
  } else if (hour >= 17 && hour < 19) {
    backgroundImage = 'url("images/sunrise.png")    ';
  } else {
    backgroundImage = 'url("images/night.jpeg.jpg")';
  }

  document.body.style.backgroundImage = backgroundImage;
}

setBackgroundImage();


setInterval(setBackgroundImage, 3600000);

