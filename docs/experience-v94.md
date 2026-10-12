# V94 — Jerarquía visual y guía contextual de Ary

- Volver sale del recuadro del encabezado y mantiene un área táctil de 44 px con texto más discreto. La navegación anterior y el regreso en el registro conservan su comportamiento.
- Títulos de las secciones centrados. Saludo inicial más compacto (88–96 px de altura mínima), con ilustración reducida. Los textos grandes pueden aumentar la altura para conservar legibilidad.
- Frase del encabezado elegida entre 12 mensajes originales en español, inglés y portugués. Cambia al abrir o retomar la app; permanece estable mientras se navega. Se evita repetir la frase de la visita anterior cuando el almacenamiento está disponible. Los mensajes favoritos del inicio mantienen sus controles existentes.
- Más: Análisis es la primera tarjeta. Herramientas principales visibles; cuenta/preferencias y comunidad agrupadas en paneles desplegables. Se conservan las rutas existentes, preferencias y cierre de sesión.
- Ary acompaña con cinco tarjetas independientes: Inicio, Gastos, Deudas, Plan y Más. Cada página muestra únicamente su consejo corto y un botón «Entendido». Pulsarlo cierra ese consejo sin cambiar de pestaña. Entrar en una página no equivale a entenderla: el consejo permanece pendiente hasta que se confirma.
- La guía se inicia al guardar correctamente el último paso del registro nuevo. Guarda por cuenta qué páginas se confirmaron y deja de aparecer después de confirmar las cinco, en cualquier orden. El usuario puede repetirla voluntariamente desde Más → Conoce Arydebts.
- La actualización V195 restaura los consejos de las páginas para las cuentas anteriores. Si la bienvenida de Inicio de V194 ya fue confirmada, conserva esa confirmación y muestra solamente las páginas pendientes. La migración es única e idempotente; nunca reinicia una guía V195 completada.
- Los consejos viven dentro del flujo de cada página y no bloquean formularios, gastos rápidos ni navegación. El antiguo motor de recorridos y sus temporizadores están retirados del paquete de producción. Si falla el guardado de «Entendido», la tarjeta sigue visible y se puede reintentar.
- Detalles discretos y distintos por sección durante Halloween: calabaza, luna, murciélago, sombrero y estrella. Se respeta el selector de temporada existente.

Comprobaciones: integración existente, máquina de estados de la guía y frases, y comportamiento real en Chromium/WebKit con móvil, tablet y escritorio, incluyendo texto grande a 320 px, formularios, traducciones y movimiento reducido. Los datos financieros y los mecanismos de recuperación V92 conservan sus contratos.

Reparación del encabezado: los refrescos de notificaciones conservan la insignia y el texto accesible de la campana cuando sus valores no han cambiado, evitando reescrituras innecesarias del DOM.
