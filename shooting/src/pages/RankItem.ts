class RankItem extends egret.Sprite{
    constructor(){
        super();
        this.init();
    }

    private rankTxt:egret.TextField;
    private headImg:egret.Sprite;
    private nickName:egret.TextField;
    private scoreTxt:egret.TextField;
    private init(){
        this.rankTxt = new egret.TextField();
        this.rankTxt.textColor = 0x65b5f7;
        this.rankTxt.textAlign = 'center';
        // this.rankTxt.bold = true;
        this.rankTxt.size = 24;
        this.rankTxt.text = '1';
        this.rankTxt.width = 60;
        this.rankTxt.y = 30;
        this.addChild(this.rankTxt);

        this.headImg = new egret.Sprite();
        this.headImg.x = 80;
        this.headImg.y = 5;
        this.addChild(this.headImg);

        this.nickName = new egret.TextField();
        this.nickName.textColor = 0xa1a1a1;
        // this.nickName.bold = true;
        this.nickName.size = 24;
        this.nickName.text = 'silence';
        this.nickName.x = 200;
        this.nickName.y = 30;
        this.addChild(this.nickName);

        this.scoreTxt = new egret.TextField();
        this.scoreTxt.textColor = 0xa1a1a1;
        this.scoreTxt.textAlign = 'center';
        // this.scoreTxt.bold = true;
        this.scoreTxt.size = 24;
        this.scoreTxt.text = '9999';
        this.scoreTxt.x = 380;
        this.scoreTxt.y = 30;
        this.scoreTxt.width = 100;
        this.addChild(this.scoreTxt);

        let line = new egret.Bitmap(RES.getRes('line_png'));
        line.x = 20;
        line.y = 82;
        line.width = 460;
        this.addChild(line);
    }

    public setData(data){
        this.rankTxt.text = data.rank;
        this.headImg.removeChildren();
        if(utils.isUrl(data.avatarUrl)){
            let bitmap = utils.createBitmapByUrl(data.avatarUrl);
            bitmap.width = 70;
            bitmap.height = 70;
            this.headImg.addChild(bitmap);
        }
        this.nickName.text = data.nickname;
        this.scoreTxt.text = data.topScore;
    }

}