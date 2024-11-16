import { CompanySubmitted as CompanySubmittedEvent } from "../generated/CompanyDetails/CompanyDetails"
import { CompanySubmitted } from "../generated/schema"

export function handleCompanySubmitted(event: CompanySubmittedEvent): void {
  let entity = new CompanySubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyName = event.params.companyName
  entity.twitterHandle = event.params.twitterHandle
  entity.companyWebsite = event.params.companyWebsite
  entity.sector = event.params.sector
  entity.avatarUrl = event.params.avatarUrl
  entity.submittedBy = event.params.submittedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
