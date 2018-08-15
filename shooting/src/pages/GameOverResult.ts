class GameOverResult extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	private resultScoreTxt:eui.Label;
	private headGrp:eui.Group;
	private lookRankBtn:eui.Button;
	private playAgainBtn:eui.Button;
	private gotoMenuBtn:eui.Button;
	private fightBtn:eui.Button;
	private listArr:Array<egret.Sprite>;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init(){
		this.resultScoreTxt.text = ''+Account.GetInstance().getScore();
		//创建头像list
		this.listArr = [];
		for(let i =0;i<3;i++){
			let sprite = new egret.Sprite;
			let text1 = new egret.TextField();
			text1.size = 34;
			text1.textColor = 0x65b5f7;
			text1.text = (i+1)+'';
			text1.textAlign = 'center';
			text1.width = 100;
			sprite.addChild(text1);
			let image = new egret.Sprite;
			image.x = 10;
			image.y = 50;
			sprite.addChild(image);
			let text2 = new egret.TextField();
			text2.size = 34;
			text2.textColor = 0xf76565;
			text2.text = '0';
			text2.textAlign = 'center';
			text2.width = 100;
			text2.bold = true;
			text2.y = 150;
			sprite.addChild(text2);
			sprite.x = i*180;
			this.headGrp.addChild(sprite);
			this.listArr.push(sprite);
		}

		this.lookRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			Game.instance().gameView.showPage(GameView.PAGE.RANK);
		},this);

		this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			Game.instance().gameView.hide();
			Game.instance().gameScene.gotoGame();
		},this);

		this.gotoMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			Game.instance().gameView.hide();
			Game.instance().gameScene.gotoMenu();
		},this);

		this.fightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			WxApi.shareAppMessage(2);
		},this);
	}

	public setData(){
		this.resultScoreTxt.text = ''+Account.GetInstance().getScore();
		Account.GetInstance().getRank(1,3,data=>{
			if(data.stat == 200){
				this.refreshList(data.data.list);
			}
		},this);
	}

	private refreshList(arr){
		if(!arr || !arr.length) return;
		for(let i = 0;i < 3;i++){
			let obj = arr[i];
			if(!obj){
				this.listArr[i].visible = false;
				continue;
			}
			this.listArr[i].visible = true;
			let headImg = <egret.Sprite>this.listArr[i].getChildAt(1);
			headImg.removeChildren();
			if(utils.isUrl(obj.avatarUrl)){
				let bitmap = utils.createBitmapByUrl(obj.avatarUrl);
				bitmap.width = 80;
				bitmap.height = 80;
				headImg.addChild(bitmap);
			}
			this.listArr[i].getChildAt(2)['text'] = obj.topScore;
		}
	}
	
}