const API_KEY = "336a3c9f-4fb8-4c51-ab2e-4c7b613909e5";

const ipDomain = document.querySelector("#ip_domain_input");
const ipInfo = document.querySelector("#ip_info");
const locationInfo = document.querySelector("#location_info");
const timezoneInfo = document.querySelector("#timezone_info");
const ispInfo = document.querySelector("#isp_info");
const getIpButton = document.querySelector("#getIp");
const customIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
});

let response;
let response2;
let map;

// alert("jello");

async function ip_And_Domain_Getter(customInput) {
  // response = await fetch(`http://ip-api.com/json/`);
  let apiUrl = `https://apiip.net/api/check?accessKey=${API_KEY}`;
  if (customInput) {
    apiUrl += `&ip=${customInput}`;
  }

  response = await fetch(apiUrl);

  const data = await response.json();

  console.log(data);
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

  const ip = data.ip;

  console.log(data);
  ipDomain.placeholder = ip;
  ipInfo.innerText = ip;
  locationInfo.innerText = `${data.countryName}, ${data.city}, ${data.regionName}`;

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------

  if (map) {
    map.remove();
  }
  map = L.map("map").setView([data.latitude, data.longitude], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker([data.latitude, data.longitude], { icon: customIcon }).addTo(map);

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}

ip_And_Domain_Getter((customInput = null));

getIpButton.addEventListener("click", function () {
  ip_And_Domain_Getter(ipDomain.value);
});

async function getIsp() {
  if (customInput) {
    response2 = await fetch(`https://ipapi.co/${customInput}/json/`);
  } else {
    response2 = await fetch(`https://ipapi.co/json/`);
  }
  // alert("reached");

  let data = await response2.json();

  console.log("first");
  console.log(data);
  if (!data) {
    return;
  } else if (data.org.length > 22) {
    ispInfo.innerText = `${data.org.slice(0, 15)}....`;
  } else {
    ispInfo.innerText = data.org;
  }
  ispInfo.title = data.org;

  timezoneInfo.innerText = `UTC ${data.utc_offset}`;
}

getIsp(customInput);
