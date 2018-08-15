class RevivePromotion extends eui.Component implements eui.UIComponent {

    private btnGoHome:eui.Button;
    private btnWantReviveCard:eui.Button;

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
        this.btnWantReviveCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareClk, this);
    }

    private onGoHome(e:egret.Event) {
        Game.instance().gameView.hide();
        Game.instance().gameScene.gotoMenu();
    }

    private shareClk(e:egret.Event) {
        WxApi.shareAppMessage(1);
    }
}