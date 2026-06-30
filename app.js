/**
 * @file app.js
 * @description Lógica de control y renderizado dinámico para la Guía Interactiva de LESCO.
 * Implementa una arquitectura basada en estados, renderizado basado en componentes de plantilla 
 * y soporte de accesibilidad multimedia para la Lengua de Señas Costarricense.
 * @author Christopher León
 * @version 1.0.0
 */

/**
 * @typedef {Object} ElementoGlosario
 * @property {string} id - Identificador único de la seña en formato kebab-case.
 * @property {string} palabra - El concepto o término en texto plano.
 * @property {string} video - Ruta relativa local hacia el archivo de video MP4.
 * @property {string} poster - Ruta relativa local hacia la miniatura del reproductor.
 * @property {string} descripcion - Detalle técnico-cinemático del movimiento en LESCO.
 * @property {string} audioDescripcion - Guión narrativo adaptado para síntesis de voz (TTS).
 * @property {string} notas - Contexto gramatical, variaciones lingüísticas o notas de uso en Costa Rica.
 */

/**
 * @typedef {Object} EstructuraDiccionario
 * @property {ElementoGlosario[]} saludos - Bloque de interacciones de cortesía social.
 * @property {ElementoGlosario[]} necesidades - Bloque de señas de asistencia y requerimientos diarios.
 * @property {ElementoGlosario[]} dias - Bloque cronológico con los siete días de la semana dactilológicos.
 */

/**
 * Base de datos principal de la aplicación.
 * Almacena los metadatos semánticos requeridos para el ecosistema multimedia de LESCO.
 * * @type {EstructuraDiccionario}
 */
