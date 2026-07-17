# Historial de versiones

## 702.1 · Bienvenida guiada
- Nueva pantalla “Bienvenido a WC26” para cuentas sin colección.
- Onboarding en tres pasos: bienvenida, creación y confirmación.
- Resumen final con nombre, objetivo y sincronización.
- Entrada guiada a la pantalla de cromos al terminar.

## 702 · Onboarding de nuevos usuarios
- Flujo inicial exclusivo para cuentas sin datos en la nube.
- Creación de la primera colección con nombre y objetivo personalizados.
- Inventario inicial vacío, listo para empezar.
- Guardado inmediato en Supabase y sincronización multidispositivo.
- Se evita heredar colecciones locales de otro usuario en un dispositivo compartido.

# Historial de cambios

## 701.3.2 — Estabilidad y limpieza
- Corregido el aviso repetitivo de nueva versión.
- `version.json` pasa a ser la fuente de verdad para decidir si hay una actualización.
- Los service workers antiguos o en espera ya no muestran el aviso por sí solos.
- Versión y nombre de caché centralizados en `app-config.js`.
- Eliminados los README de versiones anteriores.
- Eliminado el bloque HTML duplicado del aviso de actualización.

## 701.3.1 — Premium UI
- Cabecera y diseño responsive refinados.
- Edición del nombre y objetivo de las colecciones.
- Acciones para duplicar y eliminar colecciones.

## 701.2 — Interfaz limpia
- Simplificación de la pantalla Cromos.
- Biblioteca de colecciones más directa.

## Build 702.1 · Flujo definitivo de acceso
- Bienvenida antes de solicitar autenticación.
- Inicio de sesión simplificado exclusivamente con Google.
- Consulta de Supabase tras autenticar: los usuarios existentes entran directamente.
- El onboarding de creación solo aparece cuando la cuenta no tiene estado en la nube.
- Saludo personalizado para usuarios nuevos y mensaje «Bienvenido de nuevo» para cuentas existentes.
- Restauración de colección activa, filtros, selección, pestaña y scroll desde el estado guardado.
- Objetivo inicial de 5 álbumes en la primera colección.
