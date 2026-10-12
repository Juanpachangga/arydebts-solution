# Cotizaciones reales: conexión pendiente

Los widgets públicos de acciones de TradingView tienen retraso. Una suscripción personal de TradingView no habilita datos en tiempo real en Arydebts.

1. Contactar a un proveedor para uso comercial y redistribución a usuarios de Arydebts (por ejemplo, Alpaca Broker API Market Data). Confirmar países autorizados, número de usuarios, derechos de visualización y acuerdos de bolsas.
2. Elegir cobertura: IEX es una sola bolsa; SIP consolida las bolsas estadounidenses. No presentarlas como equivalentes.
3. Contratar acceso y desplegar un backend autenticado fuera de GitHub Pages. Guardar claves exclusivamente en secretos del servidor.
4. Conectar WebSocket del proveedor en el backend, autenticar y suscribir los símbolos. Compartir el flujo mediante SSE/WebSocket con usuarios autorizados; limitar conexiones y reconectar con espera gradual.
5. Sustituir el widget por una gráfica propia con histórico del mismo proveedor. Mostrar fuente, cobertura, moneda, hora del último dato y estado de conexión/mercado. Una desconexión debe mostrar dato desactualizado, nunca un precio inventado.
6. Validar retrasos, mercado cerrado, pérdida de conexión, cuotas, derechos de cada usuario y reconciliación de correcciones/cancelaciones antes de publicar como tiempo real.

Estado: no se han proporcionado cuenta comercial, licencia, credenciales ni backend desplegado. Se conserva el aviso honesto de datos retrasados.

Fuentes oficiales:
- https://www.tradingview.com/widget-docs/faq/data/
- https://docs.alpaca.markets/us/docs/about-market-data-api
- https://docs.alpaca.markets/us/docs/real-time-stock-pricing-data
