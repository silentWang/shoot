class ScorePanel extends eui.Component implements eui.UIComponent {

    private labelDoubleTimes:eui.Label;
    private labelScore:eui.Label;

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
        this.labelDoubleTimes.visible = false;
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);

    }

    /**
     * 设置分数
     * @param score
     */
    public setScore(score:number) {
        this.labelScore.text = `${score}`;
    }

    /**
     * 设置双倍剩余次数
     */
    public setDoubleTimes(times:number) {
        this.labelDoubleTimes.text = '双倍剩余次数:'+times.toString();
    }
}