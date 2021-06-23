
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQW9IQztRQWxIRyxnQkFBZ0I7UUFFaEIsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFLL0IsVUFBVTtRQUVWLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixZQUFZO1FBRVosb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUd0QyxXQUFLLEdBQWlCLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLHlCQUF5QjtRQUV6Qix5QkFBbUIsR0FBZ0IsSUFBSSxDQUFDO1FBR3hDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7SUF5RXRDLENBQUM7SUF2RUcsK0JBQU0sR0FBTjtRQUdHLHFDQUFxQztRQUNwQyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6RCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWhDLGFBQWE7UUFDYixnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FB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MERBQ2E7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzswREFDYTtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO2lEQUNJO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7SUFLM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrREFDa0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNTO0lBdkNaLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FvSGxDO0lBQUQscUJBQUM7Q0FwSEQsQUFvSEMsQ0FwSDJDLEVBQUUsQ0FBQyxTQUFTLEdBb0h2RDtrQkFwSG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxueyAgICBcclxuICAgIC8vIFBMQVlFUiBQUkVGQUJcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBQbGF5ZXJQcmVmYWI6Y2MuUHJlZmFiICA9IG51bGw7XHJcblxyXG4gICAgc3RhcnRQb3NYOiBudW1iZXI7XHJcbiAgICBzdGFydFBvc1k6IG51bWJlcjtcclxuXHJcbiAgICAvLyBPQkpFQ1RTXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgc3RhcnREb29yOmNjLlNwcml0ZSAgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBleGl0RG9vcjpjYy5TcHJpdGUgID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy8gQVVESU8gU0ZYXHJcbiAgICBAcHJvcGVydHkoY2MuQXVkaW9Tb3VyY2UpXHJcbiAgICBzbGlkZURvb3JTb3VuZDpjYy5BdWRpb1NvdXJjZSAgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb1NvdXJjZSlcclxuICAgIG5ld09ubGluZVNvdW5kOiBjYy5BdWRpb1NvdXJjZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIG11c2ljOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsZXZlbFRleHQ6IGNjLkxhYmVsID0gbnVsbDsgICAgXHJcblxyXG5cclxuICAgIC8vIExFVkVMIENPTVBMRVRFRCBTQ1JFRU5cclxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcclxuICAgIGxldmVsQ29tcGxldGVkTGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDsgXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIEJsYWNrQmFja2dyb3VuZDpjYy5TcHJpdGUgID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgQmxhY2tMYWJlbDpjYy5TcHJpdGUgID0gbnVsbDtcclxuICAgIFxyXG4gICAgY3JlYXRlQW5ld09uZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlzTGV2ZWxDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBvbkxvYWQgKCkgXHJcbiAgICB7ICAgICAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgLy8gYWN0aXZhbW9zIGVsIHNpc3RlbWEgZGUgQ29saXNpb25lc1xyXG4gICAgICAgIHZhciBjb2xsaXNpb25NYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xyXG4gICAgICAgIGNvbGxpc2lvbk1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vIGRlYnVnIGRyYXdcclxuICAgICAgICBjb2xsaXNpb25NYW5hZ2VyLmVuYWJsZWREZWJ1Z0RyYXcgPSBmYWxzZTsgICAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5CbGFja0JhY2tncm91bmQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJsYWNrTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxldmVsQ29tcGxldGVkTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc0xldmVsQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvc1ggPSB0aGlzLnN0YXJ0RG9vci5ub2RlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvc1kgPSB0aGlzLnN0YXJ0RG9vci5ub2RlLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgdGhpcy5uZXdDbG9uZSgpOyAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkgXHJcbiAgICB7XHJcbiAgICAgICBpZiAodGhpcy5jcmVhdGVBbmV3T25lKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5uZXdDbG9uZSwgMiwgMCk7ICAgICAgICAgICBcclxuICAgICAgICAgICB0aGlzLmNyZWF0ZUFuZXdPbmUgPSBmYWxzZTtcclxuICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgbmV3Q2xvbmUoKVxyXG57ICAgIFxyXG4gICAgdGhpcy5zdGFydERvb3IuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgdmFyIG5ld1BsYXllciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUGxheWVyUHJlZmFiKTsgICAgICAgXHJcbiAgICBuZXdQbGF5ZXIuc2V0UG9zaXRpb24odGhpcy5zdGFydFBvc1gsIHRoaXMuc3RhcnRQb3NZKTsgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwbGF5ZXJcIikuYWRkQ2hpbGQobmV3UGxheWVyKTsgIFxyXG4gICAgdGhpcy5uZXdPbmxpbmVTb3VuZC5wbGF5KCk7ICAgXHJcbn1cclxuICAgICBcclxuXHJcbmVuZExldmVsKClcclxue1xyXG4gICAgdGhpcy5pc0xldmVsQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZXhpdERvb3IuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgdGhpcy5zbGlkZURvb3JTb3VuZC5wbGF5KCk7ICAgICAgXHJcbiAgICB0aGlzLkJsYWNrQmFja2dyb3VuZC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLkJsYWNrTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5sZXZlbENvbXBsZXRlZExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NoZWR1bGUodGhpcy5uZXh0TGV2ZWwsIDMsIDApO1xyXG59XHJcbiAgXHJcbm5leHRMZXZlbCgpXHJcbntcclxuICAgIGlmICh0aGlzLmxldmVsVGV4dC5zdHJpbmcgPT0gXCJsZXZlbDJcIilcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0xldmVsMicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGV2ZWxUZXh0LnN0cmluZyA9PSBcImxldmVsM1wiKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTGV2ZWwzJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sZXZlbFRleHQuc3RyaW5nID09IFwibGV2ZWw0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdUaGVFbmQnKTtcclxuICAgIH1cclxufVxyXG5cclxufVxyXG4iXX0=