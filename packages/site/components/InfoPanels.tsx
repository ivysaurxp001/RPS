import { ethers } from "ethers";
import { printProperty } from "./DataDisplay";
import { FaBook, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { FhevmInstance } from "@fhevm/react";

export function ChainInfoSection({
  chainId,
  accounts,
  ethersSigner,
  contractAddress,
  isDeployed,
}: {
  chainId: number | undefined;
  accounts: string[] | undefined;
  ethersSigner: ethers.Signer | undefined;
  contractAddress: string | undefined;
  isDeployed: boolean | undefined;
}) {
  return (
    <div className="col-span-full mx-4 md:mx-20 glass-card rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <FaBook className="text-purple-400" />
        </div>
        <p className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Chain Information</p>
      </div>
      {printProperty("ChainId", chainId)}
      {printProperty(
        "Metamask accounts",
        accounts
          ? accounts.length === 0
            ? "No accounts"
            : `{ length: ${accounts.length}, [${accounts[0]}, ...] }`
          : "undefined"
      )}
      {printProperty(
        "Signer",
        ethersSigner
          ? (ethersSigner as unknown as { address: string }).address ||
              "Signer available"
          : "No signer"
      )}

      <p className="font-semibold text-cyan-400 text-lg mt-4">Contract</p>
      {printProperty("RockPaperScissors", contractAddress)}
      {printProperty("isDeployed", isDeployed)}
    </div>
  );
}

export function FhevmInstanceSection({
  fhevmInstance,
  fhevmStatus,
  fhevmError,
}: {
  fhevmInstance: FhevmInstance | undefined;
  fhevmStatus: string;
  fhevmError: Error | null;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <FaBook className="text-blue-400" />
        </div>
        <p className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">FHEVM Instance</p>
      </div>
      {printProperty("Fhevm Instance", !!fhevmInstance ? "OK" : "undefined")}
      {printProperty("Fhevm Status", fhevmStatus)}
      {printProperty("Fhevm Error", fhevmError ?? "No Error")}
    </div>
  );
}

export function HowToPlaySection() {
  return (
    <div className="glass-card rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <FaBook className="text-green-400" />
        </div>
        <p className="font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">How to Play</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="font-semibold text-cyan-400 mb-2">Game Rules:</p>
          <p className="text-gray-300">
            This is an onchain implementation of the classic Rock Paper Scissors
            game using FHE. Only the final result is available to both players.
          </p>
        </div>

        <div>
          <p className="font-semibold text-cyan-400 mb-2">Privacy Features:</p>
          <ul className="text-gray-300 space-y-1">
            <li>• Moves are encrypted using FHE</li>
            <li>• Individual moves stay private</li>
            <li>• Only the final result is revealed</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-cyan-400 mb-2">How to Play:</p>
          <ol className="text-gray-300 space-y-1">
            <li>1. Player 1 creates a new game</li>
            <li>2. Player 1 submits their encrypted move</li>
            <li>3. Player 2 joins and submits their move</li>
            <li>4. Game automatically resolves</li>
            <li>5. Both players can view the result</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export function TechnicalDetailsSection({
  chainId,
  accounts,
  ethersSigner,
  contractAddress,
  isDeployed,
  fhevmInstance,
  fhevmStatus,
  fhevmError,
}: {
  chainId: number | undefined;
  accounts: string[] | undefined;
  ethersSigner: ethers.Signer | undefined;
  contractAddress: string | undefined;
  isDeployed: boolean | undefined;
  fhevmInstance: FhevmInstance | undefined;
  fhevmStatus: string;
  fhevmError: Error | null;
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="col-span-full mx-20 mt-4">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="flex items-center justify-center gap-2 w-full p-4 hover:cursor-pointer glass-card hover:bg-white/10 rounded-2xl border border-white/20 transition-all duration-300"
      >
        <h3 className="font-bold text-white text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          TECHNICAL DETAILS AND HOW TO PLAY
        </h3>
        <FaChevronDown
          className={`text-white text-xl transition-transform duration-200 ${
            isAccordionOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isAccordionOpen && (
        <div className="mt-4 space-y-4 animate-in fade-in-50 duration-300">
          <ChainInfoSection
            chainId={chainId}
            accounts={accounts}
            ethersSigner={ethersSigner}
            contractAddress={contractAddress}
            isDeployed={isDeployed}
          />

          <div className="grid grid-cols-2 gap-4">
            <FhevmInstanceSection
              fhevmInstance={fhevmInstance}
              fhevmStatus={fhevmStatus}
              fhevmError={fhevmError}
            />
            <HowToPlaySection />
          </div>
        </div>
      )}
    </div>
  );
}
