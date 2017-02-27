import BaseError from './base'

export default class BadRequestError extends BaseError {
  constructor(...args) {
    super(...args);
  }
}
