import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const Partitura = ({ acordes }) => {
  const divRef = useRef(null);
  const MAX_NOTAS_POR_LINEA = 9;

  useEffect(() => {
    if (!acordes || acordes.length === 0) return;

    const VF = Vex.Flow;
    const div = divRef.current;
    div.innerHTML = "";

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(800, 200 + Math.ceil(acordes.length / MAX_NOTAS_POR_LINEA) * 100);
    const context = renderer.getContext();

    // Función para convertir acordes a notas
    const convertirAcordeANotas = (acorde) => {
      switch (acorde) {
        // Acordes de guitarra estándar
        case "E5": return ["e/5", "b/5", "e/4"];
        case "G5": return ["g/5", "d/5", "g/4"];
        case "A5": return ["a/5", "e/5", "a/4"];
        case "C5": return ["c/5", "g/5", "c/4"];
        case "D5": return ["d/5", "a/5", "d/4"];

        // Acordes mayores
        case "E": return ["e/4", "g#/4", "b/4"];
        case "A": return ["a/4", "c#/5", "e/5"];
        case "D": return ["d/4", "f#/4", "a/4"];
        case "G": return ["g/4", "b/4", "d/5"];
        case "C": return ["c/4", "e/4", "g/4"];
        case "F": return ["f/4", "a/4", "c/5"];
        case "B": return ["b/4", "d#/5", "f#/5"];

        // Acordes menores
        case "Am": return ["a/4", "c/5", "e/5"];
        case "Bm": return ["b/4", "d/5", "f#/5"];
        case "Cm": return ["c/4", "d#/5", "g/5"];
        case "Dm": return ["d/4", "f/5", "a/5"];
        case "Em": return ["e/4", "g/5", "b/5"];
        case "Fm": return ["f/4", "g#/5", "c/5"];
        case "Gm": return ["g/4", "a#/5", "d/5"];

        // Acordes con octavas específicas
        case "E3": return ["e/3", "g#/3", "b/3"];
        case "G3": return ["g/3", "b/3", "d/4"];
        case "A3": return ["a/3", "c#/4", "e/4"];
        case "B3": return ["b/3", "d#/4", "f#/4"];

        default: return [];
      }
    };

    const lineas = [];
    for (let i = 0; i < acordes.length; i += MAX_NOTAS_POR_LINEA) {
      lineas.push(acordes.slice(i, i + MAX_NOTAS_POR_LINEA));
    }

    lineas.forEach((linea, index) => {
      const stave = new VF.Stave(10, 40 + index * 100, 700);
      stave.addClef("treble").setContext(context).draw();

      const notes = linea.map((acorde) => {
        const notas = convertirAcordeANotas(acorde);
        if (notas.length === 0) {
          console.error(`Acorde inválido: ${acorde}`);
          return null;
        }
        return new VF.StaveNote({
          keys: notas,
          duration: "q"
        });
      }).filter(note => note !== null);

      if (notes.length === 0) return;

      const voice = new VF.Voice({ num_beats: notes.length, beat_value: 4 });
      voice.addTickables(notes);

      new VF.Formatter().joinVoices([voice]).format([voice], 600);
      voice.draw(context, stave);
    });

  }, [acordes]);

  return <div ref={divRef} className="mt-4"></div>;
};

export default Partitura;
