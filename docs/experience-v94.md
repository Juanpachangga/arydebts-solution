# V94 — Jerarquía visual y guía contextual de Ary

- Volver sale del recuadro del encabezado y mantiene un área táctil de 44 px con texto más discreto. La navegación anterior y el regreso en el registro conservan su comportamiento.
- Títulos de las secciones centrados. Saludo inicial más compacto (88–96 px de altura mínima), con ilustración reducida. Los textos grandes pueden aumentar la altura para conservar legibilidad.
- Frase del encabezado elegida entre 12 mensajes originales en español, inglés y portugués. Cambia al abrir o retomar la app; permanece estable mientras se navega. Se evita repetir la frase de la visita anterior cuando el almacenamiento está disponible. Los mensajes favoritos del inicio mantienen sus controles existentes.
- Más: Análisis es la primera tarjeta. Herramientas principales visibles; cuenta/preferencias y comunidad agrupadas en paneles desplegables. Se conservan las rutas existentes, preferencias y cierre de sesión.
- V196: Ary acompaña con cuatro tarjetas breves, en el orden Inicio → Gastos → Deudas → Más. «Entendido» guarda la confirmación y abre la próxima página pendiente con su tarjeta; al terminar Más, la guía queda completada y cerrada. La navegación no depende de temporizadores ni capas flotantes.
- La guía se inicia al guardar correctamente el último paso del registro nuevo. Conserva las confirmaciones al migrar desde V194/V195 y no reinicia una guía completada. Se puede repetir desde Más → Conoce Arydebts. Si falla el guardado, permanece en la misma página y permite reintentar. Un doble clic de una tarjeta anterior no salta pasos.
- Gasto al instante acepta montos con punto o coma. El botón «Decimales» convierte el texto a dos decimales según el idioma sin registrarlo. Tres ejemplos distintos, elegidos aleatoriamente por carga e idioma, rellenan el campo sin guardar; la guía de Inicio usa el mismo conjunto. Los ejemplos permanecen estables mientras se escribe.
- Detalles discretos y distintos por sección durante Halloween: calabaza, luna, murciélago, sombrero y estrella. Se respeta el selector de temporada existente.

Comprobaciones: integración existente, máquina de estados de la guía y frases, y comportamiento real en Chromium/WebKit con móvil, tablet y escritorio, incluyendo texto grande a 320 px, formularios, traducciones y movimiento reducido. Los datos financieros y los mecanismos de recuperación V92 conservan sus contratos.

Reparación del encabezado: los refrescos de notificaciones conservan la insignia y el texto accesible de la campana cuando sus valores no han cambiado, evitando reescrituras innecesarias del DOM.
