// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { IWorldContextConsumer, WORLD_CONTEXT_CONSUMER_INTERFACE_ID } from "./IWorldContextConsumer.sol";
import { ResourceId } from "./WorldResourceId.sol";

// ERC-165 Interface ID (see https://eips.ethereum.org/EIPS/eip-165)
bytes4 constant DELEGATION_CONTROL_INTERFACE_ID = IDelegationControl.verify.selector ^
  WORLD_CONTEXT_CONSUMER_INTERFACE_ID;

interface IDelegationControl is IWorldContextConsumer {
  function verify(address delegator, ResourceId systemId, bytes memory callData) external returns (bool);
}