# Arydebts V83: base para cuentas reales

## Estado actual

Se implementaron el adaptador de autenticación, la lectura/escritura de datos por usuario y la migración SQL. Todavía NO se activaron cuentas remotas en la web pública. El flujo existente continúa siendo un perfil local, ahora identificado explícitamente como modo local. No se subieron registros del navegador a ningún servidor.

## Qué está preparado

`account-service-v83.js` recibe un cliente oficial Supabase JavaScript SDK v2 ya inicializado. Ofrece registro con nombre, correo y contraseña (12–128 caracteres), confirmación por correo, acceso, recuperación de contraseña, cambio de contraseña y cierre de la sesión de este dispositivo. Los errores expuestos son genéricos y no incluyen respuestas internas del proveedor.

Cada operación de datos consulta `auth.getUser()`, exige un correo confirmado y rechaza cuentas anónimas. Los registros usan el UUID verificado, nunca el correo editable o el perfil guardado en el navegador. Las políticas RLS de la tabla restringen lectura, inserción, actualización y eliminación al propietario. La eliminación de la fila financiera NO elimina la identidad Auth: esa operación necesita una función de servidor aparte.

La escritura requiere el identificador de cuenta y la revisión que se leyeron previamente. Dos dispositivos editando una revisión antigua reciben un conflicto; el adaptador no sobrescribe el cambio más reciente. La interfaz futura debe mostrar ese conflicto y permitir descargar el borrador o revisar los cambios antes de reenviar. No hay autosincronización activada.

El payload admite `state` y `profile`, comprueba las listas principales, limita el tamaño a 256 KiB y rechaza campos de contraseñas/tokens. Es una primera capa de validación; debe ampliarse para la importación y los límites de cada registro. Las fotos grandes requieren almacenamiento separado y políticas propias.

## Activación pendiente

1. Crear o seleccionar un proyecto de Supabase que pertenezca a Juan Pablo. Obtener su Project URL y clave **publishable**. No enviar claves secretas, `service_role`, contraseñas de base de datos ni tokens de administrador.
2. Aplicar `supabase/migrations/20261009130000_accounts_v83.sql` en un proyecto nuevo o tras revisar que no exista esa tabla. La migración no altera tablas existentes ni importa los datos locales.
3. Activar el proveedor email/password y la confirmación del correo. Configurar SMTP propio, límites de abuso y CAPTCHA del proveedor antes de abrir el registro al público. La confirmación/recuperación requieren envío de correo real.
4. Configurar Site URL y la ruta de callback de Arydebts en la lista de redirects permitidos. La ruta aún debe implementarse para procesar confirmación y `PASSWORD_RECOVERY` mediante el SDK y mostrar el formulario para cambiar contraseña.
5. Integrar el SDK con el adaptador y sustituir explícitamente el flujo `localAuth`, la carga de estado, las preferencias y la persistencia. No usar simultáneamente el registro local o el verificador de registro v72 como si ambos autenticasen la cuenta.
6. Antes de iniciar sesión remota, respaldar el estado local; mantener borradores separados por UUID y limpiar la vista al salir/cambiar de usuario. La importación de datos actuales debe ser una acción explícita y confirmada, sin mezclar perfiles locales por coincidencia de correo.
7. Probar dos cuentas reales de ensayo: confirmación, contraseña incorrecta, recuperación, recarga, cierre de sesión, cambio de cuenta, conflictos, conexión interrumpida y restricciones de acceso. Revisar privacidad, retención, exportación y eliminación completa de cuenta antes del lanzamiento.

## Pruebas incluidas

- `server/check-accounts-v83.cjs`: contratos del adaptador con SDK simulado, correo sin confirmar, cuenta anónima, validaciones, cambio de identidad, conflictos, límites, recuperación y errores.
- `server/check-account-rls-v83.mjs`: PostgreSQL desechable en CI con funciones JWT de prueba. Comprueba políticas reales SQL para usuarios A/B, accesos anónimos, cambios de propietario, borrado ajeno y conflictos de revisión. No equivale a comprobar Supabase Auth, SMTP, CAPTCHA o una configuración de producción.
- Se mantiene la batería existente de integración y navegador.

## Referencias oficiales

- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/reference/javascript/auth-getuser
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/database/secure-data
