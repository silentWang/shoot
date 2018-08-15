var egret = window.egret;window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","GuideScene":"resource/eui_skins/GuideScene.exml","GameOverPannel":"resource/eui_skins/GameOverPannel.exml","RankPage":"resource/eui_skins/RankPage.exml","DoubleScorePage":"resource/eui_skins/DoubleScorePage.exml","RevivePromotion":"resource/eui_skins/RevivePromotion.exml","SkinPage":"resource/eui_skins/SkinPage.exml","ScorePanel":"resource/eui_skins/ScorePanel.exml","StarPanel":"resource/eui_skins/StarPanel.exml","GameOverResult":"resource/eui_skins/GameOverResult.exml","TipsPage":"resource/eui_skins/TipsPage.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/DoubleScorePage.exml'] = window.DoubleScorePageSkin = (function (_super) {
	__extends(DoubleScorePageSkin, _super);
	var DoubleScorePageSkin$Skin1 = 	(function (_super) {
		__extends(DoubleScorePageSkin$Skin1, _super);
		function DoubleScorePageSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DoubleScorePageSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "guanbi_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return DoubleScorePageSkin$Skin1;
	})(eui.Skin);

	var DoubleScorePageSkin$Skin2 = 	(function (_super) {
		__extends(DoubleScorePageSkin$Skin2, _super);
		function DoubleScorePageSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = DoubleScorePageSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "lijitiyan_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return DoubleScorePageSkin$Skin2;
	})(eui.Skin);

	function DoubleScorePageSkin() {
		_super.call(this);
		this.skinParts = ["btnGoHome","btnWantDoubleScore"];
		
		this.height = 413;
		this.width = 572;
		this.elementsContent = [this._Image1_i(),this.btnGoHome_i(),this.btnWantDoubleScore_i(),this._Label1_i(),this._Image2_i()];
	}
	var _proto = DoubleScorePageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 347;
		t.source = "bj_3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btnGoHome_i = function () {
		var t = new eui.Button();
		this.btnGoHome = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 363;
		t.skinName = DoubleScorePageSkin$Skin1;
		return t;
	};
	_proto.btnWantDoubleScore_i = function () {
		var t = new eui.Button();
		this.btnWantDoubleScore = t;
		t.horizontalCenter = 0;
		t.label = "立即体验";
		t.y = 261;
		t.skinName = DoubleScorePageSkin$Skin2;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 34;
		t.text = "双倍积分";
		t.y = 21;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "wenzi_2_png";
		t.y = 100;
		return t;
	};
	return DoubleScorePageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOverPannel.exml'] = window.GameOverPannelSkin = (function (_super) {
	__extends(GameOverPannelSkin, _super);
	var GameOverPannelSkin$Skin3 = 	(function (_super) {
		__extends(GameOverPannelSkin$Skin3, _super);
		function GameOverPannelSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverPannelSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "shiyongfuhuoka_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverPannelSkin$Skin3;
	})(eui.Skin);

	var GameOverPannelSkin$Skin4 = 	(function (_super) {
		__extends(GameOverPannelSkin$Skin4, _super);
		function GameOverPannelSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverPannelSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "kanshipingfuhuo_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverPannelSkin$Skin4;
	})(eui.Skin);

	var GameOverPannelSkin$Skin5 = 	(function (_super) {
		__extends(GameOverPannelSkin$Skin5, _super);
		function GameOverPannelSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverPannelSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "lijitiaoguo_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverPannelSkin$Skin5;
	})(eui.Skin);

	function GameOverPannelSkin() {
		_super.call(this);
		this.skinParts = ["resultScoreTxt","btnGameAgain","lookVideobtn","jumpOutBtn","reviveCntTxt"];
		
		this.height = 600;
		this.width = 570;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.resultScoreTxt_i(),this._Label2_i(),this.btnGameAgain_i(),this.lookVideobtn_i(),this.jumpOutBtn_i(),this._Image2_i(),this.reviveCntTxt_i()];
	}
	var _proto = GameOverPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 520;
		t.source = "bj_4_png";
		t.width = 570;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "本次得分";
		t.y = 11;
		return t;
	};
	_proto.resultScoreTxt_i = function () {
		var t = new eui.Label();
		this.resultScoreTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 179;
		t.horizontalCenter = 0;
		t.size = 196;
		t.text = "0";
		t.textAlign = "center";
		t.width = 526;
		t.y = 41;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.text = "是否复活？";
		t.textColor = 0x65b5f7;
		t.y = 260;
		return t;
	};
	_proto.btnGameAgain_i = function () {
		var t = new eui.Button();
		this.btnGameAgain = t;
		t.height = 77;
		t.label = "";
		t.width = 199;
		t.x = 68;
		t.y = 395.5;
		t.skinName = GameOverPannelSkin$Skin3;
		return t;
	};
	_proto.lookVideobtn_i = function () {
		var t = new eui.Button();
		this.lookVideobtn = t;
		t.label = "";
		t.x = 301;
		t.y = 395.5;
		t.skinName = GameOverPannelSkin$Skin4;
		return t;
	};
	_proto.jumpOutBtn_i = function () {
		var t = new eui.Button();
		this.jumpOutBtn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 549;
		t.skinName = GameOverPannelSkin$Skin5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "fuhuoka_png";
		t.x = 211;
		t.y = 313;
		return t;
	};
	_proto.reviveCntTxt_i = function () {
		var t = new eui.Label();
		this.reviveCntTxt = t;
		t.bold = true;
		t.text = "x22";
		t.textColor = 0x65b5f7;
		t.x = 288;
		t.y = 329;
		return t;
	};
	return GameOverPannelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameOverResult.exml'] = window.GameOverResultSkin = (function (_super) {
	__extends(GameOverResultSkin, _super);
	var GameOverResultSkin$Skin6 = 	(function (_super) {
		__extends(GameOverResultSkin$Skin6, _super);
		function GameOverResultSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverResultSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "chakan_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverResultSkin$Skin6;
	})(eui.Skin);

	var GameOverResultSkin$Skin7 = 	(function (_super) {
		__extends(GameOverResultSkin$Skin7, _super);
		function GameOverResultSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverResultSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "zaiwanyiju_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverResultSkin$Skin7;
	})(eui.Skin);

	var GameOverResultSkin$Skin8 = 	(function (_super) {
		__extends(GameOverResultSkin$Skin8, _super);
		function GameOverResultSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverResultSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "fanhuishouye_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverResultSkin$Skin8;
	})(eui.Skin);

	var GameOverResultSkin$Skin9 = 	(function (_super) {
		__extends(GameOverResultSkin$Skin9, _super);
		function GameOverResultSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GameOverResultSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "faqitiaozhan_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameOverResultSkin$Skin9;
	})(eui.Skin);

	function GameOverResultSkin() {
		_super.call(this);
		this.skinParts = ["resultScoreTxt","headGrp","lookRankBtn","playAgainBtn","gotoMenuBtn","fightBtn"];
		
		this.height = 622;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.resultScoreTxt_i(),this.headGrp_i(),this.lookRankBtn_i(),this.playAgainBtn_i(),this.gotoMenuBtn_i(),this.fightBtn_i()];
	}
	var _proto = GameOverResultSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bj_4_png";
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 11;
		t.text = "本次得分";
		t.y = 11;
		return t;
	};
	_proto.resultScoreTxt_i = function () {
		var t = new eui.Label();
		this.resultScoreTxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 179;
		t.horizontalCenter = 0;
		t.size = 196;
		t.text = "0";
		t.textAlign = "center";
		t.width = 526;
		t.y = 41;
		return t;
	};
	_proto.headGrp_i = function () {
		var t = new eui.Group();
		this.headGrp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 135;
		t.horizontalCenter = 0.5;
		t.width = 467;
		t.y = 255;
		return t;
	};
	_proto.lookRankBtn_i = function () {
		var t = new eui.Button();
		this.lookRankBtn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 460;
		t.skinName = GameOverResultSkin$Skin6;
		return t;
	};
	_proto.playAgainBtn_i = function () {
		var t = new eui.Button();
		this.playAgainBtn = t;
		t.label = "";
		t.x = -1;
		t.y = 542;
		t.skinName = GameOverResultSkin$Skin7;
		return t;
	};
	_proto.gotoMenuBtn_i = function () {
		var t = new eui.Button();
		this.gotoMenuBtn = t;
		t.label = "";
		t.x = 212;
		t.y = 542;
		t.skinName = GameOverResultSkin$Skin8;
		return t;
	};
	_proto.fightBtn_i = function () {
		var t = new eui.Button();
		this.fightBtn = t;
		t.label = "";
		t.x = 423;
		t.y = 542;
		t.skinName = GameOverResultSkin$Skin9;
		return t;
	};
	return GameOverResultSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GuideScene.exml'] = window.GuideSceneSkin = (function (_super) {
	__extends(GuideSceneSkin, _super);
	var GuideSceneSkin$Skin10 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin10, _super);
		function GuideSceneSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "jifen_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GuideSceneSkin$Skin10;
	})(eui.Skin);

	var GuideSceneSkin$Skin11 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin11, _super);
		function GuideSceneSkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shengyin_1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "shengyin_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GuideSceneSkin$Skin11;
	})(eui.Skin);

	var GuideSceneSkin$Skin12 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin12, _super);
		function GuideSceneSkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "paixing_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GuideSceneSkin$Skin12;
	})(eui.Skin);

	var GuideSceneSkin$Skin13 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin13, _super);
		function GuideSceneSkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "qunpaixing_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GuideSceneSkin$Skin13;
	})(eui.Skin);

	var GuideSceneSkin$Skin14 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin14, _super);
		function GuideSceneSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "pifu_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GuideSceneSkin$Skin14;
	})(eui.Skin);

	var GuideSceneSkin$Skin15 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin15, _super);
		function GuideSceneSkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "anniu_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = -44;
			t.source = "card_png";
			t.verticalCenter = -2;
			return t;
		};
		return GuideSceneSkin$Skin15;
	})(eui.Skin);

	var GuideSceneSkin$Skin16 = 	(function (_super) {
		__extends(GuideSceneSkin$Skin16, _super);
		function GuideSceneSkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = GuideSceneSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "anniu_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.scaleX = 1;
			t.scaleY = 1;
			t.source = "Start_png";
			t.verticalCenter = -2;
			return t;
		};
		return GuideSceneSkin$Skin16;
	})(eui.Skin);

	function GuideSceneSkin() {
		_super.call(this);
		this.skinParts = ["justbg","btnDoubleScore","labelDoubleScore","btnMute","btnRank","btnGroupRank","btnSkin","btnRevive","labelReviveCard","btnStartGame"];
		
		this.height = 1330;
		this.width = 750;
		this.elementsContent = [this.justbg_i(),this._Group1_i(),this._Group2_i(),this._Image1_i(),this._Group3_i()];
	}
	var _proto = GuideSceneSkin.prototype;

	_proto.justbg_i = function () {
		var t = new eui.Image();
		this.justbg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.source = "bj_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.right = 30;
		t.top = 440;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.btnDoubleScore_i(),this.labelDoubleScore_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.btnDoubleScore_i = function () {
		var t = new eui.Button();
		this.btnDoubleScore = t;
		t.enabled = true;
		t.height = 128;
		t.label = "";
		t.width = 146;
		t.x = 0;
		t.y = 31;
		t.skinName = GuideSceneSkin$Skin10;
		return t;
	};
	_proto.labelDoubleScore_i = function () {
		var t = new eui.Label();
		this.labelDoubleScore = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "剩余1次";
		t.textAlign = "center";
		t.width = 144;
		t.x = 10;
		t.y = 111;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 146;
		t.horizontalCenter = 2.5;
		t.top = 949;
		t.elementsContent = [this.btnMute_i(),this.btnRank_i(),this.btnGroupRank_i(),this.btnSkin_i()];
		return t;
	};
	_proto.btnMute_i = function () {
		var t = new eui.CheckBox();
		this.btnMute = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = GuideSceneSkin$Skin11;
		return t;
	};
	_proto.btnRank_i = function () {
		var t = new eui.Button();
		this.btnRank = t;
		t.height = 130;
		t.label = "";
		t.width = 90;
		t.x = 155;
		t.y = 1;
		t.skinName = GuideSceneSkin$Skin12;
		return t;
	};
	_proto.btnGroupRank_i = function () {
		var t = new eui.Button();
		this.btnGroupRank = t;
		t.height = 130;
		t.label = "";
		t.width = 90;
		t.x = 310;
		t.y = 1;
		t.skinName = GuideSceneSkin$Skin13;
		return t;
	};
	_proto.btnSkin_i = function () {
		var t = new eui.Button();
		this.btnSkin = t;
		t.height = 130;
		t.label = "";
		t.width = 90;
		t.x = 465;
		t.y = 0;
		t.skinName = GuideSceneSkin$Skin14;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "logo_png";
		t.top = 120;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 294;
		t.horizontalCenter = 0.5;
		t.top = 588;
		t.width = 475;
		t.elementsContent = [this.btnRevive_i(),this.labelReviveCard_i(),this.btnStartGame_i()];
		return t;
	};
	_proto.btnRevive_i = function () {
		var t = new eui.Button();
		this.btnRevive = t;
		t.horizontalCenter = 0.5;
		t.label = "Button";
		t.verticalCenter = 79;
		t.skinName = GuideSceneSkin$Skin15;
		return t;
	};
	_proto.labelReviveCard_i = function () {
		var t = new eui.Label();
		this.labelReviveCard = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Arial";
		t.height = 48;
		t.size = 44;
		t.text = "(0/5)";
		t.textAlign = "left";
		t.textColor = 0x015c71;
		t.verticalAlign = "middle";
		t.width = 117;
		t.x = 289;
		t.y = 198;
		return t;
	};
	_proto.btnStartGame_i = function () {
		var t = new eui.Button();
		this.btnStartGame = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 20;
		t.y = 21;
		t.skinName = GuideSceneSkin$Skin16;
		return t;
	};
	return GuideSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RankPage.exml'] = window.RankPageSkin = (function (_super) {
	__extends(RankPageSkin, _super);
	var RankPageSkin$Skin17 = 	(function (_super) {
		__extends(RankPageSkin$Skin17, _super);
		function RankPageSkin$Skin17() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankPageSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "page_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankPageSkin$Skin17;
	})(eui.Skin);

	var RankPageSkin$Skin18 = 	(function (_super) {
		__extends(RankPageSkin$Skin18, _super);
		function RankPageSkin$Skin18() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankPageSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "page_2_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankPageSkin$Skin18;
	})(eui.Skin);

	var RankPageSkin$Skin19 = 	(function (_super) {
		__extends(RankPageSkin$Skin19, _super);
		function RankPageSkin$Skin19() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","shijiepaixing_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankPageSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "shijiepaixing_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankPageSkin$Skin19;
	})(eui.Skin);

	var RankPageSkin$Skin20 = 	(function (_super) {
		__extends(RankPageSkin$Skin20, _super);
		function RankPageSkin$Skin20() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","haoyoupaixing_2_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankPageSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "haoyoupaixing_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankPageSkin$Skin20;
	})(eui.Skin);

	var RankPageSkin$Skin21 = 	(function (_super) {
		__extends(RankPageSkin$Skin21, _super);
		function RankPageSkin$Skin21() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankPageSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "return_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankPageSkin$Skin21;
	})(eui.Skin);

	function RankPageSkin() {
		_super.call(this);
		this.skinParts = ["lastBtn","nextBtn","radioBtn2","radioBtn1","closeBtn","listGrp"];
		
		this.height = 1141;
		this.width = 600;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.lastBtn_i(),this.nextBtn_i(),this.radioBtn2_i(),this.radioBtn1_i(),this.closeBtn_i(),this.listGrp_i()];
	}
	var _proto = RankPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 778;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(38,38,17,12);
		t.source = "tip_bj_png";
		t.width = 540;
		t.y = 213;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(38,38,17,12);
		t.source = "tip_bj_png";
		t.width = 540;
		t.y = 1030;
		return t;
	};
	_proto.lastBtn_i = function () {
		var t = new eui.Button();
		this.lastBtn = t;
		t.label = "";
		t.x = 141;
		t.y = 910;
		t.skinName = RankPageSkin$Skin17;
		return t;
	};
	_proto.nextBtn_i = function () {
		var t = new eui.Button();
		this.nextBtn = t;
		t.label = "";
		t.x = 327;
		t.y = 910;
		t.skinName = RankPageSkin$Skin18;
		return t;
	};
	_proto.radioBtn2_i = function () {
		var t = new eui.RadioButton();
		this.radioBtn2 = t;
		t.label = "";
		t.x = 300;
		t.y = 145;
		t.skinName = RankPageSkin$Skin19;
		return t;
	};
	_proto.radioBtn1_i = function () {
		var t = new eui.RadioButton();
		this.radioBtn1 = t;
		t.label = "";
		t.x = 84;
		t.y = 145;
		t.skinName = RankPageSkin$Skin20;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.label = "";
		t.x = 3;
		t.y = 1;
		t.skinName = RankPageSkin$Skin21;
		return t;
	};
	_proto.listGrp_i = function () {
		var t = new eui.Group();
		this.listGrp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 626;
		t.horizontalCenter = 0;
		t.width = 502;
		t.y = 272;
		return t;
	};
	return RankPageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RevivePromotion.exml'] = window.RevivePromotionSkin = (function (_super) {
	__extends(RevivePromotionSkin, _super);
	var RevivePromotionSkin$Skin22 = 	(function (_super) {
		__extends(RevivePromotionSkin$Skin22, _super);
		function RevivePromotionSkin$Skin22() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RevivePromotionSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "lijiyaoqing_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RevivePromotionSkin$Skin22;
	})(eui.Skin);

	var RevivePromotionSkin$Skin23 = 	(function (_super) {
		__extends(RevivePromotionSkin$Skin23, _super);
		function RevivePromotionSkin$Skin23() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RevivePromotionSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "guanbi_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RevivePromotionSkin$Skin23;
	})(eui.Skin);

	function RevivePromotionSkin() {
		_super.call(this);
		this.skinParts = ["btnWantReviveCard","btnGoHome"];
		
		this.height = 410;
		this.width = 570;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this.btnWantReviveCard_i(),this.btnGoHome_i()];
	}
	var _proto = RevivePromotionSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 350;
		t.source = "bj_3_png";
		t.width = 570;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "wenzi_1_png";
		t.y = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 34;
		t.text = "复活道具";
		t.x = 219;
		t.y = 19;
		return t;
	};
	_proto.btnWantReviveCard_i = function () {
		var t = new eui.Button();
		this.btnWantReviveCard = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.y = 260;
		t.skinName = RevivePromotionSkin$Skin22;
		return t;
	};
	_proto.btnGoHome_i = function () {
		var t = new eui.Button();
		this.btnGoHome = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 359;
		t.skinName = RevivePromotionSkin$Skin23;
		return t;
	};
	return RevivePromotionSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScorePanel.exml'] = window.ScorePanelSkin = (function (_super) {
	__extends(ScorePanelSkin, _super);
	function ScorePanelSkin() {
		_super.call(this);
		this.skinParts = ["labelDoubleTimes","labelScore"];
		
		this.height = 209;
		this.width = 326;
		this.elementsContent = [this._Group1_i(),this.labelScore_i()];
	}
	var _proto = ScorePanelSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 11;
		t.elementsContent = [this.labelDoubleTimes_i()];
		return t;
	};
	_proto.labelDoubleTimes_i = function () {
		var t = new eui.Label();
		this.labelDoubleTimes = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "双倍剩余次数:";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.width = 293;
		t.y = 0;
		return t;
	};
	_proto.labelScore_i = function () {
		var t = new eui.Label();
		this.labelScore = t;
		t.horizontalCenter = 0;
		t.size = 160;
		t.text = "0";
		t.textColor = 0xd6c4f9;
		t.y = 50;
		return t;
	};
	return ScorePanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/SkinPage.exml'] = window.SkinPageSkin = (function (_super) {
	__extends(SkinPageSkin, _super);
	function SkinPageSkin() {
		_super.call(this);
		this.skinParts = ["btnGoHome"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Label1_i(),this.btnGoHome_i()];
	}
	var _proto = SkinPageSkin.prototype;

	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "皮肤";
		t.x = 140;
		t.y = 119;
		return t;
	};
	_proto.btnGoHome_i = function () {
		var t = new eui.Button();
		this.btnGoHome = t;
		t.label = "关闭";
		t.x = 294;
		t.y = 5;
		return t;
	};
	return SkinPageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StarPanel.exml'] = window.StarPanelSkin = (function (_super) {
	__extends(StarPanelSkin, _super);
	function StarPanelSkin() {
		_super.call(this);
		this.skinParts = ["labelStarNum"];
		
		this.height = 72;
		this.width = 317;
		this.elementsContent = [this._Image1_i(),this.labelStarNum_i()];
	}
	var _proto = StarPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "star_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.labelStarNum_i = function () {
		var t = new eui.Label();
		this.labelStarNum = t;
		t.anchorOffsetX = 0;
		t.size = 40;
		t.text = "1111111111";
		t.verticalCenter = 6;
		t.width = 243;
		t.x = 87;
		return t;
	};
	return StarPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TipsPage.exml'] = window.TipsPageSkin = (function (_super) {
	__extends(TipsPageSkin, _super);
	var TipsPageSkin$Skin24 = 	(function (_super) {
		__extends(TipsPageSkin$Skin24, _super);
		function TipsPageSkin$Skin24() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TipsPageSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "haode_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TipsPageSkin$Skin24;
	})(eui.Skin);

	function TipsPageSkin() {
		_super.call(this);
		this.skinParts = ["titleTxt","tipImg","goodBtn"];
		
		this.elementsContent = [this._Image1_i(),this.titleTxt_i(),this.tipImg_i(),this.goodBtn_i()];
	}
	var _proto = TipsPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "bj_3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.titleTxt_i = function () {
		var t = new eui.Label();
		this.titleTxt = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 34;
		t.text = "兑换皮肤";
		t.y = 21;
		return t;
	};
	_proto.tipImg_i = function () {
		var t = new eui.Image();
		this.tipImg = t;
		t.horizontalCenter = 0.5;
		t.source = "wenzi_4_png";
		t.y = 105;
		return t;
	};
	_proto.goodBtn_i = function () {
		var t = new eui.Button();
		this.goodBtn = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.y = 255;
		t.skinName = TipsPageSkin$Skin24;
		return t;
	};
	return TipsPageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);