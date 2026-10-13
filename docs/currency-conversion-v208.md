# Conversión de divisas

El selector general convierte ingresos previstos, gastos, saldos y mínimos de deuda, pagos, movimientos de calendario, ahorros, cobros reales, bienes y registros de patrimonio. Las cantidades originales y su moneda quedan en `fxBasis208`; APR, porcentajes, fechas e identificadores no cambian. Los saldos de deuda conservan la unidad del contrato al registrar o quitar pagos.

Las cotizaciones originales de empresas y el ejemplo histórico publicado en USD mantienen la moneda de su fuente. El selector independiente del simulador define la moneda de un escenario nuevo, no una operación bancaria.

Fuente: Frankfurter v2, tasas de referencia diarias combinadas. No son precios de compra/venta bancarios ni cotizaciones en tiempo real. La interfaz indica fecha y fuente. No se envían nombres, importes ni datos personales al proveedor: solo códigos de moneda. No hay claves en el navegador.

Un cambio requiere todas las tasas necesarias, válidas, positivas y de no más de siete días. La caché se consulta solo el día UTC en que se obtuvo. Sin cobertura, ante una respuesta inválida, desconexión, ocho segundos de espera o fallo de almacenamiento, se conserva todo el estado anterior. No se sustituye una conversión ausente por una tasa 1. Un cambio de usuario invalida la solicitud pendiente.

Los borradores monetarios se convierten junto con la página; la APR se conserva. Al editar un gasto, `Moneda del importe` permite ingresar un importe en otra moneda o corregir la unidad de un registro antiguo. Se convierte dentro de la misma transacción de guardado.

Antes de v208, el selector no guardaba moneda de origen. No es posible deducir automáticamente la divisa de registros antiguos mezclados; se toma la moneda seleccionada actualmente como punto de partida. Corregir estos gastos con Editar → Moneda del importe, verificando su importe original.

Pruebas:
- `check-currency-model-v208.cjs`: diferentes monedas, originales, cambios repetidos, edición, contratos de deuda y tasas inválidas.
- `check-currency-browser-v208.cjs`: navegador, transporte simulado con tasas distintas, vistas, pagos, borradores, recuperación, tiempo límite, usuarios y copias en PEN.
- `server/check-fx-provider-v208.mjs`: consulta pública real de USD/COP/BRL/PEN y CORS en CI.
- Los controles anteriores usan `test-fx-fixture-v208.cjs` con paridad sintética para aislar su comportamiento de la variación diaria del mercado. No se incluyen estas tasas en la aplicación.

Fuentes oficiales:
- https://frankfurter.dev/
- https://api.frankfurter.dev/v2/openapi.json
