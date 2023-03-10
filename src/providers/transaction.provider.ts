/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Connection,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { Program } from '@project-serum/anchor'
import { WalletContextState as WalletProvider } from '@solana/wallet-adapter-react'
import { SwapIdl } from './swap.idl'

export class TransactionProvider {
  /**
   * @dev Define network connection
   * @private
   */
  private readonly connection: Connection

  /**
   * @dev This is to indicate whether the program is initialized or not.
   * @private
   */
  private readonly program: Program<SwapIdl>

  constructor(connection: Connection, program: Program<SwapIdl>) {
    this.connection = connection
    this.program = program
  }

  /**
   * @dev The function to create transaction with given instructions then sign and send to chain.
   * @param {WalletProvider} Provider to sign transaction.
   * @param {Transaction} @arrays instructions
   * @public
   */
  public async signAndSendTransaction(
    walletProvider: WalletProvider,
    instructions: TransactionInstruction[]
  ) {
    /**
     * @dev Setup tx by creating a transaction which includes all instructions which users want to process.
     */
    const tx = new Transaction().add(...instructions)
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash
    tx.feePayer = walletProvider.publicKey

    /**
     * @dev Get raw transaction by signing in wallet.
     */
    const rawTx = await walletProvider.signTransaction(tx)

    /**
     * @dev Send a raw transaction.
     */
    const txid = await this.connection.sendRawTransaction(rawTx.serialize())
    return txid
  }
}