const DICCIONARIO_LESCO = {
    saludos: [
        {
            id: "hola",
            palabra: "Hola",
            video: "assets/videos/saludos/hola.mp4",
            poster: "assets/imagenes/saludos/hola_miniatura.png",
            descripcion: "Coloque la mano dominante abierta cerca de la sien. Realice un movimiento semicircular corto hacia afuera.",
            audioDescripcion: "Para decir Hola, levanta tu mano abierta cerca de la sien y haz un pequeño movimiento hacia afuera, manteniendo siempre una sonrisa y el contacto visual.",
            notas: "Módulo formal. Mantenga contacto visual directo durante la ejecución."
        },
        {
            id: "buenos-dias",
            palabra: "Buenos días",
            video: "assets/videos/saludos/buenos_dias.mp4",
            poster: "assets/imagenes/saludos/buenos_dias_miniatura.png",
            descripcion: "Primero, se coloca la mano izquierda extendida horizontalmente a la altura del pecho con la palma hacia arriba para que sirva como base, mientras que la mano derecha, también plana y con los dedos juntos, inicia tocando suavemente la barbilla o los labios con las yemas de los dedos; desde ahí, la mano derecha desciende en una trayectoria diagonal hacia adelante hasta que su dorso o borde golpea de forma ligera la palma de la mano izquierda. Inmediatamente después, ambas manos se separan un poco y cambian su configuración adoptando una forma arqueada o semiflexionada con las palmas orientadas hacia el centro. En este segundo momento, partiendo desde el centro del pecho, ambas manos se desplazan de manera simultánea hacia los lados realizando un movimiento semicircular hacia afuera y hacia abajo, dibujando un arco en el aire que simula el horizonte.",
            audioDescripcion: "El saludo de Buenos días se hace tocando suavemente tu pecho con la mano abierta y luego elevándola, simulando un sol saliendo en el horizonte.",
            notas: "Seña compuesta de LESCO. Marque una leve pausa entre ambos movimientos."
        },
        {
            id: "buenas-tardes",
            palabra: "Buenas tardes",
            video: "assets/videos/saludos/buenas_tardes.mp4",
            poster: "",
            descripcion: "La mano pasiva se coloca extendida de forma horizontal frente al cuerpo, con la palma orientada hacia arriba, manteniéndose estable como base del movimiento. La mano dominante, con los dedos extendidos y juntos, inicia tocando suavemente la barbilla con las yemas de los dedos y desciende en una trayectoria diagonal hacia adelante hasta contactar la palma de la mano pasiva. Inmediatamente después, ambas manos se separan de forma simétrica y adoptan una configuración semiflexionada en forma de abierta con las palmas orientadas hacia el centro; desde esa posición, realizan un movimiento simultáneo, breve y semicircular hacia afuera y hacia abajo, dibujando un arco claro en el aire antes de regresar a una posición de reposo.",
            audioDescripcion: "Para desear Buenas tardes, coloca una mano extendida hacia el frente y desciende la otra mano sobre ella, representando la caída del sol.",
            notas: "El movimiento simula la posición del sol ocultándose de manera progresiva."
        },
        {
            id: "buenas-noches",
            palabra: "Buenas noches",
            video: "assets/videos/saludos/buenas_noches.mp4",
            poster: "",
            descripcion: "La mano pasiva se coloca extendida de forma horizontal frente al cuerpo, con la palma orientada hacia arriba, manteniéndose estable como base del movimiento. La mano dominante, con los dedos extendidos y juntos, inicia tocando suavemente la barbilla con las yemas de los dedos y desciende en una trayectoria diagonal hacia adelante hasta contactar la palma de la mano pasiva. Inmediatamente después, ambas manos se elevan ligeramente, separándose de forma simétrica a los lados del rostro con las palmas orientadas hacia el frente y los dedos extendidos en forma de C abierta; desde esa posición, realizan un movimiento simultáneo hacia abajo mientras los dedos se van cerrando progresivamente de manera breve y controlada hasta juntarse por completo con las yemas tocando el pulgar, simulando el cierre de la luz del día antes de regresar a una posición de reposo.",
            audioDescripcion: "Para decir Buenas noches, cruza suavemente ambos antebrazos frente al pecho con las manos abiertas, simulando el cierre del día.",
            notas: "Representa el cierre del día. Exige una postura corporal relajada y fluida."
        },
        {
            id: "adios",
            palabra: "Adiós",
            video: "assets/videos/saludos/adios.mp4",
            poster: "",
            descripcion: "La mano dominante se eleva lateralmente a la altura del rostro o del hombro con la palma orientada hacia el frente y los dedos completamente extendidos y juntos, mientras que la mano pasiva permanece en una posición de reposo. Desde esa postura inicial, la mano dominante realiza una flexión repetida, breve y controlada de los cuatro dedos principales hacia adelante y hacia abajo en dirección a la palma, manteniéndolos alineados, mientras el dedo pulgar permanece extendido hacia un lado. Este movimiento oscilatorio de los dedos se ejecuta de forma fluida y natural dos o tres veces seguidas, manteniendo la muñeca y el antebrazo estables, para luego regresar la mano a su posición de reposo.",
            audioDescripcion: "Despídete levantando la mano abierta a la altura del hombro y moviendo los dedos de lado a lado con naturalidad.",
            notas: "Seña de carácter universal, pero integrada formalmente dentro de la dactilología costarricense."
        }
    ],
    necesidades: [
        {
            id: "ayuda",
            palabra: "Ayuda",
            video: "assets/videos/necesidades/ayuda.mp4",
            poster: "",
            descripcion: "Coloque la mano no dominante abierta con la palma hacia arriba a la altura del pecho, como si estuviera ofreciendo apoyo. Luego forme un puño con la mano dominante, manteniendo el pulgar extendido hacia arriba, y apoye suavemente el puño sobre la palma abierta. A continuación, desplace ambas manos juntas hacia adelante con un movimiento corto, firme y natural, manteniendo el contacto entre ambas manos durante todo el recorrido'",
            audioDescripcion: "Para solicitar o brindar ayuda, coloca una mano abierta hacia arriba y apoya sobre ella la otra mano cerrada con el pulgar levantado.",
            notas: "Seña direccional: hacia el frente significa 'te ayudo', hacia el cuerpo significa 'ayúdeme'."
        },
        {
            id: "peligro",
            palabra: "Peligro",
            video: "assets/videos/necesidades/peligro.mp4",
            poster: "",
            descripcion: "Coloque la mano dominante frente al cuerpo, aproximadamente a la altura del pecho, con los dedos índice y medio extendidos y ligeramente separados, mientras los dedos anular y meñique permanecen flexionados y sujetos por el pulgar. Manteniendo esa configuración, realice un movimiento corto y repetido de la mano de arriba hacia abajo, sin modificar la posición de los dedos y conservando la orientación natural de la palma durante toda la ejecución.",
            audioDescripcion: "Para indicar peligro, dobla los dedos índice y medio de tu mano dominante hacia adentro formando una pequeña garra, y agítala con movimientos cortos y rápidos de muñeca frente a tu hombro, con expresión de alerta en el rostro.",
            notas: "Se utiliza para advertir sobre una situación de riesgo o amenaza. La expresión facial de preocupación o advertencia es fundamental para transmitir correctamente el mensaje."
        },
        {
            id: "dolor",
            palabra: "Dolor / Enfermo",
            video: "assets/videos/necesidades/enfermo.mp4",
            poster: "",
            descripcion: "Utilice ambas manos con los dedos separados y ligeramente curvados. Coloque la mano dominante cerca de la frente y la mano no dominante cerca del pecho. Realice con ambas manos un movimiento simultáneo de giro o pivoteo de muñeca, con expresión facial de malestar.",
            audioDescripcion: "Para expresar dolor o enfermedad, usa ambas manos con los dedos abiertos y un poco curvados. Coloca una mano cerca de la frente y la otra cerca del pecho, y gira ambas muñecas simultáneamente con expresión de malestar en el rostro.",
            notas: "La expresión microfacial de aflicción es un parámetro gramatical crítico para denotar la intensidad."
        },
        {
            id: "hospital",
            palabra: "Hospital / Médico",
            video: "assets/videos/necesidades/hospital.mp4",
            poster: "",
            descripcion: "Coloque la mano no dominante frente al cuerpo con el antebrazo en posición horizontal y la palma orientada hacia abajo. Con la mano dominante, extienda los dedos índice y medio manteniéndolos juntos, mientras los demás dedos permanecen flexionados. Sitúe las puntas de estos dos dedos sobre la muñeca de la mano no dominante y realice un leve golpe o toque corto y controlado, manteniendo la configuración de la mano durante toda la ejecución.",
            audioDescripcion: "Esta seña representa tanto a un médico como a un hospital. Cruza los dedos índice y medio de tu mano y dibuje una pequeña cruz sobre el hombro opuesto.",
            notas: "Aplica formalmente tanto para la infraestructura médica como para referirse al profesional de la salud."
        },
        {
            id: "hambre",
            palabra: "Hambre",
            video: "assets/videos/necesidades/hambre.mp4",
            poster: "",
            descripcion: "Coloque la mano dominante frente al cuerpo a la altura del estómago, con los dedos semiflexionados y ligeramente separados, manteniendo la palma orientada hacia el torso. Desde esa posición, realice un movimiento corto y repetido de arriba hacia abajo, rozando suavemente el área del estómago sin perder la configuración de la mano.",
            audioDescripcion: "Para indicar que tenés hambre, abre la mano con los dedos un poco doblados y deslízala hacia abajo frente al estómago con un movimiento suave y repetido.",
            notas: "Seña de necesidad biológica inmediata de alta frecuencia diaria."
        }
    ],
    dias: [
        {
            id: "lunes",
            palabra: "Lunes",
            video: "assets/videos/dias/lunes.mp4",
            poster: "assets/imagenes/dias/lunes_miniatura.png",
            descripcion: "La seña se articula colocando la mano dominante a la altura de la ceja en la configuración de la letra L (dedos pulgar e índice extendidos), con la palma orientada hacia el frente, realizando desde esa posición un movimiento corto y semicircular hacia afuera mediante un ligero giro de la muñeca.",
            audioDescripcion: "Para el día lunes, levanta el dedo índice de tu mano dominante formando una L y dibuja un pequeño círculo en el aire frente a tu pecho.",
            notas: "Variante dactilológica de LESCO basada en la letra inicial de la palabra."
        },
        {
            id: "martes",
            palabra: "Martes",
            video: "assets/videos/dias/martes.mp4",
            poster: "",
            descripcion: "Configure la mano dominante formando la letra M (dedos índice, medio y anular extendidos hacia abajo, pulgar sosteniendo el meñique). Realice un movimiento circular continuo en el aire a la altura del hombro.",
            audioDescripcion: "Para el día martes, coloca tu mano formando la letra M con los tres dedos apuntando hacia abajo y haz un movimiento circular continuo frente a ti.",
            notas: "Usa la inicial dactilológica costarricense para distinguir el inicio del bloque semanal."
        },
        {
            id: "miercoles",
            palabra: "Miércoles",
            video: "assets/videos/dias/miercoles.mp4",
            poster: "",
            descripcion: "Configure la mano dominante formando la letra M (dedos índice, medio y anular hacia abajo). Realice un movimiento de vaivén o balanceo corto y rectilíneo de lado a lado de forma horizontal.",
            audioDescripcion: "Para señalar el miércoles, mantén la posición de la letra M con tus tres dedos hacia abajo, pero mueve tu mano suavemente de lado a lado en línea recta.",
            notas: "Distingue formalmente el miércoles del martes variando la trayectoria de circular a lineal."
        },
        {
            id: "jueves",
            palabra: "Jueves",
            video: "assets/videos/dias/jueves.mp4",
            poster: "",
            descripcion: "Configure la mano dominante con el dedo meñique extendido hacia arriba y los demás cerrados en puño (configuración de la letra J). Dibuje de forma fluida la curva de la 'J' descendiendo en el aire.",
            audioDescripcion: "Para el día jueves, levanta el dedo meñique de tu mano dominante y dibuja la forma de una letra J en el aire frente a ti.",
            notas: "Variante dactilológica tradicional de LESCO basada en el trazo visual de la letra inicial."
        },
        {
            id: "viernes",
            palabra: "Viernes",
            video: "assets/videos/dias/viernes.mp4",
            poster: "",
            descripcion: "Configure la mano dominante formando la letra V (dedos índice y medio abiertos en ángulo, los demás cerrados). Realice un sutil movimiento circular frente al torso.",
            audioDescripcion: "Para indicar el día viernes, extiende tus dedos índice y medio formando una letra V y realiza un pequeño giro circular en el aire.",
            notas: "Usa la inicial dactilológica estándar cerrando los días de la semana laboral."
        },
        {
            id: "sabado",
            palabra: "Sábado",
            video: "assets/videos/dias/sabado.mp4",
            poster: "",
            descripcion: "La seña se articula posicionando la mano dominante a la altura de la ceja en la configuración de la letra S (mano cerrada en puño con el pulgar cruzado por el frente), con la palma orientada hacia el frente, realizando un movimiento circular corto y continuo en el sitio.",
            audioDescripcion: "Para el día sábado, forma una letra L con tus dedos índice y pulgar cerca de tu mejilla y haz un pequeño giro hacia atrás con tu muñeca.",
            notas: "Es una seña con una raíz icónica propia y nativa de Costa Rica, desvinculada de la secuencia numérica."
        },
        {
            id: "domingo",
            palabra: "Domingo",
            video: "assets/videos/dias/domingo.mp4",
            poster: "",
            descripcion: "La seña se realiza colocando la mano dominante a la altura de la ceja en la configuración de la letra D (dedo índice extendido hacia arriba y los demás dedos formando un círculo con el pulgar), con la palma orientada hacia el frente, ejecutando un movimiento circular pequeño y continuo en el espacio peri-cefálico.",
            audioDescripcion: "Finalmente, para el domingo, levanta tu dedo índice cerca del lado de tu boca y realiza dos toques sutiles moviendo la mano ligeramente hacia atrás.",
            notas: "Seña nativa de LESCO. Evita por completo la dactilología de la 'D' en círculos del ASL."
        }
    ]
}


