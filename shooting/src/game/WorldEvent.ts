/**
 * Created by wuhuiran on 2018/7/21.
 */

/**
 * 监控物理世界,抛出特定的事件(比赛结束,
 */
class WorldEvent extends egret.EventDispatcher {

    private _world:p2.World;
    private _bodies:number[];
    private _ballId:number;
    private _scoreId:number;
    private _starId:number;
    private _passIdIndex:number;

    private _contactMatrix:number[];
    private _scoreEvent:egret.Event;
    private _starEvent:egret.Event;
    private _gameOverEvent:egret.Event;
    private _status:number;
    private _waitEvent:boolean;

    constructor(world:p2.World) {
        super();

        this._world = world;

        this._bodies = [];
        this._ballId = -1;
        this._scoreId = -1;
        this._starId = -1;
        this._passIdIndex = -1;

        this._scoreEvent = new egret.Event("GAME_SCORE");
        this._gameOverEvent = new egret.Event("GAME_OVER");
        this._starEvent = new egret.Event("GAME_STAR");
        this._status = 0;
        this._waitEvent = false;

        this.listenEvent();
    }

    // 判断求的位置是否超出了舞台,如果超出则游戏结束
    // 抛出结束事件,由上层处理重试、复活等逻辑
    public judgeLose(p2_x:number, p2_y:number):void {

        var pointP2:egret.Point = new egret.Point(p2_x, p2_y);

        var stagePoint:egret.Point = utils.p2PointToStage(pointP2);
        if (stagePoint.x < 0 ||
            stagePoint.x > egret.MainContext.instance.stage.stageWidth ||
            stagePoint.y > egret.MainContext.instance.stage.stageHeight) {

            // 球超出了舞台范围 , 游戏结束
            this.dispatchEvent(this._gameOverEvent);
        }
    }

    /**
     * 设置需要监控的Body
     * 当触发指定的碰撞关系时,抛出整个过程的碰撞关系
     */
    public setMonitorBody(bodyIds:number[]):void {
        this._bodies = bodyIds;
        this._contactMatrix = new Array(bodyIds.length);
        for (var i:number = 0; i < bodyIds.length; i++) {
            this._contactMatrix[i] = 0;
        }
    }

    /**
     * 设置球,球网,碰撞线的id
     * 该三个参数用于得分判定
     *
     * @param ballId
     * @param scoreId
     * @param passId
     */
    public setBallAndNetId(ballId:number, scoreId:number, passId:number) {

        this._ballId = ballId;
        this._scoreId = scoreId;
        this._passIdIndex = this._bodies.indexOf(passId);
    }

    /**
     * 设置星星id
     * 星星碰撞之后消失
     * @param starId
     */
    public setStarId(starId:number) {
        this._starId = starId;
    }

    public listenEvent() {
        this._world.on("beginContact", this.contact);
    }

    public setStatus(st:number) {
        this._status = st;
        if (st) {
            this._waitEvent = true;
        }
        for (var i:number = 0; i < this._contactMatrix.length; i++) {
            this._contactMatrix[i] = 0;
        }
    }

    contact = (evt) => {
        if (!this._status || !this._waitEvent) {
            return;
        }

        var bodyA:p2.Body = evt.bodyA;
        var bodyB:p2.Body = evt.bodyB;

        if (!bodyA || !bodyB) {
            return;
        }
        var bodyIdA = bodyA.id;
        var bodyIdB = bodyB.id;


        if (bodyIdA != this._ballId && bodyIdB != this._ballId) {
            return;
        }
        let tbody = bodyB;
        if (bodyIdB == this._ballId) {
            var tmp:number = bodyIdA;
            bodyIdA = bodyIdB;
            bodyIdB = tmp;
            tbody = bodyA;
        }

        var index:number = this._bodies.indexOf(bodyIdB);
        if (index < 0) {
            return;
        }

        // console.log("a:"+bodyIdA + ",b:"+bodyIdB);
        // 是否触发了目标监控body碰撞
        if (bodyIdB == this._scoreId) {
            // 抛出事件,通知上层处理(球触网得分)
            if (this._contactMatrix[this._passIdIndex] == 1) {
                this._waitEvent = false;

                this._scoreEvent.data = this._contactMatrix;
                this.dispatchEvent(this._scoreEvent);
            }
        }
        else{
            if (bodyIdB == this._starId) {
                // 碰到星星了
                this._starEvent.data = tbody;
                this.dispatchEvent(this._starEvent);
            }
            //用于计算分数
            this._contactMatrix[index] = 1;
        }
    }
}