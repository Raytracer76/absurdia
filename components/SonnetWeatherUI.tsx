// app/components/SonnetWeatherUI.tsx
'use client';
import { useState, useEffect } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "pl", label: "Polski" },
  { code: "cs", label: "Čeština" },
  { code: "sk", label: "Slovenčina" },
  { code: "hu", label: "Magyar" },
  { code: "ro", label: "Română" },
  { code: "bg", label: "Български" },
  { code: "el", label: "Ελληνικά" },
  { code: "hr", label: "Hrvatski" },
  { code: "sl", label: "Slovenščina" },
  { code: "et", label: "Eesti" },
  { code: "lv", label: "Latviešu" },
  { code: "lt", label: "Lietuvių" },
  { code: "ga", label: "Gaeilge" },
  { code: "mt", label: "Malti" },
  { code: "la", label: "Latin" },
  { code: "kl", label: "Klingon" },
  { code: "elv", label: "Elvish" }
];

export default function SonnetWeatherUI() {
  const [city, setCity] = useState("");
  const [lang, setLang] = useState("en");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    const supported = languages.find(l => l.code === browserLang);
    if (supported) setLang(browserLang);
  }, []);

  async function getSonnet() {
    setLoading(true);
    setResult("Génération en cours...");
    const res = await fetch("/api/sonnet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, lang })
    });
    const data = await res.json();
    setResult(data.sonnet);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Entrez une ville ou utilisez la localisation"
        className="w-full bg-neutral-800 p-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-neutral-800 p-2 text-white w-full"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>

      <button onClick={getSonnet} className="bg-white text-black px-4 py-2">Obtenir un sonnet météo</button>

      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const loc = `${latitude},${longitude}`;
            const searchRes = await fetch(`https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${loc}`);
            const data = await searchRes.json();
            const resolvedName = Array.isArray(data) && data.length > 0 ? data[0].name : loc;
            setCity(resolvedName);
            setResult("Génération en cours...");
            setLoading(true);
            const res = await fetch(`/api/sonnet`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ city: resolvedName, lang })
            });
            const responseData = await res.json();
            setResult(responseData.sonnet);
            setLoading(false);
          });
        }}
        className="text-sm underline text-blue-400"
      >
        Utiliser ma position
      </button>

      {result && <pre className="mt-4 whitespace-pre-wrap text-sm text-green-300">{result}</pre>}
    </div>
  );
}
