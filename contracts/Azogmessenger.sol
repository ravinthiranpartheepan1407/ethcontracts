//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Azogmessenger {
    string private azogmessage;

    constructor(string memory azogmessages) {
        console.log("Deploying a Azog with message:", azogmessages);
        azogmessage = azogmessages;
    }

    function azogmsg() public view returns (string memory) {
        return azogmessage;
    }

    function setAzogmsg(string memory azogmessages) public {
        console.log("Changing azog messenger from '%s' to '%s'", azogmessage, azogmessages);
        azogmessage = azogmessages;
    }
}
