
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
    };
  }
};


//Defining spriteMap canvas

var spriteMap = document.getElementById('sprite-map');
var ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = 512;
spriteMap.height = 352;


//Random Number Generators
var rNG = function() {
  return Math.random();
};

var coinFlip = function(num) {
  // rNG() < 0.5 ? 0 : 1;
  if (rNG() < 0.5) {
    return 0;
  } else {
    return 1;
  };
};


//Define character images
var linkPng = new Image();
linkPng.src = '../images/link-spritesheet.png';

var tektitePngUp = new Image();
tektitePngUp.src = '../images/tektite_up.png';
var tektitePngDown = new Image();
tektitePngDown.src = '../images/tektite_down.png';


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
  xMove: 0,  //x point of link on canvas
  yMove: 0,  //y point of link on canvas
  moveDirection: [this.xMove, this.yMove], //move directions
  moveSpeed: 16, //number of px to move
  numberOfSpaces: [0, 1, 2, 3], //possible spaces moved

  moveTektite: function() {
    //Moves if coinFlip is 1
    //What plane (x or y) to move   IF X THEN
    //What direction (+ or -) to move   IF + THEN
    //If xMove < 512
    //how many spaces to move

    //What direction (+ or -) to move   IF - THEN
    //If xMove > 0
    //how many spaces to move



    //What plane (x or y) to move   IF Y THEN
    //What direction (+ or -) to move   IF + THEN
    //If yMove < 352
    //how many spaces to move

    //What direction (+ or -) to move   IF - THEN
    //If yMove > 0
    //how many spaces to move

};

var link = {
  image: linkPng,
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
  isMovingUp: false, //tracks to see if moving Up
  isMovingDown: false, //tracks to see if moving Down
  isMovingLeft: false, //tracks to see if moving Left
  isMovingRight: false, //tracks to see if moving Right
  moveDownAnimation: null,  //function for down movement
  moveUpAnimation: null,  //function for up movement
  moveLeftAnimation: null,  //function for left movement
  moveRightAnimation: null,  //function for right movement
  upMapMove: 0, //y px where link causes map to move up
  downMapMove: backgroundMap.height - 34, //y px where link causes map to move down
  leftMapMove: 0, //x px where link causes map to move left
  rightMapMove: backgroundMap.width - 32, //x px where link causes map to move right

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
    if(event.keyCode === 38) {
      window.cancelAnimationFrame(link.moveUpAnimation);
      link.isMovingUp = false;
      link.yFrame = 30;
    };
    if(event.keyCode === 40) {
      window.cancelAnimationFrame(link.moveDownAnimation);
      link.isMovingDown = false;
      link.yFrame = 0;
    };
    if(event.keyCode === 37) {
      window.cancelAnimationFrame(link.moveLeftAnimation);
      link.isMovingLeft = false;
      link.yFrame = 0;
    };
    if(event.keyCode === 39) {
      window.cancelAnimationFrame(link.moveRightAnimation);
      link.isMovingRight = false;
      link.yFrame = 31;
    };
  }
};


//Player move Function
var movePlayer = function(event) {
  //Up
  if (event.keyCode === 38) {
    if (link.yMove <= link.upMapMove) {
      window.requestAnimationFrame(background.moveMapFrameUp);
    } else if (!link.isMovingUp) {
        window.requestAnimationFrame(link.moveUp);
        link.isMovingUp = true;
      };
  }
  //Down
  if (event.keyCode === 40) {
    if (link.yMove >= link.downMapMove) {
      window.requestAnimationFrame(background.moveMapFrameDown);
    } else if (!link.isMovingDown) {
        window.requestAnimationFrame(link.moveDown);
        link.isMovingDown = true;
      };
  }
  //Left
  if (event.keyCode === 37) {
    if (link.xMove <= link.leftMapMove) {
      window.requestAnimationFrame(background.moveMapFrameLeft);
    } else if (!link.isMovingLeft) {
        window.requestAnimationFrame(link.moveLeft);
        link.isMovingLeft = true;
      };
  }
  //Right
  if (event.keyCode === 39) {
    if (link.xMove >= link.rightMapMove) {
      window.requestAnimationFrame(background.moveMapFrameRight);
    } else if (!link.isMovingRight) {
        window.requestAnimationFrame(link.moveRight);
        link.isMovingRight = true;
      };
    }
};


//Animation Loop for player and enemies
var animationLoop = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);

  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);

  ctxSpriteMap.drawImage(tektite.imageDown, tektite.xFrame, tektite.yFrame, tektite.pngWidth, tektite.pngHeight, tektite.xMove, tektite.yMove, tektite.spriteWidth, tektite.spriteHeight);



  // collisionDetection(block1.x, block1.y, block3.x, block3.y);
  // collisionDetection(block2.x, block2.y, block3.x, block3.y);

  requestAnimationFrame(animationLoop);
};


//Document ready function for DOM events
document.addEventListener('DOMContentLoaded', function(event) {
  window.requestAnimationFrame(animationLoop);
  window.addEventListener('keydown', movePlayer);
  // window.addEventListener('keyup', link.moveStop);
  window.addEventListener('keyup', link.moveStop);

});
