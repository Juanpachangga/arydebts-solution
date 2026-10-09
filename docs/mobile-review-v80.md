# Arydebts: revisión móvil V80

## Cambios

- La portada tiene su propio interruptor Inmersiva/Lite, debajo del tema claro/oscuro. Su opción predeterminada es Inmersiva y su preferencia se guarda por separado.
- Salir de un perfil local no impone su modo Lite a la portada. Cada perfil local recuerda su elección de movimiento; un perfil diferente empieza con Inmersiva.
- La preferencia del sistema de reducir movimiento sigue teniendo prioridad.
- Botones de formularios y navegación móvil tienen un área mínima de 48 píxeles CSS; controles de entrada mantienen al menos 16 píxeles de texto. Las unidades CSS no equivalen automáticamente a puntos iOS o dp Android en un paquete nativo.

## Verificación automatizada incluida

- Chromium y WebKit en computador y móvil.
- Cierre de sesión, recarga, cambio de perfil local y restauración de preferencias; el movimiento de la portada no modifica los importes.
- Pantallas Inicio, Deudas, Gastos, Plan y Más en español, inglés y portugués.
- Anchos de 320, 390, 430 y 768 píxeles: comprobación de desbordamiento horizontal, cinco destinos de navegación y áreas de toque. Los resultados se guardan en los artefactos de CI.
- No equivale a probar un iPhone o Android físico, VoiceOver/TalkBack, teclado físico/virtual, consumo energético ni aprobación en tiendas.

## Evaluación del producto

La base actual es una aplicación web adaptada a móvil, con navegación persistente, formularios, preferencias, calendario, datos editables y manifest de presentación standalone. Todavía no hay un paquete de iOS o Android listo para las tiendas.

El principal problema visual es la densidad del inicio: accesos adaptativos, mensajes, consejos, progreso y métricas compiten antes de llegar a la acción del día. Propongo priorizar saldo/margen, próximo vencimiento y Agregar gasto; conservar una sola frase breve y abrir las explicaciones extensas a petición. El planeta y la estética de Arydebts se mantienen.

Mantendría los cinco destinos principales. Llevaría eventos, apoyo, comentarios y personalización a Más. Las animaciones deberían acompañar la información, con contraste estable, sin retrasar las acciones ni requerir movimiento para entender una alerta.

## Antes de publicar en tiendas

1. Conectar autenticación real y almacenamiento separado por cuenta, recuperación de acceso y respaldo. Los perfiles y datos actuales se guardan localmente en el navegador; una preferencia por correo local no constituye autenticación ni aislamiento de datos financieros.
2. Activar los adaptadores de registro/captcha y asistente con infraestructura real. Los botones sociales aún no crean una sesión con el proveedor.
3. Completar la instalación web: el manifest existe, pero faltan los iconos y una estrategia de funcionamiento/actualización sin conexión. No hay service worker en esta versión.
4. Preparar los paquetes iOS y Android con iconos, permisos, ciclo de vida, almacenamiento seguro y capacidades de calendario/cámara/notificaciones cuando se implementen.
5. Probar en dispositivos físicos, con teclado abierto, pantallas pequeñas, accesibilidad, interrupciones y conexiones lentas. Incorporar privacidad, exportación y eliminación de cuenta/datos antes del lanzamiento.

Apple exige utilidad y experiencia que superen una web simplemente empaquetada; una estética móvil no garantiza la aprobación.

## Referencias oficiales consultadas

- Apple, botones y áreas táctiles: https://developer.apple.com/design/human-interface-guidelines/buttons
- Apple, diseño de navegación: https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Android, accesibilidad y controles: https://developer.android.com/guide/topics/ui/accessibility/apps
- Apple, App Review Guidelines, sección 4.2: https://developer.apple.com/app-store/review/guidelines/
