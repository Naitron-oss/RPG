
//Game info and functions
var game = {
  win: false,  //tracks if won game
  over: true,  //tracks game over or not
  continuous: false,  //tracks continous or boss mode
  score: 0,  //tracks current kill score
  highScore: 0,  //tracks high score
  level: 1,  //which level player is on
  needToKill: 1,  //tracks how many enemies link needs to kill to progress
  now: null,  //current game time
  endTime: null,  //tracks game end time
  soundFx: true,  //soundFx on or off
  // delta: null,  //change in now and then game time, ie frame rate
  // then: null,  ////previous game time (last frame)

  setGameNow: function() {  //sets game time
    game.now = Date.now();
  },

  //sets kills required to pass level
  setNeedToKill: function() {
    switch (true) {
      case this.level === 1:
        this.needToKill = 1;
        break;
      case this.level === 2:
        this.needToKill = 3;
        break;
      case this.level === 3:
        this.needToKill = 6;
        break;
      case this.level === 4:
        this.needToKill = 10;
        break;
      case this.level === 5:
        this.needToKill = 14;
        break;
      case this.level === 6:
        this.needToKill = 18;
        break;
      case this.level === 7:
        this.needToKill = 22;  //up to correct count
        break;
      case this.level === 8:
        this.needToKill = 22;
        break;
      case this.level === 9:
        this.needToKill = 22;
        break;
      case this.level === 10:
        this.needToKill = 22;
        break;
    };
  }
};


//Defining backgroundMap canvas
var backgroundMap = document.getElementById('background-map');
var ctxBackgroundMap = backgroundMap.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/overworld_map.png';
var backgroundWinImage = new Image();
backgroundWinImage.src = 'images/castle.png';
backgroundMap.width = 512;
backgroundMap.height = 352;


//Random starting x and y points for map
var xMapStart = function(spriteWidth) {
  return (Math.floor(Math.random() * 16)) * 256;
};
var yMapStart = function(spriteHeight) {
  return (Math.floor(Math.random() * 8)) * 176;
};


var background = {
  image: backgroundImage,
  winImage: backgroundWinImage,
  xFrame: xMapStart(),  //x axis start of current map frame (from src img)
  yFrame: yMapStart(),  //y axis start of current map frame (from src img)
  moveSpeed: 4,  //speed at which map moves frames
  mapCounter: 0,  //count map frame slides for map move function
  pngWidth: 256,  //map frame width from src img
  pngHeight: 176,  //map frame height from src img
  mapWidth: backgroundMap.width,  //how wide the background will be on canvas
  mapHeight: backgroundMap.height,  //how tall the background will be on canvas
  moveMapFrameAnimation: null,
  mapMoving: false,  //tracks if map is moving
  moveMapUp: false,  //turns on map moving up
  moveMapDown: false,  //turns on map moving down
  moveMapLeft: false,  //turns on map moving left
  moveMapRight: false,  //turns on map moving right

  moveMapFrameUpStart: function() {
      link.yMove += (background.moveSpeed * 1.25);
      background.yFrame -= (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameUpStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapUp = false;
    link.yMove = backgroundMap.height - link.spriteHeight;
    game.level += 1;
    game.setNeedToKill();
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameDownStart: function() {
      link.yMove -= (background.moveSpeed * 1.25);
      background.yFrame += (background.moveSpeed * 0.6875);
      background.mapCounter++
    },

  moveMapFrameDownStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapDown = false;
    link.yMove = 0;
    game.level += 1;
    game.setNeedToKill();
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameLeftStart: function() {
    link.xMove += (background.moveSpeed * 1.85);
    background.xFrame -= background.moveSpeed;
    background.mapCounter++
    },

  moveMapFrameLeftStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapLeft = false;
    link.xMove = backgroundMap.width - link.spriteWidth;
    game.level += 1;
    game.setNeedToKill();
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  },

  moveMapFrameRightStart: function() {
    link.xMove -= (background.moveSpeed * 1.85);
    background.xFrame += background.moveSpeed;
    background.mapCounter++
  },

  moveMapFrameRightStop: function() {
    background.mapCounter = 0;
    background.mapMoving = false;
    background.moveMapRight = false;
    link.xMove = 0;
    game.level += 1;
    game.setNeedToKill();
    allEnemies.forEach(function(baddy) {
      if (baddy !== moblin && baddy.dead && game.level >= baddy.levelShowUp) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      } else if (baddy === moblin && baddy.dead && game.level >= baddy.levelShowUp && game.level % 5 === 0) {
        baddy.dead = false;
        baddy.life = baddy.maxLife;
      };
    });
    if (link.life <= 3) {
      heart.show = true;
    };
    if (link.life <= 1 || game.level >= 10 && game.level % 5 === 0) {
      bigHeart.show = true;
    };
  }
};


//Defining sprite and enemy map canvas'
var explosionCanvas = document.getElementById('explosion-canvas');
var ctxExplosionCanvas = explosionCanvas.getContext('2d');
explosionCanvas.width = 512;
explosionCanvas.height = 352;

var enemyMap = document.getElementById('enemy-map');
var ctxEnemyMap = enemyMap.getContext('2d');
enemyMap.width = 512;
enemyMap.height = 352;

var deathCanvas = document.getElementById('death-canvas');
var ctxDeathCanvas = deathCanvas.getContext('2d');
deathCanvas.width = 512;
deathCanvas.height = 352;

var spriteMap = document.getElementById('sprite-map');
var ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 512;
spriteMap.height = 352;

var winCanvas = document.getElementById('win-canvas');
var ctxWinCanvas = winCanvas.getContext('2d');
winCanvas.width = 512;
winCanvas.height = 352;


//Random Number Generators
var coinFlip = function(num) {
  switch (Math.floor(Math.random() * num)) {
    case 0:
      return 0;
      break;
    case 1:
      return 1;
      break;
    case 2:
      return 2;
      break;
    case 3:
      return 3;
      break;
  }
};


//Random starting x and y points
var xStarting = function(spriteWidth) {
  return Math.floor(Math.random() * (510 - spriteWidth));
};
var yStarting = function(spriteHeight) {
  return Math.floor(Math.random() * (350 - spriteHeight));
};


//Define character images
var explosionPng = new Image();
explosionPng.src = 'images/explosion-death.png';

var bossExplosionPng = new Image();
bossExplosionPng.src = 'images/boss-explosion.png';

var linkPng = new Image();
linkPng.src = 'images/link-spritesheet.png';

var zeldaPng = new Image();
zeldaPng.src = 'images/zelda.png';

var tektitePng = new Image();
tektitePng.src = 'images/tektite.png';

var keesePng = new Image();
keesePng.src = 'images/keese.png';

var gibdoPng = new Image();
gibdoPng.src = 'images/gibdo.png';

var stalfosPng = new Image();
stalfosPng.src = 'images/stalfos.png';

var dodongoPng = new Image();
dodongoPng.src = 'images/dodongo.png';

var armosPng = new Image();
armosPng.src = 'images/armos.png';

var wizzrobePng = new Image();
wizzrobePng.src = 'images/wizzrobe.png';

var darknutPng = new Image();
darknutPng.src = 'images/darknut.png';

var aquamentusPng = new Image();
aquamentusPng.src = 'images/aquamentus.png';

var moblinPng = new Image();
moblinPng.src = 'images/moblin.png';

