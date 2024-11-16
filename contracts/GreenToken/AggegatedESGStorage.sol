        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.26;

        import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
        import "@openzeppelin/contracts/access/Ownable.sol";

        contract AggregatedESGStorage is Ownable {
            struct AggregatedESGData {
                uint256 aggregatedCluster;
                string aggregatedESGScore; // Changed to string to handle decimals
                string mostCommonRiskCategory;
                uint256 timestamp;
            }

            IERC20 public greenToken;
            address public companyWallet;

            AggregatedESGData public latestAggregatedData;

            event AggregatedDataStored(
                uint256 aggregatedCluster,
                string aggregatedESGScore,
                string mostCommonRiskCategory,
                uint256 timestamp
            );

            event TokensRewarded(string aggregatedESGScore, uint256 rewardAmount);
            event CompanyWalletUpdated(address indexed newCompanyWallet);

            constructor(
                address _greenTokenAddress,
                address _initialCompanyWallet,
                address _initialOwner
            ) Ownable(_initialOwner) {
                require(_greenTokenAddress != address(0), "Green token address cannot be zero");
                require(_initialCompanyWallet != address(0), "Company wallet address cannot be zero");

                greenToken = IERC20(_greenTokenAddress);
                companyWallet = _initialCompanyWallet;
            }

            function updateCompanyWallet(address newCompanyWallet) external onlyOwner {
                require(newCompanyWallet != address(0), "New wallet address cannot be zero");
                companyWallet = newCompanyWallet;
                emit CompanyWalletUpdated(newCompanyWallet);
            }

            function storeAggregatedData(
                uint256 _aggregatedCluster,
                string memory _aggregatedESGScore, // Changed to string
                string memory _mostCommonRiskCategory
            ) public {
                latestAggregatedData = AggregatedESGData({
                    aggregatedCluster: _aggregatedCluster,
                    aggregatedESGScore: _aggregatedESGScore,
                    mostCommonRiskCategory: _mostCommonRiskCategory,
                    timestamp: block.timestamp
                });

                emit AggregatedDataStored(
                    _aggregatedCluster,
                    _aggregatedESGScore,
                    _mostCommonRiskCategory,
                    block.timestamp
                );

                uint256 rewardAmount = getRewardAmount(parseESGScore(_aggregatedESGScore));
                if (rewardAmount > 0) {
                    require(
                        greenToken.transferFrom(owner(), companyWallet, rewardAmount),
                        "Token transfer failed"
                    );
                    emit TokensRewarded(_aggregatedESGScore, rewardAmount);
                }
            }

            function parseESGScore(string memory esgScore) internal pure returns (uint256) {
                bytes memory b = bytes(esgScore);
                uint256 result = 0;
                uint256 decimalFactor = 1;
                bool foundDecimal = false;

                for (uint256 i = 0; i < b.length; i++) {
                    if (b[i] == ".") {
                        foundDecimal = true;
                    } else if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
                        if (foundDecimal) {
                            decimalFactor *= 10;
                        }
                        result = result * 10 + (uint8(b[i]) - 48);
                    }
                }

                return result * (10**18) / decimalFactor; // Adjust to 18 decimals
            }

            function getRewardAmount(uint256 esgScore) internal pure returns (uint256) {
                if (esgScore >= 0 && esgScore < 20 * 10**18) {
                    return 100 * 10**18; // 100 tokens
                } else if (esgScore >= 20 * 10**18 && esgScore < 40 * 10**18) {
                    return 200 * 10**18; // 200 tokens
                } else if (esgScore >= 40 * 10**18 && esgScore < 60 * 10**18) {
                    return 300 * 10**18; // 300 tokens
                } else if (esgScore >= 60 * 10**18 && esgScore < 80 * 10**18) {
                    return 400 * 10**18; // 400 tokens
                } else if (esgScore >= 80 * 10**18 && esgScore <= 100 * 10**18) {
                    return 500 * 10**18; // 500 tokens
                }
                return 0;
            }

            /**
            * @notice Retrieves the latest aggregated ESG data
            */
            function getLatestAggregatedData()
                public
                view
                returns (
                    uint256 aggregatedCluster,
                    string memory aggregatedESGScore,
                    string memory mostCommonRiskCategory,
                    uint256 timestamp
                )
            {
                AggregatedESGData memory data = latestAggregatedData;
                return (
                    data.aggregatedCluster,
                    data.aggregatedESGScore,
                    data.mostCommonRiskCategory,
                    data.timestamp
                );
            }
        }
