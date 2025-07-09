# Configuración de Email para Waitlist

## Configuración de Gmail

Para usar Gmail como proveedor de email, necesitas:

### 1. Crear una contraseña de aplicación

1. Ve a tu cuenta de Google
2. Activa la autenticación de dos factores
3. Ve a "Contraseñas de aplicación"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña generada

### 2. Configurar variables de entorno

Edita el archivo `.env.local` con tu información:

```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicacion_sin_espacios
ADMIN_EMAIL=admin@tudominio.com
```

## Otros proveedores de email

### Outlook/Hotmail

```
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tu_email@outlook.com
EMAIL_PASSWORD=tu_contraseña
```

### Yahoo

```
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tu_email@yahoo.com
EMAIL_PASSWORD=tu_contraseña
```

### SendGrid

```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=tu_api_key_de_sendgrid
```

## Personalización

Puedes personalizar los emails editando el archivo `app/api/waitlist/route.ts`:

- `adminMailOptions`: Email que recibe el administrador
- `userMailOptions`: Email de confirmación que recibe el usuario

## Seguridad

- Nunca subas tu archivo `.env.local` a git
- Usa contraseñas de aplicación en lugar de tu contraseña principal
- Considera usar servicios como SendGrid para producción
