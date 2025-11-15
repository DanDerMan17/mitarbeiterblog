
console.log("cwd:", process.cwd());

export const config = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  //Todo: weiter Config

  //Todo if   console.warn('[WARN] JWT Secrets fehlen. Bitte .env konfigurieren!')
}

console.log("PORT:", process.env.PORT);
console.log("ENV:", process.env.NODE_ENV);
console.log("ORIGIN:", process.env.CORS_ORIGIN);