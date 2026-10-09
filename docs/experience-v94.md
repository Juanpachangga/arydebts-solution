# V94 — Jerarquía visual y guía contextual de Ary

- Volver sale del recuadro del encabezado y mantiene un área táctil de 44 px con texto más discreto. La navegación anterior y el regreso en el registro conservan su comportamiento.
- Títulos de las secciones centrados. Saludo inicial más compacto (88–96 px de altura mínima), con ilustración reducida. Los textos grandes pueden aumentar la altura para conservar legibilidad.
- Frase del encabezado elegida entre 12 mensajes originales en español, inglés y portugués. Cambia al abrir o retomar la app; permanece estable mientras se navega. Se evita repetir la frase de la visita anterior cuando el almacenamiento está disponible. Los mensajes favoritos del inicio mantienen sus controles existentes.
- Más: Análisis es la primera tarjeta. Herramientas principales visibles; cuenta/preferencias y comunidad agrupadas en paneles desplegables. Se conservan las rutas existentes, preferencias y cierre de sesión.
- Ary es un pequeño robot vectorial con animación corta y contextual. La guía comienza al finalizar el registro de una nueva cuenta; cada sección muestra una explicación breve y una acción práctica cuando se visita por primera vez. Se puede cerrar un consejo o terminar toda la guía. No se impone a cuentas existentes; pueden iniciarla voluntariamente desde Más → Conoce Arydebts.
- Los consejos se guardan en el mismo estado local por cuenta. No se repiten en secciones ya visitadas, incluso después de recargar. La guía no tapa formularios ni navegación: se presenta dentro del flujo de la página. Animaciones desactivadas en modo Lite o con movimiento reducido.
- Detalles discretos y distintos por sección durante Halloween: calabaza, luna, murciélago, sombrero y estrella. Se respeta el selector de temporada existente.

Comprobaciones: integración existente, máquina de estados de la guía y frases, y comportamiento real en Chromium/WebKit con móvil, tablet y escritorio, incluyendo texto grande a 320 px, formularios, traducciones y movimiento reducido. Los datos financieros y los mecanismos de recuperación V92 conservan sus contratos.

Reparación del encabezado: los refrescos de notificaciones conservan la insignia y el texto accesible de la campana cuando sus valores no han cambiado, evitando reescrituras innecesarias del DOM.
