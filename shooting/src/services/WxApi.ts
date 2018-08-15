/**
 * Created by wuhuiran on 2018/8/1.
 */
declare namespace wx {
    let createUserInfoButton:Function;
    let getSetting:Function;
    let getUserInfo:Function;
    let showShareMenu:Function;//显示转发菜单
    let getShareInfo:Function;//获取转发信息
    let onShareAppMessage:Function;//转发回掉
    let shareAppMessage:Function;//主动转发
    let getLaunchOptionsSync:Function;//获取启动参数
    let showModal:Function;
    let getSystemInfoSync:Function;
}

class WxApi {

    static getSetting(){
        wx.getSetting({complete:(res)=>{
            if(res.errMsg == 'getSetting:ok'){
                let obj = res.authSetting;
                if(obj['scope.userInfo'] == true){
                    wx.getUserInfo({success:(res)=>{
                        Account.GetInstance().setInfo(res.userInfo);
                        Game.instance().gameScene.menuScene.setSuccessBackInfo();
                    }});
                }
                else{
                    WxApi.createUserInfoButton();
                }
                console.log("getSetting:%o",res);
            }
            else{
                wx.showModal(res.errMsg);
            }
        }});
    }
    //授权按钮
    static createUserInfoButton(x:number = 0, y:number = 0, 
        width:number = Game.instance().gameStage.stageWidth, height:number = Game.instance().gameStage.stageHeight) {
        if (egret.Capabilities.runtimeType != "wxgame") {
            return;
        }

        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: '#000000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                opacity: 0.1
            }
        });
        button.onTap((res) => {
            if(res.errMsg == 'getUserInfo:ok'){
                button.hide();
                button.destroy();
                WxApi.showShareMenu();
                Account.GetInstance().setInfo(res.userInfo);
                Game.instance().gameScene.menuScene.setSuccessBackInfo();
            }
        });
    }

    //显示分享菜单
    static showShareMenu(){
        WxApi.shareToFriend();
        wx.showShareMenu({"withShareTicket":false,complete:res=>{
            console.log(res.errMsg);
        }});
    }

    //菜单分享
    static shareToFriend(){
        wx.onShareAppMessage(()=>{
            return {
                title:'天天向上投',
                imageUrl:'resource/assets/basketball/shareImage.png',
                query:`shareId=${Account.GetInstance().userInfo.id}`
            }
        });
    }
    //主动拉起分享
    static shareAppMessage(type = 0){
        let str = '';
        if(type == 0){
            str = '有人@你，快进来看看你能排第几？';
        }
        else if(type == 1){
            str = '有人@你，挑战绣球大神，你能排第几?';
        }
        else if(type == 2){
            str = '有人挑战你，我投了__分，你能超过我吗？';
        }
        wx.shareAppMessage({
            title:str,
            imageUrl:'resource/assets/basketball/shareImage.png',
            query:`shareId=${Account.GetInstance().userInfo.id}`
        });
    }

    //排行榜数据更新
    static setUserCloudStorage(score:number){
        let wx = window['wx'];
        wx.setUserCloudStorage({
            KVDataList:[{key:'score',value:''+score}],
            success:(res)=>{
                console.log(res);
            }
        });
    }
    //启动参数
    static getLaunchOptionsSync(){
        let obj = wx.getLaunchOptionsSync();
        return obj;
    }

    static showModal(msg){
        wx.showModal({
            "title":"提示",
            "content":msg,
            "showCancel":false,
            "cancelText":'',
            "confirmText":'确定',
        });
    }

    /**
     * 获取微信系统信息
     * @returns {any}
     */
    static getSystemInfoSync() {
        let wx = window['wx'];
        return wx.getSystemInfoSync();
    }
}