/**
 * Objecto de control de estado reactivo (Single Source of Truth).
 * Maneja el flujo de renderizado visual y persistencia volátil de datos.
 * * @type {Object}
 * @property {boolean} mostrarBienvenida - Determina si se despliega el Splash Screen inicial.
 * @property {string} categoriaActual - Almacena la llave del diccionario activa ('saludos', 'necesidades', 'dias').
 * @property {ElementoGlosario|null} palabraActiva - Puntero al elemento del glosario seleccionado por el usuario.
 * @property {boolean} cargando - Bandera de animación para simular transiciones asíncronas de interfaz.
 */
let estado = {
    mostrarBienvenida: true,
    categoriaActual: 'saludos',
    palabraActiva: DICCIONARIO_LESCO['saludos'][0],
    cargando: false
};


/**
 * Orquestador principal del DOM. Evalúa las banderas del estado global e inyecta 
 * dinámicamente las vistas estructuradas dentro del contenedor estructural único.
 * * @returns {void}
 */
function renderizarApp() {
    const contenedor = document.getElementById('app');

    if (estado.mostrarBienvenida) {
        contenedor.innerHTML = VistaBienvenida();
    } else {
        contenedor.innerHTML = VistaPrincipal();
        vincularEventosGlosario();
    }
}

/**
 * Genera el marcado HTML para la pantalla de bienvenida o Splash Screen.
 * Incluye puntos de entrada interactivos vinculados a los módulos de datos de LESCO.
 * * @returns {string} Bloque literal de plantillas HTML.
 */
