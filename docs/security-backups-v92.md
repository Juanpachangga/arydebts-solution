# Seguridad y recuperación · V92

## Revisión del 9 de octubre de 2026

Base comprobada: V91, commit `dd4af8bca8aee4fd57ff5b8c5d6cd33835d48c2c`.
Repositorio público: `Juanpachangga/arydebts-solution`. La rama `main` no estaba protegida.
El sitio actual guarda finanzas en `localStorage`, no en una base de datos remota.
Supabase, CAPTCHA, identidad y sincronización siguen sin activarse en la interfaz.
Las políticas SQL y los adaptadores existentes son preparación, no una garantía de producción.

## Cambios incluidos

- Antes de reemplazar el estado financiero se conserva el anterior, hasta 8 copias y aproximadamente 1 MiB de almacenamiento UTF-16. Todas las escrituras de la clave financiera, incluidas migraciones y módulos, pasan por esta captura.
- Configuración → Copias de mis datos permite descargar el estado financiero y su historial, o recuperar una copia local después de confirmar. Se intenta conservar el estado actual antes de recuperar otro.
- Si falla una copia o el guardado, aparece un aviso persistente. Un fallo de la copia no impide guardar el estado principal; si falla este último, el almacenamiento anterior permanece intacto y el aviso pide mantener abierta la página.
- Se preserva el historial Git. En cada push a `main`, un workflow crea ZIP del código exacto, bundle de su historia, manifiesto y sumas SHA-256. Comprueba los bytes del ZIP contra el commit y verifica el bundle antes de crear un borrador de release por SHA.
- Los borradores no se sobrescriben ni eliminan automáticamente. No se usan artefactos con caducidad como único respaldo. Si una creación queda incompleta, revisar sus cuatro archivos; no se sustituye automáticamente una copia existente.

El workflow necesita GitHub Actions habilitado y permiso de escritura de contenido. Revisar cada ejecución: un workflow guardado no prueba que la copia se haya creado. Los borradores de release se ven con acceso de escritura al repositorio.

## Límites que siguen vigentes

Una copia local desaparece si se borra el almacenamiento del navegador o se pierde el dispositivo. La descarga contiene datos financieros sin cifrar: conservarla en almacenamiento privado. No incluye sesión, contraseña, fotos ni todos los ajustes auxiliares. No hay importación de archivos externos en esta etapa.

Las copias locales usan el mismo conjunto de datos local que la aplicación actual: no autentican personas ni separan cuentas verificadas. Antes de activar Supabase, sustituir esta persistencia por borradores e historial separados por UUID, limpiar la vista al cerrar sesión y migrar los datos solo por una acción explícita.

Los backups del código en el mismo GitHub protegen contra errores de versión, pero no contra pérdida de toda la cuenta o del repositorio. Descargar copias periódicas a otro almacenamiento privado. No guardar datos de usuarios ni dumps SQL en este repositorio público, releases o artefactos públicos.

El código servido al navegador se puede ver y copiar. La seguridad depende de permisos de edición, autenticación y autorización del servidor; ofuscar JavaScript no protege datos ni hace imposible copiar una idea.

## Recuperación del código

1. Abrir Releases con la cuenta propietaria y seleccionar el borrador `source-backup-<SHA>`.
2. Descargar los cuatro archivos juntos en un directorio privado.
3. Ejecutar `sha256sum -c SHA256SUMS` antes de recuperar.
4. Para recuperar código, extraer `source.zip` en un directorio nuevo. Para recuperar la historia, ejecutar `git clone history.bundle arydebts-recovered`, entrar en ese checkout y crear una rama en el commit indicado en `manifest.json`.
5. Probar la copia antes de publicar. No forzar `main` ni borrar versiones nuevas para volver a una anterior: crear un cambio de recuperación revisable.

## Trabajo pendiente para seguridad real y respaldo externo

- En GitHub: activar 2FA/passkey y guardar códigos de recuperación; revisar colaboradores y aplicaciones; proteger `main` contra force-push y borrado, y exigir PR y pruebas. Estos ajustes de administración no fueron modificados por esta revisión.
- Conectar el Supabase del propietario y verificar dos cuentas reales, RLS, recuperación, conflictos, límites de abuso y CAPTCHA en servidor antes de permitir datos de otros usuarios.
- Elegir y activar una política de backups de base de datos con retención, alertas y restauración ensayada. Revisar costos antes de activar planes/PITR. Respaldar objetos/fotos por separado, porque el backup SQL no cubre los archivos de Storage.
- Mantener una copia externa cifrada, con permisos independientes y retención. Probar recuperación en una base aislada; registrar fecha, resultado y tiempo de recuperación.
- Revisar todas las rutas que generan HTML con datos almacenados antes de incorporar importación o contenido remoto. Esta revisión acotada no equivale a una auditoría completa de seguridad.

Referencias oficiales: https://docs.github.com/rest/releases/releases ; https://supabase.com/docs/guides/platform/backups ; https://supabase.com/docs/guides/deployment/ci/backups
