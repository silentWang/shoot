/**
 * Created by wuhuiran on 2018/7/30.
 */

class AccountApi {

    static async initUserInfo(userInfo:Object) {

        var url = Constants.BaseUrl + "/userInfo/addUserInfo";
        // console.log(userInfo);

        // 参数
        var params:{[key:string]:string} = {};
        Object.keys(userInfo).forEach((key) => {
            params[key] = userInfo[key];
        });

        return new Promise((resolve, reject) => {
            try {
                NetUtils.put(url, params, resolve);
            } catch (e) {
                reject(e);
            }
        });
    }

    static async getWxOpenId(code:string, secret:string, appid:string, grant_type:string) {

        var url = Constants.BASE_IP+"gameBox/game/getJscode2session/js_code/" + code + "/secret/" + secret + "/appid/" + appid + "/grant_type/" + grant_type;
        // console.log("url: %j", url);

        var params:{[key:string]:string} = {};
        return new Promise((resolve, reject) => {
            try {
                NetUtils.get(url, (ret) => {
                    if (ret.stat == 200) {
                        ret.data = JSON.parse(ret.data);
                        // console.log("============debug getWxOpenId: %j", ret.data);
                        if (ret.data.openid) {
                            resolve(ret.data.openid);
                        } else {
                            resolve("");
                        }
                    } else {
                        // console.log("====debug getWxOpenId3: %j", ret.data);
                        reject(ret.stat);
                    }
                });
            } catch (e) {
                reject(500);
            }
        });
    }

    static async getUserInfoByOpenId(openId:string) {
        var url = Constants.BaseUrl + "/userInfo/getUserInfoByThirdid/thirdid/" + openId.toString();
        // console.log("====debug getUserInfoByOPenId: %j", url);

        return new Promise((resolve, reject) => {
            try {
                NetUtils.get(url, (ret) => {
                    // console.log("=====debug promise: %j", ret);
                    if (ret.stat == 200) {
                        resolve(ret.data);
                    } else {
                        reject(ret.stat);
                    }
                });
            } catch (e) {
                reject(500);
            }
        });
    }

    static async getUserInfo(userId:number) {
        var url = Constants.BaseUrl + "/userInfo/getUserInfoById/id/" + userId.toString();
        return new Promise((resolve, reject) => {
            try {
                NetUtils.get(url, resolve);
            } catch (e) {
                reject(e);
            }
        });
    }

    static async updateUserInfo(info:{[key:string]:string}) {

        var url = Constants.BaseUrl + "/userInfo/updateUserInfo";
        var params:{[key:string]:string} = info;
        return new Promise((resolve, reject) => {
            try {
                NetUtils.put(url, params, resolve);
            } catch (e) {
                reject(e);
            }
        });
    }

    static async getRank(query:string) {
        var url = Constants.BaseUrl + "/userInfo/getTopScoreRankInAll"+query;
        var params:{[key:string]:string} = {};
        return new Promise((resolve, reject) => {
            try {
                NetUtils.get(url, resolve);
            } catch (e) {
                reject(e);
            }
        });
    }
    //复活卡更新
    static async updateReviveCard(query:string){
        let url = Constants.BaseUrl + "/userInfo/updateResurrectionCard"+query;
        return new Promise((resolve,reject)=>{
            try {
                NetUtils.get(url,resolve);
            }
            catch(e){
                reject(e);
            }
        });
    }


}