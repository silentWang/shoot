/**
 * Created by wuhuiran on 2018/7/27.
 */

class BasketBack extends egret.Sprite {
    private _basket:Basket;

    constructor(basket:Basket) {
        super();

        this._basket = basket;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {

        var displayBack:egret.DisplayObject = utils.createBitmapByName("basket_back_png");
        displayBack.x = 0;
        displayBack.y = 0;
        displayBack.scaleX = Constants.BASKET_SIZEFACTOR;
        displayBack.scaleY = Constants.BASKET_SIZEFACTOR;

        this.addChild(displayBack);

        this.anchorOffsetX = Constants.BASKET_WIDTH / 2;
        this.anchorOffsetY = Constants.BASKET_HEIGHT / 2 + 30 / 2 - 6;
    }

    /**
     * 根据篮筐前面的显示, 设置位置
     * @param basketFrontX
     * @param basketFrontY
     */
    public resetPosition() {

        this.x = this._basket.x;
        this.y = this._basket.y;
        this.rotation = this._basket.rotation;
    }

    /**
     * 拖动
     * 改变角度
     *
     * @param start
     * @param end
     */
    public drag(start:egret.Point, end:egret.Point) {

        var angle = utils.angle(start.x, start.y, end.x, end.y);
        this.rotation = angle;

        this._basket.rotation = angle;
        this._basket.repositionByDisplay();
    }
}
