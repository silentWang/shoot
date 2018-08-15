
class GameView{
    static PAGE = {
        DOUBLESCORE: "double",
        REVIVE: "revive",
        RANK: "rank",
        SKIN: "skin",
        GAMEOVER: "gameover",
        TIPS:'tips',
        RESULT:'result'
    };

    private _displays:egret.DisplayObject[];
    private _blackBg:egret.Sprite;

    constructor() {
        this.init();
    }

    private init(){
        this._displays = [];
        // 添加背景(半透明)
        var background:egret.Shape = utils.createBox(Game.instance().gameStage.stageWidth, Game.instance().gameStage.stageHeight, 0x000000);
        background.x = 0;
        background.y = 0;
        background.alpha = 0.5;
        let spr = new egret.Sprite();
        spr.addChild(background);
        spr.touchEnabled = true;
        this._blackBg = spr;
        this._blackBg.touchEnabled = true;
        this._blackBg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

        // 双倍积分
        let display;
        display = new DoubleScorePage();
        display.name = GameView.PAGE.DOUBLESCORE;
        this._displays.push(display);

        // 复活
        display = new RevivePromotion();
        display.name = GameView.PAGE.REVIVE;
        this._displays.push(display);

        // 排行榜
        display = new RankPage();
        display.name = GameView.PAGE.RANK;
        this._displays.push(display);

        // 皮肤
        display = new SkinPage();
        display.name = GameView.PAGE.SKIN;
        this._displays.push(display);
        //tips
        display = new TipsPage();
        display.name = GameView.PAGE.TIPS;
        this._displays.push(display);

        //over
        display = new GameOverPannel();
        display.name = GameView.PAGE.GAMEOVER;
        this._displays.push(display);

        //result
        display = new GameOverResult();
        display.name = GameView.PAGE.RESULT;
        this._displays.push(display);
    }

    /**
     * 显示某page
     * @param page
     */
    public showPage(page:string) {
        this._blackBg.touchEnabled = true;
        for (var i:number = 0; i < this._displays.length; i++) {
            var display:egret.DisplayObject = this._displays[i];
            if (display.name == page) {
                Game.instance().addMiddle(this._blackBg);
                Game.instance().addMiddle(display,false);
                display.anchorOffsetX = display.width / 2;
                display.anchorOffsetY = display.height / 2;
                display.x = Game.instance().gameStage.stageWidth / 2;
                display.y = Game.instance().gameStage.stageHeight / 2;
                if(page == GameView.PAGE.GAMEOVER || page == GameView.PAGE.RESULT){
                    this._blackBg.touchEnabled = false;
                    display['setData']();
                }
                break;
            }
        }
    }
    /**
     * 隐藏
     */
    public hide() {
        Game.instance().middle.removeChildren();
    }
}
