class Buscuit
{
    constructor(parent=null, x, y)
    {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.drawCircle();  
    }

    hide()
    {
        this.circle.clear();
        this.visible = false;        
    }

    drawCircle()
    {
        this.circle = new PIXI.Graphics();
        this.circle.beginFill(0x9966FF);
        this.circle.drawCircle(0, 0, 4);
        this.circle.endFill();
        this.circle.x = this.x;
        this.circle.y = this.y;

        this.visible = true;
                
        if(this.parent)
        {
            this.parent.addChild(this.circle);
        }
    }

    isVisible()
    {
        return this.visible;
    }
}