function VistaBienvenida() {
    return `
        <div class="fixed inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 z-50 flex items-center justify-center p-4">
            <div class="max-w-2xl text-center bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20 text-white">
                <h1 class="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                    Bienvenido a la Guía de LESCO
                </h1>
                <p class="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                    Plataforma interactiva diseñada para el aprendizaje correcto de la Lengua de Señas Costarricense.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onclick="iniciarModulo('saludos')" class="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-all transform hover:-translate-y-1 cursor-pointer">
                        <span class="text-2xl mb-2">👋</span> Saludos
                    </button>
                    <button onclick="iniciarModulo('necesidades')" class="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-all transform hover:-translate-y-1 cursor-pointer">
                        <span class="text-2xl mb-2">🚨</span> Necesidades
                    </button>
                    <button onclick="iniciarModulo('dias')" class="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-semibold transition-all transform hover:-translate-y-1 cursor-pointer">
                        <span class="text-2xl mb-2">📅</span> Días de la Semana
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Genera el layout principal de la aplicación en formato Dashboard de dos columnas.
 * * @returns {string} Bloque literal de plantillas HTML que modela la interfaz de exploración.
 */
function VistaPrincipal() {

    const palabrasPlanas = DICCIONARIO_LESCO[estado.categoriaActual] || [];

    // Ahora respetamos el orden original del arreglo
    const listaPalabras = palabrasPlanas;

    // Generar botones de categorías
    const botonesCategorias = Object.keys(DICCIONARIO_LESCO).map(cat => `
        <button onclick="cambiarCategoria('${cat}')" class="px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer capitalize ${estado.categoriaActual === cat ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
        }">
            ${cat}
        </button>
    `).join('');

    // Generar lista lateral de palabras
    let contenidoLateral = '';
    if (estado.cargando) {
        contenidoLateral = `
            <div class="flex items-center gap-2 text-sm text-slate-500 animate-pulse p-4">
                <span class="inline-block w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                Cargando...
            </div>`;
    } else {
        contenidoLateral = listaPalabras.map(item => `
            <button onclick="seleccionarPalabra('${item.id}')" class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${estado.palabraActiva?.id === item.id ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }">
                ${item.palabra}
            </button>
        `).join('');
    }

    // Generar sección de visualización central
    let contenidoCentral = '';
    if (estado.palabraActiva) {
        contenidoCentral = `
            <div>
                <div class="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-950">${estado.palabraActiva.palabra}</h2>
                        <p class="text-sm text-slate-500 mt-1">Siga las pautas de accesibilidad y ejecución técnica del LESCO.</p>
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-teal-100 text-teal-800 rounded-full capitalize">
                        ${estado.categoriaActual}
                    </span>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                    <div class="lg:col-span-2 bg-slate-900 rounded-xl overflow-hidden aspect-square border border-slate-200 flex items-center justify-center relative">
                        <video id="videoPlayer" controls preload="auto" poster="${estado.palabraActiva.poster}" class="w-full h-full object-cover">
                            <source src="${estado.palabraActiva.video}" type="video/mp4" />
                            Su navegador no soporta reproducción de video HTML5.
                        </video>
                    </div>

                    <div class="lg:col-span-3 space-y-4">
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Ejecución del Movimiento</h3>
                            <p class="text-slate-600 text-sm leading-relaxed">${estado.palabraActiva.descripcion}</p>
                        </div>
                        
                        <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                            <h3 class="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">Notas de Contexto LESCO</h3>
                            <p class="text-amber-800 text-sm leading-relaxed">${estado.palabraActiva.notas}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        contenidoCentral = `<div class="text-center py-12 text-slate-400 italic">Seleccione una palabra del glosario.</div>`;
    }

    return `
        <div class="min-h-screen flex flex-col">
            <header class="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <h2 class="text-xl font-bold text-indigo-900 flex items-center gap-2">
                    <span class="text-2xl">🇨🇷</span> Módulos LESCO
                </h2>
                <div class="flex flex-wrap gap-2">${botonesCategorias}</div>
            </header>

            <main class="flex-1 grid grid-cols-1 md:grid-cols-4 max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
                <aside class="bg-white rounded-xl border border-slate-200 p-4 space-y-2 h-[calc(100vh-140px)] overflow-y-auto shadow-sm">
                    <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Glosario disponible</p>
                    ${contenidoLateral}
                </aside>

                <section class="md:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-[calc(100vh-140px)] overflow-y-auto">
                    ${contenidoCentral}
                    
                    <div class="border-t border-slate-100 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button onclick="reproducirAudio()" class="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                            🔊 Escuchar Pronunciación
                        </button>
                        <button onclick="volverBienvenida()" class="w-full sm:w-auto px-5 py-2.5 text-slate-600 font-medium text-sm hover:text-slate-900 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                            🏠 Volver a la Bienvenida
                        </button>
                    </div>
                </section>
            </main>
        </div>
    `;
}

