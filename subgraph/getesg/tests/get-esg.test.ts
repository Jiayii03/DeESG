import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AggregatedDataStored } from "../generated/schema"
import { AggregatedDataStored as AggregatedDataStoredEvent } from "../generated/getESG/getESG"
import { handleAggregatedDataStored } from "../src/get-esg"
import { createAggregatedDataStoredEvent } from "./get-esg-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let aggregatedCluster = BigInt.fromI32(234)
    let aggregatedESGScore = "Example string value"
    let mostCommonRiskCategory = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let newAggregatedDataStoredEvent = createAggregatedDataStoredEvent(
      aggregatedCluster,
      aggregatedESGScore,
      mostCommonRiskCategory,
      timestamp
    )
    handleAggregatedDataStored(newAggregatedDataStoredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AggregatedDataStored created and stored", () => {
    assert.entityCount("AggregatedDataStored", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AggregatedDataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "aggregatedCluster",
      "234"
    )
    assert.fieldEquals(
      "AggregatedDataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "aggregatedESGScore",
      "Example string value"
    )
    assert.fieldEquals(
      "AggregatedDataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "mostCommonRiskCategory",
      "Example string value"
    )
    assert.fieldEquals(
      "AggregatedDataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