var heartPng = new Image();
heartPng.src = 'images/heart.gif';

var bigHeartPng = new Image();
bigHeartPng.src = 'images/big-heart.png';


//Define hearts
var heart = {
  image: heartPng,
  xFrame: 57,  //x starting point of src img for sprite frame
  yFrame: 62,  //y starting point of src img for sprite frame
  pngWidth: 59,  //width of src img sprite size
  pngHeight: 59,  //height of src img sprite size
  spriteWidth: 18,  //width of sprite on canvas
  spriteHeight: 18,  //height of sprite on canvas
  x: xStarting(20),  //x value where to display heart
  y: yStarting(20),  //y value where to display heart
  show: false,
  heartAnimation: null
};

var bigHeart = {
  image: bigHeartPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 13,  //width of src img sprite size
  pngHeight: 13,  //height of src img sprite size
  spriteWidth: 30,  //width of sprite on canvas
  spriteHeight: 30,  //height of sprite on canvas
  x: xStarting(80),  //x value where to display heart
  y: yStarting(80),  //y value where to display heart
  show: false,
  heartAnimation: null
};


//Define enemies

//spider creature, jumps up to 3 spaces, slowly and randomly
//worth 1 point || strength 0.5 || max life 1
//level 1+
var tektite = {
  image: tektitePng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 15,  //height of src img sprite size
  spriteWidth: 37.5,  //width of sprite on canvas
  spriteHeight: 40,  //height of sprite on canvas
  xMove: xStarting(40),  //x point of tektite on canvas
  yMove: yStarting(45),  //y point of tektite on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1, 2, 3], //possible spaces moved
  type: 'random',  //what type of enemy
  life: 1,  //how much current life
  maxLife: 1,  //how much starting life is
  strength: 0.5,  //how much life taken per hit to link
  dead: false,  //tracks if dead or not
  points: 1,  //how many points killing tektite is worth
  levelShowUp: 1,  //first level seen

  moveTektite: function() {
    //Moves if coinFlip is 1
    if (coinFlip(55) === 0) {
      var tektiteJump = coinFlip(4);
      if (tektiteJump === 0) {  //for negative x movement
        if (this.xMove >= 64) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove >= 48) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove >= 32) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 1) {  //for positive x movement
        if (this.xMove <= 432) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.xMove <= 448) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.xMove <= 464) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 2) {  //for negative y movement
        if (this.yMove >= 64) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove >= 48) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove >= 32) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (tektiteJump === 3) {  //for positive y movement
        if (this.yMove <= 272) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(4)];
        } else if (this.yMove <= 288) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(3)];
        } else if (this.yMove <= 304) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  }
};


//bat creature, moves 1 space, normal speed and randomly
//worth 1 point || strength 0.5 || max life 1
// level 2+
var keese = {
  image: keesePng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 10,  //height of src img sprite size
  spriteWidth: 36,  //width of sprite on canvas
  spriteHeight: 22.5,  //height of sprite on canvas
  xMove: xStarting(40),  //x point of keese on canvas
  yMove: yStarting(45),  //y point of keese on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1], //possible spaces moved
  type: 'random',  //what type of enemy
  life: 0,  //how much current life
  maxLife: 1,  //how much starting life
  strength: 0.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing keese is worth
  levelShowUp: 2,  //first level seen

  moveKeese: function() {
    //Moves if coinFlip is 1
    if (coinFlip(20) === 0) {
      var keeseJump = coinFlip(4);
      if (keeseJump === 0) {  //for negative x movement
        if (this.xMove >= 32) {
          this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 1) {  //for positive x movement
        if (this.xMove <= 464) {
          this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 2) {  //for negative y movement
        if (this.yMove >= 32) {
          this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      } else if (keeseJump === 3) {  //for positive y movement
        if (this.yMove <= 304) {
          this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
        };
      };
    };
  }
};


//mummy creature, moves 1px frequently, somewhat slow and towards link
//worth 1 point || strength 1 || max life 2
//level 3+
var gibdo = {
  image: gibdoPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 43,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of gibdo on canvas
  yMove: yStarting(50),  //y point of gibdo on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.75, //number of px to move
  numberOfSpaces: [0, 1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing gibdo is worth
  levelShowUp: 3,  //first level seen

  moveGibdo: function() {
    //Moves on coinFlip
    if (coinFlip(2) === 0) {
      if (this.xMove - link.xMove >= 0) {
        this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.xMove - link.xMove < 0) {
        this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.yMove - link.yMove >= 0) {
        this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      } else if (this.yMove - link.yMove < 0) {
        this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(2)];
      };
    };
  }
};


//skeleton creature, moves quickly towards link
//worth 1 point || strength 1.5 || max life 2
// level 4+
var stalfos = {
  image: stalfosPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 43,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of stalfos on canvas
  yMove: yStarting(50),  //y point of stalfos on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 2, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing stalfos is worth
  levelShowUp: 4,  //first level seen

  moveStalfos: function() {
    //Moves if coinFlip is 1
    if (coinFlip(2) === 0) {
      if (this.xMove - link.xMove >= 0) {
        this.xMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.xMove - link.xMove < 0) {
        this.xMove += this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      }
    } else if (coinFlip(2) === 1) {
      if (this.yMove - link.yMove >= 0) {
        this.yMove -= this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      } else if (this.yMove - link.yMove < 0) {
        this.yMove += this.moveSpeed * this.numberOfSpaces[coinFlip(1)];
      };
    };
  }
};


//dinosaur creature, moves normal across the screen, L to R
//worth 2 points || strength 2.5 || max life 3
// level 5+
var dodongo = {
  image: dodongoPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 32,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 90,  //width of sprite on canvas
  spriteHeight: 45,  //height of sprite on canvas
  xMove: -100,  //x point of dodongo on canvas
  yMove: yStarting(50),  //y point of dodongo on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 0.9, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'xRightRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 3,  //how much starting life
  strength: 2.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 2,  //how many points killing dodongo is worth
  levelShowUp: 5,  //first level seen

  moveDodongo: function() {
    this.xMove += this.moveSpeed;
  }
};


//statue knight creature, stands still until link is near then moves towards
//worth 2 points || strength 2 || max life 2
// level 6+
var armos = {
  image: armosPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 47,  //width of sprite on canvas
  spriteHeight: 47,  //height of sprite on canvas
  xMove: xStarting(80),  //x point of armos on canvas
  yMove: yStarting(70),  //y point of armos on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.2, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'smart',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 2,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 3,  //how many points killing armos is worth
  levelShowUp: 6,  //first level seen

  moveArmos: function() {
    //stands still until link is close, then charges link
    var lx = link.xMove;
    var ly = link.yMove;
    var tx = this.xMove;
    var ty = this.yMove;
    if (lx - tx > 0 && lx - tx < 115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down right
      this.xMove += this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else if (lx - tx > 0 && lx - tx < 115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally up right
      this.xMove += this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty < 0 && ly - ty > -115) {
      //diagonally top left
      this.xMove -= this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -115 && ly - ty > 0 && ly - ty < 115) {
      //diagonally down left
      this.xMove -= this.moveSpeed;
      this.yMove += this.moveSpeed;
    };
  }
};


//scared wizard creature, runs away from link
//worth 1 point || strength 1 || max life 2
//leve 7+
var wizzrobe = {
  image: wizzrobePng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 15,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 40.3125,  //width of sprite on canvas
  spriteHeight: 43,  //height of sprite on canvas
  xMove: xStarting(45),  //x point of wizzrobe on canvas
  yMove: yStarting(45),  //y point of wizzrobe on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'scared',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 1,  //how many points killing wizzrobe is worth
  levelShowUp: 7,  //first level seen

  moveWizzrobe: function() {
    //move diagonally bottom right
    if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove >= 0) {
      if (this.xMove < 445 && this.yMove < 285) {
        this.xMove += this.moveSpeed;
        this.yMove += this.moveSpeed;
      } else if (this.xMove >= 445 && this.yMove < 285) {
        this.yMove += this.moveSpeed;
      } else if (this.xMove < 445 && this.yMove >= 285) {
        this.xMove += this.moveSpeed;
      } else if (this.xMove >= 445 && this.yMove >= 285) {
        this.xMove = 230;
        this.yMove = 140;
      };
      //move diagonally top right
    } else if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove <= 0) {
      if (this.xMove < 445 && this.yMove > 0) {
        this.xMove += this.moveSpeed;
        this.yMove -= this.moveSpeed;
      } else if (this.xMove >= 445 && this.yMove > 0) {
        this.yMove -= this.moveSpeed;
      } else if (this.xMove < 445 && this.yMove <= 0) {
        this.xMove += this.moveSpeed;
      } else if (this.xMove >= 445 && this.yMove <= 0) {
        this.xMove = 230;
        this.yMove = 140;
      };
      //move diagonally top left
    } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove <= 0) {
      if (this.xMove > 0 && this.yMove > 0) {
        this.xMove -= this.moveSpeed;
        this.yMove -= this.moveSpeed;
      } else if (this.xMove <= 0 && this.yMove > 0) {
        this.yMove -= this.moveSpeed;
      } else if (this.xMove > 0 && this.yMove <= 0) {
        this.xMove -= this.moveSpeed;
      } else if (this.xMove <= 0 && this.yMove <= 0) {
        this.xMove = 230;
        this.yMove = 140;
      };
      //move diagonally bottom left
    } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove >= 0) {
      if (this.xMove > 0 && this.yMove < 285) {
        this.xMove -= this.moveSpeed;
        this.yMove += this.moveSpeed;
      } else if (this.xMove <= 0 && this.yMove < 285) {
        this.yMove += this.moveSpeed;
      } else if (this.xMove > 0 && this.yMove >= 285) {
        this.xMove -= this.moveSpeed;
      } else if (this.xMove <= 0 && this.yMove >= 285) {
        this.xMove = 230;
        this.yMove = 140;
      }
    };
  }
};


