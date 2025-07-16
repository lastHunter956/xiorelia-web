# Configuración de Cloudflare Turnstile

Este proyecto incluye integración con Cloudflare Turnstile para protección contra bots en el formulario de waitlist.

## Configuración

### 1. Obtener las claves de Turnstile

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navega a "Turnstile" en el panel lateral
3. Haz clic en "Add site" para crear un nuevo sitio
4. Configura tu sitio:
   - **Site name**: Nombre descriptivo (ej: "Xiorelia Waitlist")
   - **Domain**: Tu dominio (ej: `xiorelia.com` o `localhost` para desarrollo)
   - **Widget mode**: Selecciona "Managed" (como especificaste)
5. Obtendrás dos claves:
   - **Site Key** (pública): Se usa en el frontend
   - **Secret Key** (privada): Se usa en el backend

### 2. Configurar las variables de entorno

Edita el archivo `.env.local` y reemplaza las claves de prueba:

```env
# Cloudflare Turnstile Configuration
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=tu_site_key_aqui
CLOUDFLARE_TURNSTILE_SECRET_KEY=tu_secret_key_aqui
```

### 3. Claves de prueba incluidas

Para desarrollo y testing, el proyecto viene configurado con claves de prueba de Cloudflare:

- **Site Key**: `1x00000000000000000000AA` (siempre pasa)
- **Secret Key**: `1x0000000000000000000000000000000AA` (siempre pasa)

## Características implementadas

✅ **Widget en modo Managed**: Cloudflare determina automáticamente si mostrar un desafío  
✅ **Validación frontend**: El formulario no se puede enviar hasta completar Turnstile  
✅ **Validación backend**: El servidor verifica el token antes de procesar el formulario  
✅ **Tema adaptativo**: El widget cambia automáticamente entre claro/oscuro  
✅ **Idioma dinámico**: Soporte para español e inglés  
✅ **Manejo de errores**: Mensajes claros para diferentes estados de error  
✅ **Expiración de tokens**: Manejo automático cuando el token expira

## Estados del widget

- **Pendiente**: Verificación en progreso
- **Completado**: ✅ Verificación exitosa (permite envío del formulario)
- **Error**: ❌ Error en verificación (muestra mensaje de error)
- **Expirado**: ⏰ Token expirado (requiere nueva verificación)

## Personalización

Puedes personalizar el widget modificando las opciones en `components/waitlist.tsx`:

```tsx
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
  options={{
    theme: theme === "dark" ? "dark" : "light", // "light" | "dark" | "auto"
    language: language === "es" ? "es" : "en", // Código de idioma
    size: "normal", // "normal" | "compact"
    action: "waitlist-signup", // Acción personalizada
    cData: "waitlist-form", // Datos de contexto
  }}
/>
```

## Seguridad

- ❌ **Nunca** expongas la `SECRET_KEY` en el frontend
- ✅ La `SITE_KEY` es segura para usar en el cliente
- ✅ Toda validación crítica se hace en el servidor
- ✅ Los tokens tienen expiración automática

## Troubleshooting

### Error: "Invalid site key"

- Verifica que la `SITE_KEY` sea correcta
- Asegúrate de que el dominio esté configurado correctamente

### Error: "Verification failed"

- Revisa la `SECRET_KEY` en el servidor
- Verifica la conectividad con la API de Cloudflare

### Widget no aparece

- Revisa la consola del navegador por errores
- Verifica que las variables de entorno estén cargadas

## Documentación oficial

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)
