
//Game time
//found online, thanks to Dan Tello
var game = {
  score: 0,
  now: null,
  delta: null,
  then: null,

  frame: function() {
    game.setDelta();
    // game.update();
    // game.render();
    game.animationFrame = window.requestAnimationFrame(game.frame);
  },

  setDelta: function() {
    game.now = Date.now();
    game.delta = (game.now - game.then) / 1000; //seconds since last frame
    game.then = game.now;
  }
};

game.frame();


//Defining backgroundMap canvas
var backgroundMap = document.getElementById('background-map');
var ctxBackgroundMap = backgroundMap.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = '../images/overworld_map.png';
backgroundMap.width = 512;
backgroundMap.height = 352;
var background = {
  image: backgroundImage,
  xFrame: 2816,  //x axis start of current map frame (from src img)
  yFrame: 704,  //y axis start of current map frame (from src img)
  moveSpeed: 4,  //speed at which map moves frames
  mapCounter: 0,  //count map frame slides for map move function
  pngWidth: 256,  //map frame width from src img
  pngHeight: 176,  //map frame height from src img
  mapWidth: backgroundMap.width,  //how wide the background will be on canvas
  mapHeight: backgroundMap.height,  //how tall the background will be on canvas
  moveMapFrameAnimation: null,
  mapMoving: false,

  moveMapFrameUp: function() {
    if (background.mapCounter < 64) {
      link.yMove += (background.moveSpeed * 1.25);
      background.yFrame -= (background.moveSpeed * 0.6875);
      background.moveMapFrameAnimation = window.requestAnimationFrame(background.moveMapFrameUp);
      background.mapCounter++
    } else {
      background.mapCounter = 0;
      background.mapMoving = false;
      link.yMove = backgroundMap.height - link.spriteHeight;
      if (tektite.life !== 1) {
        tektite.life = 1;
      };
      if (link.life <= 2) {
        heart.show = true;
      };
    };
  },

  moveMapFrameDown: function() {
    if (background.mapCounter < 64) {
      link.yMove -= (background.moveSpeed * 1.25);
      background.yFrame += (background.moveSpeed * 0.6875);
      background.moveMapFrameAnimation = window.requestAnimationFrame(background.moveMapFrameDown);
      background.mapCounter++
    } else {
      background.mapCounter = 0;
      background.mapMoving = false;
      link.yMove = 0;
      if (tektite.life !== 1) {
        tektite.life = 1;
      };
      if (link.life <= 2) {
        heart.show = true;
      };
    };
  },

  moveMapFrameLeft:function() {
    if (background.mapCounter < 64) {
      link.xMove += (background.moveSpeed * 1.85);
      background.xFrame -= background.moveSpeed;
      background.moveMapFrameAnimation = window.requestAnimationFrame(background.moveMapFrameLeft);
      background.mapCounter++
    } else {
      background.mapCounter = 0;
      background.mapMoving = false;
      link.xMove = backgroundMap.width - link.spriteWidth;
      if (tektite.life !== 1) {
        tektite.life = 1;
      };
      if (link.life <= 2) {
        heart.show = true;
      };
    };
  },

  moveMapFrameRight: function() {
    if (background.mapCounter < 64) {
      link.xMove -= (background.moveSpeed * 1.85);
      background.xFrame += background.moveSpeed;
      background.moveMapFrameAnimation = window.requestAnimationFrame(background.moveMapFrameRight);
      background.mapCounter++
    } else {
      background.mapCounter = 0;
      background.mapMoving = false;
      link.xMove = 0;
      if (tektite.life !== 1) {
        tektite.life = 1;
      };
      if (link.life <= 2) {
        heart.show = true;
      };
    };
  }
};


//Defining spriteMap canvas

var spriteMap = document.getElementById('sprite-map');
var ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 512;
spriteMap.height = 352;


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


//Define character images
var linkPng = new Image();
linkPng.src = '../images/link-spritesheet.png';

var tektitePngUp = new Image();
tektitePngUp.src = '../images/tektite_up.png';
var tektitePngDown = new Image();
tektitePngDown.src = '../images/tektite_down.png';

var heartPng = new Image();
heartPng.src = '../images/heart.gif';


