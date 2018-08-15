class DoubleScorePage extends eui.Component implements eui.UIComponent {
    private btnGoHome:eui.Button;
    private btnWantDoubleScore:eui.Button;

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

        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

        this.btnGoHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoHome, this);
        this.btnWantDoubleScore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWatchVideoAd, this);
    }

    private onGoHome(e:egret.Event) {
        Game.instance().gameView.hide();
    }

    private onWatchVideoAd(e:egret.Event) {
        GameAdManager.GetInstance().createRewardedVideoAd("doublescore", (finished) => {
            if (finished) {
                Account.GetInstance().addItem("doubleScoreTime", 1);
                Account.GetInstance().updateInfo({});
            } else {

            }
        });
    }
}