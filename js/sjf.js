// sjf.js
function ejecutarSJF(procesosOrig) {
    const procesos = procesosOrig.map(p => ({ ...p, completado: false }));
    const timeline = [];
    const resultados = [];

    let tiempo = 0;
    let completados = 0;
    const n = procesos.length;

    while (completados < n) {
        // Procesos disponibles en este tiempo y no completados
        const disponibles = procesos.filter(p => p.llegada <= tiempo && !p.completado);

        if (disponibles.length === 0) {
            // Tiempo ocioso hasta la siguiente llegada (optimización)
            const siguiente = procesos.filter(p => !p.completado).sort((a,b)=>a.llegada - b.llegada)[0];
            // añadir idle slots si el siguiente llega en futuro
            if (siguiente && siguiente.llegada > tiempo) {
                for (let t = tiempo; t < siguiente.llegada; t++) timeline.push({ tiempo: t, proceso: null });
                tiempo = siguiente.llegada;
            } else {
                tiempo++;
            }
            continue;
        }

        // elegir el de menor cpu
        disponibles.sort((a, b) => a.cpu - b.cpu);
        const p = disponibles[0];

        const inicio = Math.max(tiempo, p.llegada);
        const final = inicio + p.cpu;

        for (let t = inicio; t < final; t++) timeline.push({ tiempo: t, proceso: p.nombre });

        resultados.push({
            nombre: p.nombre,
            llegada: p.llegada,
            cpu: p.cpu,
            inicio,
            finalizacion: final,
            retorno: final - p.llegada,
            espera: inicio - p.llegada,
            penalizacion: (final - p.llegada) / p.cpu
        });

        p.completado = true;
        completados++;
        tiempo = final;
    }

    return { resultados, timeline };
}