//knight creature rushes down screen like dodongo but faster or randomly after enemy dies
//worth 3 points || strength 2.5 || max life 1
// level 8+
var darknut = {
  image: darknutPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 45,  //width of sprite on canvas
  spriteHeight: 45,  //height of sprite on canvas
  xMove: xStarting(50),  //x point of darknut on canvas
  yMove: -60,  //y point of darknut on canvas
  xCenter: 23,  //x center of hit box
  yCenter: 23,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.6, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'yRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 1,  //how much starting life
  strength: 2.5,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 4,  //how many points killing darknut is worth
  levelShowUp: 8,  //first level seen

  moveDarknut: function() {
    this.yMove += this.moveSpeed;
  }
};


//loch ness monster creature, rush across screen R to L, goes towards link if hes near
//worth 3 points || strength 2 || max life 2
// level 9+
var aquamentus = {
  image: aquamentusPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 24,  //width of src img sprite size
  pngHeight: 32,  //height of src img sprite size
  spriteWidth: 41.25,  //width of sprite on canvas
  spriteHeight: 55,  //height of sprite on canvas
  xMove: 555,  //x point of aquamentus on canvas
  yMove: yStarting(60),  //y point of aquamentus on canvas
  xCenter: 19,  //x center of hit box
  yCenter: 25,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 1.15, //number of px to move
  numberOfSpaces: [1], //possible spaces moved
  type: 'xLeftRunner',  //what type of enemy
  life: 0,  //how much life
  maxLife: 2,  //how much starting life
  strength: 2,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 3,  //how many points killing aquamentus is worth
  levelShowUp: 9,  //first level seen

  moveAquamentus: function() {
    //charges link if close, otherwise charges left
    var lx = link.xMove;
    var ly = link.yMove;
    var tx = this.xMove;
    var ty = this.yMove;
    if (lx - tx > 0 && lx - tx < 100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down right
      this.xMove += this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else if (lx - tx > 0 && lx - tx < 100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally up right
      this.xMove += this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty < 0 && ly - ty > -100) {
      //diagonally top left
      this.xMove -= this.moveSpeed;
      this.yMove -= this.moveSpeed;
    } else if (lx - tx < 0 && lx - tx > -100 && ly - ty > 0 && ly - ty < 100) {
      //diagonally down left
      this.xMove -= this.moveSpeed;
      this.yMove += this.moveSpeed;
    } else {
      this.xMove -= this.moveSpeed;
    };
  }
};


//boss - goblin type creature, 3 stages 1) circle, 2) runner, 3) scared
//worth 5 points || strength 1 || max life 6
//level 10
var moblin = {
  image: moblinPng,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 65,  //width of sprite on canvas
  spriteHeight: 65,  //height of sprite on canvas
  xMove: xStarting(70),  //x point of moblin on canvas
  yMove: yStarting(70),  //y point of moblin on canvas
  xCenter: 35,  //x center of hit box
  yCenter: 35,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 2.1, //number of px to move
  cycleOne: 11,  //cycle of movement for stage one
  cycleTwo: 11,  //cycle of movement for stage two
  numberOfSpaces: [1], //possible spaces moved
  type: 'boss',  //what type of enemy
  life: 0,  //how much life
  maxLife: 6,  //how much starting life
  strength: 1,  //how much life taken per hit to link
  dead: true,  //tracks if dead or not
  points: 5,  //how many points killing moblin is worth
  levelShowUp: 10,  //first level seen

  moveMoblin: function() {
    if (this.life > 4) {  //Stage One
      this.moveSpeed = 2.1;
      if (this.cycleOne === 11) {  //Move R
        if (this.xMove < 447) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 447) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 12) {  //Move slightly back L
        if (this.xMove > 400) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 400) {
          this.cycleOne = 21;
        };
      } else if (this.cycleOne === 21) {  //Move Up
        if (this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= 0) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 22) {  //Move slightly back down
        if (this.yMove < 75) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 75) {
          this.cycleOne = 31;
        };
      } else if (this.cycleOne === 31) {  //Move Left
        if (this.xMove > 0) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 32) {  //Move slightly back right
        if (this.xMove < 115) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 115) {
          this.cycleOne = 41;
        };
      } else if (this.cycleOne === 41) {  //Move down
        if (this.yMove < 287) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 287) {
          this.cycleOne++;
        };
      } else if (this.cycleOne === 42) {  //Move slight back up
        if (this.yMove > 200) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= 200) {
          this.cycleOne = 11;
        };
      };
    } else if (this.life > 2) {  //Stage Two
      this.moveSpeed = 2;
      if (this.cycleTwo === 11) {  //Top to Bottom
        if (this.yMove < 430) {
          this.yMove += this.moveSpeed;
        } else if (this.yMove >= 430) {
          this.xMove = -80;
          this.yMove = 110;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 12) {  //L to R
        if (this.xMove < 590) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 590) {
          this.xMove = 150;
          this.yMove = 365;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 13) {  //Bottom to Top
        if (this.yMove > -80) {
          this.yMove -= this.moveSpeed;
        } else if (this.yMove <= -80) {
          this.xMove = 590;
          this.yMove = 240;
          this.cycleTwo++;
        };
      } else if (this.cycleTwo === 14) {  //R to L
        if (this.xMove > -80) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= -80) {
          this.xMove = 350;
          this.yMove = -80;
          this.cycleTwo = 11;
        };
      };
    } else if (this.life > 0) {   //Stage Three
      this.moveSpeed = 1.2;
        //move diagonally bottom right
      if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove >= 0) {
        if (this.xMove < 445 && this.yMove < 285) {
          this.xMove += this.moveSpeed;
          this.yMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove < 285) {
          this.yMove += this.moveSpeed;
        } else if (this.xMove < 445 && this.yMove >= 285) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove >= 285) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally top right
      } else if (this.xMove - link.xMove >= 0 && this.yMove - link.yMove <= 0) {
        if (this.xMove < 445 && this.yMove > 0) {
          this.xMove += this.moveSpeed;
          this.yMove -= this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.xMove < 445 && this.yMove <= 0) {
          this.xMove += this.moveSpeed;
        } else if (this.xMove >= 445 && this.yMove <= 0) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally top left
      } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove <= 0) {
        if (this.xMove > 0 && this.yMove > 0) {
          this.xMove -= this.moveSpeed;
          this.yMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove > 0) {
          this.yMove -= this.moveSpeed;
        } else if (this.xMove > 0 && this.yMove <= 0) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove <= 0) {
          this.xMove = 230;
          this.yMove = 140;
        };
        //move diagonally bottom left
      } else if (this.xMove - link.xMove <= 0 && this.yMove - link.yMove >= 0) {
        if (this.xMove > 0 && this.yMove < 285) {
          this.xMove -= this.moveSpeed;
          this.yMove += this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove < 285) {
          this.yMove += this.moveSpeed;
        } else if (this.xMove > 0 && this.yMove >= 285) {
          this.xMove -= this.moveSpeed;
        } else if (this.xMove <= 0 && this.yMove >= 285) {
          this.xMove = 230;
          this.yMove = 140;
        }
      };
    } else if (this.life <= 0 && !game.continuous) {
      game.win
    };
  }
};


