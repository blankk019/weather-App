const apiKey = "a73d890ecddad4288ba8fb453593046c";
const searchBtn = document.getElementById("mySubmitBtn");
searchBtn.addEventListener("click",async (event)=>{
    event.preventDefault();
    const city = document.getElementById("cityName").value.toLowerCase();
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const weatherIcon = document.getElementById("weather-icon");
    const weatherInfo = document.getElementById("weather-info");
    const tempDiv = document.getElementById("temp-div");
    const hourlyForecast = document.getElementById("hourly-forecast");
    try{
        const resolvedResult = await fetch(currentWeatherUrl);
        const data = await resolvedResult.json();
        console.log(data);
        tempDiv.innerHTML = `${Math.round(data.main.temp - 273.15)} °C <br> Humidity: ${Math.floor(data.main.humidity)}` ;
        const iconCode1 = data.weather[0].icon;
        const iconUrl1 = `https://openweathermap.org/img/wn/${iconCode1}@4x.png`;
        weatherIcon.src = iconUrl1;
        weatherIcon.style.display = "block";
        weatherInfo.innerHTML = `${data.weather[0].description}`;
        document.getElementById("citydisplay").innerHTML = `<strong>${capitalizeFirstLetter(city)}</strong>`;
    }
    catch(error){
        console.error(error)
    }

    try{
        resolvedHourly = await fetch(forecastUrl);
        hourlyData = await resolvedHourly.json();
        next24Hours = hourlyData.list.slice(0,8)
        //console.log(hourlyData.list.slice(0,8));
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°C</span>
                </div>
            `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }catch(error){
        console.error(error)
    }
});
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}