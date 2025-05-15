// app/api/sonnet/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const weatherKey = process.env.WEATHER_API_KEY;

const languageLabels: { [key: string]: string } = {
  en: 'English',
  fr: 'Français',
  de: 'Allemand',
  es: 'Espagnol',
  it: 'Italien',
  pt: 'Portugais',
  nl: 'Néerlandais',
  sv: 'Suédois',
  da: 'Danois',
  fi: 'Finnois',
  pl: 'Polonais',
  cs: 'Tchèque',
  sk: 'Slovaque',
  hu: 'Hongrois',
  ro: 'Roumain',
  bg: 'Bulgare',
  el: 'Grec',
  hr: 'Croate',
  sl: 'Slovène',
  et: 'Estonien',
  lv: 'Letton',
  lt: 'Lituanien',
  ga: 'Irlandais',
  mt: 'Maltais',
  la: 'Latin',
  kl: 'Klingon',
  elv: 'Elvish'
};

export async function POST(req: Request) {
  const { city, lang } = await req.json();
  let resolvedCity = city;

  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(city)) {
    const locRes = await fetch(`https://api.weatherapi.com/v1/search.json?key=${weatherKey}&q=${city}`);
    const locData = await locRes.json();
    if (Array.isArray(locData) && locData.length > 0) {
      resolvedCity = locData[0].name;
    }
  }

  const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`);
  const weather = await weatherRes.json();

  const languageLabel = languageLabels[lang] || 'English';

  const prompt = `Écris un sonnet poétique en ${languageLabel} sur la météo actuelle à ${resolvedCity}. Conditions : ${weather.current.condition.text}, température : ${weather.current.temp_c}°, humidité : ${weather.current.humidity}%.`;

  const chat = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o'
  });

  return NextResponse.json({ sonnet: chat.choices[0].message.content });
}