//rest xRightRunner offscreen enemies
var xRightResetOffscreenEnemies = function (enemy) {
  enemy.xMove = -100;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest xLeftRunner offscreen enemies
var xLeftResetOffscreenEnemies = function (enemy) {
  enemy.xMove = 555;
  enemy.yMove = yStarting(enemy.spriteHeight);
};

//rest y offscreen enemies
var yResetOffscreenEnemies = function (enemy) {
  enemy.xMove = xStarting(enemy.spriteWidth);
  enemy.yMove = -60;
};


//All enemies array
var allEnemies = [tektite, keese, gibdo, stalfos, dodongo, armos, wizzrobe, darknut, aquamentus, moblin];

var liveEnemies = [];
var areEnemiesDead = null;

//Define player
//Player, aka Link
var link = {
  image: linkPng,  //src image
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  upFrame: 0,  //placeholder for frame iteration
  downFrame: 0,  //placeholder for frame iteration
  leftFrame: 0,  //placeholder for frame iteration
  rightFrame: 0,  //placeholder for frame iteration
  pngWidth: 15,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  spriteWidth: 31.875,  //width of sprite on canvas
  spriteHeight: 34,  //height of sprite on canvas
  xMove: xStarting(32),  //x point of link on canvas
  yMove: yStarting(35),  //y point of link on canvas
  moveSpeed: 3,  //number of px moved per interval
  frameSpeed: 14,  //number to calculate frame switch rate
  isMoving: false, //tracks to see if moving
  isMovingUp: false, //tracks to see if moving up
  isMovingDown: false, //tracks to see if moving down
  isMovingLeft: false, //tracks to see if moving left
  isMovingRight: false, //tracks to see if moving right
  isAttacking: false, //tracks to see if attacking
  attackTime: null,  //tracks time link attacked
  hitTime: null,  //tracks time link was hit
  heartTime: null,  //tracks time when link picked up heart
  life: 4,  //how much life left
  maxLife: 4,  //max life
  invincible: false,  //checks for invincibility
  moveUpAnimation: null,  //function for down movement
  moveDownAnimation: null,  //function for up movement
  moveLeftAnimation: null,  //function for left movement
  moveRightAnimation: null,  //function for right movement
  upMapMove: 0, //y px where link causes map to move up
  downMapMove: backgroundMap.height - 34, //y px where link causes map to move down
  leftMapMove: 0, //x px where link causes map to move left
  rightMapMove: backgroundMap.width - 32, //x px where link causes map to move right

  linkAttack: function() {
    link.attackTime = Date.now();
  },

  linkHit: function() {
    link.hitTime = Date.now();
  },

  grabHeart: function() {
    link.heartTime = Date.now();
  },

  //heart gif functionality
  heartGifArray: [$('#heart-one'), $('#heart-two'), $('#heart-three'), $('#heart-four')],  //heart gif icons

  heartDisplay: function() {
    if (link.life === link.maxLife) {
      for (var i = 0; i < link.heartGifArray.length; i ++) {
        if (link.heartGifArray[i].hasClass('heart-hidden')) {
          link.heartGifArray[i].removeClass('damaged');
          link.heartGifArray[i].removeClass('heart-hidden');
          link.heartGifArray[i].addClass('heart-show');
        };
      };
    } else if (link.life === link.maxLife - 0.5) {
      $('#heart-one').addClass('damaged');
    } else if (link.life === link.maxLife - 1) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
    } else if (link.life === link.maxLife - 1.5) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
    } else if (link.life === link.maxLife - 2) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
      $('#heart-two').addClass('heart-hidden');
    } else if (link.life === link.maxLife - 2.5) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
      $('#heart-two').addClass('heart-hidden');
      $('#heart-three').addClass('damaged');
    } else if (link.life === link.maxLife - 3) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
      $('#heart-two').addClass('heart-hidden');
      $('#heart-three').addClass('damaged');
      $('#heart-three').addClass('heart-hidden');
    } else if (link.life === link.maxLife - 3.5) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
      $('#heart-two').addClass('heart-hidden');
      $('#heart-three').addClass('damaged');
      $('#heart-three').addClass('heart-hidden');
      $('#heart-four').addClass('damaged');
    } else if (link.life <= 0) {
      $('#heart-one').addClass('damaged');
      $('#heart-one').addClass('heart-hidden');
      $('#heart-two').addClass('damaged');
      $('#heart-two').addClass('heart-hidden');
      $('#heart-three').addClass('damaged');
      $('#heart-three').addClass('heart-hidden');
      $('#heart-four').addClass('damaged');
      $('#heart-four').addClass('heart-hidden');
    }
  },

  moveUp: function() {
    if (link.yMove <= link.upMapMove && game.score >= game.needToKill && background.yFrame > 0 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapUp = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.yMove >= 0) {
      link.yMove -= link.moveSpeed;
      link.xFrame = 61;
      link.yFrame = 0;
      if (link.upFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.upFrame++;
      } else if(link.upFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.upFrame++;
      } else {
        link.upFrame = 0;
      };
    };
  },

  moveDown: function() {
    if (link.yMove >= link.downMapMove && game.score >= game.needToKill && background.yFrame < 1232 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapDown = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.yMove <= 317) {
      link.yMove += link.moveSpeed;
      link.xFrame = 0;
      link.yFrame = 0;
      if (link.downFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.downFrame++;
      } else if(link.downFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.downFrame++;
      } else {
        link.downFrame = 0;
      };
    };
  },

  moveLeft: function() {
    if (link.xMove <= link.leftMapMove && game.score >= game.needToKill && background.xFrame > 0 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapLeft = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.xMove >= 0) {
      link.xMove -= link.moveSpeed;
      link.xFrame = 29;
      link.yFrame = 30;
      if (link.leftFrame < (link.frameSpeed * .5)) {
        link.yFrame = 0;
        link.leftFrame++;
      } else if(link.leftFrame <= link.frameSpeed) {
        link.yFrame = 30;
        link.leftFrame++;
      } else {
        link.leftFrame = 0;
      };
    };
  },

  moveRight: function() {
    if (link.xMove >= link.rightMapMove && game.score >= game.needToKill && background.xFrame < 3840 && areEnemiesDead()) {
      background.mapMoving = true;
      background.moveMapRight = true;
      ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    } else if (!background.mapMoving && link.xMove <= 479) {
      link.xMove += link.moveSpeed;
      link.xFrame = 90;
      link.yFrame = 0;
      if (link.rightFrame < (link.frameSpeed / 2)) {
        link.yFrame = 30;
        link.rightFrame++;
      } else if(link.rightFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.rightFrame++;
      } else {
        link.rightFrame = 0;
      };
    };
  },

  //Player keyboard actions
  playerAction: function(event) {
    //Up
    if (event.keyCode === 38 && !game.over && !game.win) {
      if (!link.isMovingUp && !link.isMoving && !link.isAttacking && link.yMove >= 1) {
          link.isMovingUp = true;
          link.isMoving = true;
        };
    }
    //Down
    if (event.keyCode === 40 && !game.over && !game.win) {
      if (!link.isMovingDown && !link.isMoving && !link.isAttacking && link.yMove <= 317) {
          link.isMovingDown = true;
          link.isMoving = true;
        };
    }
    //Left
    if (event.keyCode === 37 && !game.over && !game.win) {
      if (!link.isMovingLeft && !link.isMoving && !link.isAttacking && link.xMove >= 0) {
          link.isMovingLeft = true;
          link.isMoving = true;
        };
    }
    //Right
    if (event.keyCode === 39 && !game.over && !game.win) {
      if (!link.isMovingRight && !link.isMoving && !link.isAttacking && link.xMove <= 479) {
          link.isMovingRight = true;
          link.isMoving = true;
        };
    }
    //Spacebar
    if (event.keyCode === 32 && !game.over && !game.win) {
      switch(true) {
        //if facing up
        case link.xFrame === 61:
          link.xFrame = 60;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.yMove -= 29;
          link.isMovingUp = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 16;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.yMove += 3;
          link.isMovingDown = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing left
        case link.xFrame === 29:
          link.xFrame = 24;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.xMove -= 30;
          link.isMovingLeft = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing right
        case link.xFrame === 90:
          link.xFrame = 84;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.xMove += 6;
          link.isMovingRight = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
      };
    };
  },

  actionStop: function(event) {
    //Stop moving up
    if(event.keyCode === 38 && !game.over && !game.win) {
      link.isMovingUp = false;
      link.isMoving = false;
      link.yFrame = 30;
    };
    //Stop moving down
    if(event.keyCode === 40 && !game.over && !game.win) {
      link.isMovingDown = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving left
    if(event.keyCode === 37 && !game.over && !game.win) {
      link.isMovingLeft = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving right
    if(event.keyCode === 39 && !game.over && !game.win) {
      link.isMovingRight = false;
      link.isMoving = false;
      link.yFrame = 31;
    };
    //Stop attacking
    if (event.keyCode === 32 && !game.over && !game.win) {
      switch(true) {
        //if facing up
        case link.xFrame === 60:
          link.xFrame = 61;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 30;
          link.yMove += 29;
          link.isAttacking = false;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 15;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 0;
          link.yMove -= 3;
          link.isAttacking = false;
          break;
          //if facing left
        case link.xFrame === 24:
          link.xFrame = 29;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 0;
          link.xMove += 30;
          link.isAttacking = false;
          break;
          link.yFrame = 100;
          //if facing right
        case link.xFrame === 84:
          link.xFrame = 90;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 31;
          link.xMove -= 6;
          link.isAttacking = false;
          break;
      };
    };
  },

  touchUp: function() {
    if (!game.over && !game.win) {
      if (!link.isMovingUp && !link.isMoving && !link.isAttacking && link.yMove >= 1) {
          link.isMovingUp = true;
          link.isMoving = true;
      };
    }
  },

  touchDown: function() {
    if (!game.over && !game.win) {
      if (!link.isMovingDown && !link.isMoving && !link.isAttacking && link.yMove <= 317) {
          link.isMovingDown = true;
          link.isMoving = true;
        };
    }
  },

  touchLeft: function() {
    if (!game.over && !game.win) {
      if (!link.isMovingLeft && !link.isMoving && !link.isAttacking && link.xMove >= 0) {
          link.isMovingLeft = true;
          link.isMoving = true;
        };
    }
  },

  touchRight: function() {
    if (!game.over && !game.win) {
      if (!link.isMovingRight && !link.isMoving && !link.isAttacking && link.xMove <= 479) {
          link.isMovingRight = true;
          link.isMoving = true;
        };
    }
  },

  touchAttack: function() {
    if (!game.over && !game.win) {
      switch(true) {
        //if facing up
        case link.xFrame === 61:
          link.xFrame = 60;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.yMove -= 29;
          link.isMovingUp = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 16;
          link.pngHeight = 28;
          link.spriteHeight = 59.5;
          link.yFrame = 84;
          link.yMove += 3;
          link.isMovingDown = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing left
        case link.xFrame === 29:
          link.xFrame = 24;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.xMove -= 30;
          link.isMovingLeft = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
          //if facing right
        case link.xFrame === 90:
          link.xFrame = 84;
          link.pngWidth = 28;
          link.spriteWidth = 59.5;
          link.yFrame = 90;
          link.xMove += 6;
          link.isMovingRight = false;
          link.isMoving = false;
          link.isAttacking = true;
          break;
      };
    };
  },

  touchUpStop: function() {
    if(!game.over && !game.win) {
      link.isMovingUp = false;
      link.isMoving = false;
      link.yFrame = 30;
    };
  },

  touchDownStop: function() {
    if(!game.over && !game.win) {
      link.isMovingDown = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
  },

  touchLeftStop: function() {
    if(!game.over && !game.win) {
      link.isMovingLeft = false;
      link.isMoving = false;
      link.yFrame = 0;
    };
  },

  touchRightStop: function() {
    if(!game.over && !game.win) {
      link.isMovingRight = false;
      link.isMoving = false;
      link.yFrame = 31;
    };
  },

  touchAttackStop: function() {
    if (!game.over && !game.win) {
      switch(true) {
        //if facing up
        case link.xFrame === 60:
          link.xFrame = 61;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 30;
          link.yMove += 29;
          link.isAttacking = false;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 15;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 0;
          link.yMove -= 3;
          link.isAttacking = false;
          break;
          //if facing left
        case link.xFrame === 24:
          link.xFrame = 29;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 0;
          link.xMove += 30;
          link.isAttacking = false;
          break;
          link.yFrame = 100;
          //if facing right
        case link.xFrame === 84:
          link.xFrame = 90;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 31;
          link.xMove -= 6;
          link.isAttacking = false;
          break;
      };
    };
  }
};


//Collision Detection between Link and enemies
var enemyCollisionDetection = function(x1, y1, x2, y2, enemy) {
  if (!link.isAttacking && ((game.now - link.hitTime) / 1000) > 1.25 && enemy.life > 0) {
    var xDistance = x2 - x1;
    var yDistance = y2 - (y1 - 4);
    var hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33 && !link.invincible) {
      link.linkHit();
      link.life -= enemy.strength;
      var heartLose = new Audio('heart-lose.wav');
      if (game.soundFx) {
        heartLose.play();
      };
      link.heartDisplay();
    };
  } else if (link.isAttacking && ((game.now - link.attackTime) / 1000) > .2 && enemy.life > 0) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    var hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    var xRightAttack = x1 + 20;
    var xDistanceRight = x2 - xRightAttack;
    var hitRadiusRight = Math.abs(Math.sqrt(Math.pow(xDistanceRight, 2) + Math.pow(yDistance, 2)));
    var yDownAttack = y1 + 18;
    var yDistanceDown = y2 - yDownAttack;
    var hitRadiusDown = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistanceDown, 2)));
    if (hitRadius <= 32 || hitRadiusRight <= 32 || hitRadiusDown <= 32) {
      link.linkAttack();
      enemy.life -= 1;
      var hitEnemy = new Audio('hit-enemy.wav');
      if (!enemy.dead && game.soundFx) {
        hitEnemy.play()
      };
      if (enemy.life === 0) {
        enemy.dead = true;
        if (game.soundFx && enemy.type !== 'boss') {
          var enemyExplosion = new Audio('enemy-explosion.mp3');
          enemyExplosion.play();
        } else if (enemy.type === 'boss') {
          var horn = new Audio('horn.mp3');
          horn.play();
        };
      };
      if (enemy.dead) {
        if (enemy.type !== 'boss') {
          ctxExplosionCanvas.drawImage(explosionPng, 40, 10, 280, 285, enemy.xMove, enemy.yMove, 60, 60);
        } else if (enemy.type === 'boss') {
          ctxExplosionCanvas.drawImage(bossExplosionPng, 0, 0, 958, 952, moblin.xMove, moblin.yMove, 80, 80);
        };
        if (enemy.type !== 'xRightRunner' && enemy.type !== 'xLeftRunner' && enemy.type !== 'yRunner') {
          enemy.xMove = xStarting(enemy.spriteWidth);
          enemy.yMove = yStarting(enemy.spriteHeight);
        } else if (enemy.type === 'xRightRunner') {
          xRightResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'xLeftRunner') {
          xLeftResetOffscreenEnemies(enemy);
        } else if (enemy.type === 'yRunner') {
          yResetOffscreenEnemies(enemy);
        };
        game.score += enemy.points;
      };
    };
  };
};


