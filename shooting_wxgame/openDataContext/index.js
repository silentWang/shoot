/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  line:"openDataContext/assets/line.png"
};

class openDataContextMain{
  constructor(){
    this.init();
  }
  
  init(){
    //获取canvas渲染上下文
    this.context = sharedCanvas.getContext("2d");
    this.context.globalCompositeOperation = "source-over";
    this.sWidth = sharedCanvas.width;
    //根据宽度适配的 防止画的排行榜出现向下错位
    this.sHeight = this.sWidth*1330/750;
    this.assets = {};
    this.userData = null;
    this.friendData = null;
    this.groupData = null;
    if(!this.hasLoadRes){
      this.preloadAssets();
    }
    else{
      this.addOpenDataContextListener();
    }
  }
  //资源加载
  preloadAssets(){
    let preloaded = 0;
    let count = 0;
    for (let asset in assetsUrl) {
      count++;
      const img = wx.createImage();
      img.onload = () => {
        preloaded++;
        if (preloaded == count) {
          // console.log("加载完成");
          this.hasLoadRes = true;
          this.addOpenDataContextListener();
        }
      }
      img.src = assetsUrl[asset];
      this.assets[asset] = img;
    }
  }
  //添加监听
  addOpenDataContextListener() {
    console.log('增加监听函数')
    wx.onMessage((data) => {
      console.log(data);
      if(data.command == 'init'){
        //获取用户游戏信息
        this.ownOpenId = data.openid;
        
        //获取用户好友游戏信息
        if(!this.friendData){
          wx.getFriendCloudStorage({
            keyList:['score'],
            complete: res => {
              if (res.errMsg == "getFriendCloudStorage:ok"){
                this.friendData = this.sortFriendData(res.data);
              }
            }
          });
        }
        //获取用户群组里的排行
        // if(!this.groupData){
        //   wx.getGroupCloudStorage({
        //     success: res => {
        //       if (res.errMsg == "getGroupCloudStorage:ok"){
        //         this.groupData = data;
        //       }
        //     },
        //     fail:error=>{
        //       console.log(error);
        //     }
        //   });
        // }
      }
      else if (data.command == 'friend') {
          this.drawFriendRank(data.page);
      } else if (data.command == 'group') {
        this.drawGroupRank(data.page);
      }
    });
  }
  //对好友数据进行排序组装
  sortFriendData(arr){
    if(!arr || arr.length == 0) return null;
    let len = arr.length;
    for(let i = 0;i < len;i++){
      let data = arr[i];
      let klist = data.KVDataList;
      for(let j = 0;j<klist.length;j++){
        let obj = klist[j];
        if(obj.key == 'score'){
          data[obj.key] = obj.value;
          break;
        }
      }
    }
    //排序
    arr.sort((a,b)=>{
      if (parseInt(a.score) > parseInt(b.score)) return -1;
      if (parseInt(a.score) < parseInt(b.score)) return 1;
      return 0;
    });
    console.log(arr);
    return arr;
  }
  //获取自己的排名信息
  getOwnRank(){
    let len = this.friendData.length;
    for(let i = 0;i < len;i++){
      if (this.friendData[i].openid == this.ownOpenId){
        return [i+1,this.friendData[i]];
      }
    }
    return null;
  }
  //画好友排行榜
  drawFriendRank(page = 1){
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
    if(!this.friendData || this.friendData.length == 0) return;
    let len = this.friendData.length;
    if(page > Math.ceil(len/7)){
      page--;
    }
    
    let itemWidth = this.sWidth * 2/3;
    let itemHeight = this.sHeight * 900/1330;
    let mid = itemHeight/9.8;
    let lx = itemWidth/600;
    let ly = mid/10;
    let fontSize = itemWidth/25;
    let i = (page-1)*7;
    let max = page*7;
    for(;i < max;i++){
      let obj = this.friendData[i];
      if(!obj) break;
      let yy = (i%7) * mid;
      this.context.fillStyle = '#65b5f7';
      this.context.font = fontSize + 'px Arial bold';
      this.context.textAlign = 'center';
      this.context.fillText(''+(i+1),20*lx,yy+ly*5);
      let image = wx.createImage();
      image.src = obj.avatarUrl;
      this.drawImage(image,80*lx,yy + ly*1,70*lx,70*lx);
      this.context.fillStyle = '#a1a1a1';
      this.context.fillText(obj.nickname,250*lx,yy+5*ly);
      this.context.fillText(obj.KVDataList[0].value,500*lx,yy+5*ly);
      this.drawImage(this.assets['line'], 0, yy+ly*9,560*lx,ly/5);
    }

    //绘制自己的排名
    let rank = this.getOwnRank();
    if(!rank) return;
    let robj = rank[1];
    let myy = 8.4*mid;
    this.context.fillText('' + rank[0], 20 * lx, myy + ly * 5);
    let image = wx.createImage();
    image.src = robj.avatarUrl;
    this.drawImage(image, 80 * lx, myy + ly * 1, 70 * lx, 70 * lx);
    this.context.fillStyle = '#a1a1a1';
    this.context.fillText(robj.nickname, 250 * lx, myy + 5 * ly);
    this.context.fillText(robj.KVDataList[0].value, 500 * lx, myy + 5 * ly);
    this.drawImage(this.assets['line'], 0, myy + ly * 9, 560 * lx, ly / 5);
  }
  //画群排行榜
  drawGroupRank(page = 1){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = '#ff0000';
    this.context.font = '50px Arial';
    this.context.fillText('世界排行榜', 10, 10);
  }
  //画图片
  drawImage(image, x, y, width, height) {
    if (image.width != 0 && image.height != 0 && this.context)     {
      if (width && height) {
        this.context.drawImage(image, x, y, width, height);
      } else {
        this.context.drawImage(image, x, y);
      }
    }
  }
}

const openDCM = new openDataContextMain();
openDCM.addOpenDataContextListener();
