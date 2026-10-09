# Reparaciones V91

Dos correcciones sobre las notificaciones internas V89:

- **Abrir el aviso correcto:** el botón «Ver» usa el identificador estable del aviso, en lugar de su posición en una lista recalculada. Si registraste el pago o el aviso caducó mientras mirabas la lista, se actualiza la lista sin llevarte a otro aviso.
- **Actualización después de cerrar preferencias:** los cambios detectados mientras hay un formulario abierto permanecen pendientes. Al volver a la lista, se actualiza sin reconstruir ni interrumpir el formulario. Un campo que conserva el foco dentro de una ventana cerrada ya no impide actualizar la lista.

Se añadieron pruebas de regresión en Chromium y WebKit, a 320 y 1280 píxeles, para avisos resueltos después del render y cambios aplazados por una ventana abierta. Las pruebas generales conservan navegación, idiomas, datos, pagos y diseño existentes.

Se incluyen los módulos de preparación del servidor V90, comprobados en su rama. Siguen sin desplegar ni activar envío al celular; ver `docs/push-v90.md`. Esta reparación no ejecuta migraciones sobre una base de datos real ni registra el worker push.
