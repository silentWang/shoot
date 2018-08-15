/**
 * Created by wuhuiran on 2018/7/21.
 */

class Score {

    // 当前得分
    private _score:number;

    // 空心进球次数
    private _holeScoreTimes:number;

    // 空心且反弹进球次数
    private _holeAndReboundTimes:number;

    // 双倍得分-次数
    private _doubleScoreTimes:number;

    // 最高得分
    private _maxScore:number;

    constructor() {
        this._score = 0;
        this._holeScoreTimes = 0;
        this._holeAndReboundTimes = 0;
        this._doubleScoreTimes = 0;
    }

    /**
     * 增加得分
     * 判断空心、反弹
     * 判断累计空心,累计反弹
     * @param score
     */
    public addScore(score:{hole:boolean, rebound:boolean}):number {

        var tmpScore:number = 1;
        if (score.hole && score.rebound) {

            // 空心且反弹
            switch (this._holeAndReboundTimes) {
                case 0:
                    tmpScore = 4;
                    break;
                case 1:
                    tmpScore = 6;
                    break;
                case 2:
                    tmpScore = 10;
                    break;
                case 3:
                    tmpScore = 18;
                    break;
                default:
                    if (this._holeAndReboundTimes > 0) {
                        tmpScore = 18;
                    }
                    break;
            }
            tmpScore = Math.min(tmpScore, 18);
            this._holeAndReboundTimes += 1;
            this._holeScoreTimes += 1;

        } else if (score.hole) {

            // 空心球
            tmpScore = Math.pow(2, this._holeScoreTimes + 1);
            tmpScore = Math.min(tmpScore, 16);
            this._holeAndReboundTimes = 0;
            this._holeScoreTimes += 1;

        } else if (score.rebound) {

            // 反弹
            tmpScore = 2;
            this._holeAndReboundTimes = 0;
            this._holeScoreTimes = 0;

        } else {

            // 普通
            tmpScore = 1;
            this._holeAndReboundTimes = 0;
            this._holeScoreTimes = 0;

        }

        if (this._doubleScoreTimes >= 1) {
            this.consumeDoubleTimes();
            tmpScore = tmpScore * 2;
        }

        this._score += tmpScore;

        return tmpScore;
    }

    /**
     * 消耗双倍次数
     */
    private consumeDoubleTimes() {
        this._doubleScoreTimes -= 1;
    }

    public getScore():number {
        return this._score;
    }

    public reset(){
        this._score = 0;
    }

}