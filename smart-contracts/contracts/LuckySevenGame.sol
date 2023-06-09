// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./GameToken.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract LuckySevenGame is VRFConsumerBaseV2 {

 VRFCoordinatorV2Interface COORDINATOR;
  uint64 s_subscriptionId;
  address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;
  bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
  uint32 callbackGasLimit = 100000;
  uint16 requestConfirmations = 3;
  uint32 numWords =  2;
  uint256[] public s_randomWords;
  uint256 public s_requestId;
  address s_owner;
 address payable public owner;

    GameToken token;

    constructor(address _token, uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        token = GameToken(_token);
            COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    s_owner = msg.sender;
    s_subscriptionId = subscriptionId;
    owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function transfer(uint256 amt) external {
        require(token.balanceOf(address(this)) >= amt);
        token.transfer(msg.sender, amt);
    }

    function transferFrom(uint256 amt) external {
        require(token.balanceOf(msg.sender) >= amt);
        token.transferFrom(msg.sender, address(this), amt);
    }

    function buyToken(uint256 _tokenGet) public payable {
        require(
            token.balanceOf(address(this)) >= _tokenGet,
            "insufficient token balance"
        );
        token.transfer(msg.sender, _tokenGet);
    }

    function sellToken(uint256 _token, uint256 _matic) public {
        require(address(this).balance >= _matic, "insufficient matic balance");
        token.approve(address(this), _token);
        require(
            token.transferFrom(msg.sender, address(this), _token),
            "error in transfer from"
        );
        payable(msg.sender).transfer(_matic);
    }

     // Assumes the subscription is funded sufficiently.
  function requestRandomWords() external onlyOwner {
    // Will revert if subscription is not set and funded.
    s_requestId = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );
  }

  function fulfillRandomWords(
    uint256, /* requestId */
    uint256[] memory randomWords
  ) internal override {
    s_randomWords = randomWords;
  }

}
