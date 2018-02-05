
//Defining backgroundMap canvas

// in JQuery
// var backgroundMap = $('#background-map');
// var ctxBackgroundMap = backgroundMap[0].getContext('2d');

// in Vanilla JS
var backgroundMap = document.getElementById('background-map');
var ctxBackgroundMap = backgroundMap.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = '../images/overworld_map.png';
backgroundMap.width = window.innerWidth;
backgroundMap.height = window.innerHeight;
var background = {
  image: backgroundImage,
  xFrame: 2816,
  yFrame: 704.5,
  downFrame: 0,
  upFrame: 0,
  leftFrame: 0,
  rightFrame: 0,
  pngWidth: 255,
  pngHeight: 175.5,
  xMove: 0,
  yMove: 0,
  mapWidth: backgroundMap.width,
  mapHeight: backgroundMap.height
};


//Defining spriteMap canvas

// in JQuery
// var spriteMap = $('#sprite-map');
// var ctxSpriteMap = spriteMap[0].getContext('2d');

// in Vanilla JS
var spriteMap = document.getElementById('sprite-map');
var ctxSpriteMap = spriteMap.getContext('2d');
spriteMap.width = window.innerWidth;
spriteMap.height = window.innerHeight;


//Define character images
var linkPng = new Image();
linkPng.src = '../images/link-spritesheet.png';


//Define characters
var tektite = {
  x: 75,
  y: 75,
  color: 'red'
};

var link = {
  image: linkPng,
  xFrame: 0,
  yFrame: 0,
  downFrame: 0,
  upFrame: 0,
  leftFrame: 0,
  rightFrame: 0,
  pngWidth: 15,
  pngHeight: 16,
  xMove: 0,
  yMove: 0,
  moveSpeed: 13,
  spriteWidth: 37.5,
  spriteHeight: 40,
  moveDownInterval: null,
  moveUpInterval: null,
  moveLeftInterval: null,
  moveRightInterval: null,

  moveStop: function(event) {
    if(event.keyCode === 38) {
      clearInterval(link.moveUpInterval);
    };
    if(event.keyCode === 40) {
      clearInterval(link.moveDownInterval);
    };
    if(event.keyCode === 37) {
      clearInterval(link.moveLeftInterval);
    };
    if(event.keyCode === 39) {
      clearInterval(link.moveRightInterval);
    };
  }
};


//Player move Function and Interval
var movePlayer = function(event) {
  //Up
  if (event.keyCode === 38) {
    link.moveUpInterval = setInterval(function(event) {
    link.yMove -= link.moveSpeed;
    link.xFrame = 61;
    if (link.upFrame === 0) {
      link.yFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
      link.upFrame++;
    } else {
      link.yFrame === 30 ? link.yFrame -= 30 : link.yFrame += 30;
      link.upFrame--;
    };
    }, 50);
    link.moveUpInterval();
  }
  //Down
  if (event.keyCode === 40) {
    link.moveDownInterval = setInterval(function(event) {
    link.yMove += link.moveSpeed;
    link.xFrame = 0;
    if (link.downFrame === 0) {
      link.yFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
      link.downFrame++;
    } else {
      link.yFrame === 30 ? link.yFrame -= 30 : link.yFrame += 30;
      link.downFrame--;
    };
    }, 50);
    link.moveDownInterval();
  }
  //Left
  if (event.keyCode === 37) {
    link.moveLeftInterval = setInterval(function(event) {
    link.xMove -= link.moveSpeed;
    link.xFrame = 29;
    if (link.leftFrame === 0) {
      link.yFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
      link.leftFrame++;
    } else {
      link.yFrame === 30 ? link.yFrame -= 30 : link.yFrame += 30;
      link.leftFrame--;
    };
    }, 50);
    link.moveLeftInterval();
  }
  //Right
  if (event.keyCode === 39) {
    link.moveRightInterval = setInterval(function(event) {
    link.xMove += link.moveSpeed;
    link.xFrame = 90;
    if (link.rightFrame === 0) {
      link.yFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
      link.rightFrame++;
    } else {
      link.yFrame === 30 ? link.yFrame -= 30 : link.yFrame += 30;
      link.rightFrame--;
    };
    }, 50);
    link.moveRightInterval();
  }
};

// var stopMoving = clearInterval(function(event) {
//   var keyUpRange = [37, 38, 39, 40];
//   if (keyUpRange.includes(event.keycode)) {
//     clearInterval(movePlayer);
//   };
// });


//Animation Loop for player and enemies
var animationLoop = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);
  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);

  // ctxSpriteMap.fillStyle = tektite.color;
  // ctxSpriteMap.fillRect(tektite.x, tektite.y, 35, 35);



  // collisionDetection(block1.x, block1.y, block3.x, block3.y);
  // collisionDetection(block2.x, block2.y, block3.x, block3.y);
};

//Document ready function for DOM events
document.addEventListener('DOMContentLoaded', function(event) {
  setInterval(animationLoop, 50);
  window.addEventListener('keydown', movePlayer);
  window.addEventListener('keyup', link.moveStop);
});
