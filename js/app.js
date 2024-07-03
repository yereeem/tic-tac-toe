// controller (in MVC)
// define namespace to prevent global access.
const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  // NAIVE APPROACH for now.
  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress",
      winner,
    };
  },

  // init method to make sure things are done after required emenets are loaded properly.
  init() {
    App.registerEventListeners();
  },

  // method to register event listeners.
  registerEventListeners() {
    // show menu items
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    // reset the current game
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("reset game");
    });

    // start a new round
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("add a new round");
    });

    App.$.modal.querySelector("button").addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add("hidden");
    });

    // when a playing square is clicked...
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        // if there is already a play, return.
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove != undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        // determine which player's icon to add to the square.
        const lastMove = App.state.moves[App.state.moves.length - 1];
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const nextPlayer = getOppositePlayer(currentPlayer);

        const squareIcon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnLabel = document.createElement("p");
        turnLabel.innerText = `Player ${nextPlayer}, you are up!`;

        if (currentPlayer === 1) {
          squareIcon.classList.add("fa-solid", "fa-x", "orange");
          turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnLabel.classList = "turquoise";
        } else {
          squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-x", "orange");
          turnLabel.classList = "orange";
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);

        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(squareIcon);

        // Check if there is a winner, or tie game.
        const game = App.getGameStatus(App.state.moves);

        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");

          let message = "";

          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = "Tie!";
          }

          App.$.modal.querySelector("p").textContent = message;
        }
      });
    });
  },
};

// load up the window with the init method.
window.addEventListener("load", App.init);
