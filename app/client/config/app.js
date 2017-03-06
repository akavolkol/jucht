let config = {
  host: 'http://localhost:9000',
  clientType: 'web'
};

if (window.config !== 'undefined') {
  config = window.config;
}

export default config
