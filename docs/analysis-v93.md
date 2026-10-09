# V93 — Análisis de ingresos, gastos y patrimonio

Acceso: Más → Análisis de dinero y patrimonio; también desde Gastos.

- Semana (lunes a domingo), mes, trimestre y año: se cuentan gastos realizados con fecha válida hasta hoy. Plantillas recurrentes pendientes no se suman. Los pagos reales de deuda pueden incluirse o excluirse.
- Ingresos recibidos: registros independientes del ingreso previsto del presupuesto. Se registran manualmente, se pueden editar y eliminar. No se deducen cobros de eventos del calendario.
- Desglose de salidas por categoría, barras por fecha y tablas accesibles de valores.
- Patrimonio: bienes y saldos registrados en la moneda seleccionada menos saldos actuales de deudas. El ahorro acumulado de metas no se suma automáticamente. Los valores no se sincronizan con bancos.
- Evolución: guardar explícitamente un registro del patrimonio de hoy. Se actualiza el punto del mismo día y moneda; se conservan hasta 365 registros entre monedas. La línea une observaciones, sin inventar saldos históricos. Filtros de 1, 3, 6 y 12 meses calendario, o todo el historial.
- Ingresos y bienes nuevos están etiquetados con moneda. Cambiar la moneda no convierte las deudas y gastos antiguos, que carecen de etiqueta propia.
- El modo privado suprime gráficos, proporciones, tablas y listas de registros, y exige mostrar montos para editar o guardar registros.

Persistencia: mismos datos locales `arydebts-v3`, incluidos en el historial y descarga de recuperación V92. No se agrega conexión remota ni respaldo financiero continuo externo. Los respaldos del código por versión continúan usando el flujo V92.

Validación: cálculo puro (límites de fechas, moneda, pagos, recurrentes, valores negativos y actualización diaria), pruebas de formularios y privacidad en Chromium/WebKit móvil y escritorio, y suite existente de integración.
