/**
 * Created by wuhuiran on 2018/7/19.
 */

class FloorConfig {
    public x:number;
    public y:number;
    public angle:number;
    public moveDirection:number;
    public moveSpeed:number;
    public isStar:boolean = false;

    constructor(_x:number, _y:number, _angle:number, direction?:number, speed?:number,star?:boolean) {
        this.x = _x;
        this.y = _y;
        this.angle = _angle;
        if (direction > 0) {
            this.moveDirection = direction;
        } else {
            this.moveDirection = 0;
        }
        if (speed) {
            this.moveSpeed = speed;
        } else {
            this.moveSpeed = 0;
        }
        this.isStar = star;
    }
}

class Floor {
    private _currentFloor:number = 0;
    private _currentConfig:FloorConfig;
    private createConfig(){
        let sWid = Game.instance().gameStage.stageWidth;
        let y = 0;
        if(this._currentFloor == 0){
            y = -150;
        }
        else if(this._currentFloor == 1){
            y = 150;
        }
        else{
            y = 300;
        }
        let x = this._currentFloor%2 == 0 ? 220 : sWid - 220;
        let speed = 0;
        let angle = 0;
        let moveDirection = 0;
        let ang = 45;
        let bool = this._currentFloor > 5 ? true : false;
        if(this._currentFloor <= 6){
            angle = this._currentFloor%2 == 1 ? 360 - ang : ang;
        }

        if(this._currentFloor > 6){
            ang = 45*Math.random();
            angle = this._currentFloor%2 == 1 ? 360 - ang : ang;
        }
        
        if(this._currentFloor > 16){
            let rand = Math.floor(5*Math.random());
            //20%概率 出现运动
            let move = rand%5 == 0 ? 1 : 0;
            if(move == 1){
                moveDirection = Math.random() > 0.5 ? 1 : 2;
                speed = 5 + 5*Math.random();
            }
        }
        this._currentFloor++;
        let cnf = new FloorConfig(x, y, angle, moveDirection, speed,bool);
        return cnf;
    }

    public nextFloor():FloorConfig {
        this._currentConfig = this.createConfig();
        return this._currentConfig;
    }

    public get currentConfig(){
        return this._currentConfig;
    }

    public restart() {
        this._currentFloor = 0;
    }
}