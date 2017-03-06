import config from '../config/app'

export function assets(resource) {
  let path = null;

  if (config.clientType == 'desktop') {
    path = './' + resource;
  } else {
    path = '/' + resource;
  }

  return path;
}
