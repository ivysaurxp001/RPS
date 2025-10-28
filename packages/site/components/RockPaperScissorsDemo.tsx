"use client";

import { useFhevm } from "@fhevm/react";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useRockPaperScissors } from "../hooks/useRockPaperScissors/useRockPaperScissors";
import { ErrorNotDeployed } from "./ErrorNotDeployed";
import { useMemo, useState } from "react";
import { GameStatusBoxSection } from "./GameStatus";
import { MessageSection } from "./MessageSection";
import { TechnicalDetailsSection } from "./InfoPanels";
import { MoveSelectorModal } from "./MoveSelector";
import { ConnectButton } from "./ConnectButton";

export const RockPaperScissorsDemo = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    accounts,
    isConnected,
    connect,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  } = useMetaMaskEthersSigner();

  const {
    instance: fhevmInstance,
    status: fhevmStatus,
    error: fhevmError,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains: [],
    enabled: true,
  });

  const rockPaperScissors = useRockPaperScissors({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    userAddress: accounts?.[0] as `0x${string}` | undefined,
  });

  const [selectedMove, setSelectedMove] = useState<number | null>(null);
  const [showMoveSelector, setShowMoveSelector] = useState(false);
  const [modalMode, setModalMode] = useState<"join" | "submit">("submit");

  const handleSubmitMove = async () => {
    if (selectedMove !== null) {
      // Start the async operation but close modal immediately (optimistic UI)
      setShowMoveSelector(false);
      setSelectedMove(null);
      setModalMode("submit");
      rockPaperScissors.submitEncryptedMove(selectedMove);
    }
  };

  const gameState = useMemo(
    () => ({
      gameData: rockPaperScissors.latestGame?.data ?? null,
      gameId: rockPaperScissors.latestGame?.gameId ?? null,
      userGameRole: rockPaperScissors.userGameRole,
      gameResult: rockPaperScissors.gameResult,
      myMove: rockPaperScissors.myMove,
      isLoadingGameData: rockPaperScissors.isLoadingGames,
    }),
    [
      rockPaperScissors.isLoadingGames,
      rockPaperScissors.gameResult,
      rockPaperScissors.latestGame?.data,
      rockPaperScissors.latestGame?.gameId,
      rockPaperScissors.myMove,
      rockPaperScissors.userGameRole,
    ]
  );

  const uiState = useMemo(
    () => ({
      canCreateGame: rockPaperScissors.canCreateGame ?? false,
      canSubmitMove: rockPaperScissors.canSubmitMove ?? false,
      isSubmittingMove: rockPaperScissors.isSubmittingMove,
      isCreatingGame: rockPaperScissors.isCreatingGame,
      isViewingResults: rockPaperScissors.isViewingResults,
    }),
    [
      rockPaperScissors.canCreateGame,
      rockPaperScissors.canSubmitMove,
      rockPaperScissors.isCreatingGame,
      rockPaperScissors.isSubmittingMove,
      rockPaperScissors.isViewingResults,
    ]
  );

  const actions = useMemo(
    () => ({
      onCreateGame: rockPaperScissors.createGame,
      onSubmitMove: () => setShowMoveSelector(true),
      onViewResults: rockPaperScissors.viewResults,
    }),
    [rockPaperScissors.createGame, rockPaperScissors.viewResults]
  );

  const modalControls = useMemo(
    () => ({
      setModalMode,
      setShowMoveSelector,
    }),
    [setModalMode, setShowMoveSelector]
  );

  if (!isConnected) {
    return <ConnectButton isConnected={isConnected} connect={connect} />;
  }

  if (!rockPaperScissors.isDeployed) {
    return <ErrorNotDeployed chainId={chainId} />;
  }

  return (
    <>
      {/* Header Section */}
      <div className="col-span-full mx-4 md:mx-20 glass-card rounded-2xl p-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🔐 Encrypted Rock-Paper-Scissors
          </h1>
          <p className="text-lg md:text-xl font-mono text-gray-300">
            Powered by <span className="text-cyan-400 font-bold">Zama FHEVM</span> • Privacy-Preserving Gaming
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Fully Homomorphic Encryption Active</span>
          </div>
        </div>
      </div>

      <GameStatusBoxSection
        gameState={gameState}
        uiState={uiState}
        actions={actions}
        modalControls={modalControls}
      />

      <MessageSection message={rockPaperScissors.message} />

      <TechnicalDetailsSection
        chainId={chainId}
        accounts={accounts}
        ethersSigner={ethersSigner}
        contractAddress={rockPaperScissors.contractAddress}
        isDeployed={rockPaperScissors.isDeployed}
        fhevmInstance={fhevmInstance}
        fhevmStatus={fhevmStatus}
        fhevmError={fhevmError ?? null}
      />

      {/* Move Selector Modal */}
      {showMoveSelector && (
        <MoveSelectorModal
          modalMode={modalMode}
          setSelectedMove={setSelectedMove}
          setModalMode={setModalMode}
          selectedMove={selectedMove}
          setShowMoveSelector={setShowMoveSelector}
          handleSubmitMove={handleSubmitMove}
          isSubmittingMove={rockPaperScissors.isSubmittingMove}
        />
      )}
    </>
  );
};
