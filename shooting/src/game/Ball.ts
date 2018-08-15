/**
 * Created by wuhuiran on 2018/7/19.
 */

class Ball extends p2.Body {

    static STATUS = {
        FREE: 0,
        DRAG: 1,
        FLY: 2
    };

    private _display:egret.DisplayObject;
    private BALL_RADIUS:number = Constants.BASKET_SIZEFACTOR;
    private _ballShape:p2.Shape;
    //球拖拽起始位置
    private _startPosition:{x:number, y:number, angle:number};
    //球的显示对象的起始位置
    private _startDisplayPos:{x:number,y:number,angle:number};
    //
    private _currentDragPosition:{x:number, y:number, angle:number};

    private _status:number = Ball.STATUS.FREE; // 0-自由/1-拖动
    private _trackPoints:egret.Point[];
    private _velocity:{x:number, y:number};

    constructor(option:Object, id:number) {
        super(option);

        this.id = id;

        this._startPosition = {x: 0, y: 0, angle: 0};
        this._startDisplayPos = {x:0,y:0,angle:0};
        this._currentDragPosition = {x: 0, y: 0, angle: 0};
        this._velocity = {x: 0, y: 0};

        this._display = utils.createBitmapByName("flowerball_png");

        // 创建刚体
        var boxShape:p2.Shape = new p2.Circle({
            radius: this.BALL_RADIUS,
            material: new p2.Material(Constants.BALL_MATERIAL)
        });
        this.addShape(boxShape);
        this._ballShape = boxShape;
        this.sleepSpeedLimit = 0.01;
        this.sleepTimeLimit = 1;

        this._display.width = (<p2.Circle>boxShape).radius * 2 * Constants.FACTOR;
        this._display.height = (<p2.Circle>boxShape).radius * 2 * Constants.FACTOR;

        this._display.anchorOffsetX = this._display.width / 2;
        this._display.anchorOffsetY = this._display.height / 2;
        // 显示位置
        // this.updateDisplayPosition();
        this.displays = [this._display];
    }

    public display():egret.DisplayObject {
        return this._display;
    }

    public getShape():p2.Shape {
        return this._ballShape;
    }

    /**
     * 重置位置
     * @param x
     * @param y
     */
    public resetPosition(x:number, y:number) {
        this._display.x = x;
        this._display.y = y;

        this.position[0] = x / Constants.FACTOR;
        this.position[1] = (Game.instance().gameStage.stageHeight - y) / Constants.FACTOR;

        this._startPosition.x = this.position[0];
        this._startPosition.y = this.position[1];
        this._startPosition.angle = this.shapes[0].angle;

        this._startDisplayPos.x = this._display.x;
        this._startDisplayPos.y = this._display.y;
        // this._startDisplayPos.angle = this.shapes[0].angle*180/Math.PI;

        this._currentDragPosition.x = this.position[0];
        this._currentDragPosition.y = this.position[1];
        this._currentDragPosition.angle = this.shapes[0].angle;
    }

    /**
     * 重置刚体位置
     * @param x
     * @param y
     * @param rotation
     */
    public updateDisplayPosition() {
        var x:number = this.position[0] * Constants.FACTOR;
        var y:number = Game.instance().gameStage.stageHeight - this.position[1] * Constants.FACTOR;
        if (this._status == Ball.STATUS.FLY) {
            this._display.x = x;
            this._display.y = y;
            this._display.rotation = 360 - (this.angle + this.shapes[0].angle) * 180 / Math.PI;
        } else if (this._status == Ball.STATUS.DRAG) {
            var point:egret.Point = new egret.Point;
            point.x = x;
            point.y = y;
            this._trackPoints.push(point);
        }
        // 球是飞行状态,但是停止了,说明是落回了球网1
        if (this._status == Ball.STATUS.FLY) {
            if (this.sleepState == p2.Body.SLEEPING || this.sleepState == p2.Body.SLEEPY) {
                let arr = this.world.broadphase.result;
                let num = 0;
                for(let i = 0;i < arr.length;i++){
                    if(arr[i].id == Constants.BODY_ID.BALL){
                        num++;
                    }
                    if(arr[i].id == Constants.BODY_ID.BASKET_1 + Constants.BODY_ID.NET){
                        num++;
                    }
                    if(arr[i].id == Constants.BODY_ID.BASKET_1 + Constants.BODY_ID.TOPMASK){
                        num++;
                    }
                    
                }
                if(num >= 3){
                    console.log("sleepy and reset 了");
                    this.resetStatus();
                }
            }
        }
    }

    public isCanShoot(){
        let xx = Constants.FACTOR * Math.abs(this._currentDragPosition.x - this._startPosition.x);
        let yy = Constants.FACTOR * Math.abs(this._currentDragPosition.y - this._startPosition.y);
        if(yy <= 100 && xx <= 100 ){
            return true;
        }
        return false;
    }

    /**
     * 开始拖动,记录球的初始位置
     */
    public startDrag() {
        this._trackPoints = [];
        this.position[0] = this._startPosition.x;
        this.position[1] = this._startPosition.y;
        this.angle = this._startPosition.angle;
        this._display.x = this.position[0] * Constants.FACTOR;
        this._display.y = Game.instance().gameStage.stageHeight - this.position[1] * Constants.FACTOR;
        this._startDisplayPos.x = this._display.x;
        this._startDisplayPos.y = this._display.y;
    }

    /**
     * 拖动
     *
     * 1, 设置状态
     * 2, 设置显示位置
     * 3, 施加力
     * 4,
     * @param start
     * @param end
     */
    public drag(start:egret.Point, end:egret.Point) {
        this._status = Ball.STATUS.DRAG;
        this._trackPoints = [];

        var distanceX:number = end.x - start.x;
        var distanceY:number = end.y - start.y;
        //施加的力
        this._velocity.x = -distanceX * Constants.PRESS_RATIO;
        this._velocity.y = distanceY * Constants.PRESS_RATIO;

        // 移动球的显示位置 
        this._display.x = this._startDisplayPos.x + distanceX / 3;
        this._display.y = this._startDisplayPos.y + distanceY / 3;
        // 设置球的刚体位置
        this.position[0] = this._display.x/Constants.FACTOR;
        this.position[1] = (Game.instance().gameStage.stageHeight - this._display.y)/Constants.FACTOR;

        this._currentDragPosition.x = this.position[0];
        this._currentDragPosition.y = this.position[1];
        // 施加力
        this.applyImpulse([this._velocity.x, this._velocity.y], [0, 0]);
    }

    public shoot() {
        if(this._velocity.x == 0 && this._velocity.y == 0){
            this.resetStatus();
            return;
        }
        SoundManager.instance().playSound(2);
        this._status = Ball.STATUS.FLY;
        this.position[0] = this._startPosition.x;
        this.position[1] = this._startPosition.y;
        this._display.x = this._startDisplayPos.x;
        this._display.y = this._startDisplayPos.y;
        let delta = 0;
        if(this._velocity.x != 0){
            delta = this._velocity.x/Math.abs(this._velocity.x);
        }

        this.applyImpulse([this._velocity.x, this._velocity.y], [0.1*delta,0.1]);
        this._velocity.x = 0;
        this._velocity.y = 0;
    }

    public getTrackPoints():egret.Point[] {
        return this._trackPoints;
    }

    /**
     * 获取状态
     * @returns {number}
     */
    public getStatus() {
        return this._status;
    }

    public resetStatus() {
        this._status = Ball.STATUS.FREE;
        Game.instance().gameScene.mainGame.stop();
    }
}