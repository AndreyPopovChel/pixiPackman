class Packman extends PIXI.Sprite
{
    constructor(parent=null, image, field)
    {
        super(PIXI.Texture.fromImage(image));

        this.pivot.set(0.5);
        this.anchor.set(0.5);
        this.vx = 0;
        this.xy = 0;
        this.score = 0;
        this.highScore = 0;
        this.gameField = field;

        if(parent)
        {
            parent.addChild(this);
        }
    }

    adjustPosition()
    {
        // 10 пикселей - смещение персонажа относительно условного квадрата
        // В данном методе выполняем центрирование 
        this.x = 10*Math.round(this.x/10);
        this.y = 10*Math.round(this.y/10);
        if (this.x % this.gameField.SCALE == 0)
        {
            this.x += 10;
        }
        if (this.y % this.gameField.SCALE == 0)
        {
            this.y += 10;
        }
    }
    
    update()
    {
        if (this.canMove())
        {
            this.x += this.vx;
            this.y += this.vy;
        }        
        else
        {
            this.adjustPosition();            
        }

        this.x = this.gameField.checkTunnel(this.x, this.y);
    }

    canMove()
    {
        var nextElement = this.gameField.getNextElement(this.x, this.y, this.vx, this.vy);
        return nextElement != this.gameField.WALL && nextElement != this.gameField.BLOCK;        
    }
     
    resetPlayer()
    {
        this.x = 10 * this.gameField.SCALE + 10;
        this.y = 16 * this.gameField.SCALE + 10;
        this.vx = 0;
        this.vy = 0;
        this.score = 0;        
    }

    updateScore()
    {
        this.score += 1;

        if(this.score > this.highScore)
            this.highScore = this.score;
    }    
}