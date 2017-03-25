let config = {
  host: 'http://localhost:9000',
  clientType: 'web'
};

if (typeof window !== 'undefined') {
  config = window.config;
}

export default config
