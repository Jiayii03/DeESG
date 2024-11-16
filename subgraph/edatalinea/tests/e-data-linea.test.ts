import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { DataStored } from "../generated/schema"
import { DataStored as DataStoredEvent } from "../generated/EDataLinea/EDataLinea"
import { handleDataStored } from "../src/e-data-linea"
import { createDataStoredEvent } from "./e-data-linea-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let CO2_emissions = BigInt.fromI32(234)
    let methane_emissions = BigInt.fromI32(234)
    let NOx_emissions = BigInt.fromI32(234)
    let PM_emissions = BigInt.fromI32(234)
    let humidity = BigInt.fromI32(234)
    let temperature = BigInt.fromI32(234)
    let walletAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let timestamp = BigInt.fromI32(234)
    let newDataStoredEvent = createDataStoredEvent(
      CO2_emissions,
      methane_emissions,
      NOx_emissions,
      PM_emissions,
      humidity,
      temperature,
      walletAddress,
      timestamp
    )
    handleDataStored(newDataStoredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DataStored created and stored", () => {
    assert.entityCount("DataStored", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "CO2_emissions",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "methane_emissions",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "NOx_emissions",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "PM_emissions",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "humidity",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "temperature",
      "234"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "walletAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DataStored",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