/**
 * Transiciona el estado de la aplicación desde la vista Splash hacia el Dashboard de trabajo.
 * Expone la función al objeto global window para permitir invocaciones en línea (inline event handlers).
 * * @param {string} categoria - Nombre de la propiedad del módulo a activar de forma inicial.
 * @returns {void}
 */
window.iniciarModulo = function (categoria) {
    estado.mostrarBienvenida = false;
    window.cambiarCategoria(categoria);
};

/**
 * Modifica la categoría semántica activa e inicia un refresco visual con simulación asíncrona de carga.
 * Restablece automáticamente la palabra activa seleccionando la primera del arreglo resultante.
 * * @async
 * @param {string} categoria - Nombre de la propiedad del módulo semántico seleccionado.
 * @returns {Promise<void>} Promesa vacía que se resuelve al finalizar el ciclo de repintado.
 */
window.cambiarCategoria = async function (categoria) {
    estado.cargando = true;
    estado.categoriaActual = categoria;
    renderizarApp();

    // Simular pequeña carga estética para transiciones suaves de interfaz
    await new Promise(resolve => setTimeout(resolve, 250));
    estado.cargando = false;

    // Al recuperar la lista seleccionamos implícitamente la primera disponible respetando el orden original
    const palabrasPlanas = DICCIONARIO_LESCO[categoria] || [];
    const listaOrdenada = palabrasPlanas;

    estado.palabraActiva = listaOrdenada.length > 0 ? listaOrdenada[0] : null;
    renderizarApp();
};

