import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { DataStored } from "../generated/EDataScroll/EDataScroll"

export function createDataStoredEvent(
  CO2_emissions: BigInt,
  methane_emissions: BigInt,
  NOx_emissions: BigInt,
  PM_emissions: BigInt,
  humidity: BigInt,
  temperature: BigInt,
  walletAddress: Address,
  timestamp: BigInt
): DataStored {
  let dataStoredEvent = changetype<DataStored>(newMockEvent())

  dataStoredEvent.parameters = new Array()

  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "CO2_emissions",
      ethereum.Value.fromUnsignedBigInt(CO2_emissions)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "methane_emissions",
      ethereum.Value.fromUnsignedBigInt(methane_emissions)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "NOx_emissions",
      ethereum.Value.fromUnsignedBigInt(NOx_emissions)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "PM_emissions",
      ethereum.Value.fromUnsignedBigInt(PM_emissions)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "humidity",
      ethereum.Value.fromUnsignedBigInt(humidity)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "temperature",
      ethereum.Value.fromUnsignedBigInt(temperature)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "walletAddress",
      ethereum.Value.fromAddress(walletAddress)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return dataStoredEvent
}
