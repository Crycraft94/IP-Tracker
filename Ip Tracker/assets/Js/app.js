let map = L.map('map').setView([36.5560362, 53.0524079], 6);
let marker;
const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9]|)\d)$/;

getIp(0);


const icon = L.icon({
  iconUrl:`./assets/images/icon.png`,
  iconSize:[60,60]
});


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function getIp(i){
  let  response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_A5DGcG0Q8bHzFCdExTYFgkt9OZA10&ipAddress=${i}`)
  let data = await response.json();
  let lat = data.location.lat;
  let lng = data.location.lng;
  if(marker){
    map.removeLayer(marker);
  }
  marker = L.marker([lat,lng],{icon:icon}).addTo(map);

  renderResult(data);
  return [lat,lng];
} 



function renderResult(data){

  $("#ip-address").html(data.ip);
  $("#location").html(data.location.country);
  $("#timezone").html(data.location.timezone);
  $("#isp").html(data.isp);
}



$("#bar").submit(async (e) => {
  e.preventDefault();
  let ip = $("#give-ip").val().trim();
  if(regex.test(ip)){
    let x = await getIp(ip);
    map.flyTo(x);
    if(marker){
      map.removeLayer(marker);
    }
    marker = L.marker(x,{icon:icon}).addTo(map);
  }
  else{
    Swal.fire('Enter an IP please!')
  }

});




