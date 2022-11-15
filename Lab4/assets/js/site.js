document.getElementById('namedLocationButton').addEventListener("click", namedLocationText);

const geoButton = document.getElementById('geolocationButton');
geoButton.addEventListener("click", geolocationText);

let place;
let coordinates;
let errorCode;
let weatherDetails;

/* Function for when the user searches via location name */
function namedLocationText(){
  const namedLocation = document.getElementById('namedLocation');
  place = namedLocation.value;
  weather();
}

/* Geolocation activation */
navigator.geolocation.getCurrentPosition(coords, error);
function coords(pos){
  coordinates = pos.coords;
  geoButton.disabled = false;
}

function error(err){
  console.log("Error! Geolocation Blocked!")
  document.getElementById("geolocationText").innerHTML = "Geolocation has been disabled."+
  " Enable it and refresh the page to use geolocation.";
  geoButton.disabled = true;
  geoButton.style.display = "none";
  document.getElementById("geolocationLabel").style.display = "none";
}

/* Uses geolocation for the weather API */
function geolocationText(){
  place = coordinates.latitude + "," + coordinates.longitude;
  console.log(place);
  weather();
}

/* The main weather function */
async function weather() {

  const main = document.getElementById('main');
  const articles = document.querySelectorAll("article");

  /* If there are any articles from previous runs, remove them */
  if(articles != null){
    for(let i = 0; i < articles.length; i++){
      articles[i].remove();
    }
  }

  /* Checks for this special character as API does not catch it during testing */
  if(place.includes("#")){
    errorCode = 3;
    errorArticle();
    return;
  }

  const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/" + place);

  /* This is to catch a possible syntax error when invalid input is given */
  try{
    weatherDetails = await res.json();
  }
  catch (e){
    errorCode = 3;
    errorArticle();
    return;
  }

  /* console.log(weatherDetails);*/
  /* If the API was able to find a valid location, create the page */
  if(weatherDetails.region != undefined){

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

    /* Sets the value for each parameter in the main section */
    region.innerHTML = weatherDetails.region;
    dayhour.innerHTML = weatherDetails.currentConditions.dayhour;
    temp.innerHTML = weatherDetails.currentConditions.temp.f + " °F";
    precip.innerHTML = "Precipitation: " + weatherDetails.currentConditions.precip;
    humidity.innerHTML = "Humidity: " + weatherDetails.currentConditions.humidity;
    wind.innerHTML = "Wind Speed: " + weatherDetails.currentConditions.wind.mile + " mph";
    commentMain.innerHTML = weatherDetails.currentConditions.comment;
    imageMain.src = weatherDetails.currentConditions.iconURL;

    /* Adds text to denote the weekly forecast */
    const weeklyArticle = document.createElement("article");
    weeklyArticle.id = "weekly";
    main.appendChild(weeklyArticle);

    const weeklyHeader = document.createElement("h2");
    weeklyHeader.innerHTML = "Next 7 days";
    weeklyArticle.appendChild(weeklyHeader);

    /* Create the 7 day forecast article and section */
    const newArticle = document.createElement("article");
    newArticle.id = "weatherArticle";
    main.appendChild(newArticle);

    /* Set the next 7 days into the week variable */
    let week = weatherDetails.next_days;

    /* Remove the first item and then do a for each.
    The first item in this case displays the same day as the main section.
    That is why we remove it here */
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

  /* In the case of any errors create error section */
  else if(weatherDetails.status == "fail"){

    if(weatherDetails.code == "0"){
      errorCode = 0;
      errorArticle();
    }
    else if(weatherDetails.code == "1"){
      errorCode = 1;
      errorArticle();
    }
    else if(weatherDetails.code == "2"){
      errorCode = 2;
      errorArticle();
    }
    else{
      errorCode = 100;
      errorArticle();
    }
  }
  else{
    errorCode = 100;
    errorArticle();
  }

}

/* The function used for the error article and sections*/
function errorArticle(){
  const failArticle = document.createElement("article");
  main.appendChild(failArticle);

  const failSection = document.createElement("section");
  failSection.id = "failSection";
  failArticle.appendChild(failSection);

  const failCause = document.createElement("p");
  failCause.id = "failText";

  failSection.appendChild(failCause);

  const failText = document.createElement("p");
  failText.id = "failText";

  /* These are all the current error codes and the messages they give */
  if (errorCode == "100"){
    failCause.innerHTML = "Error status: Unspecified error.";
    failText.innerHTML = "An unspecified error has occured! Sorry for any inconvenience. Try another input.";
  }
  else if (errorCode == "0"){
    failCause.innerHTML = "Error status: Location not found";
    failText.innerHTML = "Weather for this location cannot be found, or is not available." +
    " Check for a spelling error, or try a different location.";
  }
  else if (errorCode == "1"){
    failCause.innerHTML = "Error status: " + weatherDetails.message;
    failText.innerHTML = "The following characters: " + weatherDetails.rejected + " cannot be used in your query.";
  }
  else if (errorCode == "2"){
    failCause.innerHTML = "Error status: " + weatherDetails.message;
    failText.innerHTML = "The geolocation search is currently unavailable. Try again later or use"+
    " location search.";
  }
  else if (errorCode == "3"){
    failCause.innerHTML = "Error status: Invalid input";
    failText.innerHTML = "There seems to be an error in the location input. Please check it and try another.";
  }
  failSection.appendChild(failText);
}
