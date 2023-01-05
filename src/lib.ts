import { SwapProgramService } from './services/swap.service'
import { AuthService } from './services/auth.service'
import {
  Network,
  WalletProvider,
  HamsterSwapSdkOptions,
} from './entities/lib.entity'
import { RegistryProvider } from './providers/registry.provider'
import { StorageProvider } from './providers/storage.provider'

export class HamsterSwapSdk {
  /**
   * @dev Define storage provider.
   * @var {StorageProvider}
   * @private
   */
  private storageProvider: StorageProvider

  /**
   * @dev Define program service to interact with blockchain & api.
   * @var {SwapProgramService}
   * @private
   */
  private program: SwapProgramService

  /**
   * @dev Define auth service to authenticate users.
   * @var {AuthService}
   * @private
   */
  private auth: AuthService

  /**
   * @dev Define variable to condition which network the sdk use.
   * @enum {Network}
   * @private
   */
  private network: Network

  constructor(options: HamsterSwapSdkOptions) {
    /**
     * @dev Assign network.
     */
    this.network = options.network

    /**
     * @dev Initialize registry providers for uses.
     */
    this.initializeRegistry()

    /**
     * @dev Initialize swap program service from options.
     */
    this.program = new SwapProgramService(options.walletProvider, this.network)

    /**
     * @dev Initialize auth service.
     */
    this.auth = new AuthService(this.storageProvider)
  }

  /**
   * Initialize registry and session.
   * @private
   */
  private async initializeRegistry() {
    const registryInstance = RegistryProvider.getInstance()

    /**
     * Initialize registry provider
     */
    registryInstance.networkType = this.network
    registryInstance.document = window.document
    registryInstance.fetch = window.fetch.bind(window)
    registryInstance.storage = window.localStorage
    registryInstance.window = window

    /**
     * Initialize storage provider.
     */
    this.storageProvider = new StorageProvider(registryInstance.storage)
  }
}
