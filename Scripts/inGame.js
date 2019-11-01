class InGame
{
    constructor()
    {
        this._numOfGhosts = 2;
        this._allGhosts = [];
        this._allBuscuits = [];
    }

    setup()
    {
        var buscuits = [];
        gameField.MAP.forEach(function(line, lineIndex)
        {            
            line.forEach(function(square, squareIndex)
            {
                if (square == gameField.BISCUIT || square == gameField.PILL)
                {
                   // Для PILL надо бы отдельную логику, но пока эта функциональность не реализована
                   let buscuit = new Buscuit(gameScene, squareIndex * gameField.SCALE + 10, lineIndex*gameField.SCALE + 10);
                   buscuits.push(buscuit);
                }                
            });
        });
        this._allBuscuits = buscuits;

        this._packman = new Packman(gameScene, "images/packman.png", gameField);
        
        for(var i = 0; i < this._numOfGhosts; i++)
        {
            let ghost = new Ghost(gameScene, "images/ghost.png", gameField, i);
            ghost.scale.set(0.7);
            ghost.reset();
            this._allGhosts.push(ghost);
        }

        let style = new PIXI.TextStyle(
        {
            fontFamily: 'Century Gothic',
            fontSize: 40,
            fill: 0x8ed1db,
            align: 'center'
        });

        // create score text
        this._scoreText = new PIXI.Text('0', style);
        this._scoreText.anchor.set(0.5);
        this._scoreText.position.set(WIDTH / 2, 450);
        gameScene.addChild(this._scoreText);
    }

    update()
    {
        this._packman.update();

        for (var i = 0; i < this._allGhosts.length; i++)
        {
            this._allGhosts[i].update();
            if(this.collisionDetection(this._packman, this._allGhosts[i]))
            {                
                this.endGame();
            }
        }

        for (var i = 0; i < this._allBuscuits.length; i++)
        {            
            if (this._allBuscuits[i].isVisible() && 
                Math.abs(this._allBuscuits[i].circle.x - this._packman.x) < 5 &&
                this._allBuscuits[i].circle.y == this._packman.y)
             {
                this._packman.updateScore();
                this._allBuscuits[i].hide();
                break;
             }
        }

        if (this._packman.score == 182)
        {
            this.endGame();
        }

        this._scoreText.text = this._packman.score;        
    }
 
    endGame()
    {
        //change state
        gameScene.visible = false;
        gameOverScene.visible = true;
        state = end;

        //update scores
        gameOverObj.updateScores(this._packman.score, this._packman.highScore);

        this._packman.resetPlayer();
        for(var i = 0; i < this._allGhosts.length; i++)
        {
            this._allGhosts[i].reset();
        }            
    }

    collisionDetection(r1, r2) {
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        hit = false;
        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2; 
        r1.centerY = r1.y + r1.height / 2; 
        r2.centerX = r2.x + r2.width / 2; 
        r2.centerY = r2.y + r2.height / 2; 
        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 3;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 5;
        r2.halfHeight = r2.height / 4;
        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {
            //There's definitely a collision happening
            hit = true;
        } else {
            //There's no collision on the y axis
            hit = false;
        }
        } else {
        //There's no collision on the x axis
        hit = false;
        }
        //`hit` will be either `true` or `false`
        return hit;
  };
}