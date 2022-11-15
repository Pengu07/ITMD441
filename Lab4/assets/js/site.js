const form = document.getElementById('form');

form.addEventListener('change', weather);

async function weather() {

  const namedLocation = document.getElementById('namedLocation');
  const region = document.getElementById('region');
  const dayhour = document.getElementById('dayhour')
  const temp = document.getElementById('temp')
  const precip = document.getElementById('precip')
  const humidity = document.getElementById('humidity')
  const wind = document.getElementById('wind')
  const commentMain = document.getElementById('commentMain')
  const imageMain = document.getElementById('imageMain')

  let weatherDetails;

  const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/" + namedLocation.value)

    weatherDetails = await res.json();

    console.log(weatherDetails);

    region.innerHTML = weatherDetails.region;
    dayhour.innerHTML = weatherDetails.currentConditions.dayhour;
    temp.innerHTML = weatherDetails.currentConditions.temp.f;
    precip.innerHTML = weatherDetails.currentConditions.precip;
    humidity.innerHTML = weatherDetails.currentConditions.humidity;
    wind.innerHTML = weatherDetails.currentConditions.wind.mile + " mph";
    commentMain.innerHTML = weatherDetails.currentConditions.comment;
    imageMain.src = weatherDetails.currentConditions.iconURL;

}
