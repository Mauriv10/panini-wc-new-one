# World Cup 2026 · Build 700.4

Incluye sincronización automática del estado completo de la cuenta mediante Supabase:

- Migración automática del inventario local en el primer inicio.
- Guardado local inmediato y guardado en nube con debounce.
- Restauración desde nube al abrir otro dispositivo.
- Actualización en tiempo real entre dispositivos abiertos.
- Cola local natural cuando no hay conexión; sincroniza al volver online.
- RLS: cada usuario solo accede a su propia fila.

## Instalación

1. Ejecuta `SUPABASE-700.4.sql` en Supabase > SQL Editor.
2. Conserva tu Publishable Key en `supabase-config.js`.
3. Sube todos los archivos a GitHub Pages sustituyendo la build anterior.
4. Abre la app y espera a que aparezca `Guardado en la nube`.

La primera vez, si no existe estado remoto, la app sube automáticamente los proyectos e inventarios locales de ese dispositivo.
