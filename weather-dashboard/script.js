const form = document.querySelector('#searchForm');
const input = document.querySelector('#cityInput');
const button = document.querySelector('#searchButton');
const statusText = document.querySelector('#status');

const weatherDescriptions = {
  0:['Clear sky','☀️'],1:['Mainly clear','🌤️'],2:['Partly cloudy','⛅'],3:['Overcast','☁️'],
  45:['Foggy','🌫️'],48:['Depositing rime fog','🌫️'],51:['Light drizzle','🌦️'],53:['Drizzle','🌦️'],55:['Heavy drizzle','🌧️'],
  61:['Light rain','🌦️'],63:['Rain','🌧️'],65:['Heavy rain','🌧️'],71:['Light snow','🌨️'],73:['Snow','🌨️'],75:['Heavy snow','❄️'],
  80:['Rain showers','🌦️'],81:['Rain showers','🌧️'],82:['Heavy showers','⛈️'],95:['Thunderstorm','⛈️'],96:['Thunderstorm with hail','⛈️'],99:['Thunderstorm with hail','⛈️']
};
function describe(code){return weatherDescriptions[code] || ['Variable conditions','🌤️'];}
function dayName(date, options={weekday:'short'}){return new Date(date+'T12:00:00').toLocaleDateString(undefined,options);}
async function getWeather(city){
  button.disabled=true; button.textContent='Searching…'; statusText.textContent='Finding city and fetching live data…';
  try{
    const geoResponse=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if(!geoResponse.ok) throw new Error('Could not reach the location service. Check your internet connection.');
    const geo=await geoResponse.json();
    if(!geo.results?.length) throw new Error(`We couldn't find “${city}”. Try another city name.`);
    const location=geo.results[0];
    const params=new URLSearchParams({latitude:location.latitude,longitude:location.longitude,current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',daily:'weather_code,temperature_2m_max,temperature_2m_min',timezone:'auto',forecast_days:'5'});
    const response=await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if(!response.ok) throw new Error('Weather service is temporarily unavailable. Please try again.');
    const data=await response.json(); render(location,data);
    statusText.textContent='Weather updated successfully.';
  }catch(error){statusText.textContent=error.message || 'Something went wrong. Please try again.';}
  finally{button.disabled=false;button.textContent='Search weather ↗';}
}
function render(location,data){
  const current=data.current, daily=data.daily, [label,emoji]=describe(current.weather_code);
  document.querySelector('#place').textContent=[location.name,location.admin1,location.country].filter((v,i,a)=>v&&a.indexOf(v)===i).join(', ');
  document.querySelector('#updated').textContent=`Updated ${new Date(current.time).toLocaleString([], {weekday:'short',hour:'2-digit',minute:'2-digit'})}`;
  document.querySelector('#weatherIcon').textContent=emoji;
  document.querySelector('#temperature').textContent=`${Math.round(current.temperature_2m)}°`;
  document.querySelector('#condition').textContent=label;
  document.querySelector('#feels').textContent=Math.round(current.apparent_temperature);
  document.querySelector('#humidity').textContent=`${current.relative_humidity_2m}%`;
  document.querySelector('#wind').textContent=`${Math.round(current.wind_speed_10m)} km/h`;
  document.querySelector('#range').textContent=`${Math.round(daily.temperature_2m_min[0])}° / ${Math.round(daily.temperature_2m_max[0])}°C`;
  document.querySelector('#forecast').innerHTML=daily.time.map((date,i)=>{
    const [desc,icon]=describe(daily.weather_code[i]);
    return `<article class="day"><b>${i===0?'Today':dayName(date)}</b><div class="icon" title="${desc}">${icon}</div><strong>${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</strong><small>${desc}</small></article>`;
  }).join('');
}
form.addEventListener('submit',event=>{event.preventDefault();const city=input.value.trim();if(city)getWeather(city);});
getWeather(input.value);
