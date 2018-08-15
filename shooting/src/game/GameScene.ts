//场景管理
class GameScene{
    constructor(){}

    private _menuScene:GuideScene;
    private _mainGame:MainGame;
    //主菜单
    gotoMenu(){
        Game.instance().gameView.hide();
        if(!this._menuScene){
            this._menuScene = new GuideScene();
        }
        else{
            this._menuScene.setData();
        }
        Game.instance().addBottom(this._menuScene);

    }
    //进入游戏
    gotoGame(){
        Game.instance().gameView.hide();
        if(this._mainGame){
            this._mainGame.restartGame();
        }
        else{
            let game = new MainGame();
            this._mainGame = game;
        }
        Game.instance().addBottom(this._mainGame);
    }

    public get menuScene(){
        return this._menuScene;
    }
    public get mainGame(){
        return this._mainGame;
    }

}