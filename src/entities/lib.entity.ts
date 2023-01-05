/* eslint-disable @typescript-eslint/no-empty-interface */

/**
 * @dev Import wallet instance from {@solana/wallet-adapter-react}
 */
import { WalletContextState } from '@solana/wallet-adapter-react'

/**
 * @dev Network cluster that SDK supports.
 */
export enum Network {
  /**
   * Mainnet network cluster.
   */
  mainnet = 'mainnet',
  /**
   * Testnet network cluster.
   */
  devnet = 'devnet',
}

/**
 * @dev Export wallet provider.
 */
export interface WalletProvider extends WalletContextState {}

/**
 * @dev Export interface of options to initilize HamsterSwap Sdk.
 */
export class HamsterSwapSdkOptions {
  /**
   * @dev Define variable to condition which network the sdk use.
   * @enum {Network}
   */
  network: Network

  /**
   * @dev Define wallet provider for uses.
   * @var {WalletProvider}
   */
  walletProvider: WalletProvider
}
