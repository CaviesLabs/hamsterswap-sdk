/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BN } from '@project-serum/anchor'
import { networkProvider } from '../providers/network.provider'
import { SwapProgramProvider } from '../providers/swap-program.provider'
import {
  CreateProposalToServerDto,
  SwapProposalEntity,
} from '../entities/proposal.entity'
import { Network, WalletProvider } from '../entities/lib.entity'
import { uuid } from 'uuidv4'

export class SwapProgramService {
  /**
   * @dev Program provider injected.
   * @private
   */
  private readonly swapProgramProvider: SwapProgramProvider

  /**
   * @dev Define variable to condition which network the sdk use.
   * @enum {Network}
   * @private
   */
  private network: Network

  constructor(walletProvider: WalletProvider, network: Network) {
    /**
     * @dev Assign network.
     */
    this.network = network

    /**
     * @dev Import providers.
     */
    this.swapProgramProvider = new SwapProgramProvider(
      walletProvider,
      this.network
    )
  }

  /**
   * @dev Call this function to create new proposal.
   * @param {CreateProposalToServerDto} createProposalDto.
   */
  public async createProposal(
    walletProvider: WalletProvider,
    createProposalDto: CreateProposalToServerDto
  ) {
    /**
     * @dev Call to HamsterBox server to initialize the proposal.
     */
    const response =
      await networkProvider.requestWithCredentials<SwapProposalEntity>(
        '/proposal',
        { method: 'POST', data: createProposalDto }
      )

    /**
     * @dev Now create proposal to on-chain, wrap in sync function to sync data after done processing on-chain.
     */
    return this.requestAndSyncProposal(response.id, async () => {
      /**
       * @dev Create on-chain.
       */
      await this.swapProgramProvider.createProposal(walletProvider, {
        id: response.id,
        expiredAt: new BN(createProposalDto.expiredAt.getTime()),
        ...createProposalDto,
      })

      /**
       * @returns propsal id.
       */
      return response.id
    })
  }

  /**
   * @dev The function to cancel proposal on-chain.
   * @param {WalletProvider} walletProvider
   * @param {string} proposalId.
   * @returns
   */
  public async cancelProposal(
    walletProvider: WalletProvider,
    proposalId: string
  ) {
    /**
     * @dev Call to program.
     */
    return this.requestAndSyncProposal(proposalId, async () => {
      return await this.swapProgramProvider.cancelProposal(
        walletProvider,
        await this.getProposal(proposalId)
      )
    })
  }

  /**
   * @dev Call this function when user want to wrap proposal.
   * @param {WalletProvider} walletProvider.
   * @param {string} proposalId.
   * @param {string} optionId.
   * @returns
   */
  public async swapProposal(
    walletProvider: WalletProvider,
    proposalId: string,
    optionId: string
  ) {
    /**
     * @dev Now create proposal to on-chain, wrap in sync function to sync data after done processing on-chain.
     */
    return this.requestAndSyncProposal(proposalId, async () => {
      return this.swapProgramProvider.swapProposal(
        walletProvider,
        await this.getProposal(proposalId),
        optionId
      )
    })
  }

  /**
   * @dev The function to withdraw nfts to proposer owner.
   * @param {WalletProvider} walletProvider
   * @param {string} proposalId
   */
  public async redeemProposal(
    walletProvider: WalletProvider,
    proposalId: string
  ) {
    /**
     * @dev Now create redeem proposal to on-chain, wrap in sync function to sync data after done processing on-chain.
     */
    return this.requestAndSyncProposal(proposalId, async () => {
      return this.swapProgramProvider.redeemProposal(
        walletProvider,
        await this.getProposal(proposalId)
      )
    })
  }

  /**
   * @dev Sync proposal by id.
   */
  public async requestAndSyncProposal(
    proposalId: string,
    fn: () => Promise<any>
  ): Promise<any> {
    /**
     * @dev {Network}
     */
    const data = await fn()
    return new Promise(async (resolve) =>
      setTimeout(async () => {
        await networkProvider.request(`/proposal/${proposalId}/sync`, {
          method: 'PATCH',
        })
        resolve(data)
      }, 4000)
    )
  }

  /**
   * @dev Find proposal by id.
   * @param {string} proposalId
   * @returns {SwapProposalEntity}
   */
  public async getProposal(proposalId: string): Promise<SwapProposalEntity> {
    console.log(proposalId)
    return networkProvider.requestWithCredentials<SwapProposalEntity>(
      `/proposal/${proposalId}`,
      { method: 'GET' }
    )
  }

  /**
   * @dev Generate id following uuid types.
   * @static
   * @returns {string}
   */
  public static generateUID() {
    return uuid().slice(0, 10)
  }
}
