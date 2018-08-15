/**
 * Created by wuhuiran on 2018/7/23.
 */

class Account {
    static RANK_TYPE = {
        FRIEND: 1,
        GROUP: 2
    };

    private _userInfo:any;
    private _userId:number;
    private _openId:string;
    private _code:string;
    private _existed:boolean;

    private _score:Score;

    private static _instance = null;

    public static GetInstance():Account {
        if (Account._instance == null) {
            Account._instance = new Account();
        }

        return Account._instance;
    }

    constructor() {
        this._userId = 0;
        this._score = new Score();
        this._code = "";
        this._openId = "";
        this._existed = false;
        let systemInfo:any = WxApi.getSystemInfoSync();
        this._userInfo = {
            "avatarUrl": "",
            "city": "",
            "country": "",
            "doubleScoreTime": 0,
            "gender": 0,
            "model": "",
            "nickname": "",
            "province": "",
            "resurrectionCard": 0,
            "skin": "",
            "thirdid": "",
            "topScore": 0,
            "system": systemInfo.system,
            "systemLanguage": systemInfo.language,
            "version": systemInfo.version
        };
    }

    /**
     * 设置code获取openid
     * @param code
     */
    public async setCode(code:string) {
        this._code = code;
    }

    /**
     * 增加得分
     * @param score
     * @returns {number}
     */
    public addScore(score:{hole:boolean, rebound:boolean}):number {
        var curScore:number = this._score.addScore(score);
        return curScore;
    }

    public getScore():number {
        return this._score.getScore();
    }
    //重置
    public resetScore(){
        this._score.reset();
    }

    /**
     * 增加信息数量
     * TODO 调用服务接口
     * @param num
     * @returns {number}
     */
    public addStar(num:number):number {
        let cnt = this._userInfo.star ? this._userInfo.star : 0;
        cnt += num;
        this._userInfo.star = cnt;
        this.updateInfo({"star":cnt});
        return cnt;
    }

    public get userInfo() {
        return this._userInfo;
    }

    public get openId(){
        return this._openId;
    }

    /**
     * 获取双倍得分剩余次数
     */
    public getDoubleScoreTimes():number {
        return 0;
    }

    public addItem(key:string, num:number) {
        this._userInfo[key] = (this._userInfo[key] || 0) + num;
    }
    //添加一个新用户
    public async setInfo(userInfo:Object) {
        if (!this._existed) {
            this.updateUserInfo(userInfo);
            const savedUserInfo = await AccountApi.initUserInfo(this._userInfo);
            this.updateUserInfo(savedUserInfo['data']);
        }
    }

    /**
     * 获取用户当前信息
     * @param cb
     * @returns {null}
     */
    public async getInfo(cb:Function) {
        if (!this._openId) {
            const openId = await AccountApi.getWxOpenId(this._code,
                Constants.appSecret,
                Constants.appId,
                "authorization_code");
            this._openId = <string>openId;
        }
        console.log(`获取的openid:${this._openId}`);
        if (!this._openId) {
            //openId获取失败处理 最好是重新获取
            // const ret = await platform.login();
            // this.setCode(ret.code);
            return;
        }

        try{
            const userInfo = await AccountApi.getUserInfoByOpenId(this._openId);
            if (userInfo) {
                this._existed = true;
            }
            this.updateUserInfo(userInfo);
            if (cb) {
                cb(this._userInfo);
            }
        } catch (e) {
            console.log('根据openid获取userdata失败%o',e);
            if (cb) {
                cb(null);
            }
        }
    }

    /**
     * 更新用户信息
     * @param userInfo
     */
    private updateUserInfo(userInfo:Object) {
        var self = this;
        Object.keys(userInfo).forEach((key) => {
            let oldKey = key;
            if (key == 'nickName') {
                key = 'nickname';
            }
            self._userInfo[key] = userInfo[oldKey];
        });

        if (this._openId) {
            this._userInfo['thirdid'] = this._openId;
        }
    }

    /**
     * 更新用户信息
     * @param info
     */
    public async updateInfo(info:{[key:string]:string}) {

        for (var key in info) {
            this._userInfo[key] = info[key];
        }

        const userInfo = await
            AccountApi.updateUserInfo(this._userInfo);
        this.updateUserInfo(userInfo);
    }
    /**
     * 更新复活卡
     */
    public async updateReviveCard(info:{[key:string]:string},cb?:Function,cbcontext = null){
        let query:string = '';
        for(let key in info){
            query += `/${key}/${info[key]}`;
        }
        const data = await AccountApi.updateReviveCard(query);
        if(cb){
            cb.call(cbcontext,data);
        }
    }

    /**
     * 获取排行榜数据
     * @param type
     * @param page
     * @param cb
     */
    public async getRank(page:number,size:number, cb?:Function,cbcontext = null) {
        let query = `/pageNum/${page}/pageSize/${size}`;
        const data = await AccountApi.getRank(query);
        if(cb){
            cb.call(cbcontext,data);
        }
    }


}