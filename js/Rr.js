// rr.js
function ejecutarRR(procesosOrig, quantum) {
    const procesos = procesosOrig.map(p => ({
        nombre: p.nombre,
        llegada: p.llegada,
        cpu: p.cpu,
        restante: p.cpu,
        inicioPrimerBloque: null,
        finalizacion: null
    }));

    const timeline = [];
    const resultados = [];
    let tiempo = 0;

    // cola de listos (guardar índices)
    const cola = [];

    // ordenar por llegada para equilibrar
    procesos.sort((a, b) => a.llegada - b.llegada);

    // índice de siguiente llegada a considerar
    let idxLlegadas = 0;
    const n = procesos.length;
    let completados = 0;

    // función para agregar llegadas al tiempo actual
    const agregarLlegadas = () => {
        while (idxLlegadas < n && procesos[idxLlegadas].llegada <= tiempo) {
            cola.push(idxLlegadas);
            idxLlegadas++;
        }
    };

    agregarLlegadas();

    if (cola.length === 0 && idxLlegadas < n) {
        // si no hay procesos al 0, avanzar al primero
        tiempo = procesos[0].llegada;
        agregarLlegadas();
    }

    while (completados < n) {
        if (cola.length === 0) {
            // no hay listos, avanzar al siguiente que llegue
            if (idxLlegadas < n) {
                const prox = procesos[idxLlegadas];
                // intervalos idle
                for (let t = tiempo; t < prox.llegada; t++) timeline.push({ tiempo: t, proceso: null });
                tiempo = prox.llegada;
                agregarLlegadas();
            } else {
                break;
            }
            continue;
        }

        const i = cola.shift();
        const p = procesos[i];

        if (p.inicioPrimerBloque === null) p.inicioPrimerBloque = tiempo;

        const ejecuta = Math.min(quantum, p.restante);
        for (let t = tiempo; t < tiempo + ejecuta; t++) {
            timeline.push({ tiempo: t, proceso: p.nombre });
        }

        tiempo += ejecuta;
        p.restante -= ejecuta;

        // agregar nuevas llegadas ocurridas durante este bloque
        agregarLlegadas();

        if (p.restante > 0) {
            // se re-encola al final
            cola.push(i);
        } else {
            p.finalizacion = tiempo;
            completados++;
            resultados.push({
                nombre: p.nombre,
                llegada: p.llegada,
                cpu: p.cpu,
                inicio: p.inicioPrimerBloque,
                finalizacion: p.finalizacion,
                retorno: p.finalizacion - p.llegada,
                espera: p.finalizacion - p.llegada - p.cpu,
                penalizacion: (p.finalizacion - p.llegada) / p.cpu
            });
        }
    }

    // ordenar resultados por orden original de llegada o nombre
    resultados.sort((a,b)=> a.nombre.localeCompare(b.nombre));
    return { resultados, timeline };
}
