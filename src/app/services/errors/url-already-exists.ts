export class UrlAlreadyExists extends Error {
  constructor() {
    super('URL already exists!')
  }
}
