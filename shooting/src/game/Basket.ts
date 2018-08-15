/**
 * Created by wuhuiran on 2018/7/19.
 */

class Basket extends egret.Sprite {

    private _bodies:p2.Body[];

    private _display:egret.DisplayObject;
    private _basketBack:BasketBack;

    private _leftShape:egret.DisplayObject;
    private _leftBody:p2.Body;

    private _rightShape:egret.DisplayObject;
    private _rightBody:p2.Body;

    private _netShape:egret.DisplayObject;
    private _netBody:p2.Body;

    private _topShape:egret.DisplayObject;
    private _topBody:p2.Body;

    private _id:number = 0;
    private _floorConfig:FloorConfig;

    private _oldHeight:number = 0;

    private _path:number[][] = [[-86, -51.5], [-79, -51.5], [-77.5, -49], [-64.5, -11], [-50.5, 13], [-40.5, 24], [-31, 31.5], [-19, 37.5], [-8, 40.5], [7, 40.5], [18, 37.5], [28, 32.5], [41, 22.5], [51.5, 10], [63.5, -11], [77.5, -51], [87, -51.5], [87.5, -48], [70.5, -2], [56.5, 22], [47.5, 32], [32, 43.5], [17, 49.5], [-14, 50.5], [-27, 46.5], [-41, 38.5], [-53, 27.5], [-60.5, 18], [-74.5, -9], [-88.5, -48], [-88.5, -51], [-87, -51.5]];


    constructor(id) {
        super();
        this._bodies = [];
        this._id = id;
        this._floorConfig = null;
    }

    /**
     * 创建精灵
     *
     * @param x
     * @param y
     */
    public createView(cnf:FloorConfig):boolean {
        this._floorConfig = cnf;
        this.x = cnf.x;
        this.y = Game.instance().gameStage.stageHeight/2 - cnf.y + 100;

        var showDebugShape:boolean = false;
        // 贴图
        var displayFront:egret.DisplayObject = utils.createBitmapByName("basket_front_png");
        displayFront.x = 0;
        displayFront.y = 0;
        displayFront.scaleX = Constants.BASKET_SIZEFACTOR;
        displayFront.scaleY = Constants.BASKET_SIZEFACTOR;
        this.addChild(displayFront);
        this._display = displayFront;

        // 创建左侧调试图形
        var leftShape:egret.Shape = utils.createBall(8);
        leftShape.x = 15;
        leftShape.y = 0;
        leftShape.name = 'left';
        leftShape.anchorOffsetX = leftShape.width / 2;
        leftShape.anchorOffsetY = leftShape.height / 2;
        leftShape.visible = showDebugShape;
        this.addChild(leftShape);
        this._leftShape = leftShape;

        // 右侧调试图形
        var rightShape:egret.Shape = utils.createBall(8);
        rightShape.x = Constants.BASKET_WIDTH - 15;
        rightShape.y = 0;
        rightShape.name = 'right';
        rightShape.anchorOffsetX = rightShape.width / 2;
        rightShape.anchorOffsetY = rightShape.height / 2;
        rightShape.visible = showDebugShape;
        this.addChild(rightShape);
        this._rightShape = rightShape;

        // 创建底部调试图形
        var netShape:egret.Shape = utils.createPolygon(this._path);
        netShape.x = netShape.width / 2 + 30;
        netShape.y = netShape.height / 2 + 25;
        netShape.anchorOffsetX = 0;
        netShape.anchorOffsetY = 0;
        netShape.name = 'net';
        netShape.visible = showDebugShape;
        this.addChild(netShape);
        this._netShape = netShape;

        // 创建顶部调试图形
        var topShape:egret.Shape = utils.createBox(this.width - 60, 20);
        topShape.x = this.width / 2;
        topShape.y = 30;
        topShape.anchorOffsetX = topShape.width / 2;
        topShape.anchorOffsetY = topShape.height / 2;
        this.addChild(topShape);
        topShape.visible = showDebugShape;
        this._topShape = topShape;

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.rotation = cnf.angle;

        return true;
    }

