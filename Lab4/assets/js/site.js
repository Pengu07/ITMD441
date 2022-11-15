document.getElementById('namedLocationButton').addEventListener("click", namedLocationText);

document.getElementById('geolocationButton').addEventListener("click", geolocationText);

let place;
let coordinates;

function namedLocationText(){
  const namedLocation = document.getElementById('namedLocation');
  place = namedLocation.value;
  weather();
}

navigator.geolocation.getCurrentPosition(coords, error);
function coords(pos){
  coordinates = pos.coords;
}

function error(err){
  console.log("Error!")
}

function geolocationText(){
  place = coordinates.latitude + "," + coordinates.longitude;
  console.log(place);
  weather();
}

async function weather() {

  const main = document.getElementById('main')
  const articles = document.querySelectorAll("article")

  if(articles != null){
    for(let i = 0; i < articles.length; i++){
      articles[i].remove()
    }
  }

  let weatherDetails;

  const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/" + place)

  weatherDetails = await res.json();

  const mainArticle = document.createElement("article");
  main.appendChild(mainArticle);

  const mainSection = document.createElement("section");
  mainSection.id = "mainSection";
  mainArticle.appendChild(mainSection);

  const region = document.createElement("p");
  region.id = "region";
  mainSection.appendChild(region);

  const dayhour = document.createElement("p");
  dayhour.id = "dayhour";
  mainSection.appendChild(dayhour);

  const imageMain = document.createElement("img");
  imageMain.src = "";
  imageMain.alt = "Weather image";
  imageMain.id = imageMain;
  mainSection.appendChild(imageMain);

  const commentMain = document.createElement("p");
  commentMain.id = "commentMain";
  mainSection.appendChild(commentMain);

  const temp = document.createElement("p");
  temp.id = "temp";
  mainSection.appendChild(temp);

  const precip = document.createElement("p");
  precip.id = "precip";
  mainSection.appendChild(precip);

  const humidity = document.createElement("p");
  humidity.id = "humidity";
  mainSection.appendChild(humidity);

  const wind = document.createElement("p");
  wind.id = "wind";
  mainSection.appendChild(wind);

  /*console.log(weatherDetails);*/

  region.innerHTML = weatherDetails.region;
  dayhour.innerHTML = weatherDetails.currentConditions.dayhour;
  temp.innerHTML = weatherDetails.currentConditions.temp.f + " °F";
  precip.innerHTML = "Precipitation: " + weatherDetails.currentConditions.precip;
  humidity.innerHTML = "Humidity: " + weatherDetails.currentConditions.humidity;
  wind.innerHTML = "Wind Speed: " + weatherDetails.currentConditions.wind.mile + " mph";
  commentMain.innerHTML = weatherDetails.currentConditions.comment;
  imageMain.src = weatherDetails.currentConditions.iconURL;

  const newArticle = document.createElement("article");
  newArticle.id = "weatherArticle";
  main.appendChild(newArticle);

  let week = weatherDetails.next_days;

  week.slice(1).forEach((week =>{

    const newSection = document.createElement("section");

    const day = document.createElement ("p");
    day.innerHTML = week.day;
    /*console.log(week.day);*/

    const comment = document.createElement ("p");
    comment.innerHTML = week.comment;

    const max = document.createElement ("p");
    max.innerHTML = week.max_temp.f + " °F";
    max.classList.add("maxtemp");

    const min = document.createElement ("p");
    min.innerHTML = week.min_temp.f + " °F";
    min.classList.add("mintemp");

    const image = document.createElement ("img");
    image.src = week.iconURL;

    newSection.appendChild(day);
    newSection.appendChild(image);
    newSection.appendChild(comment);
    newSection.appendChild(max);
    newSection.appendChild(min);
    newArticle.appendChild(newSection);

  }));
}
