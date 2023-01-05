export class StorageProvider {
  /**
   * The prefix for storage key with SDK.
   * @var String
   * @private
   */
  private readonly PREFIX = 'HAMSTERSWAP_SDK'

  /**
   * storageInstance is set as private
   * @var Storage
   * @private
   */
  private storageInstance: Storage

  /**
   * @dev Initilize
   */
  constructor(storage: Storage) {
    this.storageInstance = storage
  }

  /**
   * @param key
   * @param value
   * @description
   * The function to set the value with an associated key
   */
  public setItem(key: string, value: string): void {
    this.storageInstance.setItem(`${this.PREFIX}_${key}`, value)
  }

  /**
   * @param key
   * @returns value
   * @description
   * The function to get value with an associated key
   */
  public getItem(key: string): string | null {
    return this.storageInstance.getItem(`${this.PREFIX}_${key}`)
  }

  /**
   * @param key
   * @param {boolean} wPrefix true mean user wanna remove a storage data which saved without hamster prefix.
   * @returns
   * @description
   * The function to remove value with an associated key
   */
  public removeItem(key: string, wPrefix?: boolean): void {
    if (wPrefix) {
      return this.storageInstance.removeItem(key)
    }
    return this.storageInstance.removeItem(
      `${wPrefix ? '' : this.PREFIX}_${key}`
    )
  }
}