//Collision detection between Link and objects
var heartCollisionDetection = function(x1, y1, x2, y2, object) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;
  var crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && link.life <= 3.5 && object.show === true) {
    object.show = false;
    var heartGain = new Audio('heart-gain.mp3');
    var bigHeartGain = new Audio('big-heart-gain.wav');
    if (object === bigHeart) {
      if (game.soundFx) {
        bigHeartGain.play();
      };
      object.x = xStarting(object.spriteWidth);
      object.y = yStarting(object.spriteHeight);
      if (link.life <= 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
        $('#heart-one').removeClass('damaged');
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').addClass('heart-show');
        $('#heart-two').removeClass('damaged');
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').addClass('heart-show');
        $('#heart-three').removeClass('damaged');
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').addClass('heart-show');
        $('#heart-four').removeClass('damaged');
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life = link.maxLife;
        $('#heart-four').removeClass('damaged');
      };
    } else if (object === heart) {
      if (game.soundFx) {
        heartGain.play();
      };
      object.x = xStarting(object.spriteWidth);
      object.y = yStarting(object.spriteHeight);
      if (link.life === 0.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-four').removeClass('damaged');
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').addClass('heart-show');
      } else if (link.life === 1 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-three').removeClass('heart-hidden');
        $('#heart-three').removeClass('damaged');
        $('#heart-three').addClass('heart-show');
      } else if (link.life === 1.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-three').removeClass('damaged');
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').addClass('heart-show');
      } else if (link.life === 2 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-two').removeClass('heart-hidden');
        $('#heart-two').removeClass('damaged');
        $('#heart-two').addClass('heart-show');
      } else if (link.life === 2.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-two').removeClass('damaged');
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').addClass('heart-show');
      } else if (link.life === 3 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 1;
        $('#heart-one').removeClass('heart-hidden');
        $('#heart-one').removeClass('damaged');
        $('#heart-one').addClass('heart-show');
      } else if (link.life === 3.5 && ((game.now - link.heartTime) / 1000) > 1) {
        link.grabHeart();
        link.life += 0.5;
        $('#heart-one').removeClass('damaged');
      };
    };
  };
};


