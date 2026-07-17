# World Cup 2026 — Build 615.13 Premium Feedback

- Cápsula superior estilo iOS.
- Mensajes para añadir, quitar, dar y recibir.
- Muestra selección, número y cantidad resultante.
- Agrupa pulsaciones rápidas sobre el mismo cromo.
- Animación del contador.
- Vibración, destello y burbuja local conservados.
- Toast inferior oculto visualmente.
- Caché: `world-cup-2026-build-615-13`.


## Build 700.3

Incluye los inventarios del proyecto principal y Panini Swiss Edition desde el Excel maestro.

## Build 700.3
- Compatible con claves nuevas `sb_publishable_...` y claves legacy `eyJ...`.
- Acepta `publishableKey` y `anonKey` para evitar errores de nombres.
- `supabase-config.js` se solicita siempre a la red para evitar que el Service Worker conserve una configuración antigua.
- La URL del proyecto ya está incluida. Solo falta pegar la Publishable key entre comillas.
