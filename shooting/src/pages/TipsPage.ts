class TipsPage extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}
	private titleTxt:eui.Label;
	private tipImg:eui.Image;
	private goodBtn:eui.Button;
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.goodBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			Game.instance().gameView.hide();
		},this);
	}
	
}