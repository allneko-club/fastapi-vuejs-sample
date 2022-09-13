const env = import.meta.env.VITE_APP_ENV;
console.log('env');
console.log(import.meta.env);
let envApiUrl = '';

if (env === 'production') {
  envApiUrl = `https://${import.meta.env.VITE_APP_DOMAIN_PROD}`;
} else if (env === 'staging') {
  envApiUrl = `https://${import.meta.env.VITE_APP_DOMAIN_STAG}`;
} else {
  envApiUrl = `http://${import.meta.env.VITE_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
export const appName = import.meta.env.VITE_APP_NAME;
