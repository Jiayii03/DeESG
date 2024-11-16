import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { CompanySubmitted } from "../generated/schema"
import { CompanySubmitted as CompanySubmittedEvent } from "../generated/CompanyDetails/CompanyDetails"
import { handleCompanySubmitted } from "../src/company-details"
import { createCompanySubmittedEvent } from "./company-details-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let companyName = "Example string value"
    let twitterHandle = "Example string value"
    let companyWebsite = "Example string value"
    let sector = "Example string value"
    let avatarUrl = "Example string value"
    let submittedBy = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCompanySubmittedEvent = createCompanySubmittedEvent(
      companyName,
      twitterHandle,
      companyWebsite,
      sector,
      avatarUrl,
      submittedBy
    )
    handleCompanySubmitted(newCompanySubmittedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CompanySubmitted created and stored", () => {
    assert.entityCount("CompanySubmitted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyName",
      "Example string value"
    )
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "twitterHandle",
      "Example string value"
    )
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyWebsite",
      "Example string value"
    )
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sector",
      "Example string value"
    )
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "avatarUrl",
      "Example string value"
    )
    assert.fieldEquals(
      "CompanySubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "submittedBy",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
