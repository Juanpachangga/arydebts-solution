# Activación de la IA de Arydebts

La web publicada sigue usando ayuda local. GitHub Pages no ejecuta este adaptador de servidor. No se ha realizado ninguna llamada de pago a OpenAI ni se ha enviado información financiera.

Para activar la IA:

1. Alojar `assistant-handler.mjs` en un backend HTTPS compatible con Request/Response (Node 24 o un adaptador equivalente).
2. Guardar `OPENAI_API_KEY` y el modelo elegido como secretos/configuración del servidor, nunca en el repositorio ni el navegador.
3. Conectar `verifySession(request)` a autenticación real: debe verificar una sesión firmada y devolver `{id}`. El perfil local de esta web no es una sesión autenticada de servidor.
4. Conectar `consumeQuota(userId)` a límites compartidos por usuario y presupuesto global. Debe devolver false al superar el límite. El adaptador falla cerrado si falta cualquiera de estas funciones.
5. Permitir el origen `https://juanpachangga.github.io`, cookies de sesión seguras y las solicitudes POST/OPTIONS de este cliente. Para producción, conviene alojar web y API bajo el mismo dominio y comprobar las restricciones de cookies de Safari.
6. Poner la URL HTTPS de la ruta en `assistant-config-v58.js`. La clave jamás se escribe ahí.

El usuario decide mediante una casilla si comparte cifras agregadas. No se adjuntan nombres, correo, foto ni listas de deudas/gastos al resumen. Las preguntas pueden contener información personal introducida por el propio usuario. El chat es temporal y se borra al cerrar sesión.

El servicio no modifica registros ni hace pagos. Usa Responses API con `store:false`; esto no equivale a una garantía de cero retención del proveedor. Documentación: https://developers.openai.com/api/docs/guides/migrate-to-responses

Las pruebas usan una respuesta simulada; falta probar la integración real con una cuenta API y la autenticación del backend desplegado.
