import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const Partitura = ({ acordes }) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (!acordes || acordes.length === 0) return;

    const VF = Vex.Flow;
    const div = divRef.current;
    div.innerHTML = ""; // Limpiar antes de renderizar

    // Crear el renderer de VexFlow
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 40, 400);

    // Agregar clave de sol
    stave.addClef("treble").setContext(context).draw();

    // ✅ Convertir las notas al formato correcto (ej: "E2" → "e/2")
    const formatearNota = (nota) => {
      return `${nota[0].toLowerCase()}/${nota.slice(1)}`;
    };

    // Crear las notas de VexFlow
    const notes = acordes.map((nota) => 
      new VF.StaveNote({
        keys: [formatearNota(nota)], // Convertir la nota
        duration: "q" // Notas de negra
      })
    );

    // Crear la voz
    const voice = new VF.Voice({ num_beats: acordes.length, beat_value: 4 });
    voice.addTickables(notes);

    // Formatear y dibujar
    new VF.Formatter().joinVoices([voice]).format([voice], 300);
    voice.draw(context, stave);
  }, [acordes]);

  return <div ref={divRef} className="mt-4"></div>;
};

export default Partitura;
