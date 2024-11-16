import {
  AggregatedDataStored as AggregatedDataStoredEvent,
  CompanyWalletUpdated as CompanyWalletUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokensRewarded as TokensRewardedEvent
} from "../generated/getESG/getESG"
import {
  AggregatedDataStored,
  CompanyWalletUpdated,
  OwnershipTransferred,
  TokensRewarded
} from "../generated/schema"

export function handleAggregatedDataStored(
  event: AggregatedDataStoredEvent
): void {
  let entity = new AggregatedDataStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.aggregatedCluster = event.params.aggregatedCluster
  entity.aggregatedESGScore = event.params.aggregatedESGScore
  entity.mostCommonRiskCategory = event.params.mostCommonRiskCategory
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCompanyWalletUpdated(
  event: CompanyWalletUpdatedEvent
): void {
  let entity = new CompanyWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newCompanyWallet = event.params.newCompanyWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensRewarded(event: TokensRewardedEvent): void {
  let entity = new TokensRewarded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.aggregatedESGScore = event.params.aggregatedESGScore
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