//Define pickups
var heart = {
  image: heartPng,
  xFrame: 57,  //x starting point of src img for sprite frame
  yFrame: 62,  //y starting point of src img for sprite frame
  pngWidth: 59,  //width of src img sprite size
  pngHeight: 59,  //height of src img sprite size
  spriteWidth: 18,  //width of sprite on canvas
  spriteHeight: 18,  //height of sprite on canvas
  x: Math.floor(Math.random() * 500),  //x value where to display heart
  y: Math.floor(Math.random() * 300),  //y value where to display heart
  show: false,
  heartAnimation: null,

  generateHeart: function() {
    this.heartAnimation = window.requestAnimationFrame(heart.generateHeart);
  }
};


//Define characters
var tektite = {
  imageUp: tektitePngUp,
  imageDown: tektitePngDown,
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  pngWidth: 16,  //width of src img sprite size
  pngHeight: 15,  //height of src img sprite size
  spriteWidth: 37.5,  //width of sprite on canvas
  spriteHeight: 40,  //height of sprite on canvas
  xMove: 150,  //x point of link on canvas
  yMove: 150,  //y point of link on canvas
  xCenter: 18.75,  //x center of hit box
  yCenter: 20,  //y center of hit box
  moveAnimation: null,  //movement AI
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1, 2, 3], //possible spaces moved
  life: 1,  //how much life
  points: 1,  //how many points killing tektite is worth

  moveTektite: function() {
    //Moves if coinFlip is 1
    if (coinFlip(65) === 0) {
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
    this.moveAnimation = window.requestAnimationFrame(tektite.moveTektite);
  }
};


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
  xMove: 0,  //x point of link on canvas
  yMove: 0,  //y point of link on canvas
  moveSpeed: 3,  //number of px moved per interval
  frameSpeed: 14,  //number to calculate frame switch rate
  isMoving: false, //tracks to see if moving
  // isMovingUp: false, //tracks to see if moving up
  // isMovingDown: false, //tracks to see if moving down
  // isMovingLeft: false, //tracks to see if moving left
  // isMovingRight: false, //tracks to see if moving right
  isAttacking: false, //tracks to see if attacking
  attackTime: null,  //tracks time link attacked
  hitTime: null,  //tracks time link was hit
  heartTime: null,  //tracks time when link picked up heart
  life: 3,  //how much life left
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

  heartDisplay: function() {
    if (link.life === 2) {
      $('#heart-one').addClass('heart-hidden');
    } else if (link.life === 1) {
      $('#heart-two').addClass('heart-hidden');
    } else if (link.life === 0) {
      $('#heart-three').addClass('heart-hidden');
      //link.die();
    }
  },

  // die: function() {
  //
  // },

  moveUp: function() {
    if (link.yMove <= link.upMapMove) {
      background.mapMoving = true;
      window.requestAnimationFrame(background.moveMapFrameUp);
    } else if (!background.mapMoving) {
      link.yMove -= link.moveSpeed;
      link.xFrame = 61;
      link.yFrame = 0;
      if (link.upFrame < (link.frameSpeed / 2)){
        link.yFrame = 30;
        link.upFrame++;
      } else if(link.upFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.upFrame++;
      } else {
        link.upFrame = 0;
      };
    };
    link.moveUpAnimation = window.requestAnimationFrame(link.moveUp);
  },

  moveDown: function() {
      if (link.yMove >= link.downMapMove) {
        background.mapMoving = true;
        window.requestAnimationFrame(background.moveMapFrameDown);
      } else if (!background.mapMoving) {
        link.yMove += link.moveSpeed;
        link.xFrame = 0;
        link.yFrame = 0;
        if (link.downFrame < (link.frameSpeed / 2)){
          link.yFrame = 30;
          link.downFrame++;
        } else if(link.downFrame <= link.frameSpeed) {
          link.yFrame = 0;
          link.downFrame++;
        } else {
          link.downFrame = 0;
      };
    };
    link.moveDownAnimation = window.requestAnimationFrame(link.moveDown);
  },

  moveLeft: function() {
    if (link.xMove <= link.leftMapMove) {
      background.mapMoving = true;
      window.requestAnimationFrame(background.moveMapFrameLeft);
    } else if (!background.mapMoving) {
      link.xMove -= link.moveSpeed;
      link.xFrame = 29;
      link.yFrame = 31;
      if (link.leftFrame < (link.frameSpeed * .5)){
        link.yFrame = 0;
        link.leftFrame++;
      } else if(link.leftFrame <= link.frameSpeed) {
        link.yFrame = 31;
        link.leftFrame++;
      } else {
        link.leftFrame = 0;
      };
    };
    link.moveLeftAnimation = window.requestAnimationFrame(link.moveLeft);
  },

  moveRight: function() {
    if (link.xMove >= link.rightMapMove) {
      background.mapMoving = true;
      window.requestAnimationFrame(background.moveMapFrameRight);
    } else if (!background.mapMoving) {
      link.xMove += link.moveSpeed;
      link.xFrame = 90;
      link.yFrame = 0;
      if (link.rightFrame < (link.frameSpeed / 2)){
        link.yFrame = 31;
        link.rightFrame++;
      } else if(link.rightFrame <= link.frameSpeed) {
        link.yFrame = 0;
        link.rightFrame++;
      } else {
        link.rightFrame = 0;
      };
    };
    link.moveRightAnimation = window.requestAnimationFrame(link.moveRight);
  },

  moveStop: function(event) {
    //Stop moving up
    if(event.keyCode === 38) {
      window.cancelAnimationFrame(link.moveUpAnimation);
      link.isMoving = false;
      link.yFrame = 30;
    };
    //Stop moving down
    if(event.keyCode === 40) {
      window.cancelAnimationFrame(link.moveDownAnimation);
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving left
    if(event.keyCode === 37) {
      window.cancelAnimationFrame(link.moveLeftAnimation);
      link.isMoving = false;
      link.yFrame = 0;
    };
    //Stop moving right
    if(event.keyCode === 39) {
      window.cancelAnimationFrame(link.moveRightAnimation);
      link.isMoving = false;
      link.yFrame = 31;
    };
    //Stop attacking
    if (event.keyCode === 32) {
      switch(true) {
        //if facing up
        case link.xFrame === 60:
          link.xFrame = 61;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 30;
          link.yMove += 29;
          link.isMoving = false;
          link.isAttacking = false;
          break;
          //if facing down
        case link.xFrame === 0:
          link.pngWidth = 15;
          link.pngHeight = 16;
          link.spriteHeight = 34;
          link.yFrame = 0;
          link.yMove -= 3;
          link.isMoving = false;
          link.isAttacking = false;
          break;
          //if facing left
        case link.xFrame === 24:
          link.xFrame = 29;
          link.pngWidth = 15;
          link.spriteWidth = 31.875;
          link.yFrame = 0;
          link.xMove += 30;
          link.isMoving = false;
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
          link.isMoving = false;
          link.isAttacking = false;
          break;
      };
    };
  }
};


