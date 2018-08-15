/**
 * Created by wuhuiran on 2018/8/1.
 */

declare namespace wx{
    let createBannerAd:Function
    let createRewardedVideoAd:Function
}

class GameAdManager {
    private _bannerAd:any;
    private isWxGame:boolean;

    private static _instance = null;

    public static GetInstance():GameAdManager {
        if (GameAdManager._instance == null) {
            GameAdManager._instance = new GameAdManager();
        }

        return GameAdManager._instance;
    }

    constructor() {
        this._bannerAd = null;
        this.isWxGame = false;
        if (egret.Capabilities.runtimeType == "wxgame") {
            this.isWxGame = true;
        }
    }

    public createBannerAd() {
        console.log("==========createBannerAd: %j, %j", egret.Capabilities.runtimeType, utils.isWxGame);

        if (!this.isWxGame) {
            return;
        }
        console.log("==========createBannerAd true");

        let systemInfo = wx.getSystemInfoSync();
        console.log("==========createBannerAd :%j", systemInfo);
        this._bannerAd = wx.createBannerAd({
            adUnitId: 'banner',
            style: {
                left: 10,
                top: systemInfo.screenHeight - 300,
                width: systemInfo.screenWidth - 20
            }
        });

        this._bannerAd.show();
    }

    public updateBannerAd() {
        if (!this.isWxGame) {
            return;
        }

        if (!this._bannerAd) {
            this.createBannerAd();
            return;
        }

        this._bannerAd.destory();
        this.createBannerAd();
    }

    public createRewardedVideoAd(adUnit:string, cb?:Function) {
        if (!this.isWxGame) {
            return;
        }

        let rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: adUnit});
        rewardedVideoAd.show()
            .catch(err => {
                rewardedVideoAd.load()
                .then(() => rewardedVideoAd.show())
            });

        rewardedVideoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                cb(true);
            }
            else {
                // 播放中途退出，不下发游戏奖励
                cb(false);
            }
        });

    }
}