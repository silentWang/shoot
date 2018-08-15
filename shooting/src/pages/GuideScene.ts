class GuideScene extends eui.Component implements eui.UIComponent {
    private justbg:eui.Image;
    private btnStartGame:eui.Button;
    private btnRank:eui.Button;
    private btnMute:eui.CheckBox;
    private btnGroupRank:eui.Button;
    private btnSkin:eui.Button;
    private btnDoubleScore:eui.Button;
    private btnRevive:eui.Button;

    private labelDoubleScore:eui.Label;
    private labelReviveCard:eui.Label;

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
    }

    protected partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated():void {
        super.childrenCreated();

        this.width = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;
        //适配
        let systemInfo:any = WxApi.getSystemInfoSync();
        let shgt = Game.instance().gameStage.stageHeight;
        if(shgt > systemInfo.windowHeight){
            this.justbg.height = systemInfo.windowHeight*this.width/systemInfo.windowWidth;
            this.height = this.justbg.height;
        }
    }

    protected onComplete(e):void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        //暂时屏蔽双倍
        this.btnDoubleScore.visible = false;
        this.labelDoubleScore.visible = false;
        // 创建广告
        // wxApi.createBannerAd();
        GameAdManager.GetInstance().createBannerAd();
        this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRank, this);
        this.btnMute.addEventListener(eui.UIEvent.CHANGE, this.onMute, this);
        this.btnGroupRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupRank, this);
        this.btnSkin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkin, this);
        this.btnDoubleScore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoubleScore, this);
        this.btnRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRevive, this);

        this.labelReviveCard.touchEnabled = false;
        //先获取用户信息 然后是否授权 如果没授权 则授权后更新userinfo
        Account.GetInstance().getInfo(this.receiveAccountInfo.bind(this));
    }

    private receiveAccountInfo(data:any) {
        if(!data){
            WxApi.getSetting();
        }
        else{
            this.setSuccessBackInfo();
        }
    }
    //用户信息获取成功
    public setSuccessBackInfo(){
        let query = WxApi.getLaunchOptionsSync();
        console.log('启动参数：%o:',query);
        //从好友分享打开 各获得一张复活卡（注意这里必须授权）
        if(query && query.query && query.query.shareId){
            Account.GetInstance().updateReviveCard({"id":query.query.shareId,"type":"1"});
            Account.GetInstance().updateReviveCard({"id":Account.GetInstance().userInfo.id,"type":"1"},(res)=>{
                console.log('领卡结果:%o',res);
                if(res.stat == 200){
                    let cnt = Account.GetInstance().userInfo.resurrectionCard;
                    Account.GetInstance().userInfo.resurrectionCard = cnt + 1;
                    this.setData();
                }
            },this);
        }
        else{
            this.setData();
        }
        //开放作用域初始化
        let openDataContext = platform['openDataContext'];
        openDataContext.postMessage({
            command:'init',
            openid:Account.GetInstance().openId
        });
        //显示转发菜单
        WxApi.showShareMenu();

        let userinfo = Account.GetInstance().userInfo;
        console.log('这是我的userinfo %o:',userinfo);
    }

    setData(){
        let userinfo = Account.GetInstance().userInfo;
        if (!userinfo) {
            this.labelDoubleScore.text = "剩余0次";
            this.labelReviveCard.text = "(0/5)";
        } else {
            this.labelDoubleScore.text = "剩余" + userinfo.doubleScoreTime + "次";
            this.labelReviveCard.text = "(" + userinfo.resurrectionCard + "/5)";
        }
    }

    startGame = (e) => {
        Game.instance().gameScene.gotoGame();
    }

    onRank = (e) => {
        Game.instance().gameView.showPage(GameView.PAGE.RANK);
    }

    onMute = (e) => {
        SoundManager.instance().stopAll();
    }

    onGroupRank = (e) => {
        WxApi.shareAppMessage();
    }

    onSkin = (e) => {
        Game.instance().gameView.showPage(GameView.PAGE.TIPS);
        // Game.instance().gameView.showPage(GameView.PAGE.SKIN);
    }

    onDoubleScore = (e) => {

        Game.instance().gameView.showPage(GameView.PAGE.DOUBLESCORE);
    }

    onRevive = (e) => {
        Game.instance().gameView.showPage(GameView.PAGE.REVIVE);
    }

}