//Player move Function
var playerAction = function(event) {
  //Up
  if (event.keyCode === 38) {
    if (link.yMove <= link.upMapMove) {
      window.requestAnimationFrame(background.moveMapFrameUp);
    } else if (!link.isMoving && !link.isAttacking) {
        window.requestAnimationFrame(link.moveUp);
        link.isMoving = true;
      };
  }
  //Down
  if (event.keyCode === 40) {
    if (link.yMove >= link.downMapMove) {
      window.requestAnimationFrame(background.moveMapFrameDown);
    } else if (!link.isMoving && !link.isAttacking) {
        window.requestAnimationFrame(link.moveDown);
        link.isMoving = true;
      };
  }
  //Left
  if (event.keyCode === 37) {
    if (link.xMove <= link.leftMapMove) {
      window.requestAnimationFrame(background.moveMapFrameLeft);
    } else if (!link.isMoving && !link.isAttacking) {
        window.requestAnimationFrame(link.moveLeft);
        link.isMoving = true;
      };
  }
  //Right
  if (event.keyCode === 39) {
    if (link.xMove >= link.rightMapMove) {
      window.requestAnimationFrame(background.moveMapFrameRight);
    } else if (!link.isMoving && !link.isAttacking) {
        window.requestAnimationFrame(link.moveRight);
        link.isMoving = true;
      };
  }
  //Spacebar
  if (event.keyCode === 32) {
    switch(true) {
      //if facing up
      case link.xFrame === 61:
        link.xFrame = 60;
        link.pngHeight = 28;
        link.spriteHeight = 59.5;
        link.yFrame = 84;
        link.yMove -= 29;
        link.isMoving = true;
        link.isAttacking = true;
        cancelAnimationFrame(link.moveUpAnimation);
        cancelAnimationFrame(link.moveDownAnimation);
        cancelAnimationFrame(link.moveLeftAnimation);
        cancelAnimationFrame(link.moveRightAnimation);
        break;
        //if facing down
      case link.xFrame === 0:
        link.pngWidth = 16;
        link.pngHeight = 28;
        link.spriteHeight = 59.5;
        link.yFrame = 84;
        link.yMove += 3;
        link.isMoving = true;
        link.isAttacking = true;
        cancelAnimationFrame(link.moveUpAnimation);
        cancelAnimationFrame(link.moveDownAnimation);
        cancelAnimationFrame(link.moveLeftAnimation);
        cancelAnimationFrame(link.moveRightAnimation);
        break;
        //if facing left
      case link.xFrame === 29:
        link.xFrame = 24;
        link.pngWidth = 28;
        link.spriteWidth = 59.5;
        link.yFrame = 90;
        link.xMove -= 30;
        link.isMoving = true;
        link.isAttacking = true;
        cancelAnimationFrame(link.moveUpAnimation);
        cancelAnimationFrame(link.moveDownAnimation);
        cancelAnimationFrame(link.moveLeftAnimation);
        cancelAnimationFrame(link.moveRightAnimation);
        break;
        //if facing right
      case link.xFrame === 90:
        link.xFrame = 84;
        link.pngWidth = 28;
        link.spriteWidth = 59.5;
        link.yFrame = 90;
        link.xMove += 6;
        link.isMoving = true;
        link.isAttacking = true;
        cancelAnimationFrame(link.moveUpAnimation);
        cancelAnimationFrame(link.moveDownAnimation);
        cancelAnimationFrame(link.moveLeftAnimation);
        cancelAnimationFrame(link.moveRightAnimation);
        break;
    };
  };
};


