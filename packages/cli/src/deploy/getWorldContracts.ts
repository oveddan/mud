import accessManagementSystemBuild from "@latticexyz/world/out/AccessManagementSystem.sol/AccessManagementSystem.json" assert { type: "json" };
import balanceTransferSystemBuild from "@latticexyz/world/out/BalanceTransferSystem.sol/BalanceTransferSystem.json" assert { type: "json" };
import batchCallSystemBuild from "@latticexyz/world/out/BatchCallSystem.sol/BatchCallSystem.json" assert { type: "json" };
import registrationSystemBuild from "@latticexyz/world/out/RegistrationSystem.sol/RegistrationSystem.json" assert { type: "json" };
import extendedRegistrationSystemBuild from "@latticexyz/world/out/ExtendedRegistrationSystem.sol/ExtendedRegistrationSystem.json" assert { type: "json" };
import initModuleBuild from "@latticexyz/world/out/InitModule.sol/InitModule.json" assert { type: "json" };
import initModuleAbi from "@latticexyz/world/out/InitModule.sol/InitModule.abi.json" assert { type: "json" };
import { Hex, getCreate2Address, encodeDeployData, size } from "viem";
import { salt } from "./common";

export function getWorldContracts(deployerAddress: Hex) {
  const accessManagementSystemDeployedBytecodeSize = size(accessManagementSystemBuild.deployedBytecode.object as Hex);
  const accessManagementSystemBytecode = accessManagementSystemBuild.bytecode.object as Hex;
  const accessManagementSystem = getCreate2Address({
    from: deployerAddress,
    bytecode: accessManagementSystemBytecode,
    salt,
  });

  const balanceTransferSystemDeployedBytecodeSize = size(balanceTransferSystemBuild.deployedBytecode.object as Hex);
  const balanceTransferSystemBytecode = balanceTransferSystemBuild.bytecode.object as Hex;
  const balanceTransferSystem = getCreate2Address({
    from: deployerAddress,
    bytecode: balanceTransferSystemBytecode,
    salt,
  });

  const batchCallSystemDeployedBytecodeSize = size(batchCallSystemBuild.deployedBytecode.object as Hex);
  const batchCallSystemBytecode = batchCallSystemBuild.bytecode.object as Hex;
  const batchCallSystem = getCreate2Address({ from: deployerAddress, bytecode: batchCallSystemBytecode, salt });

  const registrationDeployedBytecodeSize = size(registrationSystemBuild.deployedBytecode.object as Hex);
  const registrationBytecode = registrationSystemBuild.bytecode.object as Hex;
  const registration = getCreate2Address({
    from: deployerAddress,
    bytecode: registrationBytecode,
    salt,
  });
  const extendedRegistrationDeployedBytecodeSize = size(extendedRegistrationSystemBuild.deployedBytecode.object as Hex);
  const extendedRegistrationBytecode = extendedRegistrationSystemBuild.bytecode.object as Hex;
  const extendedRegistration = getCreate2Address({
    from: deployerAddress,
    bytecode: extendedRegistrationBytecode,
    salt,
  });

  const initModuleDeployedBytecodeSize = size(initModuleBuild.deployedBytecode.object as Hex);
  const initModuleBytecode = encodeDeployData({
    bytecode: initModuleBuild.bytecode.object as Hex,
    abi: initModuleAbi,
    args: [accessManagementSystem, balanceTransferSystem, batchCallSystem, registration, extendedRegistration],
  });
  const initModule = getCreate2Address({ from: deployerAddress, bytecode: initModuleBytecode, salt });

  return {
    AccessManagementSystem: {
      bytecode: accessManagementSystemBytecode,
      deployedBytecodeSize: accessManagementSystemDeployedBytecodeSize,
      label: "access management system",
      address: accessManagementSystem,
    },
    BalanceTransferSystem: {
      bytecode: balanceTransferSystemBytecode,
      deployedBytecodeSize: balanceTransferSystemDeployedBytecodeSize,
      label: "balance transfer system",
      address: balanceTransferSystem,
    },
    BatchCallSystem: {
      bytecode: batchCallSystemBytecode,
      deployedBytecodeSize: batchCallSystemDeployedBytecodeSize,
      label: "batch call system",
      address: batchCallSystem,
    },
    RegistrationSystem: {
      bytecode: registrationBytecode,
      deployedBytecodeSize: registrationDeployedBytecodeSize,
      label: "core registration system",
      address: registration,
    },
    ExteendedRegistrationSystem: {
      bytecode: extendedRegistrationBytecode,
      deployedBytecodeSize: extendedRegistrationDeployedBytecodeSize,
      label: "extended core registration system",
      address: extendedRegistration,
    },
    InitModule: {
      bytecode: initModuleBytecode,
      deployedBytecodeSize: initModuleDeployedBytecodeSize,
      label: "core module",
      address: initModule,
    },
  };
}
