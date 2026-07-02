import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Leaf,
  Castle,
  Skull,
  Clock,
  Printer,
} from 'lucide-react';

const pagesData = [
  { id: 0, type: 'book-cover', title: "THE VAN VOYAGE", subtitle: "Belgium & Germany: A 4-Day Itinerary", description: "A private traveler's detailed fascicule containing custom waypoints, deep nature reserves, and historical shadows.", icon: <Compass className="w-16 h-16 mx-auto mb-4 text-amber-900" />, chapter: 'Cover' },
  { id: 1, type: 'day-cover', day: "FRIDAY", title: "The High Fens & Malmedy", notes: ["Van pickup in Brussels at 12:00 sharp", "Drive direction: East towards Malmedy", "Focus: Forests, dark waters, and high peat bogs"], icon: <Leaf className="w-12 h-12 text-emerald-800" />, chapter: 'Friday' },
  { id: 2, type: 'content', pinNumber: 1, location: "Longfaye, High Fens", title: "Cascade de Bayehon", description: "The highest waterfall in Belgium's eastern region, tucked away in an enchanting, mossy ravine. The water tumbling down the red quartzite rocks has a striking, naturally copper-colored tint caused by the heavy acidity and peat concentration of the High Fens.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cascade%20de%20Bayehon,%20Longfaye.jpg?width=1200", chapter: 'Friday' },
  { id: 3, type: 'content', pinNumber: 2, location: "Ovifat, Robertville", title: "Reinhardstein Castle", description: "Rising defiantly out of a steep, densely wooded river valley, Reinhardstein Castle is a breathtaking medieval fortress carved directly from the dark slate cliffside. Originally constructed in 1354.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Reinhardstein%20Castle,%20Belgium.JPG?width=1200", chapter: 'Friday' },
  { id: 4, type: 'content', pinNumber: 3, location: "High Fens Nature Reserve", title: "Noir Flohay", description: "Noir Flohay is one of the most mysterious and hauntingly beautiful areas of the High Fens nature reserve. Ancient, dead forest where bleached, skeletal trunks of Scots pines rise silently out of a vast, misty peat bog.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Noir%20Flohay,%20Grand%20Fagne.jpg?width=1200", chapter: 'Friday' },
  { id: 5, type: 'content', pinNumber: 4, location: "Robertville, Waimes", title: "Lake Robertville", description: "Nestled adjacent to the Reinhardstein gorge, Lake Robertville is a vast, tranquil reservoir framed by steep hills of dense pine and beech forests. The dark, glassy waters reflect the sky.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Lac%20de%20Robertville%202010%20006.JPG?width=1200", chapter: 'Friday' },
  { id: 6, type: 'day-cover', day: "SATURDAY", title: "Cologne: History & Shadows", notes: ["Depart Malmedy by 08:30", "Strict reservation: Melaten Cemetery at 11:11", "Focus: Ancient Roman ruins, Gothic arches, and subterranean chambers"], icon: <Skull className="w-12 h-12 text-neutral-800" />, chapter: 'Saturday' },
  { id: 7, type: 'content', pinNumber: 5, location: "Cologne, Aachener Str.", title: "Melaten-Friedhof (11:11)", description: "Known as the 'City of the Dead', Melaten-Friedhof is Cologne's most historic and atmospheric cemetery, sprawling over 43 hectares of parkland. A labyrinth of grand, ivy-draped mausoleums.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Torbau%20an%20der%20Aachener%20Stra%C3%9Fe.JPG?width=1200", chapter: 'Saturday' },
  { id: 8, type: 'content', pinNumber: 6, location: "Domkloster, Cologne Center", title: "Kölner Dom", description: "The Cologne Cathedral is a monument of staggering scale and Gothic ambition, dominating the city's skyline with its twin spires. Inside, the cavernous nave is bathed in mystical, multicolored light.", imageUrl: "https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1400", chapter: 'Saturday' },
  { id: 9, type: 'content', pinNumber: 7, location: "Hornstraße, Cologne", title: "Odonien Scrap Park", description: "A surreal, chaotic, and inspiring open-air scrap metal sculpture park, cultural center, and artist sanctuary tucked away in Cologne's industrial heart. A labyrinth of kinetic steel structures.", imageUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=1400", chapter: 'Saturday' },
  { id: 10, type: 'content', pinNumber: 8, location: "Ursulaplatz, Cologne", title: "Basilika St. Ursula", description: "Basilika St. Ursula holds one of the most macabre and breathtaking secrets of medieval religious history. Beneath its Romanesque arches lies the 'Golden Chamber' (Goldene Kammer), lined with thousands of human bones arranged in geometric patterns.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Koeln_St_Ursula_Goldene_Kammer_Detail.jpg", chapter: 'Saturday' },
  { id: 11, type: 'content', pinNumber: 9, location: "Kleine Budengasse, Cologne", title: "The Praetorium", description: "Hidden beneath modern streets, descend underground to walk among the massive stone foundations, structural walls, and sewage canals of the ancient Roman Governor's Palace.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Cologne_Praetorium_Roman_ruins.jpg", chapter: 'Saturday' },
  { id: 12, type: 'content', pinNumber: 10, location: "Königswinter, Rhine", title: "Drachenfels Ruins", description: "Perched on a steep volcanic hill overlooking the Rhine, Drachenfels is a legendary peak. At its summit lie the rugged, wind-swept ruins of a 12th-century castle.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Schloss_Drachenburg_Abendstimmung.jpg", chapter: 'Saturday' },
  { id: 13, type: 'day-cover', day: "SUNDAY", title: "Castles & Volcanic Lands", notes: ["Wake up near Lanatrekking Maifeld", "Embark early to beat crowds at Eltz", "Focus: Hidden valleys, suspension heights, and volcanic craters"], icon: <Castle className="w-12 h-12 text-amber-900" />, chapter: 'Sunday' },
  { id: 14, type: 'content', pinNumber: 11, location: "Wierschem, Elzbach Valley", title: "Burg Eltz", description: "Tucked deep inside a pristine, heavily forested river valley, Burg Eltz is the quintessential medieval castle. Remarkably untouched for over 850 years.", imageUrl: "https://images.unsplash.com/photo-1599831773033-9366dca0df52?q=80&w=1400", chapter: 'Sunday' },
  { id: 15, type: 'content', pinNumber: 12, location: "Kasselburg, Pelm", title: "Eagle & Wolf Park Kasselburg", description: "Set in a dense forest around a historic 12th-century castle, this is a wildlife haven housing the largest pack of timber wolves in Western Europe.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/M%C3%A4nnlicher%20Timberwolf.jpg?width=1200", chapter: 'Sunday' },
  { id: 16, type: 'content', pinNumber: 13, location: "Cochem, Moselle River", title: "Cochem Castle", description: "Reconstructed as a breathtaking Neo-Gothic masterpiece in the 19th century, Cochem Castle sits proudly atop a steep, vine-covered hill above the Moselle River.", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400", chapter: 'Sunday' },
  { id: 17, type: 'content', pinNumber: 14, location: "Daun, Volcanic Eifel", title: "Schalkenmehrener Maar", description: "A geological masterpiece of the Volcanic Eifel—a deep, circular volcanic crater lake created by massive steam explosions. The water is an incredibly rich, deep blue.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Schalkenmehrener_Maar_2015-09-02_02.JPG", chapter: 'Sunday' },
  { id: 18, type: 'content', pinNumber: 15, location: "Monreal, Elz Valley", title: "Monreal Medieval Village", description: "A beautifully preserved, historic medieval village hidden in the narrow Elz valley. Characterized by stunning half-timbered houses and twin castle ruins.", imageUrl: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1400", chapter: 'Sunday' },
  { id: 19, type: 'content', pinNumber: 16, location: "Mörsdorf, Hunsrück", title: "Geierlay Suspension Bridge", description: "Spanning 360 meters across a deep, forested valley, the Geierlay Suspension Bridge is a masterpiece of minimalist modern engineering, suspended 100 meters above the canopy.", imageUrl: "https://images.unsplash.com/photo-1631454483751-dae19747cc7d?q=80&w=1400", chapter: 'Sunday' },
  { id: 20, type: 'content', pinNumber: 17, location: "Üxheim-Ahütte, Eifel", title: "Dreimühlen Waterfall", description: "A rare and mesmerizing geological wonder where thick layers of green, velvet-like moss calcify and turn to solid stone. A living, breathing forest sculpture.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2023-11-28-Dreim%C3%BChlen-Wasserfall-DJI_20231128134202_0002_D.jpg/1280px-2023-11-28-Dreim%C3%BChlen-Wasserfall-DJI_20231128134202_0002_D.jpg", chapter: 'Sunday' },
  { id: 21, type: 'day-cover', day: "MONDAY", title: "The Return via Eifel", notes: ["Crucial: Van must be returned in Brussels by 15:00", "Morning exploration only", "Focus: Ancient beech forests, high viewpoints"], icon: <Clock className="w-12 h-12 text-slate-800" />, chapter: 'Monday' },
  { id: 22, type: 'content', pinNumber: 18, location: "North Rhine-Westphalia", title: "Eifel National Park", description: "A vast, protected reserve of returning wilderness, where ancient beech and oak forests are being left undisturbed. Home to wildcats, black storks, and rare mosses.", imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400", chapter: 'Monday' },
  { id: 23, type: 'content', pinNumber: 19, location: "Monschau, Rur Valley", title: "Monschau", description: "A picturesque, historic town nestled in a steep, narrow mountain valley. Famous for half-timbered houses, winding cobblestone streets, and the Rur River.", imageUrl: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=1400", chapter: 'Monday' },
  { id: 24, type: 'content', pinNumber: 20, location: "Schleiden, Eifel National Park", title: "Ordensburg Vogelsang", description: "A massive stone complex overlooking the Urft reservoir, standing as a monument of 20th-century history. Transformed into an international center for historical education.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Vogelsang_adler.jpg", chapter: 'Monday' },
  { id: 25, type: 'content', pinNumber: 21, location: "Heimbach, Kermeter Ridge", title: "Wilder Kermeter & Hirschley", description: "The Wilder Kermeter is a sprawling, ancient beech forest ridge. The Hirschley Viewpoint offers breathtaking panoramic vistas of the Rur reservoir.", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Blick%20auf%20die%20Rurtalsperre%2001.jpg?width=1200", chapter: 'Monday' },
  { id: 26, type: 'content', pinNumber: 22, location: "Hellenthal, Olef Reservoir", title: "Oleftalsperre Dam", description: "A massive, high-walled reservoir in a quiet, forested valley. The dam is an impressive historic engineering feat, featuring a wide walkway with views of the reservoir.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Oleftalsperre_Staumauer.jpg", chapter: 'Monday' },
  { id: 27, type: 'back-cover', title: "Bon Voyage", description: "Safe travels on the winding roads of Belgium and Germany. Keep the engine cool and the spirit adventurous.", chapter: 'Monday' }
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState('Cover');
  const [currentSpread, setCurrentSpread] = useState(0);
  const chapterPages = pagesData.filter(p => p.chapter === activeChapter);
  const totalSpreads = Math.ceil(chapterPages.length / 2);

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) setCurrentSpread(c => c + 1);
  };
  const handlePrev = () => {
    if (currentSpread > 0) setCurrentSpread(c => c - 1);
  };

  const PageRenderer = ({ page, side }) => {
    if (!page) return <div className={`w-full h-full bg-[#f4ebd8] ${side === 'left' ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}></div>;

    const bindingClasses = side === 'left'
      ? 'rounded-l-2xl border-r-2 border-stone-300 pr-10 pl-8 shadow-[-12px_0_24px_rgba(0,0,0,0.12)_inset] bg-stone-50'
      : 'rounded-r-2xl border-l-2 border-stone-100 pl-10 pr-8 shadow-[12px_0_24px_rgba(0,0,0,0.12)_inset] bg-stone-50';

    if (page.type === 'book-cover' || page.type === 'back-cover') {
      return (
        <div className="w-full h-full bg-stone-900 text-amber-100 flex flex-col items-center justify-center p-8 text-center border-l-8 border-stone-950 rounded-r-2xl shadow-2xl relative overflow-hidden">
          {page.icon}
          <h1 className="text-3xl font-serif">{page.title}</h1>
          {page.subtitle && <p className="text-xs uppercase tracking-widest mt-4 opacity-60">{page.subtitle}</p>}
          {page.description && <p className="text-sm font-serif mt-6 max-w-xs opacity-80 leading-relaxed">{page.description}</p>}
        </div>
      );
    }

    if (page.type === 'day-cover') {
      return (
        <div className={`w-full h-full p-8 bg-[#f9f5eb] ${bindingClasses} flex flex-col justify-center`}>
          {page.icon}
          <h2 className="text-4xl font-serif text-stone-800 mt-4">{page.day}</h2>
          <h3 className="text-xl font-serif mt-2 text-stone-600">{page.title}</h3>
          <ul className="mt-8 space-y-2">
            {page.notes.map((n, i) => <li key={i} className="text-sm font-serif text-stone-700">· {n}</li>)}
          </ul>
        </div>
      );
    }

    return (
      <div className={`w-full h-full flex flex-col p-8 bg-[#fdfdfa] ${bindingClasses}`}>
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
    <div className="min-h-screen bg-[#2c231a] p-4 md:p-8 flex flex-col items-center print:block print:bg-white print:p-0 print:min-h-0">
      {/* @page rule sizes every printed sheet as A4 with no browser margin */}
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #fff; }
        }
      `}</style>

      <div className="flex gap-2 mb-8 bg-stone-900/50 p-2 rounded-xl border border-stone-800 flex-wrap justify-center print:hidden">
        {['Cover', 'Friday', 'Saturday', 'Sunday', 'Monday'].map(ch => (
          <button
            key={ch}
            onClick={() => { setActiveChapter(ch); setCurrentSpread(0); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeChapter === ch ? 'bg-amber-800 text-white' : 'text-stone-400 hover:text-stone-100'}`}
          >
            {ch.toUpperCase()}
          </button>
        ))}
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-bold rounded-lg transition bg-stone-700 text-stone-100 hover:bg-amber-800 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> PRINT (A4)
        </button>
      </div>

      <div className="max-w-4xl w-full aspect-[2/1.3] bg-stone-950 p-4 rounded-3xl border-[6px] border-[#3e3224] shadow-2xl flex relative overflow-hidden print:hidden">
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/30 to-transparent z-10 pointer-events-none"></div>

        <div className="flex-1 h-full">
          <PageRenderer page={chapterPages[currentSpread * 2]} side="left" />
        </div>
        <div className="flex-1 h-full">
          <PageRenderer page={chapterPages[currentSpread * 2 + 1]} side="right" />
        </div>
      </div>

      <div className="flex gap-4 mt-6 print:hidden">
        <button onClick={handlePrev} disabled={currentSpread === 0} className="px-6 py-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronLeft /></button>
        <button onClick={handleNext} disabled={currentSpread >= totalSpreads - 1} className="px-6 py-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 transition disabled:opacity-30"><ChevronRight /></button>
      </div>

      {/* Print-only: every page laid out one-per-A4-sheet, in order, for physical printing */}
      <div className="hidden print:block">
        {pagesData.map(page => <PrintPage key={page.id} page={page} />)}
      </div>
    </div>
  );
}
