const translation = {
  "en-US": {
    dice_roller: "Dice Roller",
    rolling_hope_dice: "Rolling hope dice",
    hope_die: "Hope Die",
    rolling_fear_dice: "Rolling fear dice",
    fear_die: "Fear Die",
    hopeful_roll: "Hopeful Roll!",
    crit: "Crit!",
    gain_hope: "Gain Hope!",
    fearful_roll: "Fearful Roll!",
    result: "Result: ",
  },
  "ru-RU": {
    dice_roller: "Бросок кубиков",
    rolling_hope_dice: "Бросаем кубик надежды",
    hope_die: "Кубик надежды",
    rolling_fear_dice: "Бросаем кубик страха",
    fear_die: "Кубик страха",
    hopeful_roll: "Бросок с надеждой!",
    crit: "Крит!",
    gain_hope: "Получи надежду!",
    fearful_roll: "Бросок со страхом!",
    result: "Результат: ",
  },
  "es-ES": {
    dice_roller: "Tirador de dados",
    rolling_hope_dice: "Tirando dados de esperanza",
    hope_die: "Dado de esperanza",
    rolling_fear_dice: "Tirando dados de miedo",
    fear_die: "Dado de miedo",
    hopeful_roll: "¡Tirada esperanzadora!",
    crit: "¡Crítico!",
    gain_hope: "¡Gana esperanza!",
    fearful_roll: "¡Tirada temible!",
    result: "Resultado:",
  },
};

let language = navigator.language;
if (!(language in translation)) {
  language = "en-US";
}

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

hope_roll.toMessage({
  speaker: ChatMessage.getSpeaker({ alias: translation[language].dice_roller }),
  flavor: translation[language].rolling_hope_dice,
  rollMode: CONST.DICE_ROLL_MODES.PUBLIC,
  dice: [
    {
      type: "d12",
      options: {
        label: translation[language].hope_die,
      },
    },
  ],
});

fear_roll.toMessage({
  speaker: ChatMessage.getSpeaker({ alias: translation[language].dice_roller }),
  flavor: translation[language].rolling_fear_dice,
  rollMode: CONST.DICE_ROLL_MODES.PUBLIC,
  dice: [
    {
      type: "d12",
      options: {
        label: translation[language].fear_die,
      },
    },
  ],
});

let hope_results = hope_roll.terms[0].results;
console.log(hope_results);
hope_results.forEach((r, index) => {
  console.log(`Die ${index + 1}: ${r.result}`);
});

let fear_results = fear_roll.terms[0].results;

let total = hope_results[0].result + fear_results[0].result;

if (hope_results[0].result > fear_results[0].result) {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({
      alias: translation[language].hopeful_roll,
    }),
    content: `${translation[language].result} ${total} \n ${translation[language].hopeful_roll}`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC,
  });
} else if (hope_results[0].result === fear_results[0].result) {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ alias: translation[language].crit }),
    content: `${translation[language].result} ${total} \n ${translation[language].result} ${translation[language].gain_hope}`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC,
  });
} else {
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({
      alias: translation[language].fearful_roll,
    }),
    content: `${translation[language].result} ${total} \n ${translation[language].fearful_roll}`,
    type: CONST.CHAT_MESSAGE_STYLES.OOC,
  });
}