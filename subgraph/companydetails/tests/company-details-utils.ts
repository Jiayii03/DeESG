import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { CompanySubmitted } from "../generated/CompanyDetails/CompanyDetails"

export function createCompanySubmittedEvent(
  companyName: string,
  twitterHandle: string,
  companyWebsite: string,
  sector: string,
  avatarUrl: string,
  submittedBy: Address
): CompanySubmitted {
  let companySubmittedEvent = changetype<CompanySubmitted>(newMockEvent())

  companySubmittedEvent.parameters = new Array()

  companySubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "companyName",
      ethereum.Value.fromString(companyName)
    )
  )
  companySubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "twitterHandle",
      ethereum.Value.fromString(twitterHandle)
    )
  )
  companySubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "companyWebsite",
      ethereum.Value.fromString(companyWebsite)
    )
  )
  companySubmittedEvent.parameters.push(
    new ethereum.EventParam("sector", ethereum.Value.fromString(sector))
  )
  companySubmittedEvent.parameters.push(
    new ethereum.EventParam("avatarUrl", ethereum.Value.fromString(avatarUrl))
  )
  companySubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "submittedBy",
      ethereum.Value.fromAddress(submittedBy)
    )
  )

  return companySubmittedEvent
}
