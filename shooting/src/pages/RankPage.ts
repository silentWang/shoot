class RankPage extends eui.Component implements eui.UIComponent {
    private closeBtn:eui.Button;
    private radioBtn1:eui.RadioButton;
    private radioBtn2:eui.RadioButton;
    private listGrp:eui.Group;
    private lastBtn:eui.Button;
    private nextBtn:eui.Button;
    //radio组
    private radioGrp:eui.RadioButtonGroup;
    private worldSprite:egret.Sprite;
    private ownItem:RankItem;
    private worldArr:Array<RankItem>;

    private curPage:number = 1;
    private PAGE_SIZE:number = 7;
    private curSelect:number = 1;
    private openDataContext = platform['openDataContext'];
    private intervalId:number = 0;
    //世界排行默认最大页数 随服务器更新
    private TOTAL_PAGE:number = 10;

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
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoHome, this);
        //选项卡
        this.radioGrp = new eui.RadioButtonGroup();
        this.radioGrp.addEventListener(eui.UIEvent.CHANGE,this.radioChange,this);
        this.radioBtn1.group = this.radioGrp;
        this.radioBtn1.value = 1;//好友排行
        this.radioBtn2.group = this.radioGrp;
        this.radioBtn2.value = 2;//世界排行
        //页
        this.lastBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageHandler,this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageHandler,this);

        this.radioGrp.selectedValue = 1;
        this.curSelect = 1;

        this.createFriendList();
        
        this.worldArr = [];
        this.worldSprite = new egret.Sprite();
        for(let i = 0;i < 7;i++){
            let item = new RankItem();
            item.x = 0;
            item.y = (i%7)*86 - 10;
            this.worldSprite.addChild(item);
            this.worldArr.push(item);
        }
        this.ownItem = new RankItem();
        this.ownItem.x = 0;
        this.ownItem.y = 9*86 - 10;
        this.worldSprite.addChild(this.ownItem);
        this.ownItem.setData(Account.GetInstance().userInfo);
        // this.worldArr.push(item);
    }
    //朋友列表
    private createFriendList(){
        egret.clearInterval(this.intervalId);
        this.intervalId = egret.setInterval(()=>{
            this.openDataContext.postMessage({
                'command':'friend',
                'page':this.curPage
            });
            let bitmap = this.openDataContext.createDisplayObject(null,Game.instance().gameStage.stageWidth,Game.instance().gameStage.stageHeight);
            bitmap.x = 20;
            bitmap.y = -10;
            this.listGrp.removeChildren();
            this.listGrp.addChild(bitmap);
        },this,40);
    }

    private onGoHome(e:egret.Event) {
        egret.clearInterval(this.intervalId);
        Game.instance().gameView.hide();
        Game.instance().gameScene.gotoMenu();
    }

    private radioChange(e:eui.UIEvent){
        let rgrp:eui.RadioButtonGroup = e.target;
        this.curSelect = rgrp.selectedValue;
        this.showPageList();
    }

    private pageHandler(e:egret.TouchEvent){
        let page = this.curPage;
        if(e.target == this.lastBtn){
            if(page <= 1){
                return;
            }
            else{
                page--;
            }
        }
        else if(e.target == this.nextBtn){
            page++;
        }
        else{
            return;
        }
        this.curPage = page;
        this.showPageList(page);
    }

    private showPageList(page:number = 1){
        this.listGrp.removeChildren();
        if(this.curSelect == 1){
            this.createFriendList();
        }
        else if(this.curSelect == 2){
            egret.clearInterval(this.intervalId);
            if(this.curPage > this.TOTAL_PAGE) return;
            Account.GetInstance().getRank(this.curPage,this.PAGE_SIZE,this.receiveRankData,this);
        }
    }

    private updateWorldRank(arr){
        if(!arr || arr.length == 0) return;
        let len = this.worldArr.length;
        for(let i = 0;i < len;i++){
            let obj = arr[i];
            if(!obj){
                this.worldArr[i].visible = false;
                continue;
            }
            this.worldArr[i].visible = true;
            this.worldArr[i].setData(obj);
        }
        this.listGrp.addChild(this.worldSprite);
    }

    private receiveRankData(data) {
        if(data.stat == 200){
            this.TOTAL_PAGE = data.data.pages;
            this.updateWorldRank(data.data.list);
        }
    }
}