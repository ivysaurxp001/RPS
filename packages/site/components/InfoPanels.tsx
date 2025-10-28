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

      <p className="font-semibold text-black text-lg mt-4">Contract</p>
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
    <div className="rounded-lg bg-white border-2 border-black pb-4 px-4">
      <p className="font-semibold text-black text-lg mt-4">FHEVM instance</p>
      {printProperty("Fhevm Instance", !!fhevmInstance ? "OK" : "undefined")}
      {printProperty("Fhevm Status", fhevmStatus)}
      {printProperty("Fhevm Error", fhevmError ?? "No Error")}
    </div>
  );
}

export function HowToPlaySection() {
  return (
    <div className="rounded-lg bg-white border-2 border-black pb-4 px-4">
      <div className="flex items-center gap-2 mt-4">
        <FaBook />
        <p className="font-semibold text-black text-lg">How to Play</p>
      </div>

      <div className="mt-3 space-y-6">
        <div>
          <p className="font-semibold mb-1">Game Rules:</p>
          <p>
            This is an onchain implementation of the classic Rock Paper Scissors
            game using FHE. Only the final result is available to both players.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-1">Privacy Features:</p>
          <ul className="text-gray-700 space-y-1">
            <li>• Moves are encrypted using FHE</li>
            <li>• Individual moves stay private</li>
            <li>• Only the final result is revealed</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-1">How to Play:</p>
          <ol className="text-gray-700 space-y-1">
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
        className="flex items-center justify-center gap-2 w-full p-4 hover:cursor-pointer hover:bg-yellow-400 rounded-lg border-2 border-black"
      >
        <h3 className="font-semibold text-black text-2xl">
          TECHNICAL DETAILS AND HOW TO PLAY
        </h3>
        <FaChevronDown
          className={`text-black text-xl transition-transform duration-200 ${
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
