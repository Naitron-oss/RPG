
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
  xFrame: 2816,  //x axis start of current map frame (from src img)
  yFrame: 704.5,  //y axis start of current map frame (from src img)
  downFrame: 0,  //not sure if will be used
  upFrame: 0,  //not sure if will be used
  leftFrame: 0,  //not sure if will be used
  rightFrame: 0,  //not sure if will be used
  moveSpeed: 15.06,  //not sure if will be used
  mapCounter: 0,  //not sure if will be used - count map frame slides ininterval function
  pngWidth: 255.06,  //map frame width from src img
  pngHeight: 175.5,  //map frame height from src img
  xMove: 0,  //not sure if will be used
  yMove: 0,  //not sure if will be used
  mapWidth: backgroundMap.width,  //how wide the background will be on canvas
  mapHeight: backgroundMap.height,  //how tall the background will be on canvas
  moveMapFrame: null
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
  xFrame: 0,  //x starting point of src img for sprite frame
  yFrame: 0,  //y starting point of src img for sprite frame
  upFrame: 0,  //placeholder for frame iteration
  downFrame: 0,  //placeholder for frame iteration
  leftFrame: 0,  //placeholder for frame iteration
  rightFrame: 0,  //placeholder for frame iteration
  pngWidth: 15,  //width of src img sprite size
  pngHeight: 16,  //height of src img sprite size
  xMove: 0,  //x point of link on canvas
  yMove: 0,  //y point of link on canvas
  moveSpeed: 3,  //number of px moved per interval
  frameSpeed: 14,
  isMovingUp: false, //tracks to see if moving Up
  isMovingDown: false, //tracks to see if moving Down
  isMovingLeft: false, //tracks to see if moving Left
  isMovingRight: false, //tracks to see if moving Right
  spriteWidth: 37.5,  //width of sprite on canvas
  spriteHeight: 40,  //height of sprite on canvas
  moveDownInterval: null,  //interval for down movement
  moveUpInterval: null,  //interval for up movement
  moveLeftInterval: null,  //interval for left movement
  moveRightAnimation: null,  //interval for right movement

  moveStop: function(event) {
    if(event.keyCode === 38) {
      clearInterval(link.moveUpInterval);
      link.isMovingUp = false;
    };
    if(event.keyCode === 40) {
      clearInterval(link.moveDownInterval);
      link.isMovingDown = false;
    };
    if(event.keyCode === 37) {
      clearInterval(link.moveLeftInterval);
      link.isMovingLeft = false;
    };
    if(event.keyCode === 39) {
      // clearInterval(link.moveRightInterval);
      window.cancelAnimationFrame(link.moveRightAnimation);
      link.isMovingRight = false;
    };
  }
};


var moveBackgroundLeft = function() {
  if (background.mapCounter === 0) {
    background.moveMapFrame = setInterval(function() {
      link.xMove += ((link.moveSpeed * .5) + background.moveSpeed);
      background.xFrame -= background.moveSpeed;
      background.mapCounter++;
      console.log('map counter ' + background.mapCounter);
      console.log('link at ' + link.xMove)
    }, 50);
  };
};

var stopMoveBackgroundLeft = function() {
  // if (background.mapCounter >= 17) {
    clearInterval(background.moveMapFrame);
    background.mapCounter = 0;
  // };
};





var foo = function() {
    link.xMove += link.moveSpeed;
    link.xFrame = 90;
    link.yFrame = 0;
    if (link.rightFrame < (link.frameSpeed / 2)){
      link.yFrame = 30;
      link.rightFrame++;
    } else if(link.rightFrame <= link.frameSpeed) {
      link.yFrame = 0;
      link.rightFrame++;
    } else {
      link.rightFrame = 0;
    };
      // if (link.rightFrame < (link.frameSpeed / 2)) {
      //   console.log('in if??');
      //     link.yFrame === 0 && link.rightFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
      //   link.rightFrame++;
      // } else if (link.rightFrame <= link.frameSpeed) {
      //   console.log('in else??');
      //   link.yFrame === 30 && link.rightFrame === link.frameSpeed ? link.yFrame -= 30 : link.yFrame += 30;
      //   link.rightFrame++;
      // } else {
      //   link.rightFrame = 0;
      // }
//     };
  link.moveRightAnimation = window.requestAnimationFrame(foo);
// };
};





//Player move Function and Interval
var movePlayer = function(event) {
  //Up
  if (event.keyCode === 38) {
    if (link.isMovingUp === false) {
      link.isMovingUp = true;
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
    };
  }
  //Down
  if (event.keyCode === 40) {
    if (link.isMovingDown === false) {
      link.isMovingDown = true;
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
    };
  }
  //Left
  if (event.keyCode === 37) {
    if (link.isMovingLeft === false) {
      link.isMovingLeft = true;
      link.moveLeftInterval = setInterval(function(event) {
        if (link.xMove < -10) {
          moveBackgroundLeft();
        } else if (link.xMove > 100) {
          // clearInterval(background.moveMapFrame);
          stopMoveBackgroundLeft();
        };
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
    };
  }
  //Right
  if (event.keyCode === 39) {
    if (!link.isMovingRight) {
    // while (link.isMovingRight) {
    //
    //   link.moveRightAnimation = function() {
    // //     if (link.isMovingRight) {
    //       link.xMove += link.moveSpeed;
    //       link.xFrame = 90;
    // //       if (link.rightFrame === 0) {
    // //         link.yFrame === 0 ? link.yFrame += 30 : link.yFrame -= 30;
    // //         link.rightFrame++;
    // //       } else {
    // //         link.yFrame === 30 ? link.yFrame -= 30 : link.yFrame += 30;
    // //         link.rightFrame--;
    // //       };
    //     };
    //   };
        // requestAnimationFrame(link.moveRightAnimation)
        window.requestAnimationFrame(foo);
        link.isMovingRight = true;

      };

    }

    // console.log('yo');
    // };


  // }
};

// if (background.mapCounter >= 17) {
//   clearInterval(background.moveMapFrame);
// };



//Animation Loop for player and enemies
var animationLoop = function() {
  ctxSpriteMap.clearRect(0, 0, spriteMap.width, spriteMap.height);

  ctxBackgroundMap.drawImage(background.image, background.xFrame, background.yFrame, background.pngWidth, background.pngHeight, 0, 0, background.mapWidth, background.mapHeight);
  ctxSpriteMap.drawImage(link.image, link.xFrame, link.yFrame, link.pngWidth, link.pngHeight, link.xMove, link.yMove, link.spriteWidth, link.spriteHeight);

  // ctxSpriteMap.fillStyle = tektite.color;
  // ctxSpriteMap.fillRect(tektite.x, tektite.y, 35, 35);



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
