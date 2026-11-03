// config.js — credenciales del panel (HASHES, no la contraseña) + MFA
// Modelo de seguridad: los datos del panel son públicos (GitHub Pages);
// el login protege el acceso al panel. La contraseña NO está aquí: solo su
// hash SHA-256 con salt. El secreto TOTP es necesario para generar códigos
// en el navegador (mismo mecanismo que usan las apps autenticadoras).
const PANEL_CFG = {
 "usuario": "admin",
 "user_hash": "b427308c15e7590187cecb24afb54d9a0b26304029a2e750590035d464883bbf",
 "pass_hash": "639b8343009f6a494aac177574a16c1d93cf7f1a0aadca7e84f1e10caa7479cd",
 "salt": "8e63103acf0f4002",
 "totp_secret": "WMBAPDB7SKTW6WNFHOQWWWNOVF7JRXLV",
 "generado": "2026-11-03"
};
