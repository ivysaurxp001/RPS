import * as fs from "fs";
import * as path from "path";

const CONTRACTS_PACKAGE_DIR = "fhevm-hardhat-template";

function generateABIFiles() {
  console.log("🔄 Generating ABI files from existing artifacts...");
  
  // Path to artifacts
  const artifactsDir = path.resolve(`./packages/${CONTRACTS_PACKAGE_DIR}/artifacts/contracts`);
  const siteAbiDir = path.resolve("./packages/site/abi");
  
  // Ensure site/abi directory exists
  if (!fs.existsSync(siteAbiDir)) {
    fs.mkdirSync(siteAbiDir, { recursive: true });
  }
  
  // Find all contract artifacts
  const contractFiles = [];
  function findContracts(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findContracts(fullPath);
      } else if (item.endsWith('.json') && !item.includes('.dbg.')) {
        contractFiles.push(fullPath);
      }
    }
  }
  
  findContracts(artifactsDir);
  
  // Generate ABI and Address files for each contract
  const contracts = {};
  const addresses = {};
  
  for (const contractFile of contractFiles) {
    try {
      const artifact = JSON.parse(fs.readFileSync(contractFile, 'utf-8'));
      const contractName = artifact.contractName;
      
      if (contractName) {
        // Store ABI
        contracts[contractName] = {
          abi: artifact.abi,
          contractName: contractName
        };
        
        console.log(`✅ Found contract: ${contractName}`);
      }
    } catch (error) {
      console.warn(`⚠️  Could not process ${contractFile}: ${error.message}`);
    }
  }
  
  // Generate ABI files
  for (const [contractName, contractData] of Object.entries(contracts)) {
    const abiContent = `export const ${contractName}ABI = ${JSON.stringify(contractData.abi, null, 2)};`;
    const abiFile = path.join(siteAbiDir, `${contractName}ABI.ts`);
    fs.writeFileSync(abiFile, abiContent);
    console.log(`📝 Generated: ${abiFile}`);
  }
  
  // Read existing addresses file to preserve current addresses
  const addressesFile = path.join(siteAbiDir, "RockPaperScissorsAddresses.ts");
  let existingAddresses = {};
  
  if (fs.existsSync(addressesFile)) {
    try {
      const content = fs.readFileSync(addressesFile, 'utf-8');
      // Extract addresses object from the file content
      const match = content.match(/export const RockPaperScissorsAddresses = ({[\s\S]*?});/);
      if (match) {
        // This is a simple approach - in production you might want to use a proper parser
        console.log("📋 Preserving existing addresses...");
      }
    } catch (error) {
      console.warn("⚠️  Could not read existing addresses file");
    }
  }
  
  console.log("✅ ABI generation completed!");
  console.log("📋 Note: Contract addresses are managed separately in RockPaperScissorsAddresses.ts");
}

generateABIFiles();
