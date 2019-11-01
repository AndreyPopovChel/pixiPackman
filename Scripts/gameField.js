 class GameField 
 {
     constructor()
     {   
        // Линии рисуем по условным квадратам. Для перевода координат 
        // в пиксели используем масштаб
        this.SCALE  = 20;

        this.WALL    = 0;
        this.BISCUIT = 1;
        this.EMPTY   = 2;
        this.BLOCK   = 3;
        this.PILL    = 4;     

        this.MAP = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
            [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
            [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
            [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        
        this.WALLS = [        
            [{"moveTo": [0, 9.5]}, {"lineTo": [3, 9.5]},
            {"curveTo": [3.5, 9.5, 3.5, 9]}, {"lineTo": [3.5, 8]},
            {"curveTo": [3.5, 7.5, 3, 7.5]}, {"lineTo": [1, 7.5]},
            {"curveTo": [0.5, 7.5, 0.5, 7]}, {"lineTo": [0.5, 1]},
            {"curveTo": [0.5, 0.5, 1, 0.5]}, {"lineTo": [9, 0.5]},
            {"curveTo": [9.5, 0.5, 9.5, 1]}, {"lineTo": [9.5, 3.5]}],  
            [{"moveTo": [9.5, 1]},
            {"curveTo": [9.5, 0.5, 10, 0.5]}, {"lineTo": [18, 0.5]},
            {"curveTo": [18.5, 0.5, 18.5, 1]}, {"lineTo": [18.5, 7]},
            {"curveTo": [18.5, 7.5, 18, 7.5]}, {"lineTo": [16, 7.5]},
            {"curveTo": [15.5, 7.5, 15.5, 8]}, {"lineTo": [15.5, 9]},
            {"curveTo": [15.5, 9.5, 16, 9.5]}, {"lineTo": [19, 9.5]}],        
            [{"moveTo": [2.5, 5.5]}, {"lineTo": [3.5, 5.5]}],        
            [{"moveTo": [3, 2.5]},
            {"curveTo": [3.5, 2.5, 3.5, 3]},
            {"curveTo": [3.5, 3.5, 3, 3.5]},
            {"curveTo": [2.5, 3.5, 2.5, 3]},
            {"curveTo": [2.5, 2.5, 3, 2.5]}],        
            [{"moveTo": [15.5, 5.5]}, {"lineTo": [16.5, 5.5]}],        
            [{"moveTo": [16, 2.5]}, {"curveTo": [16.5, 2.5, 16.5, 3]},
            {"curveTo": [16.5, 3.5, 16, 3.5]}, {"curveTo": [15.5, 3.5, 15.5, 3]},
            {"curveTo": [15.5, 2.5, 16, 2.5]}],        
            [{"moveTo": [6, 2.5]}, {"lineTo": [7, 2.5]}, {"curveTo": [7.5, 2.5, 7.5, 3]},
            {"curveTo": [7.5, 3.5, 7, 3.5]}, {"lineTo": [6, 3.5]},
            {"curveTo": [5.5, 3.5, 5.5, 3]}, {"curveTo": [5.5, 2.5, 6, 2.5]}],        
            [{"moveTo": [12, 2.5]}, {"lineTo": [13, 2.5]}, {"curveTo": [13.5, 2.5, 13.5, 3]},
            {"curveTo": [13.5, 3.5, 13, 3.5]}, {"lineTo": [12, 3.5]},
            {"curveTo": [11.5, 3.5, 11.5, 3]}, {"curveTo": [11.5, 2.5, 12, 2.5]}],        
            [{"moveTo": [7.5, 5.5]}, {"lineTo": [9, 5.5]}, {"curveTo": [9.5, 5.5, 9.5, 6]},
            {"lineTo": [9.5, 7.5]}],
            [{"moveTo": [9.5, 6]}, {"curveTo": [9.5, 5.5, 10.5, 5.5]},
            {"lineTo": [11.5, 5.5]}],        
            [{"moveTo": [5.5, 5.5]}, {"lineTo": [5.5, 7]}, {"curveTo": [5.5, 7.5, 6, 7.5]},
            {"lineTo": [7.5, 7.5]}],
            [{"moveTo": [6, 7.5]}, {"curveTo": [5.5, 7.5, 5.5, 8]}, {"lineTo": [5.5, 9.5]}],        
            [{"moveTo": [13.5, 5.5]}, {"lineTo": [13.5, 7]},
            {"curveTo": [13.5, 7.5, 13, 7.5]}, {"lineTo": [11.5, 7.5]}],
            [{"moveTo": [13, 7.5]}, {"curveTo": [13.5, 7.5, 13.5, 8]},
            {"lineTo": [13.5, 9.5]}],        
            [{"moveTo": [0, 11.5]}, {"lineTo": [3, 11.5]}, {"curveTo": [3.5, 11.5, 3.5, 12]},
            {"lineTo": [3.5, 13]}, {"curveTo": [3.5, 13.5, 3, 13.5]}, {"lineTo": [1, 13.5]},
            {"curveTo": [0.5, 13.5, 0.5, 14]}, {"lineTo": [0.5, 17]},
            {"curveTo": [0.5, 17.5, 1, 17.5]}, {"lineTo": [1.5, 17.5]}],
            [{"moveTo": [1, 17.5]}, {"curveTo": [0.5, 17.5, 0.5, 18]}, {"lineTo": [0.5, 21]},
            {"curveTo": [0.5, 21.5, 1, 21.5]}, {"lineTo": [18, 21.5]},
            {"curveTo": [18.5, 21.5, 18.5, 21]}, {"lineTo": [18.5, 18]},
            {"curveTo": [18.5, 17.5, 18, 17.5]}, {"lineTo": [17.5, 17.5]}],
            [{"moveTo": [18, 17.5]}, {"curveTo": [18.5, 17.5, 18.5, 17]},
            {"lineTo": [18.5, 14]}, {"curveTo": [18.5, 13.5, 18, 13.5]},
            {"lineTo": [16, 13.5]}, {"curveTo": [15.5, 13.5, 15.5, 13]},
            {"lineTo": [15.5, 12]}, {"curveTo": [15.5, 11.5, 16, 11.5]},
            {"lineTo": [19, 11.5]}],        
            [{"moveTo": [5.5, 11.5]}, {"lineTo": [5.5, 13.5]}],
            [{"moveTo": [13.5, 11.5]}, {"lineTo": [13.5, 13.5]}],        
            [{"moveTo": [2.5, 15.5]}, {"lineTo": [3, 15.5]},
            {"curveTo": [3.5, 15.5, 3.5, 16]}, {"lineTo": [3.5, 17.5]}],
            [{"moveTo": [16.5, 15.5]}, {"lineTo": [16, 15.5]},
            {"curveTo": [15.5, 15.5, 15.5, 16]}, {"lineTo": [15.5, 17.5]}],        
            [{"moveTo": [5.5, 15.5]}, {"lineTo": [7.5, 15.5]}],
            [{"moveTo": [11.5, 15.5]}, {"lineTo": [13.5, 15.5]}],            
            [{"moveTo": [2.5, 19.5]}, {"lineTo": [5, 19.5]},
            {"curveTo": [5.5, 19.5, 5.5, 19]}, {"lineTo": [5.5, 17.5]}],
            [{"moveTo": [5.5, 19]}, {"curveTo": [5.5, 19.5, 6, 19.5]},
            {"lineTo": [7.5, 19.5]}],        
            [{"moveTo": [11.5, 19.5]}, {"lineTo": [13, 19.5]},
            {"curveTo": [13.5, 19.5, 13.5, 19]}, {"lineTo": [13.5, 17.5]}],
            [{"moveTo": [13.5, 19]}, {"curveTo": [13.5, 19.5, 14, 19.5]},
            {"lineTo": [16.5, 19.5]}],        
            [{"moveTo": [7.5, 13.5]}, {"lineTo": [9, 13.5]},
            {"curveTo": [9.5, 13.5, 9.5, 14]}, {"lineTo": [9.5, 15.5]}],
            [{"moveTo": [9.5, 14]}, {"curveTo": [9.5, 13.5, 10, 13.5]},
            {"lineTo": [11.5, 13.5]}],        
            [{"moveTo": [7.5, 17.5]}, {"lineTo": [9, 17.5]},
            {"curveTo": [9.5, 17.5, 9.5, 18]}, {"lineTo": [9.5, 19.5]}],
            [{"moveTo": [9.5, 18]}, {"curveTo": [9.5, 17.5, 10, 17.5]},
            {"lineTo": [11.5, 17.5]}],        
            [{"moveTo": [8.5, 9.5]}, {"lineTo": [8, 9.5]}, {"curveTo": [7.5, 9.5, 7.5, 10]},
            {"lineTo": [7.5, 11]}, {"curveTo": [7.5, 11.5, 8, 11.5]},
            {"lineTo": [11, 11.5]}, {"curveTo": [11.5, 11.5, 11.5, 11]},
            {"lineTo": [11.5, 10]}, {"curveTo": [11.5, 9.5, 11, 9.5]},
            {"lineTo": [10.5, 9.5]}]
        ];
   }

   drawLines(gameScene)
   {        
        var scale = this.SCALE;
        this.WALLS.forEach(function(line)
        {
            let fieldLine = new PIXI.Graphics();
            fieldLine.lineStyle(4, 0x0000ff);
            line.forEach(function(drawing)
            {
                var prop = Object.keys(drawing)[0];
                var funcArgs = [];
                drawing[prop].forEach(function(point)
                {
                    funcArgs.push(scale * point);
                });

                if (prop === "curveTo")
                {
                    fieldLine.quadraticCurveTo(funcArgs[0], funcArgs[1], funcArgs[2], funcArgs[3]);
                }
                else
                {
                    fieldLine[prop](funcArgs[0], funcArgs[1]);
                }
            });            

            gameScene.addChild(fieldLine);
        });        
   }

   getNextElement(x, y, vx, vy)
   {
       var mapX = Math.round((x + 10 + 4 * vx)/this.SCALE) - 1;
       var mapY = Math.round((y + 10 + 4 * vy)/this.SCALE) - 1;
       return this.MAP[mapY][mapX];
   }

   // Проход через туннель        
   checkTunnel(x, y)
   {
        if (y == this.SCALE * 10 + 10)
        {
            if (x < 0)
            {
                return 19 * this.SCALE;
            }
            else if (x > 19 * this.SCALE)
            {
                return 0;
            }
        }
        
        return x;
   }
}