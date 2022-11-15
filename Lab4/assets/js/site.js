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
  const article = document.getElementById('weatherArticle')

  let weatherDetails;

  const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/" + namedLocation.value)

    weatherDetails = await res.json();

    /*console.log(weatherDetails); */

    region.innerHTML = weatherDetails.region;
    dayhour.innerHTML = weatherDetails.currentConditions.dayhour;
    temp.innerHTML = weatherDetails.currentConditions.temp.f + " °F";
    precip.innerHTML = weatherDetails.currentConditions.precip;
    humidity.innerHTML = weatherDetails.currentConditions.humidity;
    wind.innerHTML = weatherDetails.currentConditions.wind.mile + " mph";
    commentMain.innerHTML = weatherDetails.currentConditions.comment;
    imageMain.src = weatherDetails.currentConditions.iconURL;

    weatherDetails.next_days.forEach((week =>{

        const newSection = document.createElement("section");

        const day = document.createElement ("p");
        day.innerHTML = week.day;
        /*console.log(week.day);*/

        const comment = document.createElement ("p");
        comment.innerHTML = week.comment;

        const max = document.createElement ("p");
        max.innerHTML = week.max_temp.f + " °F";

        const min = document.createElement ("p");
        min.innerHTML = week.min_temp.f + " °F";

        const image = document.createElement ("img");
        image.src = week.iconURL;

        newSection.appendChild(day);
        newSection.appendChild(comment);
        newSection.appendChild(max);
        newSection.appendChild(min);
        newSection.appendChild(image);
        article.appendChild(newSection);

    }));

}