//Collision Detection between Link and enemies
var enemyCollisionDetection = function(x1, y1, x2, y2, enemy) {
  if (!link.isAttacking && ((game.now - link.hitTime) / 1000) > 1.25 && enemy.life > 0) {
    var xDistance = x2 - x1;
    var yDistance = y2 - (y1 - 4);
    var hitRadius = Math.abs(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    if (hitRadius <= 33) {
      link.linkHit();
      link.life -= 1;
      console.log(link.life);
      link.heartDisplay();
    };
  } else if (link.isAttacking && ((game.now - link.attackTime) / 1000) > .25 && enemy.life > 0) {
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
      game.score += enemy.points;
      console.log('link attacks!');
    };
  };
};


//Collision detection between Link and objects
var pickupCollisionDetection = function(x1, y1, x2, y2, object) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;
  var crashZone = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  if (crashZone <= 30 && link.life <= 2) {
    object.show = false;
    if (link.life === 1 && ((game.now - link.heartTime) / 1000) > 1) {
      console.log('heart two yay!');

//ALWAYS ADDS 2 HEARTS WHEN LINK HAS 1 LIFE LEFT

      link.life += 1;
      $('#heart-two').removeClass('heart-hidden');
      $('#heart-two').addClass('heart-show');
    } else if (link.life === 2 && ((game.now - link.heartTime) / 1000) > 1) {
      console.log('heart one yay!');
      link.life += 1;
      $('#heart-one').removeClass('heart-hidden');
      $('#heart-one').addClass('heart-show');
    };
  };
};


//Animation Loop for player and enemies
var animationLoop = function() {

  // game.frame();

  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

if (heart.show) {
  ctxBackgroundMap.drawImage(heart.image, heart.xFrame, heart.yFrame, heart.pngWidth, heart.pngHeight, heart.x, heart.y, heart.spriteWidth, heart.spriteHeight);
  heart.generateHeart();
} else {
  cancelAnimationFrame(heart.generateHeart);
};

if (tektite.life > 0) {
  ctxBackgroundMap.drawImage(tektite.imageDown, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);
  tektite.moveTektite();
} else {
  cancelAnimationFrame(tektite.moveTektite);
};

  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);


  pickupCollisionDetection(link.xMove, link.yMove, heart.x, heart.y, heart);
  enemyCollisionDetection(link.xMove, link.yMove, tektite.xMove, tektite.yMove, tektite);
  // collisionDetection(block2.x, block2.y, block3.x, block3.y);
  $('#score-num').html(game.score);
  requestAnimationFrame(animationLoop);
};


//Document ready function for DOM events
document.addEventListener('DOMContentLoaded', function(event) {
  window.requestAnimationFrame(animationLoop);
  window.addEventListener('keydown', playerAction);
  // window.addEventListener('keyup', link.moveStop);
  window.addEventListener('keyup', link.moveStop);

});
