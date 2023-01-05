import { Network } from '../entities/lib.entity'

export const BaseUrl = {
  [Network.devnet]: 'http://localhost:3001',
  [Network.mainnet]: 'https://passport.hamsterbox.xyz',
}

type Window = typeof window & { [key: string]: any }

/**
 * The singleton instance that stores the global configuration of A8Connect
 */
export class RegistryProvider {
  /**
   * Singleton described as a public and static property.
   */
  public static instance: RegistryProvider | null = null

  /**
   * Network type is stored at private.
   * @private
   */
  private _networkType: Network = Network.mainnet

  /**
   * Audience url
   * @private
   */
  private _audience: string

  /***
   * Storage instance. Should be set inside the React hooks.
   * @private
   */
  private _storage: Storage

  /**
   * Document instance. Should be set inside the React hooks.
   * @private
   */
  private _document: Document

  /**
   * `fetch` instance. Should be set inside the React hooks.
   * @private
   */
  private _fetch: typeof window.fetch

  /**
   * Window instance
   * @private
   */
  private _window: Window

  /**
   * `Storage` getter.
   */
  get storage(): Storage {
    return this._storage
  }

  /**
   * `Storage` setter.
   * @param value
   */
  set storage(value: Storage) {
    this._storage = value
  }

  /**
   * `Document` getter
   */
  get document(): Document {
    return this._document
  }

  /**
   * `Document` setter
   * @param value
   */
  set document(value: Document) {
    this._document = value
  }

  /**
   * `NetworkType` getter
   */
  get networkType(): Network {
    return this._networkType
  }

  /**
   * `NetworkType` setter
   * @param value
   */
  set networkType(value: Network) {
    this._networkType = value
  }

  /**
   * `Audience` getter
   */
  get audience(): string {
    return this._audience
  }

  /**
   * `Audience` setter
   * @param value
   */
  set audience(value: string) {
    this._audience = value
  }

  /**
   * `fetch` getter
   */
  get fetch(): typeof fetch {
    return this._fetch
  }

  /**
   * `fetch` setter
   * @param value
   */
  set fetch(value: typeof fetch) {
    this._fetch = value
  }

  /**
   * window instance
   */
  get window(): Window {
    return this._window
  }

  /**
   * set window instance
   * @param value
   */
  set window(value: Window) {
    this._window = value
  }

  /**
   * Public static method to get the singleton instance.
   */
  public static getInstance(): RegistryProvider {
    if (this.instance === null) {
      this.instance = new RegistryProvider()
    }

    return this.instance
  }
}
