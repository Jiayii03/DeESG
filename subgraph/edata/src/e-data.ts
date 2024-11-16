import { DataStored as DataStoredEvent } from "../generated/EData/EData"
import { DataStored } from "../generated/schema"

export function handleDataStored(event: DataStoredEvent): void {
  let entity = new DataStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.CO2_emissions = event.params.CO2_emissions
  entity.methane_emissions = event.params.methane_emissions
  entity.NOx_emissions = event.params.NOx_emissions
  entity.PM_emissions = event.params.PM_emissions
  entity.humidity = event.params.humidity 
  entity.temperature = event.params.temperature
  entity.walletAddress = event.params.walletAddress
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
