export type ProposalStatusDto = 'pending' | 'success' | 'canceled' | 'expired'
/**
 * @dev Define create proposal dto
 */
export class CreateProposalDto {
  swapItems: any[]
  receiveItems: any[]
}

export class ProposalDto extends CreateProposalDto {}
