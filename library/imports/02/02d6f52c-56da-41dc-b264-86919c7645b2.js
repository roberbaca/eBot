"use strict";
cc._RF.push(module, '02d6fUsVtpB3LJkhpGcdkWy', 'GameController');
// Script/GameController.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // PLAYER PREFAB
        _this.PlayerPrefab = null;
        // OBJECTS
        _this.startDoor = null;
        _this.exitDoor = null;
        // AUDIO SFX
        _this.slideDoorSound = null;
        _this.newOnlineSound = null;
        _this.music = null;
        _this.levelText = null;
        // LEVEL COMPLETED SCREEN
        _this.levelCompletedLabel = null;
        _this.BlackBackground = null;
        _this.BlackLabel = null;
        _this.createAnewOne = false;
        _this.isLevelCompleted = false;
        return _this;
    }
    GameController.prototype.onLoad = function () {
        // activamos el sistema de Colisiones
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // debug draw
        collisionManager.enabledDebugDraw = false;
        this.BlackBackground.node.active = false;
        this.BlackLabel.node.active = false;
        this.levelCompletedLabel.node.active = false;
    };
    GameController.prototype.start = function () {
        this.isLevelCompleted = false;
        this.startPosX = this.startDoor.node.position.x;
        this.startPosY = this.startDoor.node.position.y;
        this.newClone();
    };
    GameController.prototype.update = function (dt) {
        if (this.createAnewOne) {
            this.schedule(this.newClone, 2, 0);
            this.createAnewOne = false;
        }
    };
    GameController.prototype.newClone = function () {
        this.startDoor.getComponent(cc.Animation).play();
        var newPlayer = cc.instantiate(this.PlayerPrefab);
        newPlayer.setPosition(this.startPosX, this.startPosY);
        this.node.getChildByName("player").addChild(newPlayer);
        this.newOnlineSound.play();
    };
    GameController.prototype.endLevel = function () {
        this.isLevelCompleted = true;
        this.exitDoor.getComponent(cc.Animation).play();
        this.slideDoorSound.play();
        this.BlackBackground.node.active = true;
        this.BlackLabel.node.active = true;
        this.levelCompletedLabel.node.active = true;
        this.schedule(this.nextLevel, 3, 0);
    };
    GameController.prototype.nextLevel = function () {
        if (this.levelText.string == "level2") {
            cc.director.loadScene('Level2');
        }
        if (this.levelText.string == "level3") {
            cc.director.loadScene('Level3');
        }
        if (this.levelText.string == "level4") {
            cc.director.loadScene('TheEnd');
        }
    };
    __decorate([
        property(cc.Prefab)
    ], GameController.prototype, "PlayerPrefab", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameController.prototype, "startDoor", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameController.prototype, "exitDoor", void 0);
    __decorate([
        property(cc.AudioSource)
    ], GameController.prototype, "slideDoorSound", void 0);
    __decorate([
        property(cc.AudioSource)
    ], GameController.prototype, "newOnlineSound", void 0);
    __decorate([
        property(cc.AudioClip)
    ], GameController.prototype, "music", void 0);
    __decorate([
        property(cc.Label)
    ], GameController.prototype, "levelText", void 0);
    __decorate([
        property(cc.RichText)
    ], GameController.prototype, "levelCompletedLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameController.prototype, "BlackBackground", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameController.prototype, "BlackLabel", void 0);
    GameController = __decorate([
        ccclass
    ], GameController);
    return GameController;
}(cc.Component));
exports.default = GameController;

cc._RF.pop();