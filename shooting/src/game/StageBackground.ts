/**
 * Created by wuhuiran on 2018/7/24.
 */

class StageBackground extends egret.Sprite {
    private backgrounds:egret.Bitmap[];
    private _currentBg:egret.Bitmap;

    constructor() {
        super();
        this.backgrounds = [];
        this.init();
    }

    private init() {
        let systemInfo = wx.getSystemInfoSync();
        let swid = Game.instance().gameStage.stageWidth;
        //适配（根据宽度适配高度 注意铺满）
        let shgt = Game.instance().gameStage.stageHeight;
        if(shgt > systemInfo.windowHeight){
            shgt = systemInfo.windowHeight*swid/systemInfo.windowWidth;
        }
        var background:egret.Bitmap = utils.createBitmapByName("bj_1_png");
        background.x = 0;
        background.y = 0;
        background.width = swid;
        background.height = shgt;
        background.name = "first";
        // background.fillMode = egret.BitmapFillMode.SCALE;
        // background.scaleX = egret.MainContext.instance.stage.stageWidth / background.width;
        // background.scaleY = egret.MainContext.instance.stage.stageHeight / background.height;
        this.addChild(background);
        this.backgrounds.push(background);
        for (var i:number = 0; i < 3; i++) {
            background = utils.createBitmapByName("bj_2_png");
            background.x = 0;
            background.y = -(i + 1) * shgt;
            background.name = "bg" + i.toString();
            background.height = shgt;
            this.addChild(background);
            this.backgrounds.push(background);
        }

    }

    public scroll(offsetY:number) {
        var self = this;
        var shape:egret.Bitmap = this.backgrounds[0];
        this._currentBg = shape;
        var tw = egret.Tween.get(shape, {onChange: this.onBackgroundScroll, onChangeObj: this});
        tw.to({y: shape.y + offsetY}, 500).call(()=> {
            if (shape.y > Game.instance().gameStage.stageHeight) {
                if (shape.name.indexOf('bg') >= 0) {
                    shape.y = -3 * egret.MainContext.instance.stage.stageHeight + shape.y;
                    self.backgrounds.push(shape);
                    self.backgrounds.shift();
                    self._currentBg = this.backgrounds[0];
                } else {
                    self.backgrounds.shift();
                }
            }
        });
    }

    private onBackgroundScroll(obj:any) {
        if (this.backgrounds.length > 1) {
            var curBg:egret.Bitmap = this._currentBg;
            for (var i:number = 1; i < this.backgrounds.length; i++) {
                var shape:egret.Bitmap = this.backgrounds[i];
                if (curBg && shape) {
                    shape.y = -i * egret.MainContext.instance.stage.stageHeight + curBg.y;
                }
            }
        }
    }

}
