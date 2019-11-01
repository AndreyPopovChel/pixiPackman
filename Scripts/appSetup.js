var WIDTH = 380;
var HEIGHT = 500;

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    
var app = new PIXI.Application(WIDTH, HEIGHT, 
{
    backgroundColor : 0xffffff,
    antialias: true
});
document.getElementById('Canvas').appendChild(app.view);

loader
.add("images/logo.png")
.load(setup);

var state, gameScene, gameOverScene, gameField;
let inGameObj, gameOverObj; 

function setup() 
{    
    gameScene = new Container();
    gameField = new GameField();
    app.stage.addChild(gameScene);
    gameScene.visible = true;
    inGameObj = new InGame();
    inGameObj.setup();

    gameField.drawLines(gameScene);

    // По ходу игры отслеживаем нажатия на стрелочки для изменения направления
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);


    left.press = function() {
        inGameObj._packman.vx = -4;
        inGameObj._packman.vy = 0;
        inGameObj._packman.adjustPosition()
    };
    
    up.press = function() {
        inGameObj._packman.vy = -4;
        inGameObj._packman.vx = 0;
        inGameObj._packman.adjustPosition()
    };
    
    right.press = function() {
        inGameObj._packman.vx = 4;
        inGameObj._packman.vy = 0;
        inGameObj._packman.adjustPosition()
    };
    
    down.press = function() {
        inGameObj._packman.vy = 4;
        inGameObj._packman.vx = 0;
        inGameObj._packman.adjustPosition()
    };
        
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;
    gameOverObj = new GameOver();
    gameOverObj.setup();

    inGameObj._packman.resetPlayer();
    state = play;
 
    app.ticker.add(() => gameLoop());
}

function gameLoop()
{
  state();
}

function play()
{
    if (gameScene.visible)
    {
        inGameObj.update();
    }
}

function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
}


