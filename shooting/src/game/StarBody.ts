class StarBody extends p2.Body{
    constructor(){
        super();
        this.mass = 0;
        this.collisionResponse = false;
        this.id = Constants.STAR_ID;
        this.position = [0,0];
        this.init();
    }

    private starSprite:egret.Sprite;
    private starShape:p2.Shape;
    private init(){
        let bit = utils.createBitmapByName('star_png');
        this.starSprite = new egret.Sprite();
        this.starSprite.addChild(bit);
        this.starSprite.anchorOffsetX = this.starSprite.width/2;
        this.starSprite.anchorOffsetY = this.starSprite.height/2;

        let shape = new p2.Circle({
            radius:this.starSprite.width/2/Constants.FACTOR
        });
        this.addShape(shape);
        this.starShape = shape;

        this.displays = [this.starSprite];
    }
    //p2 position
    public updatePosition(x:number,y:number){
        this.starSprite.x = x;
        this.starSprite.y = y;
        this.position[0] = this.starSprite.x/Constants.FACTOR;
        this.position[1] = (Game.instance().gameStage.stageHeight - this.starSprite.y)/Constants.FACTOR;
        this.angle = -this.starSprite.rotation * Math.PI / 180;
    }

}