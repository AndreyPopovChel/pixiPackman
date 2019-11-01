class Ghost extends PIXI.Sprite
{
    constructor(parent=null, image, field, index)
    {
        super(PIXI.Texture.fromImage(image));

        this.pivot.set(0.5);
        this.anchor.set(0.5); 
        this.vx = 0;
        this.vy = 0;
        this.gameField = field;      
        this.index = index;
        this.changeDirectionCounter = 0;

        if(parent)
        {
            parent.addChild(this);
        }
    }

    reset()
    {
        this.x = 9 * this.gameField.SCALE + 10;
        this.y = 10 * this.gameField.SCALE + 10;
        if(this.index == 1)
        {
            this.y -= this.gameField.SCALE;
        }        

        this.vx = 0;
        this.vy = -4;
        this.score = 0;        
    }

    update()
    {
        if (this.canMove() && this.changeDirectionCounter != 30)
        {
            this.changeDirectionCounter ++;
            this.x += this.vx;
            this.y += this.vy;
        }     
        else
        {
            if (this.vx == 0)
            {
                this.vy = 0;
                this.vx = Math.floor(Math.random() * 2) == 0 ? -4:4;                
            }
            else
            {
                this.vx = 0;
                this.vy = Math.floor(Math.random() * 2) == 0 ? -4:4;                
            }
        }

        if(this.changeDirectionCounter >= 30)
        {
            this.changeDirectionCounter = 0;
        }

        this.x = this.gameField.checkTunnel(this.x, this.y);
    }     

    canMove()
    {            
        return this.gameField.getNextElement(this.x, this.y, this.vx, this.vy) != this.gameField.WALL;        
    }
    
}