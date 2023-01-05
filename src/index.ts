import { HamsterSwapSdk } from './lib'
import { HamsterSwapSdkOptions } from './entities/lib.entity'

let hamsterSwapSdkInstance: HamsterSwapSdk

/**
 * The function to get HamsterSDK instance
 */
export const useHamsterSwap = () => {
  if (!hamsterSwapSdkInstance)
    throw new Error("HamsterSwap Sdk isn't initialized")
  return hamsterSwapSdkInstance
}

/**
 * Init an HamsterSDK instance.
 * The function has its own boundary context.
 * @param options
 */
export const init = (options: HamsterSwapSdkOptions) => {
  /**
   * Initialize new instance
   */
  hamsterSwapSdkInstance = new HamsterSwapSdk(options)
  return hamsterSwapSdkInstance
}

export default HamsterSwapSdk
export type { HamsterSwapSdk } from './lib'
export * from './entities'
