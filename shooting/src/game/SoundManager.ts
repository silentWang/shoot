/**
 * Created by wuhuiran on 2018/7/25.
 */

class SoundManager {

    private static _instance = null;
    public static instance():SoundManager {
        if (SoundManager._instance == null) {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    }
    private wx = window['wx'];
    private _music;
    private isStopAll:boolean = false;
    private constructor() {
    }
    //音乐
    public playMusic(type){
        if(this._music){
            this._music.destroy();
        }
        this._music = this.wx.createInnerAudioContext();
        this._music.src = ''; 
        this._music.play();
        this._music.loop = true;
        this._music.obeyMuteSwitch = false;
    }
    //音效
    public playSound(type = 0){
        if(this.isStopAll) return;
        let snd = '';
        if(type == 0){
            //进球
            snd = 'goal.mp3';
        }
        else if(type == 1){
            //空心球
            snd = 'hollow.mp3'
        }
        else if(type == 2){
            //碰撞
            snd = 'collision.mp3';
        }
        let sound = this.wx.createInnerAudioContext();
        sound.loop = false;
        sound.src = 'resource/assets/sounds/'+snd;
        sound.play();
        sound.onEnded(()=>{
            sound.destroy();
        });
    }

    public mute():void {
        console.log('play music');
        if(this._music){
            this._music.play();
        }
    }

    public stopAll(){
        if(this._music){
            this._music.pause();
        }
        this.isStopAll = !this.isStopAll;
    }
}