# Sencilla, Completa y Premium

La vista de Inicio (`s.experience214`) es independiente de la suscripción. Los clientes existentes mantienen Completa. El registro ofrece Sencilla por defecto y permite elegir Completa. El cambio está disponible en Inicio y Preferencias, sin modificar importes, fechas, cumpleaños, temas, metas ni el orden de la guía.

Sencilla conserva el saludo, disponible estimado, gasto al instante, búsqueda, frase, próximos movimientos y el botón de registrar pago. Los detalles se pueden expandir; las seis pestañas y sus funciones siguen accesibles. Completa mantiene la vista anterior. Ambas usan los mismos formularios, cálculos, conversión monetaria y almacenamiento.

Premium cuesta **999 centavos USD por mes**. La pantalla muestra su equivalente en la moneda de la app y permite elegir otra moneda para consultar el precio, sin convertir ni alterar el presupuesto. COP usa formato colombiano; BRL usa formato brasileño. Se usa el servicio de referencia Frankfurter compartido, con fecha publicada, actualización manual y consultas cada 15 minutos mientras la pantalla está visible. Si falta una tasa válida se muestra USD; si falla una actualización se conserva la última cotización válida. Son referencias diarias, no una promesa de tipo de cambio bancario ni el precio final de cobro.

## Activar cobros reales

El sitio estático no procesa tarjetas. Hasta conectar el servidor, el botón de suscripción está deshabilitado y explica que los cobros no están habilitados. No hay suscripciones simuladas ni activación mediante `localStorage`.

1. Crear en Stripe un producto ARYDEBTS Premium y un precio recurrente activo de USD 9.99, mensual, con cantidad 1. Conservar `price_...` en configuración del servidor.
2. Conectar sesiones verificadas de Supabase/tu backend. Crear en la base de datos una relación única entre el usuario autenticado y su `cus_...` de Stripe. Implementar `getOwnedCustomer` y `getOrCreateOwnedCustomer` con restricciones de propiedad y creación idempotente. No tomar IDs de cuenta del navegador.
3. Crear un cliente Stripe **solo en el servidor**, con la clave secreta en variables de entorno, tiempo de espera limitado y versión de API configurada para el despliegue. Inyectarlo en `createStripeProvider214` junto con el precio, la relación de clientes y URLs HTTPS de retorno a la app.
4. Montar `createPremiumHandler214` en `/premium/status`, `/premium/checkout`, `/premium/manage` y `/premium/report`. Inyectar verificación de sesión, cuota por usuario y los métodos del proveedor. El informe debe leer únicamente los datos del usuario autenticado y escapar textos como CSV, incluidos nombres que comienzan con `=`, `+`, `-` o `@`.
5. Exponer solo `window.aryPremiumConfig214={endpoint:'https://TU_BACKEND/premium/'}` al navegador. No exponer claves Stripe. Configurar CORS al origen exacto de la app y cookies seguras para el esquema de sesión utilizado. La página consume estado autenticado; el servidor vuelve a comprobar Premium antes de entregar el informe.
6. Configurar el portal Stripe para gestionar la suscripción. Verificar firma e idempotencia de webhooks de renovación, pago fallido y cancelación para mantener la base de datos sincronizada. El adaptador también consulta el estado de Stripe directamente y rechaza suscripciones vencidas o impagadas. La vuelta desde Checkout no activa acceso por sí misma.
7. Probar en modo test: alta, renovación, cancelación al final del periodo, pago fallido, duplicados, usuario diferente, informe propio y tasas no disponibles. Verificar el importe y la moneda efectivos en Checkout. Para cobros en monedas locales se deben configurar precios locales o una modalidad de conversión admitida por el proveedor; el equivalente visual no configura eso automáticamente.
8. Conectar y comprobar las herramientas que se ofrecerán antes de habilitar cobros en producción. Inversiones reales, datos de mercado contratados, alertas y automatizaciones bancarias necesitan sus respectivos proveedores. Una suscripción no deposita fondos en una cuenta de inversión.

El adaptador evita una segunda suscripción activa, valida el precio del servidor y usa Checkout/portal hospedados en dominios Stripe permitidos. No se han creado productos, clientes, sesiones de pago ni cuentas externas durante esta implementación.

Documentación oficial: https://docs.stripe.com/billing/quickstart, https://docs.stripe.com/billing/subscriptions/webhooks y https://docs.stripe.com/billing/subscriptions/integrating-customer-portal.