var startGameButton = $('#start-game');


//Game over functions
  //link death spin
var linkDies = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);
  if (link.xFrame === 0 && link.yFrame === 0) {
    link.xFrame = 90;
    link.yFrame = 30;
  } else if (link.xFrame === 90 && link.yFrame === 30) {
    link.xFrame = 61;
    link.yFrame = 0;
  } else if (link.xFrame === 61 && link.yFrame === 0) {
    link.xFrame = 29;
    link.yFrame = 0;
  } else if (link.xFrame === 29 && link.yFrame === 0) {
    link.xFrame = 0;
    link.yFrame = 0;
  };
};

//game over screen with replay button
var gameOverScreen = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = '#afd433';
  ctxSpriteMap.textAlign = 'center';
  ctxSpriteMap.fillText('Game Over', 259, 180);  //game over text
};

//game over function and link explosion
var gameOver = function() {
  cancelAnimationFrame(animateGame);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  deathCanvas.style.opacity = '0.56';
  link.xFrame = 0;
  link.yFrame = 0;
  var animateLinkDeath = setInterval(linkDies, .5);
  setTimeout(function() {
    clearInterval(animateLinkDeath);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxSpriteMap.drawImage(explosionPng, 40, 10, 280, 285, link.xMove, link.yMove, 60, 60);
    var linkExplosion = new Audio('link-explosion.wav');
    if (game.soundFx) {
      linkExplosion.play();
    };
    setTimeout(function() {
      gameOverScreen();
      startGameButton.html('Replay game');
      startGameButton.css('visibility', 'visible');
    }, 1000);
  }, 2000);
};


