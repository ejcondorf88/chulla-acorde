import React, { useState } from 'react';

const TabEditor = () => {
  const STRINGS = 6;
  const NOTE_SIZE = 12;
  const MEASURES_PER_LINE = 4;
  const NOTES_PER_MEASURE = 8;

  // Notas predefinidas en el código
  const predefinedNotes = [
    { string: 6, fret: 3 }, // G en la 6ta cuerda
    { string: 5, fret: 5 }, // D en la 5ta cuerda
    { string: 4, fret: 7 }, // A en la 4ta cuerda
    { string: 3, fret: 9 }, // E en la 3ra cuerda
    { string: 2, fret: 12 }, // B en la 2da cuerda
    { string: 1, fret: 15 },  // D en la 1ra cuerda
    { string: 6, fret: 3 }, // G en la 6ta cuerda
    { string: 5, fret: 5 }, // D en la 5ta cuerda
    { string: 4, fret: 7 }, // A en la 4ta cuerda
    { string: 3, fret: 9 }, // E en la 3ra cuerda
    { string: 2, fret: 12 }, // B en la 2da cuerda
    { string: 1, fret: 15 },  // D en la 1ra cuerda
    { string: 6, fret: 3 }, // G en la 6ta cuerda
    { string: 5, fret: 5 }, // D en la 5ta cuerda
    { string: 4, fret: 7 }, // A en la 4ta cuerda
    { string: 3, fret: 9 }, // E en la 3ra cuerda
    { string: 2, fret: 12 }, // B en la 2da cuerda
    { string: 1, fret: 15 },  // D en la 1ra cuerda
    { string: 6, fret: 3 }, // G en la 6ta cuerda
    { string: 5, fret: 5 }, // D en la 5ta cuerda
    { string: 4, fret: 7 }, // A en la 4ta cuerda
    { string: 3, fret: 9 }, // E en la 3ra cuerda
    { string: 2, fret: 12 }, // B en la 2da cuerda
    { string: 1, fret: 15 }  // D en la 1ra cuerda
  ];

  const [notes] = useState(predefinedNotes);

  const Note = ({ x, stringNum, fret }) => (
    <g transform={`translate(${x}, 0)`}>
      <circle cx="0" cy={`${(stringNum - 1) * 10}`} r={NOTE_SIZE / 2} className="fill-white" />
      <text x="0" y={`${(stringNum - 1) * 10}`} textAnchor="middle" dominantBaseline="middle" className="text-xs fill-black">
        {fret}
      </text>
    </g>
  );

  const Measure = ({ x, notes, measureNumber }) => (
    <g transform={`translate(${x}, 0)`}>
      <line x1="0" y1="0" x2="0" y2="50" className="stroke-white/20" />
      <line x1="120" y1="0" x2="10" y2="50" className="stroke-white/20" />
      <text x="0" y="-10" className="text-xs fill-white/60">{measureNumber}</text>
      {notes.map((note, i) => (
        <Note key={i} x={20 + i * 20} stringNum={note.string} fret={note.fret} />
      ))}
    </g>
  );

  const TabLine = ({ startMeasure, y, notes }) => (
    <g transform={`translate(50, ${y})`}>
      {[...Array(STRINGS)].map((_, i) => (
        <line key={i} x1="0" y1={i * 10} x2={MEASURES_PER_LINE * 120} y2={i * 10} className="stroke-white/40" />
      ))}
      {[6, 5, 4, 3, 2, 1].map((string, i) => (
        <text key={i} x="-20" y={i * 10} className="text-xs fill-white/60" dominantBaseline="middle">
          {string}
        </text>
      ))}
      {[...Array(MEASURES_PER_LINE)].map((_, i) => {
        const measureIndex = startMeasure + i;
        const measureStart = measureIndex * NOTES_PER_MEASURE;
        const measureEnd = measureStart + NOTES_PER_MEASURE;
        const currentMeasureNotes = notes.slice(measureStart, measureEnd);
        
        return (
          <Measure key={measureIndex} x={i * 120} measureNumber={measureIndex + 1} notes={currentMeasureNotes} />
        );
      })}
    </g>
  );

  const totalMeasures = Math.ceil(notes.length / NOTES_PER_MEASURE);
  const totalLines = Math.ceil(totalMeasures / MEASURES_PER_LINE);

  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <div className="max-w-full mx-auto">
        <div className="bg-neutral-800 rounded-lg p-8">
          <svg width="600" height={totalLines * 110 + 50}>
            {[...Array(totalLines)].map((_, lineIndex) => (
              <TabLine key={lineIndex} startMeasure={lineIndex * MEASURES_PER_LINE} y={50 + lineIndex * 150} notes={notes} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TabEditor;
