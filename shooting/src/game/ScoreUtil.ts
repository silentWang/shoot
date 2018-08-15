/**
 * Created by wuhuiran on 2018/7/21.
 */

class ScoreUtil {
    static calScore(matrix:number[]):{hole:boolean, rebound:boolean} {

        /**
         *         球 左板 右板 上左点 上右点 上网
         **********1   5   6    201   202   203
         球     1  0   2   2     3      3    1
         */

        if (matrix.length < 5) {
            return null;
        }


        var fantan:boolean = false;
        var kongxin:boolean = false;

        var score:number = 0;
        if (matrix[0] == 1 || matrix[1] == 1) {
            // 反弹
            fantan = true;
        }

        if (matrix[2] == 0 && matrix[3] == 0) {
            // 空心
            kongxin = true;
        }

        return {
            hole: kongxin,
            rebound: fantan
        };
    }
}