//win game function
var winGame = function () {
  cancelAnimationFrame(animateGame);
  ctxBackgroundMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxEnemyMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
  ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.winImage, 0, 0, 1920, 1080, 0, 0, background.mapWidth, background.mapHeight);
  ctxSpriteMap.drawImage(link.image, 90, 30, link.pngWidth, link.pngHeight, 165, 200, 71.25, 76);
  ctxSpriteMap.drawImage(zeldaPng, 0, 0, 14, 16, 295, 200, 66.5, 76);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Oh, you won?', 20, 40);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('That\'s neat I guess.', 20, 70);

  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = 'black';
  ctxSpriteMap.fillText('Want a sandwich?', 20, 320);

  startGameButton.html('Replay game');
  startGameButton.css('visibility', 'visible');
};


//Animation Game Loop
var animateGame = null;

var animationLoop = function() {

  if (link.life <= 0) {
    game.over = true;
  };

  game.continuous = $('#continuous-play').prop('checked');


  if (!game.continuous && game.level >= 10 && moblin.life <= 0) {
    game.win = true;
  };

  if (!game.over && !game.win) {
    game.setGameNow();
    game.soundFx = $('#soundFx').prop('checked');


    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);
    ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

    //up map frame counter, call, and stop
    if (background.moveMapUp) {
      if (background.mapCounter < 64) {
        background.moveMapFrameUpStart();
      } else {
        background.moveMapFrameUpStop();
      };
    };

    //down map frame counter, call, and stop
    if (background.moveMapDown) {
      if (background.mapCounter < 64) {
        background.moveMapFrameDownStart();
      } else {
        background.moveMapFrameDownStop();
      };
    };

    //left map frame counter, call, and stop
    if (background.moveMapLeft) {
      if (background.mapCounter < 64) {
        background.moveMapFrameLeftStart();
      } else {
        background.moveMapFrameLeftStop();
      };
    };

    //right map frame counter, call, and stop
    if (background.moveMapRight) {
      if (background.mapCounter < 64) {
        background.moveMapFrameRightStart();
      } else {
        background.moveMapFrameRightStop();
      };
    };

    //Animates hearts
    if (heart.show) {
      ctxEnemyMap.drawImage(heart.image, heart.xFrame, heart.yFrame, heart.pngWidth, heart.pngHeight, heart.x, heart.y, heart.spriteWidth, heart.spriteHeight);
    };
    //Animates big hearts
    if (bigHeart.show) {
      ctxEnemyMap.drawImage(bigHeart.image, bigHeart.xFrame, bigHeart.yFrame, bigHeart.pngWidth, bigHeart.pngHeight, bigHeart.x, bigHeart.y, bigHeart.spriteWidth, bigHeart.spriteHeight);
    };
    //Animates tektites
    if (!tektite.dead && game.level >= tektite.levelShowUp) {
      ctxEnemyMap.drawImage(tektite.image, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);
      tektite.moveTektite();
    };

    //Animates keese
    if (!keese.dead && game.level >= keese.levelShowUp) {
      ctxEnemyMap.drawImage(keese.image, keese.xFrame, keese.yFrame, keese.pngWidth, keese.pngHeight, keese.xMove, keese.yMove, keese.spriteWidth, keese.spriteHeight);
      keese.moveKeese();
    };

    //Animates gibdo
    if (!gibdo.dead && game.level >= gibdo.levelShowUp) {
      ctxEnemyMap.drawImage(gibdo.image, gibdo.xFrame, gibdo.yFrame, gibdo.pngWidth, gibdo.pngHeight, gibdo.xMove, gibdo.yMove, gibdo.spriteWidth, gibdo.spriteHeight);
      gibdo.moveGibdo();
    };

    //Animates stalfos
    if (!stalfos.dead && game.level >= stalfos.levelShowUp) {
      ctxEnemyMap.drawImage(stalfos.image, stalfos.xFrame, stalfos.yFrame, stalfos.pngWidth, stalfos.pngHeight, stalfos.xMove, stalfos.yMove, stalfos.spriteWidth, stalfos.spriteHeight);
      stalfos.moveStalfos();
    };

    //Animates dodongo
    if (!dodongo.dead && game.level >= dodongo.levelShowUp && dodongo.xMove < 575) {
      ctxEnemyMap.drawImage(dodongo.image, dodongo.xFrame, dodongo.yFrame, dodongo.pngWidth, dodongo.pngHeight, dodongo.xMove, dodongo.yMove, dodongo.spriteWidth, dodongo.spriteHeight);
      dodongo.moveDodongo();
    };
    if (!dodongo.dead && game.level >= dodongo.levelShowUp && dodongo.xMove >= 575) {
      dodongo.dead = true;
      xRightResetOffscreenEnemies(dodongo);
    };

    //Animates armos
    if (!armos.dead && game.level >= armos.levelShowUp) {
      ctxEnemyMap.drawImage(armos.image, armos.xFrame, armos.yFrame, armos.pngWidth, armos.pngHeight, armos.xMove, armos.yMove, armos.spriteWidth, armos.spriteHeight);
      armos.moveArmos();
    };

    //Animates wizzrobe
    if (!wizzrobe.dead && game.level >= wizzrobe.levelShowUp) {
      ctxEnemyMap.drawImage(wizzrobe.image, wizzrobe.xFrame, wizzrobe.yFrame, wizzrobe.pngWidth, wizzrobe.pngHeight, wizzrobe.xMove, wizzrobe.yMove, wizzrobe.spriteWidth, wizzrobe.spriteHeight);
      wizzrobe.moveWizzrobe();
    };

    //Animates darknut
    if (!darknut.dead && game.level >= darknut.levelShowUp && darknut.yMove < 375) {
      ctxEnemyMap.drawImage(darknut.image, darknut.xFrame, darknut.yFrame, darknut.pngWidth, darknut.pngHeight, darknut.xMove, darknut.yMove, darknut.spriteWidth, darknut.spriteHeight);
      darknut.moveDarknut();
    };
    if (!darknut.dead && game.level >= darknut.levelShowUp && darknut.yMove >= 375) {
      darknut.dead = true;
      yResetOffscreenEnemies(darknut);
    };

    //Animates aquamentus
    if (!aquamentus.dead && game.level >= aquamentus.levelShowUp && aquamentus.xMove > -50) {
      ctxEnemyMap.drawImage(aquamentus.image, aquamentus.xFrame, aquamentus.yFrame, aquamentus.pngWidth, aquamentus.pngHeight, aquamentus.xMove, aquamentus.yMove, aquamentus.spriteWidth, aquamentus.spriteHeight);
      aquamentus.moveAquamentus();
    };
    if (!aquamentus.dead && game.level >= aquamentus.levelShowUp && aquamentus.xMove <= -50) {
      aquamentus.dead = true;
      xLeftResetOffscreenEnemies(aquamentus);
    };

    //Animates moblin
    if (!moblin.dead && game.level >= moblin.levelShowUp) {
      ctxEnemyMap.drawImage(moblin.image, moblin.xFrame, moblin.yFrame, moblin.pngWidth, moblin.pngHeight, moblin.xMove, moblin.yMove, moblin.spriteWidth, moblin.spriteHeight);
      moblin.moveMoblin();
    };

    //Animates link and explosion steps
    ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);
    link.invincible = $('#invincible').prop('checked');

    if (link.isMovingUp) {
      link.moveUp();
    };
    if (link.isMovingDown) {
      link.moveDown();
    };
    if (link.isMovingLeft) {
      link.moveLeft();
    };
    if (link.isMovingRight) {
      link.moveRight();
    };

  //Collision checks
    //heart
    heartCollisionDetection(link.xMove, link.yMove, heart.x, heart.y, heart);
    //big heart
    heartCollisionDetection(link.xMove, link.yMove, bigHeart.x, bigHeart.y, bigHeart);
    //tektite
    enemyCollisionDetection(link.xMove, link.yMove, tektite.xMove, tektite.yMove, tektite);
    //keese
    enemyCollisionDetection(link.xMove, link.yMove, keese.xMove, keese.yMove, keese);
    //gibdo
    enemyCollisionDetection(link.xMove, link.yMove, gibdo.xMove, gibdo.yMove, gibdo);
    //stalfos
    enemyCollisionDetection(link.xMove, link.yMove, stalfos.xMove, stalfos.yMove, stalfos);
    //dodongo
    enemyCollisionDetection(link.xMove, link.yMove, dodongo.xMove, dodongo.yMove, dodongo);
    //armos
    enemyCollisionDetection(link.xMove, link.yMove, armos.xMove, armos.yMove, armos);
    //wizzrobe
    enemyCollisionDetection(link.xMove, link.yMove, wizzrobe.xMove, wizzrobe.yMove, wizzrobe);
    //darknut
    enemyCollisionDetection(link.xMove, link.yMove, darknut.xMove, darknut.yMove, darknut);
    //aquamentus
    enemyCollisionDetection(link.xMove, link.yMove, aquamentus.xMove, aquamentus.yMove, aquamentus);
    //moblin
    enemyCollisionDetection(link.xMove, link.yMove, moblin.xMove, moblin.yMove, moblin);


    //Array of live enemies
    liveEnemies = allEnemies.filter(function(baddy) {
      return baddy.dead === false;
    });
    //true if all enemies dead; false if enemies alive
    areEnemiesDead = function() {
      return liveEnemies.length > 0 ? false : true;
    };


  //Updates score, high score, level, and kills to advance
    if (game.score > game.highScore) {
      game.highScore = game.score;
      localStorage.highScore = game.highScore;
    };
    $('#game-num').html(game.level);
    $('#score-num').html(game.score);
    $('#high-score').html(game.highScore);

    animateGame = requestAnimationFrame(animationLoop);

  } else if (game.over) {
    game.endTime = Date.now();
    gameOver();
  } else if (game.win) {
    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    setTimeout(winGame, 1500);
  };

};


