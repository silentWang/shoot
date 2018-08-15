class GameOverPannel extends eui.Component implements eui.UIComponent {
    private resultScoreTxt:eui.Label;
    private btnGameAgain:eui.Button;
    private jumpOutBtn:eui.Button;
    private lookVideobtn:eui.Button;
    private reviveCntTxt:eui.Label;

    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
    }

    protected partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated():void {
        super.childrenCreated();
    }

    protected onComplete(e):void {
        this.btnGameAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.jumpOutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            Game.instance().gameView.showPage(GameView.PAGE.RESULT);
            //更新score
            let score = Account.GetInstance().getScore();
            if(score > Account.GetInstance().userInfo.topScore){
                Account.GetInstance().updateInfo({"topScore":""+score});
                WxApi.setUserCloudStorage(score);
            }
        },this);
        this.lookVideobtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            WxApi.showModal('暂未开放');
        },this);
    }

    public setData(){
        this.resultScoreTxt.text = '' + Account.GetInstance().getScore();
        this.reviveCntTxt.text = `x${Account.GetInstance().userInfo.resurrectionCard}`;
    }

    restartGame = (e) => {
        //调接口
        let reviveNum = Account.GetInstance().userInfo.resurrectionCard;
        if(reviveNum <= 0){
            WxApi.showModal('复活卡不足');
        }
        else{
            let id = Account.GetInstance().userInfo.id;
            Account.GetInstance().updateReviveCard({"id":id+'',"type":"-1"},(res)=>{
                if(res.stat == 200){
                    reviveNum--;
                    Account.GetInstance().userInfo.resurrectionCard = reviveNum;
                    Game.instance().gameScene.mainGame.continueGame();
                    Game.instance().gameView.hide();
                }
            },this);
        }
    }
}