import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const countryCoords = {
  india: [20.5937, 78.9629],
  us: [37.0902, -95.7129],
  uk: [55.3781, -3.436],
  canada: [56.1304, -106.3468],
  russia: [60.524, 40.3188],
  china: [35.8617, 104.1954],
  japan: [36.2048, 138.2529],
  southkorea: [35.9078, 127.7669],
  australia: [-25.2744, 133.7751],
  nigeria: [7.1881, 3.0936],
  southafrica: [-30.4161, 22.9375],
  brazil: [-14.235, -51.9253],
  germany: [51.1657, 10.4515],
  france: [46.2276, 2.2137],
  italy: [41.8719, 12.5674],
  mexico: [23.6345, -102.5528],
  argentina: [-38.4161, -63.6167],
};

const apiCountryNames = {
  us: "united states",
  uk: "united kingdom",
  southkorea: "south korea",
};

const words = ["Earth", "Search", "Weather", "Travel"];

const EarthPage = () => {
  const globeEl = useRef();
  const [typingText, setTypingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

 // Typing effect
useEffect(() => {
  let wordIndex = 0;
  let charIndex = 0;
  let typing = true; // true = typing, false = erasing

  const interval = setInterval(() => {
    const currentWord = words[wordIndex];
    if (typing) {
      if (charIndex < currentWord.length) {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      } else {
        typing = false; // switch to erase
        setTimeout(() => {}, 3000); // pause at full word
      }
    } else {
      if (charIndex > 0) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        typing = true; // switch to next word
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
  }, 250); // adjust speed

  return () => clearInterval(interval); // cleanup
}, []);


  // Fetch country data + zoom
  const zoomToCountry = async (country) => {
    if (!countryCoords[country]) return;
    setLoading(true);

    try {
      const [lat, lng] = countryCoords[country];
      globeEl.current.pointOfView({ lat, lng, altitude: 1.5 }, 1500);

      const apiName = apiCountryNames[country] || country;
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          apiName
        )}?fullText=true`
      );
      const [data] = await res.json();
      const capital = data.capital?.[0] || "N/A";
      const population = data.population?.toLocaleString() || "N/A";
      const flag = data.flags?.png || "";
      const [lat1, lon1] = data.latlng;

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=df83d9ad8fb63535e2dece792e6ef6d3&units=metric`
      );
      const weatherData = await weatherRes.json();
      const temp = Math.round(weatherData.main.temp);
      const condition = weatherData.weather[0].main;
      const weather = `${temp}°C, ${condition}`;

      let localTime = "N/A";
      try {
        const timeRes = await fetch(
          `https://timeapi.io/api/Time/current/coordinate?latitude=${lat1}&longitude=${lon1}`
        );
        const timeJson = await timeRes.json();
        if (timeJson.time) {
          const [hourStr, minuteStr] = timeJson.time.split(":");
          let hour = parseInt(hourStr);
          const ampm = hour >= 12 ? "PM" : "AM";
          hour = hour % 12;
          if (hour === 0) hour = 12;
          localTime = `${hour}:${minuteStr} ${ampm}`;
        }
      } catch {}

      setInfo({
        name: data.name.common,
        capital,
        population,
        flag,
        weather,
        time: localTime,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex bg-gray-900">
      {/* Left Side: Controls + Info */}
      <div className="w-1/3 p-5 flex flex-col gap-6 text-white">
        <div className="text-3xl font-bold">{typingText}</div>

        <div>
          <select
            onChange={(e) => zoomToCountry(e.target.value)}
            className="p-3 rounded-lg bg-white/10 text-white backdrop-blur border border-white/30 w-full"
          >
            <option value="">Select a country</option>
            {Object.keys(countryCoords).map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-white text-lg">Loading...</div>
        )}

        {info && (
          <div className="bg-white/10 backdrop-blur-xl text-black p-5 rounded-2xl shadow-lg flex flex-col gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <img src={info.flag} alt="flag" className="w-8 h-6 rounded" />
              {info.name}
            </h2>
            <p>🌡 Weather: {info.weather}</p>
            <p>🌆 Capital: {info.capital}</p>
            <p>🕒 Time: {info.time}</p>
            <p>🌐 Population: {info.population}</p>
          </div>
        )}
      </div>

      {/* Right Side: Globe */}
      <div className="w-2/3 h-full relative">
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          width={window.innerWidth * 0.65} // smaller globe
          height={window.innerHeight}
        />
      </div>
    </div>
  );
};

export default EarthPage;
