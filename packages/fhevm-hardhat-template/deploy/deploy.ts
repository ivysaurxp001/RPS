import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const chainId = await hre.getChainId();
  const chainName = hre.network.name;

  const contractName = "RockPaperScissors";
  const deployed = await deploy(contractName, {
    from: deployer,
    log: true,
  });

  console.log(`${contractName} contract address: ${deployed.address}`);
  console.log(`${contractName} chainId: ${chainId}`);
  console.log(`${contractName} chainName: ${chainName}`);

  // Contract deployed successfully
  console.log(`✅ Contract deployed successfully!`);
  console.log(`📝 Contract address: ${deployed.address}`);
  console.log(`🌐 Network: ${chainName} (Chain ID: ${chainId})`);
  console.log(`📋 Next steps:`);
  console.log(`   1. Copy the contract address above`);
  console.log(`   2. Update packages/site/abi/RockPaperScissorsAddresses.ts`);
  console.log(`   3. Run: npm run generate-abi (from project root)`);
};

export default func;

func.id = "deploy_rockPaperScissors"; // id required to prevent reexecution
func.tags = ["RockPaperScissors"];
