document.getElementById('namedLocationButton').addEventListener("click", namedLocationText);

document.getElementById('geolocationButton').addEventListener("click", geolocationText);

let place;
let coordinates;
let created = 0;

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

  const region = document.getElementById('region');
  const dayhour = document.getElementById('dayhour')
  const temp = document.getElementById('temp')
  const precip = document.getElementById('precip')
  const humidity = document.getElementById('humidity')
  const wind = document.getElementById('wind')
  const commentMain = document.getElementById('commentMain')
  const imageMain = document.getElementById('imageMain')
  const main = document.getElementById('main')


  let weatherDetails;

  const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/" + place)

  weatherDetails = await res.json();

  /*console.log(weatherDetails);*/

  region.innerHTML = weatherDetails.region;
  dayhour.innerHTML = weatherDetails.currentConditions.dayhour;
  temp.innerHTML = weatherDetails.currentConditions.temp.f + " °F";
  precip.innerHTML = "Precipitation: " + weatherDetails.currentConditions.precip;
  humidity.innerHTML = "Humidity: " + weatherDetails.currentConditions.humidity;
  wind.innerHTML = "Wind Speed: " + weatherDetails.currentConditions.wind.mile + " mph";
  commentMain.innerHTML = weatherDetails.currentConditions.comment;
  imageMain.src = weatherDetails.currentConditions.iconURL;

  if(created == 1){
    main.removeChild(main.lastElementChild);
  }

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
  created = 1;
}
