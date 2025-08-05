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
let map;

// alert("jello");

async function ip_And_Domain_Getter(customInput) {
  // response = await fetch(`http://ip-api.com/json/`);
  if (customInput) {
    response = await fetch(`https://ipapi.co/${customInput}/json/`);
  } else {
    response = await fetch(`https://ipapi.co/json/`);
  }

  const data = await response.json();

  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

  const ip = data.ip;

  console.log(data);
  ipDomain.placeholder = ip;
  ipInfo.innerText = ip;
  locationInfo.innerText = `${data.country}, ${data.city}, ${data.region}`;
  timezoneInfo.innerText = ` UTC ${data.utc_offset} `;
  if (!data) {
    return;
  } else if (data.org.length > 22) {
    ispInfo.innerText = `${data.org.slice(0, 15)}....`;
  } else {
    ispInfo.innerText = data.org;
  }
  ispInfo.title = data.org;

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
