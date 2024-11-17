// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CompanyProfile {
    struct Company {
        string companyName;
        string twitterHandle;
        string companyWebsite;
        string sector;
        string avatarUrl;
        address submittedBy;
    }

    Company[] public companies;

    event CompanySubmitted(
        string companyName,
        string twitterHandle,
        string companyWebsite,
        string sector,
        string avatarUrl,
        address submittedBy
    );

    function submitCompany(
        string memory _companyName,
        string memory _twitterHandle,
        string memory _companyWebsite,
        string memory _sector,
        string memory _avatarUrl
    ) public {
        companies.push(
            Company(
                _companyName,
                _twitterHandle,
                _companyWebsite,
                _sector,
                _avatarUrl,
                msg.sender
            )
        );

        emit CompanySubmitted(
            _companyName,
            _twitterHandle,
            _companyWebsite,
            _sector,
            _avatarUrl,
            msg.sender
        );
    }

    function getCompany(uint256 index)
        public
        view
        returns (Company memory)
    {
        return companies[index];
    }

    function getAllCompanies() public view returns (Company[] memory) {
        return companies;
    }
}
