const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fd90ed690fmsh8e5b7e10a03fe4cp11f5bajsn10db286c8311',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
};

// Function to convert Fahrenheit to Celsius
const fToC = (fahrenheit) => ((fahrenheit - 32) * 5/9).toFixed(1);

const updateCityWeather = async (city) => {
    try {
        const response = await fetch(`https://open-weather13.p.rapidapi.com/city/${city}/EN`, options);
        const result = await response.json();

        // Convert temperatures to Celsius
        const temp = fToC(result.main.temp);
        const feelsLike = fToC(result.main.feels_like);
        const minTemp = fToC(result.main.temp_min);
        const maxTemp = fToC(result.main.temp_max);
        const humidity = result.main.humidity;
        const windSpeed = result.wind.speed; // in mph
        const windDegree = result.wind.deg;
        const sunrise = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(result.sys.sunset * 1000).toLocaleTimeString();
        const cloudPct = result.clouds.all;

        // Update card display
        document.getElementById('cityName').textContent = city.charAt(0).toUpperCase() + city.slice(1);
        document.getElementById('temp2').textContent = temp;
        document.getElementById('feels_like').textContent = `${feelsLike}°C`;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('humidity2').textContent = humidity;
        document.getElementById('max_temp').textContent = `${maxTemp}°C`;
        document.getElementById('min_temp').textContent = `${minTemp}°C`;
        document.getElementById('wind_speed').textContent = `${windSpeed} mph`;
        document.getElementById('wind_speed2').textContent = windSpeed;
        document.getElementById('wind_degrees').textContent = `${windDegree}°`;

        // Update table if it's one of the predefined cities
        if (['chicago', 'shanghai', 'mumbai', 'delhi'].includes(city.toLowerCase())) {
            document.getElementById(`${city.toLowerCase()}_cloud_pct`).textContent = cloudPct;
            document.getElementById(`${city.toLowerCase()}_feels_like`).textContent = `${feelsLike}°C`;
            document.getElementById(`${city.toLowerCase()}_humidity`).textContent = `${humidity}%`;
            document.getElementById(`${city.toLowerCase()}_max_temp`).textContent = `${maxTemp}°C`;
            document.getElementById(`${city.toLowerCase()}_min_temp`).textContent = `${minTemp}°C`;
            document.getElementById(`${city.toLowerCase()}_sunrise`).textContent = sunrise;
            document.getElementById(`${city.toLowerCase()}_sunset`).textContent = sunset;
            document.getElementById(`${city.toLowerCase()}_wind_degree`).textContent = `${windDegree}°`;
            document.getElementById(`${city.toLowerCase()}_wind_speed`).textContent = `${windSpeed} mph`;
        }

    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
    }
}

// Initial data for predefined cities
const predefinedCities = ['chicago', 'shanghai', 'mumbai', 'delhi'];
Promise.all(predefinedCities.map(city => updateCityWeather(city)))
    .then(() => console.log('All cities loaded'))
    .catch(err => console.error('Error loading initial cities:', err));

// Handle search functionality
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value.trim().toLowerCase();
    if (city) {
        updateCityWeather(city);
        document.getElementById('city').value = ''; // Clear input
    }
});