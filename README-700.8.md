# Build 700.8 — Selector coherente y vista persistente

- El selector muestra “Todas las selecciones” cuando la colección global está activa.
- Al elegir una selección, la vista muestra exclusivamente esa selección.
- Se recuerda por proyecto la última selección o vista global, el filtro, el orden y la posición de desplazamiento.
- Transiciones visuales suaves respetando la preferencia de movimiento reducido.
- Inventario y objetivo siguen siendo propiedad de Supabase y no se reinician con la build.
- No requiere SQL nuevo.
