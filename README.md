# Panel de monitoreo · Radar Río

Panel interno para monitorear **todos los módulos (M01–M17)** de los dos sitios
del proyecto, en un solo lugar:

| Sitio | Repo | URL |
|---|---|---|
| Qwen Vuelos Río | [Xacox01/qwen_vuelos_rio](https://github.com/Xacox01/qwen_vuelos_rio) | https://xacox01.github.io/qwen_vuelos_rio/ |
| Vuelos Río (live) | [Xacox01/vuelos-rio-live](https://github.com/Xacox01/vuelos-rio-live) | https://xacox01.github.io/vuelos-rio-live/ |

**URL del panel:** https://xacox01.github.io/panel-vuelos/

## Acceso

- Login en 2 pasos: **usuario/contraseña** (SHA-256 con salt) → **código MFA**
  de 6 dígitos (TOTP, Google Authenticator/Authy/Aegis).
- La sesión dura 12 h (se cierra al cerrar la pestaña).
- 5 intentos fallidos bloquean el login 5 minutos.
- Credenciales y QR de enrolamiento: entregados por separado al dueño
  (`credenciales_panel.txt` + `QR_MFA_panel.png`). **No se publican aquí.**

## Qué monitorea

- **Resumen**: estado global de cada sitio (auditoría, frescura de publicación,
  cadencia */5, ciclo, cupones, suscriptores, correos).
- **Módulos M01–M17**: tabla completa por sitio con estado, frescura y detalle
  (fuente: `auditoria.json` + `modulos.json` de cada repo).
- **Correos**: bus de suscripciones auto-rotante, clave RSA, SMTP, cola de
  envío, último envío y resumen de la mañana (fuente: `data.json → email_cfg`,
  solo booleanos — nunca secretos).
- **Workflows**: últimos 10 runs de Actions por repo (refresh/auditoría/
  auto-reparación) con conclusión y hora local Santiago.
- **Datos y cupones**: frescura del escaneo OTA, cupones vigentes, series de
  mínimos, alertas registradas.
- **Configuración**: URI otpauth para re-enrolar el MFA en otro teléfono.

## Modelo de seguridad (honesto)

- El panel es un sitio estático en GitHub Pages: los **datos** que muestra ya
  son públicos (son los mismos JSON de los repos). El login+MFA protege el
  **acceso al panel**, no los datos.
- `config.js` contiene **hashes** (usuario/contraseña) y el **secreto TOTP**
  (necesario para verificar el código en el navegador). No contiene la
  contraseña ni ningún secreto SMTP/RSA.
- Los secretos de envío de correo viven solo como **Secrets de Actions** por
  repositorio; el panel muestra únicamente booleanos (`bus`/`rsa`/`smtp`)
  publicados por `data.json → email_cfg`.

## Actualización

Los datos se recargan solos cada 5 minutos (o con «↻ ahora»). Las llamadas van
a `raw.githubusercontent.com` y `api.github.com` (anónima, 60 req/h por IP:
suficiente para el dueño; si se agota, la pestaña de Workflows lo indica).