//replay and restart game
var startGame = function() {
  if (game.over || game.win) {
    allEnemies.forEach(function(baddy) {
      baddy.dead = true;
      baddy.life = 0;
    });
    tektite.dead = false;
    tektite.life = tektite.maxLife;
    tektite.xMove = xStarting(tektite.spriteWidth);
    tektite.yMove = yStarting(tektite.spriteHeight);
    dodongo.xMove = -100;
    dodongo.yMove = yStarting(50);
    heart.show = false;
    link.life = link.maxLife;
    link.heartDisplay();
    link.xMove = xStarting(32);
    link.yMove = yStarting(35);
    link.xFrame = 0;
    link.yFrame = 0;
    game.win = false;
    game.over = false;
    game.level = 1;
    game.setNeedToKill();
    game.score = 0;
    background.xFrame = xMapStart();
    background.yFrame = yMapStart();
    deathCanvas.style.opacity = '0';
    ctxBackgroundMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxExplosionCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxDeathCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxWinCanvas.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    ctxSpriteMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
    backgroundMap.classList.remove('canvas-blur');
    enemyMap.classList.remove('canvas-blur');
    cancelAnimationFrame(titleScreen);
    clearInterval(randomizeTitle);
    animationLoop();
    $('#start-game').css('visibility', 'hidden');
  };
};

var randomizeTitle = setInterval(function() {
    background.xFrame = xMapStart();
    background.yFrame = yMapStart();
    tektite.xMove = xStarting(tektite.spriteWidth);
    tektite.yMove = yStarting(tektite.spriteHeight);
    keese.xMove = xStarting(keese.spriteWidth);
    keese.yMove = yStarting(keese.spriteHeight);
    gibdo.xMove = xStarting(gibdo.spriteWidth);
    gibdo.yMove = yStarting(gibdo.spriteHeight);
    stalfos.xMove = xStarting(stalfos.spriteWidth);
    stalfos.yMove = yStarting(stalfos.spriteHeight);

  }, 4000);

//title screen
var titleScreen = null;
var titleScreenLoop = function () {
  ctxBackgroundMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxEnemyMap.clearRect(0, 0, enemyMap.width, enemyMap.height);
  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

  ctxSpriteMap.fillStyle = '#36c792';
  ctxSpriteMap.fillRect(95, 145, 327, 28);
  ctxSpriteMap.font = "20px 'Press Start 2P'";
  ctxSpriteMap.fillStyle = '#362934';
  ctxSpriteMap.fillText('Press Start Game', 100, 170);

  ctxEnemyMap.drawImage(tektite.image, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);
  ctxEnemyMap.drawImage(keese.image, keese.xFrame, keese.yFrame, keese.pngWidth, keese.pngHeight, keese.xMove, keese.yMove, keese.spriteWidth, keese.spriteHeight);
  ctxEnemyMap.drawImage(gibdo.image, gibdo.xFrame, gibdo.yFrame, gibdo.pngWidth, gibdo.pngHeight, gibdo.xMove, gibdo.yMove, gibdo.spriteWidth, gibdo.spriteHeight);
  ctxEnemyMap.drawImage(stalfos.image, stalfos.xFrame, stalfos.yFrame, stalfos.pngWidth, stalfos.pngHeight, stalfos.xMove, stalfos.yMove, stalfos.spriteWidth, stalfos.spriteHeight);
  ctxEnemyMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);

  tektite.moveTektite();
  keese.moveKeese();
  gibdo.moveGibdo();
  stalfos.moveStalfos();

  if (coinFlip(2) === 0) {
    if (link.xMove - stalfos.xMove >= 0) {
      link.xMove -= 1;
    } else if (link.xMove - stalfos.xMove < 0) {
      link.xMove += 1;
    }
  } else if (coinFlip(2) === 1) {
    if (link.yMove - stalfos.yMove >= 0) {
      link.yMove -= 1;
    } else if (link.yMove - stalfos.yMove < 0) {
      link.yMove += 1;
    };
  };

  titleScreen = requestAnimationFrame(titleScreenLoop);
};

//Load high score
var getHighScore = function() {
  if(localStorage.hasOwnProperty('highScore')) {
    game.highScore = localStorage.highScore;
  };
};

//Document ready function for DOM events
document.addEventListener('DOMContentLoaded', function(event) {
  titleScreenLoop();
  getHighScore();
  $('#high-score').text(game.highScore);
  startGameButton.on('click', startGame);
  window.addEventListener('keydown', link.playerAction);
  window.addEventListener('keyup', link.actionStop);
  $('#up').on('touchstart', link.touchUp);
  $('#down').on('touchstart', link.touchDown);
  $('#left').on('touchstart', link.touchLeft);
  $('#right').on('touchstart', link.touchRight);
  $('#attack').on('touchstart', link.touchAttack);
  $('#up').on('touchend', link.touchUpStop);
  $('#down').on('touchend', link.touchDownStop);
  $('#left').on('touchend', link.touchLeftStop);
  $('#right').on('touchend', link.touchRightStop);
  $('#attack').on('touchend', link.touchAttackStop);

});
