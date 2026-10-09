# Preparación del envío al celular — V90

**Estado: código de servidor preparado, sin desplegar ni activar.** V89 sigue ofreciendo avisos dentro de la aplicación. No se han enviado notificaciones reales y este cambio no conecta las cuentas locales de demostración a Supabase.

## Implementado

- `server/push-handler-v90.mjs`: endpoint POST con origen permitido, identidad verificada por servidor, consentimiento explícito, cuota obligatoria y validación de suscripción. Nunca acepta un identificador de usuario enviado por el cliente.
- `server/push-planner-v90.mjs`: utiliza los datos guardados, zona horaria y preferencias. Agrupa pagos en un aviso diario y limita gastos hormiga/progreso a un aviso diario. Motivación en la ventana matutina elegida. Avisos financieros entre las 08:00 y las 21:00.
- `server/push-postgres-v90.mjs`: cola persistente con deduplicación, bloqueo concurrente, recuperación de envíos interrumpidos y comprobación de propietario, revisión y consentimiento.
- `server/push-dispatch-v90.mjs`: vuelve a consultar los datos antes de enviar; cancela avisos obsoletos, elimina suscripciones vencidas y reintenta errores transitorios hasta cinco intentos. Los mensajes caducan a los diez minutos para evitar avisos atrasados.
- `server/push-cycle-v90.mjs`: ciclo paginado para programar y procesar la cola desde un servidor confiable.
- Migración SQL V90: tablas privadas, sin lectura ni escritura directa desde `anon` o `authenticated`. Solo el servicio confiable puede acceder a claves de transporte.

Los mensajes enviados no incluyen nombres de deudas, saldos ni montos. Los vencimientos y los pagos son los que el usuario registró; todavía no existe sincronización bancaria.

## Activación pendiente

1. Activar Supabase Auth y la persistencia de cuentas V83; conectar el registro real y comprobar el aislamiento entre usuarios. No mezclar perfiles locales con usuarios verificados.
2. Aplicar las migraciones V83 y V90 en el proyecto elegido, con copia de seguridad y revisión de los permisos. Esta entrega no ejecuta migraciones sobre ningún proyecto real.
3. Desplegar un servicio Node con `pg` y `web-push`. Mantener conexión de base de datos, clave privada VAPID y credenciales de servicio exclusivamente en el servidor. Instanciar el almacén con un pool privado. Este repositorio entrega módulos; aún falta el adaptador de alojamiento/HTTP y su configuración.
4. Conectar `verifyUser(token)` a `supabase.auth.getUser(token)` con validación remota; rechazar sesiones anónimas y correos sin confirmar. Conectar `consumeQuota(userId)` a un limitador persistente compartido; no usar un contador local por proceso en producción.
5. Generar VAPID una vez y configurar `web-push` con contacto, clave pública y clave privada. Inyectar `sendPush` usando `webpush.sendNotification`. No registrar tokens, endpoints, claves o datos financieros en logs.
6. Ejecutar `runPushCycle90` cada minuto desde un cron privado, con autenticación del planificador. Monitorizar errores, cola y respuestas del proveedor. La periodicidad de un minuto es una aproximación, no entrega instantánea garantizada.
7. Después de iniciar sesión real, ofrecer **Activar avisos en mi celular**. Pedir permiso mediante una acción del usuario, registrar el service worker V89, crear la suscripción con la clave VAPID pública y enviarla al endpoint autenticado. Guardar consentimiento, zona horaria y preferencias. Conectar desactivación, cambio de cuenta y cierre de sesión a la revocación del dispositivo antes de descartar el token; añadir reintento si falla.
8. Integrar y probar la apertura de la sección y fecha desde una notificación. El worker preparado todavía no está registrado y la restauración de la fecha exacta requiere integración con el arranque de la aplicación.
9. Probar dos cuentas reales y dispositivos físicos: Chrome, Firefox, Safari y aplicación añadida a la pantalla de inicio de iPhone compatible. La lista de endpoints actual acepta FCM, Mozilla y Apple; ampliar otros proveedores solo tras verificar sus dominios oficiales.

Una respuesta aceptada del proveedor no prueba que el celular mostró el aviso. Un fallo entre aceptación y escritura en la base puede causar un reintento; la entrega es de al menos una vez. Los identificadores estables ayudan a agrupar avisos, pero no garantizan que nunca haya duplicados. No es posible retirar un mensaje ya aceptado por el proveedor. Los ajustes de permisos, conectividad y batería también afectan la entrega.

## Validación

`node server/check-push-v90.mjs` comprueba reglas, horarios/DST, privacidad, consentimiento, identidad y errores con transportes simulados. `server/check-push-postgres-v90.mjs` se ejecuta después del test V83, solo en PostgreSQL desechable de CI, y comprueba aislamiento, concurrencia, revocación, recuperación, caducidad y deduplicación. Ninguna prueba contacta un dispositivo real.
