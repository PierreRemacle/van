import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Castle,
  Landmark,
  Clock,
  Printer,
  Lock,
} from 'lucide-react';
import { CHAPTERS, DEFAULT_UNLOCKED, fetchUnlockedChapters } from './lib/unlock';

const coverIconClass = "w-16 h-16 mx-auto mb-4 text-amber-100/70";

const pagesData = [
  // ---- TOME I: FRIDAY ----
  { id: 0, type: 'book-cover', tome: 'I', day: 'FRIDAY', title: "The High Fens & Malmedy", subtitle: "Belgium: Forests, Dark Waters & High Peat Bogs", description: "A private traveler's detailed fascicule containing custom waypoints and deep nature reserves.", icon: <Leaf className={coverIconClass} />, chapter: 'Friday' },
  { id: 1, type: 'day-cover', day: "FRIDAY", title: "The High Fens & Malmedy", notes: ["Van pickup in Brussels at 12:00 sharp", "Drive direction: East towards Malmedy", "Focus: Forests, dark waters, and high peat bogs"], icon: <Leaf className="w-12 h-12 text-emerald-800" />, chapter: 'Friday' },
  { id: 2, type: 'waypoints', day: "FRIDAY", stops: [
    { pinNumber: 1, title: "Cascade de Bayehon", location: "Longfaye, High Fens" },
    { pinNumber: 2, title: "Reinhardstein Castle", location: "Ovifat, Robertville" },
    { pinNumber: 3, title: "Noir Flohay", location: "High Fens Nature Reserve" },
    { pinNumber: 4, title: "Lake Robertville", location: "Robertville, Waimes" },
  ], chapter: 'Friday' },
  { id: 3, type: 'content', pinNumber: 1, location: "Longfaye, High Fens", title: "Cascade de Bayehon", description: "The highest waterfall in Belgium's eastern region, tucked away in an enchanting, mossy ravine. The water tumbling down the red quartzite rocks has a striking, naturally copper-colored tint caused by the heavy acidity and peat concentration of the High Fens.", imageUrl: "/images/cascade-de-bayehon.jpg", chapter: 'Friday' },
  { id: 4, type: 'content', pinNumber: 2, location: "Ovifat, Robertville", title: "Reinhardstein Castle", description: "Rising defiantly out of a steep, densely wooded river valley, Reinhardstein Castle is a breathtaking medieval fortress carved directly from the dark slate cliffside. Originally constructed in 1354.", imageUrl: "/images/reinhardstein-castle.jpg", chapter: 'Friday' },
  { id: 5, type: 'content', pinNumber: 3, location: "High Fens Nature Reserve", title: "Noir Flohay", description: "Noir Flohay is one of the most mysterious and hauntingly beautiful areas of the High Fens nature reserve. Ancient, dead forest where bleached, skeletal trunks of Scots pines rise silently out of a vast, misty peat bog.", imageUrl: "/images/noir-flohay.jpg", chapter: 'Friday' },
  { id: 6, type: 'content', pinNumber: 4, location: "Robertville, Waimes", title: "Lake Robertville", description: "Nestled adjacent to the Reinhardstein gorge, Lake Robertville is a vast, tranquil reservoir framed by steep hills of dense pine and beech forests. The dark, glassy waters reflect the sky.", imageUrl: "/images/lake-robertville.jpg", chapter: 'Friday' },
  { id: 7, type: 'back-cover', title: "End of Tome I", description: "Rest well in Malmedy. Tomorrow the road turns east, into the shadows and spires of Cologne.", chapter: 'Friday' },

  // ---- TOME II: SATURDAY ----
  { id: 8, type: 'book-cover', tome: 'II', day: 'SATURDAY', title: "Cologne: History & Shadows", subtitle: "Germany: Roman Ruins, Gothic Arches & Subterranean Chambers", description: "A private traveler's detailed fascicule containing custom waypoints and historical shadows.", icon: <Landmark className={coverIconClass} />, chapter: 'Saturday' },
  { id: 9, type: 'day-cover', day: "SATURDAY", title: "Cologne: History & Shadows", notes: ["Depart Malmedy by 08:30", "Strict reservation: Melaten Cemetery at 11:11", "Focus: Ancient Roman ruins, Gothic arches, and subterranean chambers"], icon: <Landmark className="w-12 h-12 text-neutral-800" />, chapter: 'Saturday' },
  { id: 10, type: 'waypoints', day: "SATURDAY", stops: [
    { pinNumber: 5, title: "Melaten-Friedhof (11:11)", location: "Cologne, Aachener Str." },
    { pinNumber: 6, title: "Kölner Dom", location: "Domkloster, Cologne Center" },
    { pinNumber: 7, title: "Odonien Scrap Park", location: "Hornstraße, Cologne" },
    { pinNumber: 8, title: "Basilika St. Ursula", location: "Ursulaplatz, Cologne" },
    { pinNumber: 9, title: "The Praetorium", location: "Kleine Budengasse, Cologne" },
    { pinNumber: 10, title: "Drachenfels Ruins", location: "Königswinter, Rhine" },
  ], chapter: 'Saturday' },
  { id: 11, type: 'content', pinNumber: 5, location: "Cologne, Aachener Str.", title: "Melaten-Friedhof (11:11)", description: "Known as the 'City of the Dead', Melaten-Friedhof is Cologne's most historic and atmospheric cemetery, sprawling over 43 hectares of parkland. A labyrinth of grand, ivy-draped mausoleums.", imageUrl: "/images/melaten-friedhof.jpg", chapter: 'Saturday' },
  { id: 12, type: 'content', pinNumber: 6, location: "Domkloster, Cologne Center", title: "Kölner Dom", description: "The Cologne Cathedral is a monument of staggering scale and Gothic ambition, dominating the city's skyline with its twin spires. Inside, the cavernous nave is bathed in mystical, multicolored light.", imageUrl: "/images/kolner-dom.jpg", chapter: 'Saturday' },
  { id: 13, type: 'content', pinNumber: 7, location: "Hornstraße, Cologne", title: "Odonien Scrap Park", description: "A surreal, chaotic, and inspiring open-air scrap metal sculpture park, cultural center, and artist sanctuary tucked away in Cologne's industrial heart. A labyrinth of kinetic steel structures.", imageUrl: "/images/odonien.jpg", chapter: 'Saturday' },
  { id: 14, type: 'content', pinNumber: 8, location: "Ursulaplatz, Cologne", title: "Basilika St. Ursula", description: "Basilika St. Ursula holds one of the most macabre and breathtaking secrets of medieval religious history. Beneath its Romanesque arches lies the 'Golden Chamber' (Goldene Kammer), lined with thousands of human bones arranged in geometric patterns.", imageUrl: "/images/basilika-st-ursula.jpg", chapter: 'Saturday' },
  { id: 15, type: 'content', pinNumber: 9, location: "Kleine Budengasse, Cologne", title: "The Praetorium", description: "Hidden beneath modern streets, descend underground to walk among the massive stone foundations, structural walls, and sewage canals of the ancient Roman Governor's Palace.", imageUrl: "/images/praetorium.jpg", chapter: 'Saturday' },
  { id: 16, type: 'content', pinNumber: 10, location: "Königswinter, Rhine", title: "Drachenfels Ruins", description: "Perched on a steep volcanic hill overlooking the Rhine, Drachenfels is a legendary peak. At its summit lie the rugged, wind-swept ruins of a 12th-century castle.", imageUrl: "/images/drachenfels.jpg", chapter: 'Saturday' },
  { id: 17, type: 'back-cover', title: "End of Tome II", description: "The Rhine glimmers behind you. Ahead: the volcanic craters and hidden castles of the Eifel.", chapter: 'Saturday' },

  // ---- TOME III: SUNDAY ----
  { id: 18, type: 'book-cover', tome: 'III', day: 'SUNDAY', title: "Castles & Volcanic Lands", subtitle: "Germany: Hidden Valleys, Suspension Heights & Volcanic Craters", description: "A private traveler's detailed fascicule containing custom waypoints and deep nature reserves.", icon: <Castle className={coverIconClass} />, chapter: 'Sunday' },
  { id: 19, type: 'day-cover', day: "SUNDAY", title: "Castles & Volcanic Lands", notes: ["Wake up near Lanatrekking Maifeld", "Embark early to beat crowds at Eltz", "Focus: Hidden valleys, suspension heights, and volcanic craters"], icon: <Castle className="w-12 h-12 text-amber-900" />, chapter: 'Sunday' },
  { id: 20, type: 'waypoints', day: "SUNDAY", stops: [
    { pinNumber: 11, title: "Burg Eltz", location: "Wierschem, Elzbach Valley" },
    { pinNumber: 12, title: "Eagle & Wolf Park Kasselburg", location: "Kasselburg, Pelm" },
    { pinNumber: 13, title: "Cochem Castle", location: "Cochem, Moselle River" },
    { pinNumber: 14, title: "Schalkenmehrener Maar", location: "Daun, Volcanic Eifel" },
    { pinNumber: 15, title: "Monreal Medieval Village", location: "Monreal, Elz Valley" },
    { pinNumber: 16, title: "Geierlay Suspension Bridge", location: "Mörsdorf, Hunsrück" },
    { pinNumber: 17, title: "Dreimühlen Waterfall", location: "Üxheim-Ahütte, Eifel" },
  ], chapter: 'Sunday' },
  { id: 21, type: 'content', pinNumber: 11, location: "Wierschem, Elzbach Valley", title: "Burg Eltz", description: "Tucked deep inside a pristine, heavily forested river valley, Burg Eltz is the quintessential medieval castle. Remarkably untouched for over 850 years.", imageUrl: "/images/burg-eltz.jpg", chapter: 'Sunday' },
  { id: 22, type: 'content', pinNumber: 12, location: "Kasselburg, Pelm", title: "Eagle & Wolf Park Kasselburg", description: "Set in a dense forest around a historic 12th-century castle, this is a wildlife haven housing the largest pack of timber wolves in Western Europe.", imageUrl: "/images/kasselburg-wolf.jpg", chapter: 'Sunday' },
  { id: 23, type: 'content', pinNumber: 13, location: "Cochem, Moselle River", title: "Cochem Castle", description: "Reconstructed as a breathtaking Neo-Gothic masterpiece in the 19th century, Cochem Castle sits proudly atop a steep, vine-covered hill above the Moselle River.", imageUrl: "/images/cochem-castle.jpg", chapter: 'Sunday' },
  { id: 24, type: 'content', pinNumber: 14, location: "Daun, Volcanic Eifel", title: "Schalkenmehrener Maar", description: "A geological masterpiece of the Volcanic Eifel—a deep, circular volcanic crater lake created by massive steam explosions. The water is an incredibly rich, deep blue.", imageUrl: "/images/schalkenmehrener-maar.jpg", chapter: 'Sunday' },
  { id: 25, type: 'content', pinNumber: 15, location: "Monreal, Elz Valley", title: "Monreal Medieval Village", description: "A beautifully preserved, historic medieval village hidden in the narrow Elz valley. Characterized by stunning half-timbered houses and twin castle ruins.", imageUrl: "/images/monreal.jpg", chapter: 'Sunday' },
  { id: 26, type: 'content', pinNumber: 16, location: "Mörsdorf, Hunsrück", title: "Geierlay Suspension Bridge", description: "Spanning 360 meters across a deep, forested valley, the Geierlay Suspension Bridge is a masterpiece of minimalist modern engineering, suspended 100 meters above the canopy.", imageUrl: "/images/geierlay.jpg", chapter: 'Sunday' },
  { id: 27, type: 'content', pinNumber: 17, location: "Üxheim-Ahütte, Eifel", title: "Dreimühlen Waterfall", description: "A rare and mesmerizing geological wonder where thick layers of green, velvet-like moss calcify and turn to solid stone. A living, breathing forest sculpture.", imageUrl: "/images/dreimuhlen-waterfall.jpg", chapter: 'Sunday' },
  { id: 28, type: 'back-cover', title: "End of Tome III", description: "One more sunrise before the wheel turns back toward Brussels. Sleep near the Maifeld.", chapter: 'Sunday' },

  // ---- TOME IV: MONDAY ----
  { id: 29, type: 'book-cover', tome: 'IV', day: 'MONDAY', title: "The Return via Eifel", subtitle: "Germany: Ancient Beech Forests & High Viewpoints", description: "A private traveler's detailed fascicule containing custom waypoints for the journey home.", icon: <Clock className={coverIconClass} />, chapter: 'Monday' },
  { id: 30, type: 'day-cover', day: "MONDAY", title: "The Return via Eifel", notes: ["Crucial: Van must be returned in Brussels by 15:00", "Morning exploration only", "Focus: Ancient beech forests, high viewpoints"], icon: <Clock className="w-12 h-12 text-slate-800" />, chapter: 'Monday' },
  { id: 31, type: 'waypoints', day: "MONDAY", stops: [
    { pinNumber: 18, title: "Eifel National Park", location: "North Rhine-Westphalia" },
    { pinNumber: 19, title: "Monschau", location: "Monschau, Rur Valley" },
    { pinNumber: 20, title: "Ordensburg Vogelsang", location: "Schleiden, Eifel National Park" },
    { pinNumber: 21, title: "Wilder Kermeter & Hirschley", location: "Heimbach, Kermeter Ridge" },
    { pinNumber: 22, title: "Urfttalsperre", location: "Gemünd, Schleiden" },
  ], chapter: 'Monday' },
  { id: 32, type: 'content', pinNumber: 18, location: "North Rhine-Westphalia", title: "Eifel National Park", description: "A vast, protected reserve of returning wilderness, where ancient beech and oak forests are being left undisturbed. Home to wildcats, black storks, and rare mosses.", imageUrl: "/images/eifel-national-park.jpg", chapter: 'Monday' },
  { id: 33, type: 'content', pinNumber: 19, location: "Monschau, Rur Valley", title: "Monschau", description: "A picturesque, historic town nestled in a steep, narrow mountain valley. Famous for half-timbered houses, winding cobblestone streets, and the Rur River.", imageUrl: "/images/monschau.jpg", chapter: 'Monday' },
  { id: 34, type: 'content', pinNumber: 20, location: "Schleiden, Eifel National Park", title: "Ordensburg Vogelsang", description: "A massive stone complex overlooking the Urft reservoir, built between 1934 and 1936 as one of the Nazi Party's 'Ordensburgen' — elite training camps used to indoctrinate and drill future leaders of the SS and NSDAP. Used as a military training area after the war, it has since been transformed into an international center for historical education confronting this past.", imageUrl: "/images/ordensburg-vogelsang.jpg", chapter: 'Monday' },
  { id: 35, type: 'content', pinNumber: 21, location: "Heimbach, Kermeter Ridge", title: "Wilder Kermeter & Hirschley", description: "The Wilder Kermeter is a sprawling, ancient beech forest ridge. The Hirschley Viewpoint offers breathtaking panoramic vistas of the Rur reservoir.", imageUrl: "/images/wilder-kermeter.jpg", chapter: 'Monday' },
  { id: 36, type: 'content', pinNumber: 22, location: "Gemünd, Schleiden", title: "Urfttalsperre", description: "One of Germany's oldest large dams, this curved masonry gravity wall was completed in 1905 to tame the Urft river, creating the vast Urftsee reservoir that Ordensburg Vogelsang was built to overlook. A striking feat of early 20th-century engineering, its sweeping curve and lone tower rise dramatically from the water.", imageUrl: "/images/urfttalsperre.jpg", chapter: 'Monday' },
  { id: 37, type: 'back-cover', title: "Bon Voyage", description: "Safe travels on the winding roads of Belgium and Germany. Keep the engine cool and the spirit adventurous.", chapter: 'Monday' },
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState('Friday');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [unlockedChapters, setUnlockedChapters] = useState(DEFAULT_UNLOCKED);
  const chapterPages = pagesData.filter(p => p.chapter === activeChapter);
  // Desktop viewer only: a black endpaper precedes the cover so the on-screen
  // book opens like a real hardback (blank left page, cover on the right).
  const viewerPages = [{ id: `black-${activeChapter}`, type: 'black-page' }, ...chapterPages];
  const totalSpreads = Math.ceil(viewerPages.length / 2);
  const activeTome = chapterPages.find(p => p.type === 'book-cover')?.tome;
  const isUnlocked = (ch) => unlockedChapters.includes(ch);

  useEffect(() => {
    fetchUnlockedChapters().then(setUnlockedChapters);
  }, []);

  // If the active chapter gets locked (or was never unlocked), fall back to
  // the first chapter that actually is unlocked.
  useEffect(() => {
    if (!unlockedChapters.includes(activeChapter)) {
      const fallback = CHAPTERS.find(ch => unlockedChapters.includes(ch));
      if (fallback) {
        setActiveChapter(fallback);
        setCurrentSpread(0);
        setMobilePage(0);
      }
    }
  }, [unlockedChapters]);

  const selectChapter = (ch) => {
    if (!isUnlocked(ch)) return;
    setActiveChapter(ch);
    setCurrentSpread(0);
    setMobilePage(0);
  };

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) setCurrentSpread(c => c + 1);
  };
  const handlePrev = () => {
    if (currentSpread > 0) setCurrentSpread(c => c - 1);
  };

  // Mobile viewer: pages are shown one at a time, so it flips through
  // chapterPages directly instead of the spread-paired viewerPages.
  const handleMobileNext = () => {
    if (mobilePage < chapterPages.length - 1) setMobilePage(p => p + 1);
  };
  const handleMobilePrev = () => {
    if (mobilePage > 0) setMobilePage(p => p - 1);
  };

  const PageRenderer = ({ page, side }) => {
    const outerRounding = side === 'left' ? 'rounded-l-2xl' : side === 'right' ? 'rounded-r-2xl' : 'rounded-2xl';
    // The mobile single-page card is much narrower than the desktop spread,
    // so it gets tighter padding to leave more room for actual content.
    const pagePad = side === 'single' ? 'p-4' : 'p-8';

    if (!page) return <div className={`w-full h-full bg-[#f4ebd8] ${outerRounding}`}></div>;

    if (page.type === 'black-page') {
      return <div className={`w-full h-full bg-black ${outerRounding}`}></div>;
    }

    const bindingClasses = side === 'left'
      ? 'rounded-l-2xl border-r-2 border-stone-300 pr-10 pl-8 shadow-[-12px_0_24px_rgba(0,0,0,0.12)_inset] bg-stone-50'
      : side === 'right'
      ? 'rounded-r-2xl border-l-2 border-stone-100 pl-10 pr-8 shadow-[12px_0_24px_rgba(0,0,0,0.12)_inset] bg-stone-50'
      : 'rounded-2xl bg-stone-50';

    if (page.type === 'book-cover' || page.type === 'back-cover') {
      return (
        <div className={`w-full h-full bg-stone-900 text-amber-100 flex flex-col items-center justify-center ${pagePad} text-center ${side === 'single' ? 'rounded-2xl' : 'border-l-8 border-stone-950 rounded-r-2xl'} shadow-2xl relative overflow-hidden`}>
          {page.tome && <p className="text-xs uppercase tracking-[0.3em] mb-4 opacity-60">Tome {page.tome}</p>}
          {page.icon}
          <h1 className="text-3xl font-serif">{page.title}</h1>
          {page.subtitle && <p className="text-xs uppercase tracking-widest mt-4 opacity-60">{page.subtitle}</p>}
          {page.description && <p className="text-sm font-serif mt-6 max-w-xs opacity-80 leading-relaxed">{page.description}</p>}
        </div>
      );
    }

    if (page.type === 'day-cover') {
      return (
        <div className={`w-full h-full ${pagePad} bg-[#f9f5eb] ${bindingClasses} flex flex-col justify-center`}>
          {page.icon}
          <h2 className="text-4xl font-serif text-stone-800 mt-4">{page.day}</h2>
          <h3 className="text-xl font-serif mt-2 text-stone-600">{page.title}</h3>
          <ul className="mt-8 space-y-2">
            {page.notes.map((n, i) => <li key={i} className="text-sm font-serif text-stone-700">· {n}</li>)}
          </ul>
        </div>
      );
    }

    if (page.type === 'waypoints') {
      return (
        <div className={`w-full h-full ${pagePad} bg-[#f9f5eb] ${bindingClasses} flex flex-col items-center justify-center text-center`}>
          <div className="text-xs font-sans font-bold text-amber-800 uppercase tracking-wider mb-1">Waypoints</div>
          <h2 className="text-2xl font-serif text-stone-800 mb-6">{page.day}</h2>
          <ul className="w-full max-w-xs space-y-4 overflow-y-auto">
            {page.stops.map(s => (
              <li key={s.pinNumber} className="flex items-start gap-3 text-left">
                <span className="shrink-0 w-6 h-6 rounded-full border border-amber-800 text-amber-800 text-xs font-bold flex items-center justify-center mt-0.5">{s.pinNumber}</span>
                <div>
                  <div className="text-sm font-serif font-bold text-stone-900">{s.title}</div>
                  <div className="text-xs font-sans text-stone-600">{s.location}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className={`w-full h-full flex flex-col ${pagePad} bg-[#fdfdfa] ${bindingClasses}`}>
        <div className="mb-4 aspect-[4/3] bg-stone-100 relative shadow-md">
          <img src={page.imageUrl} alt={page.title} className="w-full h-full object-cover grayscale-[20%] opacity-90" />
          {page.pinNumber && (
            <div className="absolute bottom-4 right-4 flex items-center justify-center">
              <svg className="w-10 h-10 drop-shadow-lg" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#1e1b18" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="12" cy="9" r="4.5" fill="#fdfdfa" />
                <text x="12" y="13" textAnchor="middle" style={{ fontSize: '9px', fontWeight: 'bold' }} className="fill-stone-900">{page.pinNumber}</text>
              </svg>
            </div>
          )}
        </div>
        <div className="text-xs font-sans font-bold text-amber-800 uppercase tracking-wider mb-2">{page.location}</div>
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{page.title}</h3>
        <p className="text-sm font-serif text-stone-700 leading-relaxed">{page.description}</p>
      </div>
    );
  };

  // Full-bleed A4 page, used only in the print stylesheet so each entry
  // lands on its own sheet of paper when the journal is printed.
  const PrintPage = ({ page }) => {
    const base = "w-[210mm] h-[297mm] box-border flex flex-col overflow-hidden";
    const breakStyle = { breakAfter: 'page', pageBreakAfter: 'always' };

    if (page.type === 'book-cover' || page.type === 'back-cover') {
      return (
        <div style={breakStyle} className={`${base} bg-stone-900 text-amber-100 items-center justify-center p-[20mm] text-center`}>
          {page.tome && <p className="text-sm uppercase tracking-[0.3em] mb-4 opacity-70">Tome {page.tome}</p>}
          {page.icon}
          <h1 className="text-4xl font-serif">{page.title}</h1>
          {page.subtitle && <p className="text-xs uppercase tracking-widest mt-4 opacity-70">{page.subtitle}</p>}
          {page.description && <p className="text-sm font-serif mt-6 max-w-sm opacity-90 leading-relaxed">{page.description}</p>}
        </div>
      );
    }

    if (page.type === 'day-cover') {
      return (
        <div style={breakStyle} className={`${base} bg-[#f9f5eb] items-start justify-center p-[20mm]`}>
          {page.icon}
          <h2 className="text-5xl font-serif text-stone-800 mt-4">{page.day}</h2>
          <h3 className="text-2xl font-serif mt-2 text-stone-600">{page.title}</h3>
          <ul className="mt-10 space-y-3">
            {page.notes.map((n, i) => <li key={i} className="text-base font-serif text-stone-700">· {n}</li>)}
          </ul>
        </div>
      );
    }

    if (page.type === 'waypoints') {
      return (
        <div style={breakStyle} className={`${base} bg-[#f9f5eb] p-[20mm] items-center justify-center text-center`}>
          <div className="text-sm font-sans font-bold text-amber-800 uppercase tracking-wider mb-2">Waypoints</div>
          <h2 className="text-4xl font-serif text-stone-800 mb-10">{page.day}</h2>
          <ul className="w-full max-w-md space-y-6">
            {page.stops.map(s => (
              <li key={s.pinNumber} className="flex items-start gap-4 text-left">
                <span className="shrink-0 w-9 h-9 rounded-full border-2 border-amber-800 text-amber-800 text-base font-bold flex items-center justify-center">{s.pinNumber}</span>
                <div>
                  <div className="text-xl font-serif font-bold text-stone-900">{s.title}</div>
                  <div className="text-sm font-sans text-stone-600">{s.location}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div style={breakStyle} className={`${base} bg-[#fdfdfa] p-[16mm]`}>
        <div className="mb-6 h-[130mm] bg-stone-100 relative shadow-md shrink-0">
          <img src={page.imageUrl} alt={page.title} className="w-full h-full object-cover" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
          {page.pinNumber && (
            <div className="absolute bottom-4 right-4">
              <svg className="w-12 h-12 drop-shadow-lg" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#1e1b18" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="12" cy="9" r="4.5" fill="#fdfdfa" />
                <text x="12" y="13" textAnchor="middle" style={{ fontSize: '9px', fontWeight: 'bold' }} className="fill-stone-900">{page.pinNumber}</text>
              </svg>
            </div>
          )}
        </div>
        <div className="text-sm font-sans font-bold text-amber-800 uppercase tracking-wider mb-2">{page.location}</div>
        <h3 className="text-3xl font-serif font-bold text-stone-900 mb-3">{page.title}</h3>
        <p className="text-base font-serif text-stone-700 leading-relaxed">{page.description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#2c231a] px-1.5 pt-3 pb-28 md:p-8 flex flex-col items-center print:block print:bg-white print:p-0 print:min-h-0">
      {/* @page rule sizes every printed sheet as A4 with no browser margin */}
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #fff; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="hidden md:flex gap-2 mb-8 bg-stone-900/50 p-2 rounded-xl border border-stone-800 flex-wrap justify-center print:hidden">
        {CHAPTERS.map(ch => {
          const unlocked = isUnlocked(ch);
          return (
            <button
              key={ch}
              onClick={() => selectChapter(ch)}
              disabled={!unlocked}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                activeChapter === ch
                  ? 'bg-amber-800 text-white'
                  : unlocked
                  ? 'text-stone-400 hover:text-stone-100'
                  : 'text-stone-600 cursor-not-allowed'
              }`}
            >
              {!unlocked && <Lock className="w-3 h-3" />}
              {ch.toUpperCase()}
            </button>
          );
        })}
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-bold rounded-lg transition bg-stone-700 text-stone-100 hover:bg-amber-800 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> PRINT TOME {activeTome} (A4)
        </button>
      </div>

      {/* Desktop: two-page spread, book-style */}
      <div className="hidden md:flex max-w-4xl w-full aspect-[2/1.3] bg-stone-950 p-4 rounded-3xl border-[6px] border-[#3e3224] shadow-2xl relative overflow-hidden print:hidden">
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/30 to-transparent z-10 pointer-events-none"></div>

        <div className="flex-1 h-full">
          <PageRenderer page={viewerPages[currentSpread * 2]} side="left" />
        </div>
        <div className="flex-1 h-full">
          <PageRenderer page={viewerPages[currentSpread * 2 + 1]} side="right" />
        </div>
      </div>

      <div className="hidden md:flex gap-4 mt-6 print:hidden">
        <button onClick={handlePrev} disabled={currentSpread === 0} className="px-6 py-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronLeft /></button>
        <button onClick={handleNext} disabled={currentSpread >= totalSpreads - 1} className="px-6 py-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronRight /></button>
      </div>

      {/* Mobile: single page at a time, filling the space freed by moving
          navigation into a fixed bottom dock (easier to reach one-handed).
          Height is a fixed viewport calc (not flex-grow) so every page type
          renders at the same size instead of shrinking to fit its content. */}
      <div className="md:hidden w-full flex items-center justify-center print:hidden" style={{ height: 'calc(100dvh - 148px)' }}>
        <div className="h-full max-w-full aspect-[3/4] bg-stone-950 p-1.5 rounded-xl border-2 border-[#3e3224] shadow-2xl relative overflow-hidden">
          <PageRenderer page={chapterPages[mobilePage]} side="single" />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-stone-900/95 backdrop-blur border-t border-stone-800 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] print:hidden">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button onClick={handleMobilePrev} disabled={mobilePage === 0} className="p-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-stone-400 text-xs font-bold tabular-nums">{mobilePage + 1} / {chapterPages.length}</span>
          <button onClick={handleMobileNext} disabled={mobilePage >= chapterPages.length - 1} className="p-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-1.5">
          {CHAPTERS.map(ch => {
            const unlocked = isUnlocked(ch);
            return (
              <button
                key={ch}
                onClick={() => selectChapter(ch)}
                disabled={!unlocked}
                className={`flex-1 px-2 py-1.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center gap-1 ${
                  activeChapter === ch
                    ? 'bg-amber-800 text-white'
                    : unlocked
                    ? 'bg-stone-800/60 text-stone-400'
                    : 'bg-stone-800/30 text-stone-600'
                }`}
              >
                {!unlocked && <Lock className="w-3 h-3" />}
                {ch.slice(0, 3).toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Print-only: only the currently selected tome, one page per A4 sheet,
          so each day's booklet can be printed independently of the others. */}
      <div className="hidden print:block">
        {chapterPages.map(page => <PrintPage key={page.id} page={page} />)}
      </div>
    </div>
  );
}
