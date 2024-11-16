import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  ESGScoreReceived,
  JobIdUpdated,
  OracleAddressUpdated,
  OwnershipTransferRequested,
  OwnershipTransferred,
  RequestSent
} from "../generated/AggregateAiData/AggregateAiData"

export function createChainlinkCancelledEvent(id: Bytes): ChainlinkCancelled {
  let chainlinkCancelledEvent = changetype<ChainlinkCancelled>(newMockEvent())

  chainlinkCancelledEvent.parameters = new Array()

  chainlinkCancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkCancelledEvent
}

export function createChainlinkFulfilledEvent(id: Bytes): ChainlinkFulfilled {
  let chainlinkFulfilledEvent = changetype<ChainlinkFulfilled>(newMockEvent())

  chainlinkFulfilledEvent.parameters = new Array()

  chainlinkFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkFulfilledEvent
}

export function createChainlinkRequestedEvent(id: Bytes): ChainlinkRequested {
  let chainlinkRequestedEvent = changetype<ChainlinkRequested>(newMockEvent())

  chainlinkRequestedEvent.parameters = new Array()

  chainlinkRequestedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkRequestedEvent
}

export function createESGScoreReceivedEvent(
  requestId: Bytes,
  esgScore: BigInt
): ESGScoreReceived {
  let esgScoreReceivedEvent = changetype<ESGScoreReceived>(newMockEvent())

  esgScoreReceivedEvent.parameters = new Array()

  esgScoreReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )
  esgScoreReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "esgScore",
      ethereum.Value.fromUnsignedBigInt(esgScore)
    )
  )

  return esgScoreReceivedEvent
}

export function createJobIdUpdatedEvent(newJobId: string): JobIdUpdated {
  let jobIdUpdatedEvent = changetype<JobIdUpdated>(newMockEvent())

  jobIdUpdatedEvent.parameters = new Array()

  jobIdUpdatedEvent.parameters.push(
    new ethereum.EventParam("newJobId", ethereum.Value.fromString(newJobId))
  )

  return jobIdUpdatedEvent
}

export function createOracleAddressUpdatedEvent(
  newOracle: Address
): OracleAddressUpdated {
  let oracleAddressUpdatedEvent = changetype<OracleAddressUpdated>(
    newMockEvent()
  )

  oracleAddressUpdatedEvent.parameters = new Array()

  oracleAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam("newOracle", ethereum.Value.fromAddress(newOracle))
  )

  return oracleAddressUpdatedEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createRequestSentEvent(requestId: Bytes): RequestSent {
  let requestSentEvent = changetype<RequestSent>(newMockEvent())

  requestSentEvent.parameters = new Array()

  requestSentEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )

  return requestSentEvent
}
