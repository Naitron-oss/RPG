# Top-Down-RPG-Game

# Welcome to The Legend of Tiny, Pixelated, 1980's Man!

This is a top down style game where you need to battle enemies per "level." Each "level" is a map screen. On each map screen you must kill all visible enemies before moving on. There are 9 total enemies and a boss. Each enemy has a different custom AI. On normal mode, once you defeat the boss on level 10 the game is over and you win. On continuous mode, there is no winning and you keep playing until you die, with the boss spawning every 5 levels after level 10.

## Game Map

The game map is a large world that can be freely traveled. Each map screen cannot be left until all visible enemies are dead. After killing the enemies, you are able to move one map screen over in any direction.

## UI

The left panel displays the current Game Level, the current Kill Score, and the current High Score. The High Score is locally stored and will show up when a user logs back in.

The right panel contains Link's current health, which will correctly display his current life, in 1/2 point increments. Below the hearts are three checkboxes for different features. Invincible will make Link immune to damage. He can still kill all enemies and win the game in this mode. Checking the Sound Effects box will turn sound effects on. Checking the Continuous Play box will turn off winning and enable the player to continue playing past level 10.

Below the checkboxes is the Start/Replay button. There is only one button but the text changes depending on the state of the game. Start game appears when first loading the page. After dying or winning, the button reads "Replay game."

On the bottom left is the audio controls to turn the background song on or off. I wrote the song myself and you can visit my bands SoundCloud via the link on the right hand side.

The bottom right contains the compact About box. It displays who created the game and song as well as links to my Github, LinkedIn, Twitter, and SoundCloud accounts.

### Mobile

On mobile or any screen narrower than 1024px, there is a D-pad and action button that display. Users can press on these button to play the game. Because of issues with bootstrap and canvas, there is some overlay issues with certain screen heights. There is no issue with screen widths.

## Title Screen/Other Screens

The game starts on a title screen that shows the enemies running around and fighting each other, which is slightly blurred out to give focus to the "Press Start Game" banner. This screen only shows 4 enemies so as to not give away the other enemies. The background automatically changes map locations to show different possible parts of the map. Each time the map changes screens the enemies start at a new x, y position.

There is both a game over screen as well as a win screen that have static visuals.

## Design/Style

The page styling is a simple attempt to be throwback 80s 8 bit but modernized with some sleek polish. The header is meant to resemble an old Nintendo logo. It has a light box shadow bleed on the bottom to give a slight glow vibe. The body is a dark gray to give a subtle background that fades into, well, the background. The side bars are styled in a slightly lighter grey that is meant to be reminiscent of a Game Boy. However, they are touched up with some light inset box-shadow to give a chic feel to them. The Start game/Replay game button animates infinitely in a small partial rotation to bring the users eye to it. It also has some box-shadow effects to give it a neon sign type look.

The audio controls and About bars were not ideally placed, but because of the bootstrap/canvas scaling issues they had to be placed there. They are both fixed position which can result in some poor responsiveness, depending on screen height, though they aren't an issue with screen width. The audio controls have a light glow around them. The about me box has a modern, sleek and minimal feel to it and grows on mouseover for easier clicking. The box shadow also grows with it. Upon mouseover, each logo link has a border-bottom in the title's green-blue color.

The text throughout is a retro looking greenish yellow to resemble old computer and gaming text colors. In addition, the font is an 8 bit style.

## Pickups

### Heart

This is a small heart that replenishes 1 hp. This can be both whole numbers as well as integers, such as 1.5 to 2.5. There is a special noise for picking up the heart. Once picked up, it will leave the game board and is unable to be picked up again until it respawns. Once Link loses 1 full hp a heart will spawn on the next level.

### Big Heart

This is a big heart that replenishes all of Link's missing hp. There is a special noise for picking up this heart. Once picked up, it will leave the game board and is unable to be picked up until it respawns. Big hearts will always spawn on levels with a Moblin. If Link reaches 1 hp remaining, then a Big Heart will spawn on the next level, though only one per level, even if a boss level.

## Characters

Each character, including Link, is spawned at a different location on the map each time they spawn. All of the enemies have their own hp, strength, kill points, and movement AI.

### Link - the Player

Link is the player who is controlled with the arrow keys and spacebar on keyboard, or via touch with the pop up touch buttons on mobile. Link can only move in one direction at a time and will change frames to animate movement. He can attack the four main directions as well but only while standing still. Link has 4 hp, but can be decremented by both 0.5 and 1.

He will display his current health via the hearts on the right side UI. Each heart dims to show a 0.5 damage and hides for a full 1 point damage. Link makes a sound when taking damage as well as dealing damage. He will trigger the enemies' death animation and sound effect as well. When he dies, he has a sound effect as well as a death animation, triggering the game over screen.

### Tektite

The spider like creature who has 1 hp, 0.5 strength, worth 1 kill point, and moves randomly, jumping up to 3 spaces at a time. Tektite shows up at level 1 and every level after that.

### Keese

The bat like creature who has 1 hp, 0.5 strength, worth 1 kill point, and moves randomly. Keese moves faster than Tektite, but only one space at a time. Keese shows up on level 2 and every level after that.

### Gibdo

The mummy type creature who has 2 hp, 1 strength, worth 1 kill point, and moves towards Link wherever he is on the map. His speed is slow and he is easy to evade. Gibdo shows up on level 3 and every level after that.

