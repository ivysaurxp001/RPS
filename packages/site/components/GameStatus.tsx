import { FaCube } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import { GAME_STATUS, GAME_ROLE } from "@/lib/constants";
import { GameButton, ButtonContainer } from "./GameButton";
import { GameResultDetails } from "./GameResult";
import { GameData, GameRole } from "@/lib/types";

export function GameStatusBoxSection({
  gameState,
  uiState,
  actions,
  modalControls,
}: GameStatusBoxSectionProps) {
  const {
    gameData,
    gameId,
    userGameRole,
    gameResult,
    myMove,
    isLoadingGameData,
  } = gameState;

  const { canCreateGame, isCreatingGame } = uiState;

  const { onCreateGame } = actions;

  // Show loading spinner when game data is loading and no game data available
  if (isLoadingGameData && !gameData) {
    return (
      <div className="col-span-full mx-4 md:mx-20 glass-card rounded-2xl p-6 text-white">
        <h4 className="font-bold mb-6 text-2xl text-center flex items-center justify-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FaCube className="text-blue-400" />
          </div>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">GAME STATUS</span>
        </h4>
        <div className="flex flex-col items-center justify-center pb-8 pt-4">
          <LuLoaderCircle className="animate-spin size-16 text-cyan-400 mb-4" />
          <p className="text-gray-300 text-lg">Loading game data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-full mx-4 md:mx-20 glass-card rounded-2xl p-6 text-white">
      <h4 className="font-bold mb-6 text-2xl text-center flex items-center justify-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <FaCube className="text-blue-400" />
        </div>
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">GAME STATUS</span>
      </h4>
      <div className="space-y-4">
        {!gameData && (
          <>
            <div className="text-gray-300 text-center text-lg">No active games available</div>
            <ButtonContainer>
              <GameButton
                onClick={onCreateGame}
                disabled={!canCreateGame || isCreatingGame}
                variant="primary"
                fullWidth
              >
                {isCreatingGame ? "Creating Game..." : "Start New Game"}
              </GameButton>
            </ButtonContainer>
          </>
        )}

        {gameData && userGameRole === GAME_ROLE.PLAYER1 && (
          <Player1View
            gameData={gameData}
            actions={actions}
            uiState={uiState}
          />
        )}
        {gameData && userGameRole === GAME_ROLE.PLAYER2 && (
          <Player2View
            gameData={gameData}
            actions={actions}
            uiState={uiState}
          />
        )}
        {gameData && userGameRole === GAME_ROLE.NO_ROLE && (
          <SpectatorView
            gameData={gameData}
            modalControls={modalControls}
            uiState={uiState}
          />
        )}
        <GameResultDetails
          userGameRole={userGameRole}
          gameResult={gameResult}
          myMove={myMove}
        />
      </div>
      {gameData && (
        <div className="mt-4 pt-3 border-t text-sm text-gray-500 font-semibold text-center">
          Game ID: #{gameId ? gameId.toString() : "N/A"}
        </div>
      )}
    </div>
  );
}

export function Player1View({ gameData, actions, uiState }: Player1ViewProps) {
  const { onSubmitMove, onViewResults, onCreateGame } = actions;
  const {
    canSubmitMove,
    isSubmittingMove,
    isViewingResults,
    canCreateGame,
    isCreatingGame,
  } = uiState;
  const hasOpponent =
    gameData.player2 &&
    gameData.player2 !== "0x0000000000000000000000000000000000000000";

  return (
    <>
      <div>
        <span className="font-medium">Your Role:</span> Player 1
      </div>
      <div>
        <span className="font-medium">Opponent:</span>
        <p className="font-mono break-all mt-1">
          {hasOpponent ? gameData.player2 : "No opponent yet"}
        </p>
      </div>

      {gameData.status === GAME_STATUS.RESOLVED && (
        <div>
          <span className="font-medium">Opponent&apos;s move:</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-bold text-green-400">ZAMA</span>
            <p>Hidden</p>
          </div>
        </div>
      )}

      <div>
        <span className="font-medium">Status:</span>
        <p className="mt-1">
          {gameData.status === GAME_STATUS.CREATED && "Submit your move"}
          {gameData.status === GAME_STATUS.PLAYER1_SUBMITTED &&
            "Waiting for Player 2"}
          {gameData.status === GAME_STATUS.RESOLVED && "Game resolved"}
        </p>
      </div>

      {gameData.status === GAME_STATUS.CREATED && (
        <ButtonContainer>
          <GameButton
            onClick={onSubmitMove}
            disabled={!canSubmitMove || isSubmittingMove}
            variant="success"
            fullWidth
          >
            {isSubmittingMove ? "Submitting Move..." : "Submit Your Move"}
          </GameButton>
        </ButtonContainer>
      )}

      {gameData.status === GAME_STATUS.PLAYER1_SUBMITTED && (
        <ButtonContainer>
          <GameButton variant="waiting" onClick={() => {}} disabled>
            Waiting for Player 2 to join...
          </GameButton>
        </ButtonContainer>
      )}

      {gameData.status === GAME_STATUS.RESOLVED && (
        <ButtonContainer>
          <GameButton
            onClick={onViewResults}
            disabled={isViewingResults}
            variant="secondary"
          >
            {isViewingResults ? "Decrypting..." : "View Results"}
          </GameButton>
          <GameButton
            onClick={onCreateGame}
            disabled={!canCreateGame || isCreatingGame}
            variant="primary"
          >
            {isCreatingGame ? "Creating Game..." : "New Game"}
          </GameButton>
        </ButtonContainer>
      )}
    </>
  );
}

export function Player2View({ gameData, actions, uiState }: Player2ViewProps) {
  const { onViewResults, onCreateGame } = actions;
  const { isViewingResults, canCreateGame, isCreatingGame } = uiState;

  return (
    <>
      <div>
        <span className="font-medium">Your Role:</span> Player 2
      </div>
      <div>
        <span className="font-medium">Opponent:</span>
        <p className="font-mono break-all mt-1">{gameData.player1}</p>
      </div>
      <div>
        <span className="font-medium">Opponent&apos;s move:</span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-green-400">ZAMA</span>
          <p>Hidden</p>
        </div>
      </div>
      <div>
        <span className="font-medium">Status:</span>
        <p className="mt-1">
          {gameData.status === GAME_STATUS.RESOLVED && "Game resolved"}
        </p>
      </div>
      {gameData.status === GAME_STATUS.RESOLVED && (
        <ButtonContainer>
          <GameButton
            onClick={onViewResults}
            disabled={isViewingResults}
            variant="secondary"
          >
            {isViewingResults ? "Decrypting..." : "View Results"}
          </GameButton>
          <GameButton
            onClick={onCreateGame}
            disabled={!canCreateGame || isCreatingGame}
            variant="primary"
          >
            {isCreatingGame ? "Creating Game..." : "New Game"}
          </GameButton>
        </ButtonContainer>
      )}
    </>
  );
}

export function SpectatorView({
  gameData,
  modalControls,
  uiState,
}: SpectatorViewProps) {
  const { setModalMode, setShowMoveSelector } = modalControls;
  const { isSubmittingMove } = uiState;
  const handleJoinGame = () => {
    setModalMode("join");
    setShowMoveSelector(true);
  };
  return (
    <>
      <div>
        <span className="font-medium">Available to join</span>
      </div>
      <div>
        <span className="font-medium">Created by:</span>
        <p className="font-mono break-all mt-1">{gameData.player1}</p>
      </div>
      <div>
        <span className="font-medium">Status:</span>
        <p className="mt-1">
          {gameData.status === GAME_STATUS.CREATED &&
            "Waiting for Player 1's move"}
          {gameData.status === GAME_STATUS.PLAYER1_SUBMITTED &&
            "Waiting for Player 2"}
        </p>
      </div>

      {gameData.status === GAME_STATUS.CREATED && (
        <ButtonContainer>
          <GameButton onClick={() => {}} disabled variant="waiting" fullWidth>
            Waiting for Player 1 move...
          </GameButton>
        </ButtonContainer>
      )}
      {gameData.status === GAME_STATUS.PLAYER1_SUBMITTED && (
        <ButtonContainer>
          <GameButton
            onClick={handleJoinGame}
            disabled={isSubmittingMove}
            variant="join"
            fullWidth
          >
            {isSubmittingMove ? "Joining Game..." : "Join This Game"}
          </GameButton>
        </ButtonContainer>
      )}
    </>
  );
}

interface GameState {
  gameData: GameData | null;
  gameId: bigint | null;
  userGameRole: GameRole;
  gameResult: string | null;
  myMove: string | null;
  isLoadingGameData: boolean;
}

interface GameUiState {
  canCreateGame: boolean;
  canSubmitMove: boolean;
  isSubmittingMove: boolean;
  isCreatingGame: boolean;
  isViewingResults: boolean;
}

interface GameActions {
  onCreateGame: () => void;
  onSubmitMove: () => void;
  onViewResults: () => void;
}

interface ModalControls {
  setModalMode: (mode: "join" | "submit") => void;
  setShowMoveSelector: (show: boolean) => void;
}

interface Player1ViewProps {
  gameData: GameData;
  actions: GameActions;
  uiState: GameUiState;
}

interface Player2ViewProps {
  gameData: GameData;
  actions: GameActions;
  uiState: GameUiState;
}

interface SpectatorViewProps {
  gameData: GameData;
  modalControls: ModalControls;
  uiState: GameUiState;
}

interface GameStatusBoxSectionProps {
  gameState: GameState;
  uiState: GameUiState;
  actions: GameActions;
  modalControls: ModalControls;
}
