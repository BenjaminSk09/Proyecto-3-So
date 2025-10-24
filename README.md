# 🧠 Simulador de Procesos — Algoritmos de Planificación (FCFS, SJF, RR)

Este proyecto es un **simulador web interactivo** que permite visualizar y analizar el comportamiento de diferentes **algoritmos de planificación de procesos** utilizados en sistemas operativos:  
**FCFS (First Come First Served)**, **SJF (Shortest Job First)** y **Round Robin (RR)**.

---

## 🎯 Objetivo

Simular la ejecución de procesos en una CPU, mostrando cómo cada algoritmo gestiona el orden, tiempos de espera y eficiencia de los procesos.

---

## ⚙️ Características principales

- ✅ **Creación de procesos**: ingreso de nombre, instante de llegada y tiempo de CPU.  
- ⚡ **Ejecución dinámica**: visualización paso a paso (cada unidad = 3 segundos).  
- 🔄 **Algoritmos implementados**:
  - FCFS (First Come First Served)
  - SJF (Shortest Job First)
  - Round Robin (con Quantum configurable)
- 📊 **Tabla de resultados**: tiempos de inicio, finalización, retorno, espera y penalización.
- 🏆 **Proceso más eficiente** resaltado automáticamente.
- 🔁 **Reutilización de datos**: se pueden ejecutar los mismos procesos con otro algoritmo sin recargar la página.

---

## 🧩 Estructura del proyecto

📂 simulador-procesos/
├── 📄 index.html # Estructura principal
├── 📂 css/
│ └── style.css # Estilos personalizados
├── 📂 js/
│ └── main.js # Lógica y algoritmos de planificación
└── 📄 README.md # Documentación del proyecto

## 🖥️ Tecnologías utilizadas

- **HTML5** – estructura del simulador  
- **CSS3 + Bootstrap 5** – diseño moderno y responsivo  
- **JavaScript (ES6)** – lógica de los algoritmos y animaciones  
- **Console API / DOM Manipulation** – salida visual y resultados en tabla

---

## 🧪 Algoritmos implementados

### 🟢 FCFS (First Come First Served)
Ejecuta los procesos en el orden en que llegan a la CPU.  
**Ventaja:** simple y justo.  
**Desventaja:** puede causar *efecto convoy*. 
![image_alt](https://github.com/BenjaminSk09/Proyecto-3-So/blob/81c33bce1c5e256dc77778faa3d4d74325d51f97/img/fcfs.png)
---
### 🟣 SJF (Shortest Job First)
Selecciona el proceso con el **tiempo de CPU más corto** disponible.  
**Ventaja:** minimiza el tiempo promedio de espera.  
**Desventaja:** requiere conocer la duración del proceso; posible inanición de procesos largos.
![image_alt](https://github.com/BenjaminSk09/Proyecto-3-So/blob/81c33bce1c5e256dc77778faa3d4d74325d51f97/img/sjf.png)
---
### 🔵 Round Robin (RR)
Asigna un **quantum de tiempo fijo** a cada proceso de la cola circular.  
**Ventaja:** justo y apropiado para sistemas interactivos.  
**Desventaja:** depende de un buen valor de quantum.
![image_alt](https://github.com/BenjaminSk09/Proyecto-3-So/blob/81c33bce1c5e256dc77778faa3d4d74325d51f97/img/RR.png)
---
## 📚 Autores

Proyecto desarrollado por 
---
-Esdras Alexander Choc Ajú         Carné: 1990-23-12485  
-Henry Daniel Cabrera Estrada      Carné: 1990-23-3718  
-Benjamin Bonifacio Sincal Ajú     Carné: 1990-23-11281  
-Emerson Estudardo Guzmán Vielman  Carné: 1990-23-3484    

💻 Facultad de Ingeniería / Curso de Sistemas Operativos  
📅 Año: 2025

---