### Stalfos

The skeleton creature who has 2 hp, 1.5 strength, worth 1 kill point, and moves towards Link wherever he is on the map. Stalfos moves significantly quicker than Gibdo, but not as fast as other creatures. Stalfos shows up on level 4 and every level after that.

### Dodongo

The dinosaur type creature who has 3 hp, 2.5 strength, and worth 2 kill points. Dodongo moves across the map from left to right, starting at a random y position. He will not move towards Link and will not stop. Once he reaches the edge of the game board he will leave the map and won't show up until the next level. Dodongo shows up on level 5 and every level after that.

### Armos

The statue like creature who has 2 hp, 2 strength, and worth 3 kill points. Armos stands still until Link is close and then he rushes Link at a fast pace. He moves diagonally so he is one of the faster enemies. He will stop moving and stand still if Link leaves his attention zone. Armos shows up on level 6 and every level after that.

### Wizzrobe

This scared wizard creature has 2 hp, 1 strength, and worth 1 kill point. He is so scared of Link that he runs away from Link, not matter where Link is on the map. Once Wizzrobe reaches a corner, he will use his magic to teleport to the center of the map and start running away again in fear. Wizzrobe shows up at level 7 and every level after that.

### Darknut

The knight type creature who has 1 hp, 2.5 strength, and worth 4 kill points. Darknut is fast and charges down screen quickly, starting from a random x position. Like Dodongo, he will leave the screen and will not show back up until the next level. He shows up on level 8 and every level after that.

### Aquamentus

This loch ness monster type creature has 2 hp, 2 strength, and is worth 3 kill points. Aquamentus charges across the screen from right to left but will turn and charge Link if she gets too close. If Link leaves Aquamentus' attention zone then she will resume rushing left. Like Dodongo and Darknut, if Aquamentus reaches the edge of the screen, she will remain hidden until the next level. She shows up on level 9 and every level after that.

### Moblin - Boss

This is goblin like creature is the boss on normal play mode. He has 6 hp, 1 strength, and is worth 5 kill points. Moblin has his own sound effect and death animation. Being a boss, Moblin has 3 stages. While he is above 4 hp, he will roam in a circle type path around the screen. When he is above 2 hp, he will charge across the screen like the other chargers, except he will keep returning and charging in different directions until stage 3. While Moblin is at or below 2 hp he will turn scared and run away from Link anywhere he is on the game map. He will keep running until he is dead. Moblin shows up as the boss on level 10. If playing on continuous mode then he will show up every 5 levels starting on level 10.

Work Notes Below:

-------------

Step 1:
Test basic canvas board with moving boxes
-~- COMPLETE

Step 2:
Load Link's image and test movement
-~- COMPLETE

Step 3:
Load background image
-~- COMPLETE

Step 4:
Try to move around map with background moving (not to scale)
-~- COMPLETE

Step 5:
Implement smooth walking until keyup
//keydown launches movePlayer
//inside movePlayer, call ifs that call intervals
//write eventListener for keyup to clear interval
-~- COMPLETE

Step 6:
Fix speed issue where hold down key results in sprint
//arrow keys auto fire after period of time
//if i can keep calling move function while key is down
//and not stop until key up, that should fix
//or track movement with true/false
-~-COMPLETE

Step 7:
Get background frames to switch
//Need to have a map moveSpeed + link.moveSpeed so they move together
//Need to start/stop background frames movement
-~-COMPLETE

Step 8:
Need to fix background frame to switch correctly on all screens
Also need to switch smoothly
-~-COMPLETE

Step 9:
Prevent Link from moving diagonally
-~-COMPLETE - as part of sword attack, tho movement is a little stiff now


Step 10:
Add an enemy
-~-COMPLETE

Step 11:
Add life to link and enemy
-~-COMPLETE

Step 12:
Add collision detection between link and enemy
-~-COMPLETE

Step 13:
Add hearts so link can gain life
//add collision detection between hearts and link
-~-COMPLETE

Step 14:
Add keese, gibdo, stalfos
//give each their own AI so they are their own character
-~-COMPLETE

Step 15:
Add game over screen
-~-COMPLETE

Step 16:
Add link and enemy death animations
-~-COMPLETE

Step 17:
Complete layout of page
-~-COMPLETE

Step 18:
Add backing track and sound effects
-~-COMPLETE

Step 19:
Add game over screen
-~-COMPLETE

Step 20:
Add title screen
-~-COMPLETE

Step 21:
Add boss
//add special sound effects

Step 22:
Add win screen
-~-COMPLETE

Step 23:
Continuous mode or win mode with boss
-~-COMPLETE

Step 24:
Add 10 total bad guys with individual AI
-~-COMPLETE

Step 25:
Add big heart to refill all hearts
-~-COMPLETE

Step 26:
Add touch buttons for mobile
-~-COMPLETE...kinda...responsive issues for scaling

Step 27:
Add local storage for high score

==========
Step ??:
Add a place to enter players name
-~-SCRATCHED...bootstrap not playing nice with canvas caused responsive issues and so couldn't find room for name input

Step ??:
Make map key where Link and enemies can/can't be on
Also include tiles that trigger map/dungeon frame moves
//Each map frame is 256x176 ratio
//Each map frame has 16 tiles on x axis, and 11 tiles on y axis
//Each tile is 16x16
-~-SCRATCHED...went another direction with game
