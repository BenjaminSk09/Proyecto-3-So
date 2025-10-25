// fcfs.js
function ejecutarFCFS(procesosOrig) {
    // Trabajar con copia para no mutar el array Original
    const procesos = procesosOrig.map(p => ({ ...p }));
    const timeline = [];
    const resultados = [];

    // Ordenar por llegada
    procesos.sort((a, b) => a.llegada - b.llegada);

    let tiempo = 0;
    procesos.forEach(p => {
        const inicio = Math.max(tiempo, p.llegada);
        const final = inicio + p.cpu;

        // Si hay tiempo ocioso entre tiempo y llegada, opcionalmente lo representamos
        for (let t = tiempo; t < inicio; t++) {
            timeline.push({ tiempo: t, proceso: null }); // null = CPU idle
        }

        for (let t = inicio; t < final; t++) {
            timeline.push({ tiempo: t, proceso: p.nombre });
        }

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

        tiempo = final;
    });

    return { resultados, timeline };
}
