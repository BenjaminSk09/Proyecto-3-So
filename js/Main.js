// main.js
let procesos = [];

document.getElementById('form-proceso').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const llegada = parseInt(document.getElementById('llegada').value, 10);
    const cpu = parseInt(document.getElementById('cpu').value, 10);
    if (!nombre || isNaN(llegada) || isNaN(cpu)) return;

    procesos.push({ nombre, llegada, cpu });
    procesos.sort((a,b)=> a.llegada - b.llegada); // opcional, mantener orden por llegada
    actualizarTabla();
    e.target.reset();
});

function actualizarTabla() {
    const tbody = document.querySelector('#tabla-procesos tbody');
    tbody.innerHTML = '';
    procesos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${p.nombre}</td><td>${p.llegada}</td><td>${p.cpu}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('algoritmo').addEventListener('change', (e) => {
    const quantumContainer = document.getElementById('quantum-container');
    quantumContainer.style.display = e.target.value === 'rr' ? 'block' : 'none';
});

document.getElementById('btn-iniciar').addEventListener('click', async () => {
    if (procesos.length === 0) {
        alert("Debes agregar al menos un proceso.");
        return;
    }

    const algoritmo = document.getElementById('algoritmo').value;
    const quantum = parseInt(document.getElementById('quantum').value, 10) || 1;

    await iniciarSimulacion(algoritmo, quantum);
});

async function iniciarSimulacion(algoritmo, quantum) {
    const simulacionDiv = document.getElementById('simulacion');
    simulacionDiv.innerHTML = `<p class="text-light">Preparando ${algoritmo.toUpperCase()}...</p>`;

    // Llamar al algoritmo correspondiente (ahora devuelven { resultados, timeline })
    let resultado = null;
    try {
        if (algoritmo === 'fcfs') resultado = ejecutarFCFS(procesos);
        if (algoritmo === 'sjf') resultado = ejecutarSJF(procesos);
        if (algoritmo === 'rr') resultado = ejecutarRR(procesos, quantum);
    } catch (err) {
        console.error("Error en el algoritmo:", err);
        alert("Ocurrió un error al ejecutar el algoritmo. Revisa la consola.");
        return;
    }

    // Animar y esperar a que termine
    await animarEjecucion(resultado.timeline);

    // Mostrar resultados (solo cuando la animación ha terminado)
    mostrarResultados(resultado.resultados);
}

// animarEjecucion devuelve Promise que se resuelve cuando termina la animación
function animarEjecucion(timeline) {
    return new Promise((resolve) => {
        const simulacionDiv = document.getElementById('simulacion');
        simulacionDiv.innerHTML = ""; // limpiar
        simulacionDiv.scrollLeft = 0;

        if (!timeline || timeline.length === 0) {
            simulacionDiv.innerHTML = "<p class='text-light'>No hay procesos para ejecutar.</p>";
            resolve();
            return;
        }

        let paso = 0;
        // mostrar un header con tiempo actual
        const tiempoLabel = document.createElement('div');
        tiempoLabel.className = 'mb-2';
        tiempoLabel.style.fontWeight = '600';
        tiempoLabel.style.color = '#e0e0e0';
        simulacionDiv.appendChild(tiempoLabel);

        const contenedorLine = document.createElement('div');
        contenedorLine.style.display = 'flex';
        contenedorLine.style.alignItems = 'center';
        simulacionDiv.appendChild(contenedorLine);

        const intervalo = setInterval(() => {
            if (paso >= timeline.length) {
                clearInterval(intervalo);
                const fin = document.createElement('p');
                fin.className = 'mt-3 text-success';
                fin.textContent = "✅ Ejecución finalizada";
                simulacionDiv.appendChild(fin);
                resolve();
                return;
            }

            const pasoObj = timeline[paso];
            tiempoLabel.textContent = `Tiempo (unidad): ${pasoObj.tiempo}`;

            const div = document.createElement('div');
            div.classList.add('proceso');
            const nombre = pasoObj.proceso;
            if (!nombre) {
                div.textContent = 'Idle';
                div.classList.add('espera');
                div.style.opacity = '0.35';
                div.style.width = '60px';
            } else {
                div.textContent = nombre;
                div.style.backgroundColor = generarColor(nombre);
            }

            contenedorLine.appendChild(div);
            contenedorLine.scrollLeft = contenedorLine.scrollWidth;

            paso++;
        }, 3000); // 3 segundos por unidad
    });
}

function generarColor(nombre) {
    const colores = ['#00bcd4', '#ff9800', '#8bc34a', '#e91e63', '#9c27b0', '#ffc107', '#2196f3', '#00c853', '#795548'];
    let s = 0;
    for (let i = 0; i < nombre.length; i++) s += nombre.charCodeAt(i);
    return colores[s % colores.length];
}

function mostrarResultados(resultados) {
    const div = document.getElementById('resultados');
    if (!resultados || resultados.length === 0) {
        div.innerHTML = '<p class="text-center text-light">Sin resultados.</p>';
        return;
    }

    let html = `
        <table class="table table-striped table-dark table-hover">
            <thead>
                <tr>
                    <th>Proceso</th><th>Llegada</th><th>CPU</th><th>Inicio</th><th>Final</th>
                    <th>Retorno (T)</th><th>Espera (E)</th><th>Penalización (P)</th>
                </tr>
            </thead>
            <tbody>
    `;

    // destacar el proceso con menor espera (ejemplo)
    let minEspera = Math.min(...resultados.map(r => r.espera));
    resultados.forEach(p => {
        const destacado = p.espera === minEspera ? 'table-success' : '';
        html += `
            <tr class="${destacado}">
                <td>${p.nombre}</td>
                <td>${p.llegada}</td>
                <td>${p.cpu}</td>
                <td>${p.inicio ?? '-'}</td>
                <td>${p.finalizacion}</td>
                <td>${p.retorno}</td>
                <td>${p.espera}</td>
                <td>${(p.penalizacion ?? 0).toFixed(2)}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    div.innerHTML = html;
}
