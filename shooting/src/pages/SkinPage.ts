class SkinPage extends eui.Component implements eui.UIComponent {
    private btnGoHome:eui.Button;

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
    }

    private onGoHome(e:egret.Event) {
        Game.instance().gameScene.gotoMenu();
    }
}