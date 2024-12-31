// Roll two dice and display the result in chat.

// Create a new Roll object for 2d6
// Evaluate the roll asynchronously
let hope_roll = await new Roll("1d12").evaluate();
hope_roll.dice[0].options.appearance = {
  foreground: "#ffffff",
  edge: "#000000",
  background: "#acafb2",
};

let fear_roll = await new Roll("1d12").evaluate();
fear_roll.dice[0].options.appearance = {
  foreground: "#ffffff",
  edge: "#000000",
  background: "#ea222b",
};

// Display the roll in chat.
hope_roll.toMessage({
  speaker: ChatMessage.getSpeaker({ alias: "Dice Roller" }), // Set the speaker
  flavor: "Rolling hope dice", // Add a flavor text
  rollMode: CONST.DICE_ROLL_MODES.PUBLIC, // Make the roll visible to everyone
  dice: [
    {
      // First die options
      type: "d12",
      options: {
        label: "Hope Die",
      },
    },
  ],
});

fear_roll.toMessage({
  speaker: ChatMessage.getSpeaker({ alias: "Dice Roller" }), // Set the speaker
  flavor: "Rolling fear dice", // Add a flavor text
  rollMode: CONST.DICE_ROLL_MODES.PUBLIC, // Make the roll visible to everyone
  dice: [
    {
      // First die options
      type: "d12",
      options: {
        label: "Fear Die",
      },
    },
  ],
});

// Optionally, get the total result as a number:

// Optionally, get the individual results of each die:
let hope_results = hope_roll.terms[0].results; // Access the results array
console.log(hope_results);
hope_results.forEach((r, index) => {
  console.log(`Die ${index + 1}: ${r.result}`);
});

let fear_results = fear_roll.terms[0].results; // Access the results array

let total = hope_results[0].result + fear_results[0].result;
//Example of checking for doubles
if (hope_results[0].result > fear_results[0].result) {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ alias: "Бросок с надеждой!" }),
    content: `Результат: ${total} \n Бросок с надеждой!`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC, // Out of Character message
  });
} else if (hope_results[0].result === fear_results[0].result) {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ alias: "Крит!" }),
    content: `Результат: ${total} \n Крит! Получи надужду!`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC, // Out of Character message
  });
} else {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ alias: "Бросок со страхом!" }),
    content: `Результат: ${total} \n Бросок со страхом!`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC, // Out of Character message
  });
}
