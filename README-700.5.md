# World Cup 2026 · Build 700.5

## Cambios
- Restaura el orden original de las selecciones tras sincronizar con Supabase.
- Conserva un `teamOrder` explícito por proyecto para evitar que JSONB altere el selector.
- Aplica el mismo orden a selector, vista global, “Me faltan”, intercambio y exportación.
- Incluye la Publishable Key de Supabase solicitada.
- No requiere ejecutar SQL nuevo.

Sube todos los archivos del ZIP al repositorio sustituyendo los existentes.
