// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract DataStorage {

    struct DataEntry {
        uint256 CO2_emissions;
        uint256 methane_emissions;
        uint256 NOx_emissions;
        uint256 PM_emissions;
        uint256 humidity;
        uint256 temperature;
        address walletAddress;
        uint256 timestamp;
    }

    DataEntry[] public dataEntries;

    event DataStored(
        uint256 CO2_emissions,
        uint256 methane_emissions,
        uint256 NOx_emissions,
        uint256 PM_emissions,
        uint256 humidity,
        uint256 temperature,
        address indexed walletAddress,
        uint256 timestamp
    );

    function storeData(
        uint256 _CO2_emissions,
        uint256 _methane_emissions,
        uint256 _NOx_emissions,
        uint256 _PM_emissions,
        uint256 _humidity,
        uint256 _temperature,
        address _walletAddress
    ) public {
        DataEntry memory newData = DataEntry({
            CO2_emissions: _CO2_emissions,
            methane_emissions: _methane_emissions,
            NOx_emissions: _NOx_emissions,
            PM_emissions: _PM_emissions,
            humidity: _humidity,
            temperature: _temperature,
            walletAddress: _walletAddress,
            timestamp: block.timestamp
        });

        dataEntries.push(newData);

        emit DataStored(
            _CO2_emissions,
            _methane_emissions,
            _NOx_emissions,
            _PM_emissions,
            _humidity,
            _temperature,
            _walletAddress,
            block.timestamp
        );
    }

    function getDataEntries() public view returns (DataEntry[] memory) {
        return dataEntries;
    }

    function getDataEntry(uint256 index) public view returns (
            uint256, uint256, uint256, uint256, uint256, uint256, address, uint256
        ) {
            require(index < dataEntries.length, "Index out of bounds");
            DataEntry memory entry = dataEntries[index];
            return (
                entry.CO2_emissions,
                entry.methane_emissions,
                entry.NOx_emissions,
                entry.PM_emissions,
                entry.humidity,
                entry.temperature,
                entry.walletAddress,
                entry.timestamp
            );
        }

    function getDataByWallet(address _walletAddress) public view returns (
        uint256[] memory
    ) {
        uint256 count = 0;

        for (uint256 i = 0; i < dataEntries.length; i++) {
            if (dataEntries[i].walletAddress == _walletAddress) {
                count++;
            }
        }

        uint256[] memory result = new uint256[](count * 6); 
        uint256 index = 0;
        for (uint256 i = dataEntries.length; i > 0; i--) {
            if (dataEntries[i - 1].walletAddress == _walletAddress) {
                result[index * 6] = dataEntries[i - 1].CO2_emissions;
                result[index * 6 + 1] = dataEntries[i - 1].methane_emissions;
                result[index * 6 + 2] = dataEntries[i - 1].NOx_emissions;
                result[index * 6 + 3] = dataEntries[i - 1].PM_emissions;
                result[index * 6 + 4] = dataEntries[i - 1].humidity;
                result[index * 6 + 5] = dataEntries[i - 1].temperature;
                index++;
            }
        }

        return result;
    }

}