import BaseError from './base'

export default class NotFoundError extends BaseError {
  constructor(...args) {
    super(...args);
  }
}
