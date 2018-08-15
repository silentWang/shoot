/**
 * Created by wuhuiran on 2018/7/19.
 */

class utils {

    static isNullOrUndefined<T>(obj:T | null | undefined):obj is null | undefined {
        return typeof obj === "undefined" || obj === null;
    }

    static trim(str:string, t:string):string {
        return "";
    }

    static runtime = egret.Capabilities.runtimeType;
    static isWxGame = (egret.Capabilities.runtimeType == "wxgame") ? true : false;

    static queryString(params:{[key:string]:any}) {
        if (!params) {
            return;
        }

        var str = "";
        var idx:number = 0;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                str += key + "=" + params[key].toString() + "&";
            }
        }

        return utils.trim(str, "&");
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    static createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 根据url 加载图片 并返回bitmap
     */
    static createBitmapByUrl(url:string){
        egret.ImageLoader.crossOrigin = "anonymous";
        let imgload = new egret.ImageLoader();
        let bitmap = new egret.Bitmap();
        imgload.addEventListener(egret.Event.COMPLETE,(e)=>{
            let img = e.currentTarget;
            let texture = new egret.Texture();
            texture._setBitmapData(img.data);
            bitmap.$setTexture(texture);
        },this);
        imgload.load(url);
        return bitmap;
    }
    /**
     * 创建一个方形
     */
    static createBox(width:number, height:number, color:number = 0xfff000):egret.Shape {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        return shape;
    }

    /**
     * 创建多边形
     * @param path
     * @returns {any}
     */
    static createPolygon(path:number[][]):egret.Shape {

        if (path.length <= 1) {
            return null;
        }

        var factor:number = 0.8;
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(3, 0xfff000);

        shape.graphics.moveTo(path[0][0] * factor, (path[0][1]) * factor);
        for (var i:number = 1; i < path.length; i++) {
            shape.graphics.lineTo(path[i][0] * factor, (path[i][1]) * factor);
        }
        shape.graphics.endFill();

        return shape;
    }

    /**
     * 创建一个圆形
     */
    static createBall(r:number, color?:number):egret.Shape {
        var shape = new egret.Shape();
        if (color) {
            shape.graphics.beginFill(color);
        } else {
            shape.graphics.beginFill(0xfff000);
        }
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    }

    /**
     * p2点转换为stage中的点
     * @param ppos
     * @param epos
     * @returns {egret.Point}
     */
    static p2PointToStage(ppos:egret.Point, epos?:egret.Point):egret.Point {

        if (!epos) {
            epos = new egret.Point(0, 0);
        }

        epos.x = ppos.x * Constants.FACTOR;
        epos.y = egret.MainContext.instance.stage.stageHeight - ppos.y * Constants.FACTOR;

        return epos;
    }

    /**
     * p2点转换为stage中的点
     * @param ppos
     * @param epos
     * @returns {egret.Point}
     */
    static p2PosToStage(x:number, y:number, epos?:egret.Point):egret.Point {

        if (!epos) {
            epos = new egret.Point(0, 0);
        }

        epos.x = x * Constants.FACTOR;
        epos.y = egret.MainContext.instance.stage.stageHeight - y * Constants.FACTOR;

        return epos;
    }

    /**
     * 舞台左边转换为p2坐标
     * @param epos
     * @param ppos
     * @returns {egret.Point}
     */
    static stagePointToP2(epos:egret.Point, ppos?:egret.Point):egret.Point {
        if (!ppos) {
            ppos = new egret.Point(0, 0);
        }

        ppos.x = epos.x / Constants.FACTOR;
        ppos.y = (egret.MainContext.instance.stage.stageHeight - epos.y) / Constants.FACTOR;

        return ppos;
    }

    /**
     * 两点之间的距离
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    static distance(x1:number, y1:number, x2:number, y2:number) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    /**
     * 两点之间的角度
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    static angle(x1:number, y1:number, x2:number, y2:number):number {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let angle = dy < 0 ? 180 : 0;
        //分顺时针逆时针旋转
        if(dx < 0){
            angle = (180/Math.PI)*Math.atan(Math.abs(dx/dy));
            if(dy < 0){
                angle = 180 - angle;
            }
        }
        else if(dx > 0){
            angle = -(180/Math.PI)*Math.atan(Math.abs(dx/dy));
            if(dy < 0){
                angle = -(180 + angle);
            }
        }
        return angle;
    }

    /**
     * 是否是url
     */
    static isUrl(str:string){
        if(!str || str == '') return false;
        let reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        if(reg.test(str) == true){
            return true;
        }
        return false;
    }

}