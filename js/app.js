// define namespace to prevent global access.
const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
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

    // when a playing square is clicked...
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        console.log(`Square with id ${event.target.id} was clicked.`);
      });
    });
  },
};

// load up the window with the init method.
window.addEventListener("load", App.init);