/**
 * Actualiza la palabra activa del visor central en base al identificador seleccionado en la barra lateral.
 * * @param {string} id - Atributo identificador único del elemento (kebab-case).
 * @returns {void}
 */
window.seleccionarPalabra = function (id) {
    const lista = DICCIONARIO_LESCO[estado.categoriaActual] || [];
    estado.palabraActiva = lista.find(item => item.id === id);
    renderizarApp();
};

/**
 * Restablece las banderas del estado global para regresar a la interfaz Splash.
 * * @returns {void}
 */
window.volverBienvenida = function () {
    estado.mostrarBienvenida = true;
    renderizarApp();
};

/**
 * Motor de accesibilidad por voz (Text-to-Speech).
 * Consume el API nativo Web Speech Synthesis del navegador para reproducir oralmente 
 * el guión configurado con acento local costarricense.
 * * @returns {void}
 */
window.reproducirAudio = function () {
    if (estado.palabraActiva) {
        // Se configura el lector consumiendo el guión optimizado narrativo de audioDescripcion
        const mensaje = new SpeechSynthesisUtterance(estado.palabraActiva.audioDescripcion);
        mensaje.lang = 'es-CR'; // Configuración regional: Idioma Español de Costa Rica
        window.speechSynthesis.speak(mensaje);
    }
};

/**
 * Forzado dinámico de buffers multimedia.
 * Corrige problemas de renderizado de elementos de video inyectados por string literales, 
 * obligando al API del reproductor nativo de HTML5 a reconstruir las pistas.
 * * @returns {void}
 */
function vincularEventosGlosario() {
    const video = document.getElementById('videoPlayer');
    if (video) {
        video.load();
    }
}

// Dispara el ciclo de ejecución del software una vez el DOM estructural esté disponible
document.addEventListener('DOMContentLoaded', renderizarApp);