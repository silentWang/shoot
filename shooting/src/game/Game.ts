class Game {
    private static _instance:Game = null;

    public static instance() {
        if (this._instance == null) {
            this._instance = new Game();
        }
        return this._instance;

    }

    private _gameStage:egret.Stage;
    private _gameScene:GameScene;
    private _gameView:GameView;

    private _bottom:egret.DisplayObjectContainer;
    private _middle:egret.DisplayObjectContainer;
    private _top:egret.DisplayObjectContainer;

    setStage(stage:egret.Stage) {
        this._gameStage = stage;
        this._gameScene = new GameScene();
        this._gameView = new GameView();

        this._bottom = new egret.DisplayObjectContainer;
        this._middle = new egret.DisplayObjectContainer;
        this._top = new egret.DisplayObjectContainer;
        this._gameStage.addChild(this._bottom);
        this._gameStage.addChild(this._middle);
        this._gameStage.addChild(this._top);
    }

    public addBottom(display:egret.DisplayObject, isClear:boolean = true) {
        if (isClear) {
            this._bottom.removeChildren();
        }
        this._bottom.addChild(display);
    }

    public addMiddle(display:egret.DisplayObject, isClear:boolean = true) {
        if (isClear) {
            this._middle.removeChildren();
        }
        this._middle.addChild(display);
    }

    public addTop(display:egret.DisplayObject, isClear:boolean = true) {
        if (isClear) {
            this._top.removeChildren();
        }
        this._top.addChild(display);
    }

    public get gameStage() {
        return this._gameStage;
    }

    public get bottom() {
        return this._bottom;
    }

    public get middle() {
        return this._middle;
    }

    public get top() {
        return this._top;
    }

    public get gameScene() {
        return this._gameScene;
    }

    public get gameView() {
        return this._gameView;
    }

}