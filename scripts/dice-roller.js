class MyCustomApplication extends Application {
  constructor(options = {}) {
      super(options);
  }

  static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
          id: "my-custom-application",
          template: "modules/my-dice-module/templates/dice-roller-prompt.html", // Path to your HTML template
          title: "My Custom Window",
          width: 400,
          height: 300,
          resizable: true,
      });
  }

  getData() {
      // Here you can pass data to your template
      return {
          someData: "Hello from JavaScript!",
          items: game.items.filter(i => i.type === "weapon").map(i => i.toObject()), // Example data
      };
  }

  activateListeners(html) {
      super.activateListeners(html);

      html.find(".my-button").click(this._onButtonClick.bind(this));
      // Add other event listeners here
  }

  async _onButtonClick(event) {
      event.preventDefault();
      ui.notifications.info("Button clicked!");
      // Add button click logic here
  }
}

Hooks.on("ready", () => {
  // Register a game setting to open the application
  game.settings.register("my-dice-module", "openMyApplication", {
      name: "Open My Application",
      hint: "Opens the custom application window.",
      scope: "client",
      config: false, // Don't show in module settings
      type: Boolean,
      default: false,
      onChange: (value) => {
          if (value) {
              new MyCustomApplication().render(true);
              game.settings.set("my-dice-module", "openMyApplication", false); // Reset the setting
          }
      },
  });

      game.macro.register("Open My Application", {
      name: "Open My Application",
      type: "script",
      command: `game.settings.set("my-dice-module", "openMyApplication", true);`,
      img: "icons/svg/item-bag.svg" // Optional icon
  });
});