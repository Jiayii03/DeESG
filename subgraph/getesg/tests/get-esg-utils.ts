import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AggregatedDataStored,
  CompanyWalletUpdated,
  OwnershipTransferred,
  TokensRewarded
} from "../generated/getESG/getESG"

export function createAggregatedDataStoredEvent(
  aggregatedCluster: BigInt,
  aggregatedESGScore: string,
  mostCommonRiskCategory: string,
  timestamp: BigInt
): AggregatedDataStored {
  let aggregatedDataStoredEvent = changetype<AggregatedDataStored>(
    newMockEvent()
  )

  aggregatedDataStoredEvent.parameters = new Array()

  aggregatedDataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "aggregatedCluster",
      ethereum.Value.fromUnsignedBigInt(aggregatedCluster)
    )
  )
  aggregatedDataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "aggregatedESGScore",
      ethereum.Value.fromString(aggregatedESGScore)
    )
  )
  aggregatedDataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "mostCommonRiskCategory",
      ethereum.Value.fromString(mostCommonRiskCategory)
    )
  )
  aggregatedDataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return aggregatedDataStoredEvent
}

export function createCompanyWalletUpdatedEvent(
  newCompanyWallet: Address
): CompanyWalletUpdated {
  let companyWalletUpdatedEvent = changetype<CompanyWalletUpdated>(
    newMockEvent()
  )

  companyWalletUpdatedEvent.parameters = new Array()

  companyWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newCompanyWallet",
      ethereum.Value.fromAddress(newCompanyWallet)
    )
  )

  return companyWalletUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokensRewardedEvent(
  aggregatedESGScore: string,
  rewardAmount: BigInt
): TokensRewarded {
  let tokensRewardedEvent = changetype<TokensRewarded>(newMockEvent())

  tokensRewardedEvent.parameters = new Array()

  tokensRewardedEvent.parameters.push(
    new ethereum.EventParam(
      "aggregatedESGScore",
      ethereum.Value.fromString(aggregatedESGScore)
    )
  )
  tokensRewardedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return tokensRewardedEvent
}
