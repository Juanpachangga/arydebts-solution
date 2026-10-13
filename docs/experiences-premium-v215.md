# Arydebts: vistas y suscripción

Sencilla tiene exactamente cuatro pestañas: Inicio, Gastos, Deudas y Más. Su tema inicial es claro, modo Lite y sonido desactivado. El fondo sencillo evita ondas y decoración ambiental. No tiene Plan, Inversiones, análisis ni guía automática. Sus formularios agrupan campos opcionales sin borrar valores existentes. Más conserva ajustes, perfil, cumpleaños y fechas, cambio a Completa y acceso a planes.

Completa es gratis: añade Plan, metas, calendario y progreso, conserva elección de temas y modo inmersivo. Inversiones gratis presenta tres activos como vista previa, sin precios inventados, gráficas detalladas, simulaciones o acciones. Crédito no aparece ni se consulta en ninguna cuenta gratuita.

Premium habilita análisis de dinero y patrimonio, comparador de estrategias de deudas, gráficas y simulaciones de inversión. El informe mensual requiere el servicio de informes del servidor. Operación real de inversiones y puntaje de crédito requieren sus propios proveedores; no se anuncian como conexiones ya activas.

El registro explica ambas vistas y muestra Premium debajo de los campos: probar un mes gratis, suscribirse ahora o continuar gratis. La selección no concede permisos locales. Una cuenta puede usar Sencilla aun teniendo Premium. Cambiar de vista conserva gastos, deudas y pagos.

## Conexión de cobros pendiente

El adaptador `premium-service-v214.js` envía la intención `trial` o `now` y la moneda. El handler valida esos valores contra el catálogo del servidor, nunca acepta montos arbitrarios. El contrato de estado admite `trialing` o `active` con vigencia y propietario correctos. Los informes siguen protegidos en el servidor.

Usar `createStripeProvider215` con un SDK Stripe del servidor, catálogo de precios autorizados, mapeo permanente usuario-cliente y `withBillingLock(userId, callback)` respaldado por base de datos. El precio USD debe ser 999 unidades menores y mensual. COP requiere su precio y monto autorizados; los 3.996.000 de la prueba equivalen a COP 39.960 y son solo una fixture, no una decisión comercial. El estado publica el catálogo de precios confirmado; mientras no haya backend, la equivalencia visual se etiqueta como aproximada.

`trial` calcula un mes calendario con ajuste de fin de mes y configura `trial_end`. `now` no agrega prueba. Historial de suscripción y sesiones abiertas impiden duplicar pruebas/cobros; la aplicación debe conservar el cliente y usar el bloqueo durable para solicitudes simultáneas. Checkout recoge el medio de pago en su página segura. No se guardan claves privadas en el frontend.

Desplegar el servidor con sesión autenticada, RLS, cuota, catálogo y secretos; verificar webhooks y sincronizar cambios, cancelación y vencimiento. Configurar el portal, correos de prueba/renovación y precios de producción. Falta integrar esos servicios antes de aceptar dinero real: los botones de cobro se mantienen deshabilitados sin servicio configurado.

## Validación

- `node check-experience-tiers-v215.cjs`: Chromium y WebKit cuando estén disponibles; cuatro pestañas, registro claro/Lite, gastos reales, cambio de vista, idiomas, tamaños 320/390/1366, datos conservados, muestra gratis y permisos de prueba/vencimiento/otra cuenta.
- `node server/check-premium-v215.mjs`: mes calendario y año bisiesto, USD/COP del servidor, pago inmediato, prueba única, comparación de deudas sin modificar registros.
- `node server/check-premium-v214.mjs`: protección de precio USD, propiedad, informes y redirecciones.
- `node check-integration.cjs`: integración de módulos y contratos existentes con DOM simulado.

Las pruebas visuales antiguas que asumían acceso gratuito a análisis, crédito o inversión completa deben migrar sus fixtures a una cuenta Premium. Las guías de registro completo deben elegir Completa explícitamente; Sencilla ahora termina directamente en Inicio. El nuevo test cubre las reglas actuales de acceso; no se eliminan pruebas históricas para ocultar esos cambios de contrato.
