
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

let inventory = [];

const adventure = {
  start: {
    text: "You wake up in a mysterious forest. Two paths lie ahead.",
    choices: [
      { text: "Take the left path", next: "leftPath" },
      { text: "Take the right path", next: "rightPath" }
    ]
  },
  leftPath: {
    text: "You encounter a friendly elf who offers you a magical sword.",
    choices: [
      { text: "Accept the sword", next: "swordPath", item: "Magical Sword" },
      { text: "Decline and walk away", next: "walkAway" }
    ]
  },
  rightPath: {
    text: "You fall into a trap set by goblins. Game Over!",
    choices: []
  },
  swordPath: {
    text: "With the sword, you defeat a dragon and find treasure. You win!",
    choices: []
  },
  walkAway: {
    text: "You wander endlessly and get lost. Game Over!",
    choices: []
  }
};

function showScene(sceneKey) {
  const scene = adventure[sceneKey];
  storyElement.textContent = scene.text;
  choicesElement.innerHTML = "";

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.item) {
        inventory.push(choice.item);
        updateInventoryUI();
      }
      showScene(choice.next);
    };
    choicesElement.appendChild(button);
  });
}

function updateInventoryUI() {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// Start the game
showScene("start");
