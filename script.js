
// declaring variables , can use var: can change anytime/let/ const: cannot update the variable
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapons = 0;
// declare a variable without assigninh the value
let fighting;
let monsterHealth;
// declaring array of strings
let inventory= ["stick"];

//to update html elements on a html web
const button1 = document.querySelector("#button1"); 
const button2 = document.querySelector("#button2");
const button3 = document.querySelector('#button3');
const text =document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30 
  },
  {
    name: "claw hammer",
    power: 50 
  },
  {
    name: "sword",
    power: 100
  },

];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

//used to store data for the location in the game
const locations = [
  {
    name: "town sqaure",
    "button text": ["Go to store", "Go to cave", "fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: " You are now in the town sqaure. You see that sign says \"Store.\""
  },
  {
    name: "store",
    "button text" : ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown ],
    text: "You enter the store"
  },
  {
    name: "Cave",
    "button text" : ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions" : [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters"
  },
  {
    name: "goFight",
    "button text" : ["Attack", "Dodge", "Run"],
    "button functions" : [attack , dodge, goTown],
    text: "You are fighting a monster"
  },
  {
    name: "kill monster",
    "button text" : ["Go to town square", "Go to town square", "Go to town square"],
    "button functions" : [goTown, goTown, goTown],
    text: "The monster screams \"Arg!\" as it dies and you gain experence and find gold"
  },
  {
    name: "lose",
    "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions" : [restart, restart, restart],
    text: "You die!"
  },
  {
    name: "Win",
    "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions" : [restart, restart, restart],
    text: "You win the game!"
  }


]

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//create an empty function with a parameter inside its paranthesis
//paramenter is a variable that you just put in paranthesis
function update(location){
  monsterStats.style.display = "none" // removes the monsters starts box after it dies
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location["text"]; //location.text
}


//create function 
function goTown(){
  //calling the update a function, passing the first element of the array locations
  update(locations[0]); 

}
function goStore(){
 update(locations[1]);
}

function goCave(){
  update(locations[2]);
}

function buyHealth(){
  if(gold >= 10){
     gold = gold - 10
     health = health + 10
     goldText.innerText = gold;
     healthText.innerText = health;
  }else {
    text.innerText = "You do not have any gold to Buy health";
  }

}

function buyWeapon(){
  if(currentWeapons < weapons.length -1) {
      if(gold >=30){
        gold = gold - 30;
        currentWeapons = currentWeapons + 1;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapons].name; // initializes a new variable
        text.innerText = "You now have a" + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your new inventory you have : " + inventory;

      } else {
        text.innerText = " You do not have to gold to buy weapon";
      } 

  }  else {
      text.innerText = " You already have the powerful weapon";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;;
  }
}

function sellWeapon(){
  if(inventory.length > 1){
    gold = gold + 15;
    goldText.innerText = gold;
    let currentWeapons = inventory.shift();
    text.innerText = "You sold a " + currentWeapons + ".";
    text.innerText = " In you inventory you have : " + inventory;
  }else {
    // participant has last weapon and wants to sell
    text.innerText = " Do not sell your last weapon!";
  }
}
function fightSlime(){
  fighting = 0;
  goFight();
}
function fightDragon(){
  fighting = 1;
  goFight();
}

function fightBeast(){ 
  fighting = 2;
  goFight();
}
function goFight(){ 
 update(locations[3]);
 monsterHealth = monsters[fighting].health;
 monsterStats.style.display = "block";
 monsterNameText.innerText += monsters[fighting].name;
 monsterHealthText.innerText = monsterHealth;
  
}
function attack(){ 
  text.innerText = "The " + monsters[fighting].name + "attacks.";
  text.innerText = "You attack with your" + " " + weapons[currentWeapons].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapons].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  }else if(monsterHealth <= 0){
    if(fighting === 2){
      winGame();
    }
    defeatMonster();
  }
}
function dodge(){ 
 text.innerText = "You dodge the attack from " + monsters[fighting].name + ".";
}
function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose(){
  update(locations[5]);
}
function winGame(){
 update(locations[6]);
}
function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapons = 0;
  fighting;
  monsterHealth;
  inventory= ["stick"]; 
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();

} 