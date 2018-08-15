import Utils = p2.Utils;
/**
 * Created by wuhuiran on 2018/7/19.
 */

class MainGame extends egret.DisplayObjectContainer{
    private _timestamp:number = 0;
    private _offsetY:number;

    private _background:StageBackground = null;

    private _ball:Ball = null;
    private _world:p2.World = null;
    private _stageWidth:number = 0;
    private _stageHeight:number = 0;

    private _floor:Floor;
    private _basket1:Basket;
    private _basket2:Basket;
    private _basketBack1:BasketBack;
    private _basketBack2:BasketBack;

    private _scorePanel:ScorePanel;
    private _starNumPanel:StarPanel;
    private _btnPause:egret.Bitmap;
    //星星数组
    private starBodies:Array<StarBody>;

    // 轨迹线容器面板
    private _trackBoard:egret.Shape;
    private _debugBoard:egret.Shape;

    // 事件通知
    private _worldEvent:WorldEvent = null;
    private points = {start: new egret.Point(0, 0), end: new egret.Point(0, 0)};
    //设置拖拽最大距离
    private dragDistanceX:number = 100;
    private dragDistanceY:number = 100;
    //为了防止多次派发事件写个时间限制
    private isStartDrag:boolean = false;

    private _mapDisableBody:{[key:string]:boolean};

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.init,this);
    }

    private init(){
        let background:StageBackground = new StageBackground();
        background.x = 0;
        background.y = 0;
        this.addChild(background);
        this._background = background;
        this._offsetY = 0;
        this._stageWidth = egret.MainContext.instance.stage.stageWidth;
        this._stageHeight = egret.MainContext.instance.stage.stageHeight;
        this._mapDisableBody = {};
        // 创建物理世界
        this._world = new p2.World();
        this._world.gravity = [0, Constants.WORLD_GRAVITY];
        //默认所有弹性
        this._world.defaultContactMaterial.restitution = 0.5;
        //不同材质的系数
        let m1 = new p2.Material(Constants.BALL_MATERIAL); 
        let m2 = new p2.Material(Constants.NET_MATERIAL);
        let m3 = new p2.Material(Constants.BASKET_MATERIAL);        
        let m1_m2 = new p2.ContactMaterial(m1,m2,<p2.ContactMaterialOptions>{restitution:0.01,friction:0});
        this._world.addContactMaterial(m1_m2);
        let m1_m3 = new p2.ContactMaterial(m1,m3,<p2.ContactMaterialOptions>{restitution:0.6,friction:0.3});
        this._world.addContactMaterial(m1_m3);

        // 创建轨迹线画板
        this._trackBoard = new egret.Shape();
        this.addChild(this._trackBoard);

        this._debugBoard = new egret.Shape();
        // this.addChild(this._debugBoard);

        this._floor = new Floor();
        // this._floor.loadConfig();
        // 得分显示
        this.createScorePanel();
        // 星星显示
        this.createStarPanel();
        // 创建主页按钮
        this.createPauseButton();
        //basket
        this.createBasket(Constants.BODY_ID.BASKET_1);
        this.createBasket(Constants.BODY_ID.BASKET_2);

        // 创建球
        if (!this._ball) {
            var basketPos:egret.Point = new egret.Point(this._basket1.x, this._basket1.y);
            // var ballPos:egret.Point = utils.stagePointToP2(basketPos);
            this._ball = new Ball({mass: Constants.BALL_MASS,angularVelocity:1}, Constants.BODY_ID.BALL);
            this._ball.resetPosition(basketPos.x,basketPos.y);
        }

        this._world.addBody(this._ball);
        // this.addChild(this._ball.debugDisplay());
        this.addChild(this._ball.display());
        this._world.sleepMode = p2.World.BODY_SLEEPING;

        // 设置深度
        this.setChildIndex(this._basketBack1, 100);
        this.setChildIndex(this._basketBack2, 99);
        this.setChildIndex(this._ball.display(), 98);
        this.setChildIndex(this._basket1, 97);
        this.setChildIndex(this._basket2, 96);

        // 创建两侧护板
        this.createBorder();
        //监听拖拽
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchBegin, this);
        this.touchEnabled = true;

        // 监听碰撞
        this._worldEvent = new WorldEvent(this._world);
        this._worldEvent.listenEvent();
        this._worldEvent.addEventListener("GAME_SCORE", this.gameScore, this);
        this._worldEvent.addEventListener("GAME_OVER", this.gameOver, this);
        this._worldEvent.addEventListener("GAME_STAR", this.gameStarContact, this);
        this.monitorBody();

        this.createStar();
    }

    /**
     * 创建得分显示面板
     * 显示当前得分
     * 显示双倍剩余次数
     */
    private createScorePanel() {
        this._scorePanel = new ScorePanel();
        this.addChild(this._scorePanel);
        this._scorePanel.anchorOffsetX = this._scorePanel.width / 2;
        this._scorePanel.anchorOffsetY = 0;
        this._scorePanel.x = Game.instance().gameStage.stageWidth / 2;
        this._scorePanel.y = 110;
    }

    /**
     * 创建星星数量显示面板
     * 包含一个可点击按钮
     */
    private createStarPanel() {
        this._starNumPanel = new StarPanel();
        this.addChild(this._starNumPanel);
        this._starNumPanel.x = (Game.instance().gameStage.stageWidth - this._starNumPanel.width)/2 + 120;
        this._starNumPanel.y = 10;

        let starNum:number = Account.GetInstance().addStar(0);
        this._starNumPanel.setStarNum(starNum);
    }

    // 创建主页按钮
    private createPauseButton() {
        this._btnPause = utils.createBitmapByName("main_png");
        this._btnPause.x = 20;
        this._btnPause.y = 12;
        this._btnPause.touchEnabled = true;
        this.addChild(this._btnPause);
        this._btnPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHome, this);
        this.setChildIndex(this._btnPause, 100000);
    }
    //创建篮筐
    private createBasket(id:number){
        var floorCnf = this._floor.nextFloor();
        var basket:Basket = new Basket(id);
        basket.createView(floorCnf);
        this.addChild(basket);
        basket.createBody();
        basket.anchorOffsetX = basket.width/2;
        basket.anchorOffsetY = basket.height/2;
        var bodies:p2.Body[] = basket.getBodies();
        for (var i:number = 0; i < bodies.length; i++) {
            this._world.addBody(bodies[i]);
        }
        // 篮筐底部
        let basketBack = new BasketBack(basket);
        this.addChild(basketBack);
        basketBack.resetPosition();
        basket.setBasketBack(basketBack);
        if(id == Constants.BODY_ID.BASKET_1){
            this._basket1 = basket;
            this._basketBack1 = basketBack;
        }
        else if(id == Constants.BODY_ID.BASKET_2){
            this._basket2 = basket;
            this._basketBack2 = basketBack;
        }
    }
    //create star 星星逻辑是 未碰到则消失
    private createStar(){
        this.removeStar();
        if(!this._floor.currentConfig.isStar) return;
        let starbody = new StarBody();
        let display = starbody.displays[0];
        let angle = this._basket2.rotation*Math.PI/180;
        let distance = 250 - 100*Math.random();
        let xx = this._basket2.x + distance*Math.sin(angle);
        let yy = this._basket2.y - distance*Math.cos(angle);
        let pot = this.localToGlobal(xx,yy);
        starbody.updatePosition(pot.x,pot.y);
        display.alpha = 0;
        this.addChild(display);
        egret.Tween.get(display).to({alpha:1},400);
        this._world.addBody(starbody);
        this.starBodies.push(starbody);
    }
    //移除星星
    private removeStar(){
        if(!this.starBodies || this.starBodies.length == 0){
            this.starBodies = [];
            return;
        }
        let body = this.starBodies.pop();
        this.starBodies = [];
        let display = body.displays[0];
        egret.Tween.get(display).to({alpha:0},200).call(()=>{
            this.removeChild(display);
            this._world.removeBody(body);
        });
    }

    private TouchBegin(event:egret.TouchEvent):void {
        let evt = {};
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.isStartDrag = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchBegin, this);
            this.points.start.x = event.stageX;
            this.points.start.y = event.stageY;
            evt["data"] = {
                start: this.points.start,
                end: this.points.end
            }
            this.startDrag(evt);
        } else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            if(!this.isStartDrag){
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchBegin, this);
                return;
            }
            this.points.end.x = event.stageX;
            this.points.end.y = event.stageY;
            this.calEnd();
            evt["data"] = {
                start: this.points.start,
                end: this.points.end
            };
            this.drag(evt);
        } else if(event.type == egret.TouchEvent.TOUCH_END){
            if(!this.isStartDrag){
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchBegin, this);
                return;
            }
            
            this.points.end.x = event.stageX;
            this.points.end.y = event.stageY;
            if(!this.calEnd()) return;
            evt["data"] = {
                start: this.points.start,
                end: this.points.end
            };
            this.shoot(evt);
        }

        // console.log(event.type + "=>end:"+(this.points.end.x - this.points.start.x)+","+(this.points.end.y - this.points.start.y));
    }

    private calEnd() {
        let dx = this.points.end.x - this.points.start.x;
        let dy = this.points.end.y - this.points.start.y;
        if(Math.abs(dx) > this.dragDistanceX){  
            this.points.end.x = this.points.start.x + this.dragDistanceX*dx/Math.abs(dx);
        }
        else if(Math.abs(dx) < 2){
            this.points.end.x = this.points.start.x;
        }
        
        if(Math.abs(dy) > this.dragDistanceY){
            this.points.end.y = this.points.start.y + this.dragDistanceY*dy/Math.abs(dy);
        }
        else if(Math.abs(dy) < 2){
            this.points.end.y = this.points.start.y;
        }

        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) return false;

        return true;
    }

    //复活卡继续游戏
    public continueGame() {
        this._basketBack1.resetPosition();
        this._basketBack2.resetPosition();
        this._ball.resetStatus();
        var basketPos:egret.Point = new egret.Point(this._basket1.x, this._basket1.y);
        this._ball.resetPosition(basketPos.x, basketPos.y);
        // 清除轨迹线
        this._trackBoard.graphics.clear();
    }
    //重新开始游戏
    public restartGame(){
        this.stop();
        this.stopAllBody();
        Account.GetInstance().resetScore();
        this._trackBoard.graphics.clear();
        this._debugBoard.graphics.clear();
        let starNum:number = Account.GetInstance().addStar(0);
        this._starNumPanel.setStarNum(starNum);
        this._scorePanel.setDoubleTimes(Account.GetInstance().getDoubleScoreTimes());
        this._scorePanel.setScore(0);

        this._floor.restart();
        let cnf1 = this._floor.nextFloor();
        cnf1.y = Game.instance().gameStage.stageHeight/2 - cnf1.y + 100;
        this._basket1.reset(cnf1);
        this._basketBack1.resetPosition();
        let cnf2 = this._floor.nextFloor();
        cnf2.y = Game.instance().gameStage.stageHeight/2 - cnf2.y + 100;
        this._basket2.reset(cnf2);
        this._basketBack2.resetPosition();
        //重置球
        this._ball.resetStatus();
        var basketPos:egret.Point = new egret.Point(this._basket1.x, this._basket1.y);
        this._ball.resetPosition(basketPos.x, basketPos.y);

        this.createStar();

        this.removeChild(this._background);
        this._background = new StageBackground();
        this.addChildAt(this._background,0);
    }

    //创建两侧护板
    public createBorder() {
        var leftBoxShape:p2.Shape = new p2.Box({
            width: 1000 / Constants.FACTOR, height: this._stageHeight * 2 / Constants.FACTOR,
            material: new p2.Material(3)
        });
        var leftBoxBody:p2.Body = new p2.Body({
            mass: 0,
            position: [-500 / Constants.FACTOR, this._stageHeight / 2 / Constants.FACTOR]
        });
        leftBoxBody.addShape(leftBoxShape);
        leftBoxBody.displays = [];
        leftBoxBody.id = Constants.BODY_ID.LEFT_BORDER;
        this._world.addBody(leftBoxBody);

        var rightBoxShape:p2.Shape = new p2.Box({
            width: 1000 / Constants.FACTOR, height: this._stageHeight * 2 / Constants.FACTOR,
            material: new p2.Material(4)
        });
        var rightBoxBody:p2.Body = new p2.Body({
            mass: 0,
            position: [(this._stageWidth + 500) / Constants.FACTOR, this._stageHeight / 2 / Constants.FACTOR]
        });
        rightBoxBody.addShape(rightBoxShape);
        rightBoxBody.displays = [];
        rightBoxBody.id = Constants.BODY_ID.RIGHT_BORDER;
        this._world.addBody(rightBoxBody);

        this._world.addContactMaterial(new p2.ContactMaterial(leftBoxShape.material, this._ball.getShape().material, <p2.ContactMaterialOptions>{
            restitution: 0,
            stiffness: 999999999,
            relaxation: 0.2,
            friction: 0.3
        }));
        this._world.addContactMaterial(new p2.ContactMaterial(rightBoxShape.material, this._ball.getShape().material, <p2.ContactMaterialOptions>{
            restitution: 0,
            stiffness: 999999999,
            relaxation: 0.2,
            friction: 0.3
        }));
    }

    //运行,设置tick监听
    public run():void {
        egret.startTick(this.loop, this);
    }
    //停止
    public stop():void {
        egret.stopTick(this.loop, this);
        this._timestamp = 0;
    }

    private loop(timestamp:number):boolean {
        var pass = 40;
        if (this._timestamp > 0) {
            pass = timestamp - this._timestamp;
        }

        this._timestamp = timestamp;
        if (pass < 10) {
            return;
        }

        if (pass > 1000) {
            return;
        }

        this.step(pass);
    }

    private step(dt):void 
    {
        this._world.step(dt / 1000);
        var l = this._world.bodies.length;
        for (var i = 0; i < l; i++) {
            var boxBody = this._world.bodies[i];
            var box = boxBody.displays[0];
            if (boxBody instanceof Ball) {
                (<Ball>boxBody).updateDisplayPosition();
                var x:number = boxBody.position[0] * Constants.FACTOR;
                var y:number = egret.MainContext.instance.stage.stageHeight - boxBody.position[1] * Constants.FACTOR;
                this._debugBoard.graphics.beginFill(0x000000);
                this._debugBoard.graphics.drawCircle(x, y, 5);
                this._debugBoard.graphics.endFill();
                // 判断球是否超出边界, 控制游戏结束
                this._worldEvent.judgeLose(boxBody.position[0], boxBody.position[1]);
            } else if (box && box.parent instanceof Basket) {
                var x:number = (boxBody.position[0] * Constants.FACTOR);
                var y:number = (this._stageHeight - boxBody.position[1] * Constants.FACTOR);
                var pt = (<Basket>(box.parent)).globalToLocal(x, y);
                box.x = pt.x;
                box.y = pt.y;
            } else if(boxBody instanceof StarBody){
                this._worldEvent.judgeLose(boxBody.position[0], boxBody.position[1]);
            }
            else{
                if (box) {
                    box.x = boxBody.position[0] * Constants.FACTOR;
                    box.y = this._stageHeight - boxBody.position[1] * Constants.FACTOR;
                    box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 1;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        }
    }
    
    /**
     * 开始拖动(TouchBegin)
     * 记录初始位置, 在移动过程中计算位置
     * @param e
     */
    private startDrag(e) {
    if (this._ball.getStatus() == Ball.STATUS.FLY) {
            return;
        }
        this._trackBoard.graphics.clear();
        // 停止所有的刚体运行
        this.stopAllBody();
        // 设置球状态, 记录球位置
        this._ball.startDrag();
    }

    /**
     * 拖动过程
     * 模拟并画出轨迹线
     * @param e
     */
    private drag(e) {
        if (this._ball.getStatus() == Ball.STATUS.FLY) {
            return;
        }

        // 停止正常tick监听
        this.stop();
        this._worldEvent.setStatus(0);

        // 停止所有的刚体运行
        this.stopAllBody();
        // 根据位移,移动刚体位置,模拟并画出轨迹线
        this._ball.drag(e.data.start, e.data.end);
        this._basket1.drag(e.data.start, e.data.end);
        this._basketBack1.drag(e.data.start, e.data.end);
        // 模拟运动
        this.simulate_move();
        // 画出轨迹线
        this._trackBoard.graphics.clear();
        var points = this._ball.getTrackPoints();
        for (var i:number = 0; i < points.length; i++) {
            this._trackBoard.graphics.beginFill(0xFFFFFF);
            this._trackBoard.graphics.drawCircle(points[i].x, points[i].y, 15-i);
            this._trackBoard.graphics.endFill();
        }
    }

    /**
     * 发射球
     * @param e
     */
    private shoot(e) {
        if (this._ball.getStatus() == Ball.STATUS.FLY || !this._ball.isCanShoot()) {
            // this.points.start.x = this.points.end.x = 0;
            // this.points.start.y = this.points.end.y = 0;
            return;
        }
        
        this._debugBoard.graphics.clear();
        this._trackBoard.graphics.clear();
        // 停止刚体(模拟状态下可能会有刚体在碰撞)
        this.stopAllBody();

        this._worldEvent.setStatus(1);
        //篮筐角度更新 避免没有执行drag的情况
        this._basketBack1.drag(e.data.start, e.data.end);
        this.run();
        this._ball.velocity = [0,0];
        // 释放球
        this._ball.shoot();
        // 篮筐释放球,恢复形状
        this._basket1.shoot();
    }

    /**
     * 模拟运动
     */
    private simulate_move():void {
        this.setAllCollisionStatus(false);
        for (var i:number = 0; i < 10; i++) {
            this._world.step(40 / 1000);
            // 记录位置
            this._ball.updateDisplayPosition();
        }
        this.setAllCollisionStatus();
    }

    /**
     * 强制停止所有的刚体运动
     */
    private stopAllBody():void {
        var l = this._world.bodies.length;
        for (var i:number = 0; i < l; i++) {
            var boxBody:p2.Body = this._world.bodies[i];
            if (boxBody) {
                boxBody.sleep();
            }
        }
    }

    private monitorBody() {
        /**
         * 1, 只判断和上面篮筐和场景左右两侧护板的碰撞
         * 2, 1-进球, 2,反弹, 3非空心
         */
        /**
         *         球 左板 右板 下左点 下右点 下网  上左点 上右点 上网
         **********1   5   6    101   102   103   201   202   203
         球     1  0   2   2     1      1    0     3      3    1
         */
        var bodyIds:number[] = [Constants.BODY_ID.LEFT_BORDER,
            Constants.BODY_ID.RIGHT_BORDER,
            Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.LEFT_POINT,
            Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.RIGHT_POINT,
            Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.NET,
            Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.TOPMASK,
            Constants.STAR_ID];

        this._worldEvent.setMonitorBody(bodyIds);
        this._worldEvent.setBallAndNetId(Constants.BODY_ID.BALL, Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.NET, Constants.BODY_ID.BASKET_2 + Constants.BODY_ID.TOPMASK);
        this._worldEvent.setStarId(Constants.STAR_ID);
    }

    /**
     * 游戏中得分
     * @param e
     */
    private gameScore(e:egret.Event) {
        var self = this;
        this.stop();
        // 清除轨迹线
        this._trackBoard.graphics.clear();
        this._debugBoard.graphics.clear();

        var contactMatrix:number[] = e.data;
        var scoreResult:{hole:boolean, rebound:boolean} = ScoreUtil.calScore(contactMatrix);
        if(scoreResult.hole){
            SoundManager.instance().playSound(1);
        }
        else{
            SoundManager.instance().playSound(0);
        }
        var score:number = Account.GetInstance().addScore(scoreResult);
        // 得分效果
        this._basket2.showEffect(scoreResult, score);
        // 得分面板显示
        this._scorePanel.setScore(Account.GetInstance().getScore());
        this._scorePanel.setDoubleTimes(Account.GetInstance().getDoubleScoreTimes());
        this.handleBasket();
    }

    //篮筐交换与重置
    private handleBasket(){
        var floorCnf:FloorConfig = this._floor.nextFloor();
        let y1 = this._basket2.y - floorCnf.y;
        //以舞台竖直中心线为两个篮筐之间的中心线进行计算（实际向下顺移100像素）
        let offsetY = Game.instance().gameStage.stageHeight/2 - this._basket2.y + floorCnf.y/2 + 100;
        floorCnf.y = y1;
        this._basket1.reset(floorCnf);
        this._basket1.changeBodyId(Constants.BODY_ID.BASKET_2);
        this._basket2.changeBodyId(Constants.BODY_ID.BASKET_1);
        this._basketBack1.resetPosition();
        this._basketBack2.resetPosition();
        // 交换篮筐对象
        var tmpBasket:Basket = this._basket2;
        this._basket2 = this._basket1;
        this._basket1 = tmpBasket;
        // 交换篮筐头部显示对象
        var tmpBasketBack:BasketBack = this._basketBack2;
        this._basketBack2 = this._basketBack1;
        this._basketBack1 = tmpBasketBack;
        // 背景滚动
        this._background.scroll(offsetY);
        // 篮筐滚动
        var tw1 = egret.Tween.get(this._basket1, {onChange: this.onBasketPosChange1, onChangeObj: this});
        var tw2 = egret.Tween.get(this._basket2, {onChange: this.onBasketPosChange2, onChangeObj: this});
        tw1.to({y: this._basket1.y + offsetY}, 500).call(()=> {
            this._basket1.repositionByDisplay();
            this._ball.resetPosition(this._basket1.x, this._basket1.y);
            // 重置球状态
            this._ball.resetStatus();
        });
        tw2.to({y: this._basket2.y + offsetY}, 500).call(()=>{
            this._basket2.repositionByDisplay();
            this._basket2.startMove();
            let ids = egret.setTimeout(()=>{
                egret.clearTimeout(ids);
                this.createStar();
            },this,200);
        });
    }

    /**
     * 球随篮筐缓动
     */
    private onBasketPosChange1() {
        this._ball.resetPosition(this._basket1.x, this._basket1.y);
        this._basketBack1.resetPosition();
    }

    private onBasketPosChange2() {
        this._basketBack2.resetPosition();
    }

    /**
     * 游戏失败
     * 1, 可选复活卡, 看视频广告复活
     * @param e
     */
    private gameOver(e:egret.Event) {
        // 清除轨迹线
        this._trackBoard.graphics.clear();
        this._debugBoard.graphics.clear();
        // FOR TEST
        this.stop();
        if (Account.GetInstance().getScore() <= 0) {
            this.continueGame();
            return;
        }

        Game.instance().gameView.showPage(GameView.PAGE.GAMEOVER);
    }

    // 碰撞星星信息
    private gameStarContact(e:egret.Event) {
        // 增加信息
        let pbody = e.data;
        if(!pbody) return;
        let display = pbody.displays[0];
        let tween = egret.Tween.get(display);
        tween.to({x:this._starNumPanel.x + display.width/2,y:this._starNumPanel.y + display.height/2},500).call(()=>{
            this.removeStar();
        });
        let starNum:number = Account.GetInstance().addStar(1);
        this._starNumPanel.setStarNum(starNum);
    }

    /**
     *回菜单
     * @param e
     */
    private goHome(e:egret.Event) {
        this.stop();
        this.stopAllBody();
        this.removeStar();
        Game.instance().gameScene.gotoMenu();
    }
    /**
     * 模拟运动期间 禁止任何碰撞
     */
    private setAllCollisionStatus(bool:boolean = true){
        let len = this._world.bodies.length;
        for (var i:number = 0; i < len; i++) {
            if (bool) {
                this._world.enableBodyCollision(this._ball, this._world.bodies[i]);
            }
            else{
                this._world.disableBodyCollision(this._ball,this._world.bodies[i]);
            }
        }
    }
    
}