    public createBody():void {
        // 左侧刚体
        var pos:egret.Point = this.localToGlobal(this._leftShape.x, this._leftShape.y);
        var boxShape:p2.Shape = new p2.Circle({
            radius: this._leftShape.width / 2 / Constants.FACTOR,
            material: new p2.Material(Constants.BASKET_MATERIAL)
        });
        var boxBody:p2.Body = new p2.Body({
            mass: 0,
            position: [pos.x / Constants.FACTOR, (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR]
        });
        boxBody.displays = [this._leftShape];
        boxBody.addShape(boxShape);
        boxBody.id = this._id + Constants.BODY_ID.LEFT_POINT;
        this._bodies.push(boxBody);
        this._leftBody = boxBody;

        // 右侧刚体
        pos = this.localToGlobal(this._rightShape.x, this._rightShape.y);
        var boxShapeRight:p2.Shape = new p2.Circle({
            radius: this._rightShape.width / 2 / Constants.FACTOR,
            material: new p2.Material(Constants.BASKET_MATERIAL)
        });
        var boxBodyRight:p2.Body = new p2.Body({
            mass: 0,
            position: [pos.x / Constants.FACTOR, (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR]
        });
        boxBodyRight.displays = [this._rightShape];
        boxBodyRight.addShape(boxShapeRight);
        boxBodyRight.id = this._id + Constants.BODY_ID.RIGHT_POINT;
        this._bodies.push(boxBodyRight);
        this._rightBody = boxBodyRight;

        // 底部刚体
        pos = this.localToGlobal(this._netShape.x, this._netShape.y);
        for (var i:number = 0; i < this._path.length; i++) {
            this._path[i][0] = this._path[i][0] / Constants.FACTOR * Constants.BASKET_SIZEFACTOR;
            this._path[i][1] = -this._path[i][1] / Constants.FACTOR * Constants.BASKET_SIZEFACTOR;
        }

        var boxBodyNet:p2.Body = new p2.Body({
            mass: 0,
            position: [(pos.x) / Constants.FACTOR, (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR],
            material: new p2.Material(Constants.NET_MATERIAL)
        });
        boxBodyNet.fromPolygon(this._path);
        boxBodyNet.angle = -this.rotation * Math.PI / 180;
        boxBodyNet.displays = [this._netShape];
        boxBodyNet.id = this._id + Constants.BODY_ID.NET;
        this._bodies.push(boxBodyNet);
        this._netBody = boxBodyNet;

        // 顶部不反弹的刚体
        pos = this.localToGlobal(this._topShape.x, this._topShape.y);
        var boxShapeTop:p2.Shape = new p2.Box({
            width: this._topShape.width / Constants.FACTOR, height: this._topShape.height / Constants.FACTOR,
        });
        var boxBodyTop:p2.Body = new p2.Body({
            mass: 0,
            collisionResponse: false,
            position: [pos.x / Constants.FACTOR, (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR]
        });
        boxBodyTop.addShape(boxShapeTop);
        boxBodyTop.displays = [this._topShape];
        boxBodyTop.angle = -this.rotation * Math.PI / 180;
        boxBodyTop.id = this._id + Constants.BODY_ID.TOPMASK;
        this._bodies.push(boxBodyTop);
        this._topBody = boxBodyTop;
    }

    public setBasketBack(back:BasketBack) {
        this._basketBack = back;
    }

    public getBodies():p2.Body[] {
        return this._bodies;
    }

    /**
     * 根据display位置重新确定Body刚体位置
     * display位置已发生改变
     */
    public repositionByDisplay() {
        // 左侧碰撞点
        var pos:egret.Point = this.localToGlobal(this._leftShape.x, this._leftShape.y);
        this._leftBody.position[0] = pos.x / Constants.FACTOR;
        this._leftBody.position[1] = (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR;

        // 右侧碰撞点
        pos = this.localToGlobal(this._rightShape.x, this._rightShape.y);
        this._rightBody.position[0] = pos.x / Constants.FACTOR;
        this._rightBody.position[1] = (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR;

        // 篮筐
        pos = this.localToGlobal(this._netShape.x, this._netShape.y);
        this._netBody.position[0] = pos.x / Constants.FACTOR;
        this._netBody.position[1] = (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR;
        this._netBody.angle = -this.rotation * Math.PI / 180;

        // 碰撞线
        pos = this.localToGlobal(this._topShape.x, this._topShape.y);
        this._topBody.position[0] = pos.x / Constants.FACTOR;
        this._topBody.position[1] = (egret.MainContext.instance.stage.stageHeight - pos.y) / Constants.FACTOR;
        this._topBody.angle = -this.rotation * Math.PI / 180;
    }

    /**
     * 篮筐移动
     */
    public startMove():void {
        if (this._floorConfig.moveDirection <= 0) return;
        var self = this;
        var tw = egret.Tween.get(this, {loop: true, onChange: this.onBasketMove, onChangeObj: this});
        if (this._floorConfig.moveDirection == 1) {
            tw.to({x: this.x + 100}, 1000)
                .to({x: this.x}, 1000);
        } else if (this._floorConfig.moveDirection == 2) {
            tw.to({y: this.y + 100}, 1000)
                .to({y: this.y}, 1000);
        }
    }

    /**
     * 结束移动
     */
    private stopMove():void {
        egret.Tween.removeTweens(this);
    }

    /**
     * 篮筐Sprite缓动过程中,调整子元素的位置
     * @param obj
     */
    private onBasketMove(obj:any) {
        this.repositionByDisplay();
        this._basketBack.resetPosition();
    }

    public getNetBody():p2.Body {
        return this._netBody;
    }

    public getTopMaskBody():p2.Body {
        return this._topBody;
    }

    //重置篮筐
    public reset(cnf:FloorConfig):void {
        if (this._floorConfig.moveDirection > 0) {
            this.stopMove();
        }
        // 重置位置和角度
        this.x = cnf.x;
        this.y = cnf.y;
        this.rotation = cnf.angle;
        this.repositionByDisplay();

        this._floorConfig = cnf;
    }
    
    /**
     * 进球后,展示得分效果
     * @param score
     */
    public showEffect(scoreresult:{hole:boolean, rebound:boolean}, score:number):void {
        // 角度设置为0
        this.rotation = 0;
        // 停止缓动动画
        this.stopMove();
        this.repositionByDisplay();

        var text:string = '';
        if (scoreresult.hole && scoreresult.rebound) {
            text = "空心+反弹"
        } else if (scoreresult.hole) {
            text = "空心球";
        } else if (scoreresult.rebound) {
            text = "反弹球";
        }

        text += " +" + score + "分";

        var label:egret.TextField = new egret.TextField();
        var labelPos:egret.Point = this.globalToLocal(this.x, this.y - (this.height / 2 + 20));
        label.x = Constants.BASKET_WIDTH / 2;
        label.y = Constants.BASKET_HEIGHT / 2 - 80;
        label.text = text;
        label.anchorOffsetX = this.anchorOffsetX;
        label.anchorOffsetY = this.anchorOffsetY;
        this.addChild(label);

        var self = this;
        var tw = egret.Tween.get(label);
        tw.to({y: label.y - 50}, 1000).call(()=> {
            self.removeChild(label);
        });
    }

    public changeBodyId(id:number) {
        this._id = id;
        this._leftBody.id = id + Constants.BODY_ID.LEFT_POINT;
        this._rightBody.id = id + Constants.BODY_ID.RIGHT_POINT;
        this._netBody.id = id + Constants.BODY_ID.NET;
        this._topBody.id = id + Constants.BODY_ID.TOPMASK;
    }

    /**
     * 篮筐被拖拽
     * Y轴拉伸
     * 角度修改
     * @param start
     * @param end
     */
    public drag(start:egret.Point, end:egret.Point):void {

        this._oldHeight = this._display.height;
        var distance:number = utils.distance(start.x, start.y, end.x, end.y);
        var factor = Constants.BASKET_SIZEFACTOR + distance / this._display.height / 2;
        this._display.scaleY = factor;
    }

    public shoot() {
        this._display.scaleY = Constants.BASKET_SIZEFACTOR;
    }
}