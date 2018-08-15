class StarPanel extends eui.Component implements eui.UIComponent {
    private labelStarNum:eui.Label;

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

    }

    /**
     * 设置星星数量
     * @param num
     */
    public setStarNum(num:number) {
        this.labelStarNum.text = num.toString();
    }
}