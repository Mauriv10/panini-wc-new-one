# Build 700.7 · Datos protegidos en Supabase

Esta versión separa las actualizaciones de la aplicación de los datos del usuario.

## Cambios

- Supabase (`wc_user_state`) pasa a ser la fuente de verdad para proyectos, inventarios, objetivos e historial.
- Una actualización ya no vuelve a aplicar `projects-seed.json` sobre proyectos existentes.
- Los datos seed se usan únicamente para crear los proyectos iniciales de una cuenta sin datos.
- Se mantiene la opción A: varios proyectos independientes por usuario.
- El proyecto activo también se guarda en Supabase.
- El estado cloud incluye `schemaVersion: 2` para futuras migraciones controladas.
- Mantiene Google Auth, sincronización en tiempo real y actualización automática de la PWA.
- No requiere SQL nuevo.

## Importante

Al abrir la versión 700.7 con una cuenta que ya tiene datos en `wc_user_state`, se cargarán esos datos y no se reemplazarán por los inventarios incluidos en la build.
