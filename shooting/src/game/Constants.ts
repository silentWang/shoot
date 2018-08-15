/**
 * Created by wuhuiran on 2018/7/19.
 */

class Constants {
    //stage
    public static stageWidth = 750;
    public static stageHeight = 1330;
    
    public static FACTOR = 50;
    //世界重力
    public static WORLD_GRAVITY = -100;
    //球质量
    public static BALL_MASS = 6;
    //篮筐拉伸范围确定 拉伸程度所对应的力的系数 越大力越大
    public static PRESS_RATIO = 3.5;
    

    public static BASKET_WIDTH = 205;
    public static BASKET_HEIGHT = 184;
    public static BASKET_SIZEFACTOR = 1;
    public static STAR_ID = 50;//星星ID

    public static COLLSION_YES = Math.pow(2, 0);
    public static COLLSION_NO = Math.pow(2, 1);
    //材质
    public static BALL_MATERIAL = 1000;
    public static NET_MATERIAL = 1001;
    public static BASKET_MATERIAL = 1002;
    

    public static BODY_ID = {
        BALL: 1,
        BASKET_1: 100,
        BASKET_2: 200,
        LEFT_BORDER: 10,
        RIGHT_BORDER: 11,
        LEFT_POINT: 2,
        RIGHT_POINT: 3,
        NET: 4,
        TOPMASK: 5
    };
    //TEST
    // public static BaseUrl = "http://127.0.0.1:8888/shoot";
    // public static BASE_IP = "http://127.0.0.1:8888/";

    public static BaseUrl = "https://wxmini.dftoutiao.com/shoot";
    public static BASE_IP = "https://wxmini.dftoutiao.com/";
    public static appId = "wxd5f99c1670c42135";
    public static appSecret = "66dc7a2b83336b56e0fddadf5b5d7c2f";
}
