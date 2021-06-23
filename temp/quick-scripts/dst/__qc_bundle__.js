
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/GameController');
require('./assets/Script/MainMenu');
require('./assets/Script/Player');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba354DQcstN6ry5ZGhwceTt', 'Player');
// Script/Player.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        // declaracion de variables 
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // banderas para determinar direccion del personaje
        _this.isLeft = false;
        _this.isRight = false;
        _this.isDown = false;
        _this.isUp = false;
        _this.lookLeft = false;
        _this.lookRight = false;
        _this.lookDown = true;
        _this.lookUp = false;
        _this.canMoveRight = true;
        _this.canMoveLeft = true;
        _this.canMoveUp = true;
        _this.canMoveDown = true;
        _this.canMove = true;
        // movimiento
        _this.velocityX = 0;
        _this.velocityY = 0;
        _this.maxVel = 4;
        _this.acc = 2;
        // banderas para las llaves
        _this.isYellowKey = false;
        // banderas para los powerUps
        _this.isPotion = false;
        // asignamos el componente del GameController
        _this.gameController = null;
        _this.isGameOver = false;
        _this.destroyEnemy = false;
        _this.isShutDown = false; // bandera para inactivar al personaje
        _this.isOriginal = true; // bandera para identificar al bot activo
        _this.isExploding = false;
        _this.finished = false;
        _this.explosionSound = null;
        _this.powerOffSound = null;
        return _this;
    }
    // eventos del teclado
    NewClass.prototype.movePlayer = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.isLeft = true;
                this.lookLeft = true;
                this.lookRight = false;
                this.lookUp = false;
                this.lookDown = false;
                break;
            case cc.macro.KEY.right:
                this.isRight = true;
                this.lookLeft = false;
                this.lookRight = true;
                this.lookUp = false;
                this.lookDown = false;
                break;
            case cc.macro.KEY.up:
                this.isUp = true;
                this.lookLeft = false;
                this.lookRight = false;
                this.lookUp = true;
                this.lookDown = false;
                break;
            case cc.macro.KEY.down:
                this.isDown = true;
                this.lookLeft = false;
                this.lookRight = false;
                this.lookUp = false;
                this.lookDown = true;
                break;
            case cc.macro.KEY.ctrl:
                this.isExploding = true;
                break;
            case cc.macro.KEY.s:
                this.isShutDown = true;
                break;
        }
    };
    NewClass.prototype.stopPlayer = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.isLeft = false;
                break;
            case cc.macro.KEY.right:
                this.isRight = false;
                break;
            case cc.macro.KEY.up:
                this.isUp = false;
                break;
            case cc.macro.KEY.down:
                this.isDown = false;
                break;
        }
    };
    NewClass.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.movePlayer, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopPlayer, this);
        this.gameController = cc.Canvas.instance.node.getComponent("GameController");
        this.walkLeftAnimation = this.getComponent(cc.Animation).getAnimationState('walkLeft');
        this.walkRightAnimation = this.getComponent(cc.Animation).getAnimationState('walkRight');
        this.idleAnimation = this.getComponent(cc.Animation).getAnimationState('idle');
        this.shutDownAnimation = this.getComponent(cc.Animation).getAnimationState('shutDown');
        this.shuttedAnimation = this.getComponent(cc.Animation).getAnimationState('shutted');
        this.explodenAnimation = this.getComponent(cc.Animation).getAnimationState('explode');
    };
    NewClass.prototype.start = function () {
        this.originX = this.node.position.x;
        this.originY = this.node.position.y;
        this.isShutDown = false;
    };
    NewClass.prototype.update = function (dt) {
        // Se apaga el robot
        if (this.isShutDown) {
            if (!this.shuttedAnimation.isPlaying) {
                this.shutDownAnimation.play();
            }
            this.powerOffSound.play();
            this.gameController.newClone();
            this.isOriginal = false;
            this.isShutDown = false;
        }
        // Autodestruccion = Countdown + Explosion
        if (this.isExploding && this.isOriginal) {
            this.gameController.createAnewOne = true;
            this.schedule(this.explodeCountdown, 2.7, 0);
            this.explodenAnimation.play();
            this.isExploding = false;
        }
        // Limito la velocidad para que no se acelere de forma infinita
        if (this.velocityX <= (-this.maxVel)) {
            this.velocityX = -this.maxVel;
        }
        if (this.velocityX >= this.maxVel) {
            this.velocityX = this.maxVel;
        }
        if (this.velocityY <= (-this.maxVel)) {
            this.velocityY = -this.maxVel;
        }
        if (this.velocityY >= this.maxVel) {
            this.velocityY = this.maxVel;
        }
        if (!this.gameController.isLevelCompleted) {
            if (this.isOriginal && !this.isExploding && !this.isShutDown && !this.explodenAnimation.isPlaying) {
                // move left
                if (this.isLeft && this.canMoveLeft) {
                    this.node.setPosition(this.node.position.x += this.velocityX, this.node.position.y);
                    this.velocityX -= this.acc; // MRUV
                    this.velocityY = 0;
                    this.walkLeftAnimation.play();
                }
                // move right
                else if (this.isRight && this.canMoveRight) {
                    this.node.setPosition(this.node.position.x += this.velocityX, this.node.position.y);
                    this.velocityX += this.acc; // MRUV
                    this.velocityY = 0;
                    this.walkRightAnimation.play();
                }
                // move up
                else if (this.isUp && this.canMoveUp) {
                    //this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
                    //this.velocityY += this.acc; // MRUV
                    //this.velocityX = 0;     
                    //this.walkUpAnimation.play(); 
                }
                // move down
                else if (this.isDown && this.canMoveDown) {
                    //this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
                    //this.velocityY -= this.acc; // MRUV
                    //this.velocityX = 0; 
                    //this.walkDownAnimation.play();              
                }
                else if (!this.isLeft && !this.isRight) {
                    this.idleAnimation.play();
                }
            }
        }
        if (!this.isShutDown && !this.isOriginal && !this.isExploding) {
            if (!this.shutDownAnimation.isPlaying) {
                this.shuttedAnimation.play();
            }
        }
    };
    NewClass.prototype.onCollisionEnter = function (otherCollider, selfCollider) {
        if (otherCollider.name == "exit<BoxCollider>") {
            //this.isGameOver = true;
            this.schedule(this.ending, 0.7, 0);
            cc.log("THE END");
        }
        // bloques     
        if (otherCollider.name == "bloque<BoxCollider>" && this.isRight) {
            this.canMoveRight = false;
        }
        if (otherCollider.name == "bloque<BoxCollider>" && this.isLeft) {
            this.canMoveLeft = false;
        }
        if (otherCollider.name == "bloque<BoxCollider>" && this.isDown) {
            this.canMoveDown = false;
        }
        if (otherCollider.name == "bloque<BoxCollider>" && this.isUp) {
            this.canMoveUp = false;
        }
        // Walls     
        if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isRight) {
            this.canMoveRight = false;
        }
        if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isLeft) {
            this.canMoveLeft = false;
        }
        if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isDown) {
            this.canMoveDown = false;
        }
        if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isUp) {
            this.canMoveUp = false;
        }
        // Collision with player
        if (otherCollider.name == "player<BoxCollider>" && this.isRight) {
            this.canMoveRight = false;
        }
        if (otherCollider.name == "player<BoxCollider>" && this.isLeft) {
            this.canMoveLeft = false;
        }
        if (otherCollider.name == "player<BoxCollider>" && this.isDown) {
            this.canMoveDown = false;
        }
        if (otherCollider.name == "player<BoxCollider>" && this.isUp) {
            this.canMoveUp = false;
        }
    };
    NewClass.prototype.onCollisionExit = function (otherCollider, selfCollider) {
        if (otherCollider.name == "obstacle copy<BoxCollider>" || otherCollider.name == "player<BoxCollider>" || otherCollider.name == "bloque<BoxCollider>") {
            this.canMoveRight = true;
            this.canMoveLeft = true;
            this.canMoveUp = true;
            this.canMoveDown = true;
        }
        if (otherCollider.name == "obstacle2<BoxCollider>") {
            otherCollider.node.destroy();
        }
    };
    NewClass.prototype.onCollisionStay = function (otherCollider, selfCollider) {
        // si estamos en modo Autodestruccion y en contacto con otro robot. Iniciamos la fase de autodestruccion en ese robot.
        if (otherCollider.name == "player<BoxCollider>" || otherCollider.name == "bloque<BoxCollider>") {
            if (this.finished) {
                otherCollider.node.destroy();
                this.explosionSound.play();
                this.finished = false;
            }
        }
        if (otherCollider.name == "obstacle2<BoxCollider>") {
            this.node.setPosition(this.node.position.x, this.node.position.y += this.velocityY);
            this.velocityY -= this.acc; // MRUV
            this.velocityX = 0;
        }
        if (otherCollider.name == "obstacle3<BoxCollider>") {
            this.node.setPosition(this.node.position.x, this.node.position.y += this.velocityY);
            this.velocityY -= this.acc; // MRUV
            this.velocityX = 0;
        }
    };
    NewClass.prototype.onExplosionEnd = function () {
        this.finished = true;
    };
    NewClass.prototype.ending = function () {
        this.gameController.endLevel();
        //cc.director.loadScene('TheEnd');          
    };
    NewClass.prototype.explodeCountdown = function () {
        this.isExploding = false;
        this.explosionSound.play();
        this.node.destroy();
    };
    __decorate([
        property(cc.AudioSource)
    ], NewClass.prototype, "explosionSound", void 0);
    __decorate([
        property(cc.AudioSource)
    ], NewClass.prototype, "powerOffSound", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFHQyw0QkFBNEI7UUFIN0IscUVBd1pDO1FBblpBLG1EQUFtRDtRQUNuRCxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixVQUFJLEdBQVksS0FBSyxDQUFDO1FBRXRCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBV3hCLGFBQWE7UUFDYixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBTWYsMkJBQTJCO1FBQzVCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLDZCQUE2QjtRQUU3QixjQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLDZDQUE2QztRQUM3QyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFFdEMsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsZ0JBQVUsR0FBWSxLQUFLLENBQUMsQ0FBRyxzQ0FBc0M7UUFDckUsZ0JBQVUsR0FBWSxJQUFJLENBQUMsQ0FBSSx5Q0FBeUM7UUFDeEUsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUkxQixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDOztJQXNWdEMsQ0FBQztJQWxWQSxzQkFBc0I7SUFDdEIsNkJBQVUsR0FBVixVQUFXLEtBQUs7UUFFYixRQUFPLEtBQUssQ0FBQyxPQUFPLEVBQ3BCO1lBQ0ksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxHQUFLLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLE1BQU07WUFFVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUssS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsTUFBTTtZQUVULEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBSyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixNQUFNO1lBRVYsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxHQUFLLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU07WUFFVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixNQUFNO1lBRVYsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLEtBQUs7UUFFWixRQUFPLEtBQUssQ0FBQyxPQUFPLEVBQ3BCO1lBQ0ksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUdELHlCQUFNLEdBQU47UUFFSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMxRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxFQUFFLENBQUMsU0FBUyxDQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxFQUFFLENBQUMsU0FBUyxDQUFFLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxFQUFFLENBQUMsU0FBUyxDQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELHdCQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFPLEVBQUU7UUFHTixvQkFBb0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUNuQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUNwQztnQkFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakM7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQ3ZDO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFFQSwrREFBK0Q7UUFDL0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQ3BDO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDakM7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDcEM7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNqQztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUNqQztZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUdGLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUN6QztZQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFDakc7Z0JBQ0ksWUFBWTtnQkFDWixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFDbkM7b0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25GLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87b0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2pDO2dCQUVELGFBQWE7cUJBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQzFDO29CQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPO29CQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNsQztnQkFFRCxVQUFVO3FCQUNMLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUNuQztvQkFDSSxxRkFBcUY7b0JBQ3JGLHFDQUFxQztvQkFDckMsMEJBQTBCO29CQUMxQiwrQkFBK0I7aUJBQ2xDO2dCQUVELFlBQVk7cUJBQ1AsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQ3ZDO29CQUNJLHFGQUFxRjtvQkFDckYscUNBQXFDO29CQUNyQyxzQkFBc0I7b0JBQ3RCLDhDQUE4QztpQkFDakQ7cUJBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUN0QztvQkFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM3QjthQUNKO1NBQ0o7UUFFRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUM3RDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUNyQztnQkFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDaEM7U0FDSjtJQUVULENBQUM7SUFLQSxtQ0FBZ0IsR0FBaEIsVUFBaUIsYUFBYSxFQUFDLFlBQVk7UUFHeEMsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLG1CQUFtQixFQUM3QztZQUNJLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckI7UUFHQSxlQUFlO1FBQ2hCLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUMvRDtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLHFCQUFxQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQzlEO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUkscUJBQXFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDOUQ7WUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUM1RDtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBR0EsYUFBYTtRQUNkLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSw0QkFBNEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUN0RTtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLDRCQUE0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQ3JFO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksNEJBQTRCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDckU7WUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSw0QkFBNEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUNuRTtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBR0Qsd0JBQXdCO1FBQ3hCLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUMvRDtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLHFCQUFxQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQzlEO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUkscUJBQXFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFDOUQ7WUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUM1RDtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBRUosQ0FBQztJQUVFLGtDQUFlLEdBQWYsVUFBZ0IsYUFBYSxFQUFDLFlBQVk7UUFFdEMsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLDRCQUE0QixJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUkscUJBQXFCLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsRUFDcEo7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUVELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSx3QkFBd0IsRUFDbEQ7WUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUdELGtDQUFlLEdBQWYsVUFBZ0IsYUFBYSxFQUFDLFlBQVk7UUFFdEMsc0hBQXNIO1FBQ3RILElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxxQkFBcUIsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLHFCQUFxQixFQUM5RjtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFDakI7Z0JBQ0ksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDekI7U0FDSjtRQUVELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSx3QkFBd0IsRUFDbEQ7WUFDRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLHdCQUF3QixFQUNsRDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBR0QsaUNBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFHRCx5QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUvQiw0Q0FBNEM7SUFDaEQsQ0FBQztJQUVELG1DQUFnQixHQUFoQjtRQUVJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBeFZKO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0RBQ2E7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDWTtJQWxFakIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdaNUI7SUFBRCxlQUFDO0NBeFpELEFBd1pDLENBeFpxQyxFQUFFLENBQUMsU0FBUyxHQXdaakQ7a0JBeFpvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBHYW1lQ29udHJvbGxlciBmcm9tIFwiLi9HYW1lQ29udHJvbGxlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxueyBcclxuIFxyXG4gLy8gZGVjbGFyYWNpb24gZGUgdmFyaWFibGVzIFxyXG5cclxuIC8vIGJhbmRlcmFzIHBhcmEgZGV0ZXJtaW5hciBkaXJlY2Npb24gZGVsIHBlcnNvbmFqZVxyXG4gaXNMZWZ0OiBib29sZWFuID0gZmFsc2U7XHJcbiBpc1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XHJcbiBpc0Rvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuIGlzVXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuIFxyXG4gbG9va0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuIGxvb2tSaWdodDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gbG9va0Rvd246IGJvb2xlYW4gPSB0cnVlO1xyXG4gbG9va1VwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gY2FuTW92ZVJpZ2h0OiBib29sZWFuID0gdHJ1ZTtcclxuIGNhbk1vdmVMZWZ0OiBib29sZWFuID0gdHJ1ZTtcclxuIGNhbk1vdmVVcDogYm9vbGVhbiA9IHRydWU7XHJcbiBjYW5Nb3ZlRG93bjogYm9vbGVhbiA9IHRydWU7XHJcbiBjYW5Nb3ZlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAvLyBhbmltYWNpb25lc1xyXG4gd2Fsa1JpZ2h0QW5pbWF0aW9uIDogY2MuQW5pbWF0aW9uU3RhdGU7XHJcbiB3YWxrTGVmdEFuaW1hdGlvbiA6IGNjLkFuaW1hdGlvblN0YXRlOyBcclxuIGlkbGVBbmltYXRpb24gOiBjYy5BbmltYXRpb25TdGF0ZTtcclxuIHNodXREb3duQW5pbWF0aW9uIDogY2MuQW5pbWF0aW9uU3RhdGU7XHJcbiBleHBsb2RlbkFuaW1hdGlvbiA6IGNjLkFuaW1hdGlvblN0YXRlO1xyXG4gc2h1dHRlZEFuaW1hdGlvbiA6IGNjLkFuaW1hdGlvblN0YXRlO1xyXG4gIFxyXG5cclxuIC8vIG1vdmltaWVudG9cclxuIHZlbG9jaXR5WDogbnVtYmVyID0gMDtcclxuIHZlbG9jaXR5WTogbnVtYmVyID0gMDtcclxuIG1heFZlbDogbnVtYmVyID0gNDsgICBcclxuIGFjYzogbnVtYmVyID0gMjsgXHJcblxyXG4gLy8gcG9zaWNpb24gb3JpZ2luYWxcclxuIG9yaWdpblg6IG51bWJlcjtcclxuIG9yaWdpblk6IG51bWJlcjsgICAgICBcclxuXHJcbiAgLy8gYmFuZGVyYXMgcGFyYSBsYXMgbGxhdmVzXHJcbiBpc1llbGxvd0tleTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuIC8vIGJhbmRlcmFzIHBhcmEgbG9zIHBvd2VyVXBzXHJcbiBcclxuIGlzUG90aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiBcclxuXHJcbiAvLyBhc2lnbmFtb3MgZWwgY29tcG9uZW50ZSBkZWwgR2FtZUNvbnRyb2xsZXJcclxuIGdhbWVDb250cm9sbGVyOiBHYW1lQ29udHJvbGxlciA9IG51bGw7XHJcblxyXG4gaXNHYW1lT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuIGRlc3Ryb3lFbmVteTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuIGlzU2h1dERvd246IGJvb2xlYW4gPSBmYWxzZTsgICAvLyBiYW5kZXJhIHBhcmEgaW5hY3RpdmFyIGFsIHBlcnNvbmFqZVxyXG4gaXNPcmlnaW5hbDogYm9vbGVhbiA9IHRydWU7ICAgIC8vIGJhbmRlcmEgcGFyYSBpZGVudGlmaWNhciBhbCBib3QgYWN0aXZvXHJcbiBpc0V4cGxvZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gZmluaXNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gQHByb3BlcnR5KGNjLkF1ZGlvU291cmNlKVxyXG4gZXhwbG9zaW9uU291bmQ6IGNjLkF1ZGlvU291cmNlID0gbnVsbDtcclxuXHJcbiBAcHJvcGVydHkoY2MuQXVkaW9Tb3VyY2UpXHJcbiBwb3dlck9mZlNvdW5kOiBjYy5BdWRpb1NvdXJjZSA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAvLyBldmVudG9zIGRlbCB0ZWNsYWRvXHJcbiBtb3ZlUGxheWVyKGV2ZW50KVxyXG57XHJcbiAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSlcclxuICAgIHtcclxuICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5sZWZ0OlxyXG4gICAgICAgICAgICB0aGlzLmlzTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0xlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tVcCAgID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0Rvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxyXG4gICAgICAgICAgICB0aGlzLmlzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9va1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rVXAgICA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tEb3duID0gZmFsc2U7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnVwOlxyXG4gICAgICAgICAgICAgdGhpcy5pc1VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgIHRoaXMubG9va0xlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9va1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICB0aGlzLmxvb2tVcCAgID0gdHJ1ZTtcclxuICAgICAgICAgICAgIHRoaXMubG9va0Rvd24gPSBmYWxzZTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kb3duOlxyXG4gICAgICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgdGhpcy5sb29rTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgdGhpcy5sb29rUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9va1VwICAgPSBmYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMubG9va0Rvd24gPSB0cnVlOyAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmN0cmw6XHJcbiAgICAgICAgICAgICB0aGlzLmlzRXhwbG9kaW5nID0gdHJ1ZTsgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICB0aGlzLmlzU2h1dERvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgfVxyXG4gfVxyXG5cclxuIHN0b3BQbGF5ZXIoZXZlbnQpXHJcbiB7ICAgICBcclxuICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSlcclxuICAgICB7XHJcbiAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmxlZnQ6XHJcbiAgICAgICAgICAgICB0aGlzLmlzTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxyXG4gICAgICAgICAgICAgdGhpcy5pc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkudXA6XHJcbiAgICAgICAgICAgICB0aGlzLmlzVXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kb3duOlxyXG4gICAgICAgICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgIGJyZWFrOyAgICAgICAgIFxyXG4gICAgIH0gICAgIFxyXG4gfVxyXG5cclxuIFxyXG4gb25Mb2FkICgpIFxyXG4geyAgICAgIFxyXG4gICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTix0aGlzLm1vdmVQbGF5ZXIsdGhpcyk7XHJcbiAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCx0aGlzLnN0b3BQbGF5ZXIsdGhpcyk7ICAgIFxyXG4gICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5nZXRDb21wb25lbnQoXCJHYW1lQ29udHJvbGxlclwiKTsgICBcclxuICAgICBcclxuICAgICB0aGlzLndhbGtMZWZ0QW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoIGNjLkFuaW1hdGlvbiApLmdldEFuaW1hdGlvblN0YXRlKCd3YWxrTGVmdCcpO1xyXG4gICAgIHRoaXMud2Fsa1JpZ2h0QW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoIGNjLkFuaW1hdGlvbiApLmdldEFuaW1hdGlvblN0YXRlKCd3YWxrUmlnaHQnKTtcclxuICAgICB0aGlzLmlkbGVBbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudCggY2MuQW5pbWF0aW9uICkuZ2V0QW5pbWF0aW9uU3RhdGUoJ2lkbGUnKTsgICAgXHJcbiAgICAgdGhpcy5zaHV0RG93bkFuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KCBjYy5BbmltYXRpb24gKS5nZXRBbmltYXRpb25TdGF0ZSgnc2h1dERvd24nKTtcclxuICAgICB0aGlzLnNodXR0ZWRBbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudCggY2MuQW5pbWF0aW9uICkuZ2V0QW5pbWF0aW9uU3RhdGUoJ3NodXR0ZWQnKTtcclxuICAgICB0aGlzLmV4cGxvZGVuQW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoIGNjLkFuaW1hdGlvbiApLmdldEFuaW1hdGlvblN0YXRlKCdleHBsb2RlJyk7ICAgICAgICBcclxuIH1cclxuXHJcbiBzdGFydCAoKSBcclxuIHtcclxuICAgICB0aGlzLm9yaWdpblggPSB0aGlzLm5vZGUucG9zaXRpb24ueDtcclxuICAgICB0aGlzLm9yaWdpblkgPSB0aGlzLm5vZGUucG9zaXRpb24ueTtcclxuICAgICB0aGlzLmlzU2h1dERvd24gPSBmYWxzZTtcclxuIH1cclxuXHJcbiB1cGRhdGUoZHQpXHJcbiB7ICAgICAgICAgICAgIFxyXG5cclxuICAgIC8vIFNlIGFwYWdhIGVsIHJvYm90XHJcbiAgICBpZiAodGhpcy5pc1NodXREb3duKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5zaHV0dGVkQW5pbWF0aW9uLmlzUGxheWluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2h1dERvd25BbmltYXRpb24ucGxheSgpOyAgICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLnBvd2VyT2ZmU291bmQucGxheSgpOyAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIubmV3Q2xvbmUoKTtcclxuICAgICAgICB0aGlzLmlzT3JpZ2luYWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2h1dERvd24gPSBmYWxzZTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBdXRvZGVzdHJ1Y2Npb24gPSBDb3VudGRvd24gKyBFeHBsb3Npb25cclxuICAgIGlmICh0aGlzLmlzRXhwbG9kaW5nICYmIHRoaXMuaXNPcmlnaW5hbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyLmNyZWF0ZUFuZXdPbmUgPSB0cnVlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmV4cGxvZGVDb3VudGRvd24sIDIuNywgMCk7ICAgICAgIFxyXG4gICAgICAgIHRoaXMuZXhwbG9kZW5BbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSBmYWxzZTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAgLy8gTGltaXRvIGxhIHZlbG9jaWRhZCBwYXJhIHF1ZSBubyBzZSBhY2VsZXJlIGRlIGZvcm1hIGluZmluaXRhXHJcbiAgICAgaWYgKHRoaXMudmVsb2NpdHlYIDw9ICgtdGhpcy5tYXhWZWwpKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAtdGhpcy5tYXhWZWw7XHJcbiAgICAgfVxyXG5cclxuICAgICBpZiAodGhpcy52ZWxvY2l0eVggPj0gdGhpcy5tYXhWZWwpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLnZlbG9jaXR5WCA9IHRoaXMubWF4VmVsO1xyXG4gICAgIH0gICAgICAgIFxyXG4gICAgIFxyXG4gICAgIGlmICh0aGlzLnZlbG9jaXR5WSA8PSAoLXRoaXMubWF4VmVsKSlcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gLXRoaXMubWF4VmVsO1xyXG4gICAgIH1cclxuIFxyXG4gICAgIGlmICh0aGlzLnZlbG9jaXR5WSA+PSB0aGlzLm1heFZlbClcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gdGhpcy5tYXhWZWw7XHJcbiAgICAgfVxyXG5cclxuXHJcbiAgICBpZiAoIXRoaXMuZ2FtZUNvbnRyb2xsZXIuaXNMZXZlbENvbXBsZXRlZClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5pc09yaWdpbmFsICYmICF0aGlzLmlzRXhwbG9kaW5nICYmICF0aGlzLmlzU2h1dERvd24gJiYgIXRoaXMuZXhwbG9kZW5BbmltYXRpb24uaXNQbGF5aW5nKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgbGVmdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xlZnQgJiYgdGhpcy5jYW5Nb3ZlTGVmdCkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24ueCArPSB0aGlzLnZlbG9jaXR5WCx0aGlzLm5vZGUucG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5WCAtPSB0aGlzLmFjYzsgLy8gTVJVVlxyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxrTGVmdEFuaW1hdGlvbi5wbGF5KCk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgXHJcbiAgICAgICAgICAgIC8vIG1vdmUgcmlnaHRcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JpZ2h0ICYmIHRoaXMuY2FuTW92ZVJpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLnggKz0gdGhpcy52ZWxvY2l0eVgsdGhpcy5ub2RlLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVggKz0gdGhpcy5hY2M7IC8vIE1SVVZcclxuICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHlZID0gMDsgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxrUmlnaHRBbmltYXRpb24ucGxheSgpOyAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1vdmUgdXBcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzVXAgJiYgdGhpcy5jYW5Nb3ZlVXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbi54LHRoaXMubm9kZS5wb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHlZKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy52ZWxvY2l0eVkgKz0gdGhpcy5hY2M7IC8vIE1SVVZcclxuICAgICAgICAgICAgICAgIC8vdGhpcy52ZWxvY2l0eVggPSAwOyAgICAgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMud2Fsa1VwQW5pbWF0aW9uLnBsYXkoKTsgXHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIGRvd25cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzRG93biAmJiB0aGlzLmNhbk1vdmVEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24ueCx0aGlzLm5vZGUucG9zaXRpb24ueSArPSB0aGlzLnZlbG9jaXR5WSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudmVsb2NpdHlZIC09IHRoaXMuYWNjOyAvLyBNUlVWXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudmVsb2NpdHlYID0gMDsgXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMud2Fsa0Rvd25BbmltYXRpb24ucGxheSgpOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gIFxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuaXNMZWZ0ICYmICF0aGlzLmlzUmlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWRsZUFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2h1dERvd24gJiYgIXRoaXMuaXNPcmlnaW5hbCAmJiAhdGhpcy5pc0V4cGxvZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaHV0RG93bkFuaW1hdGlvbi5pc1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2h1dHRlZEFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4gXHJcbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyQ29sbGlkZXIsc2VsZkNvbGxpZGVyKVxyXG4geyAgIFxyXG5cclxuICAgIGlmIChvdGhlckNvbGxpZGVyLm5hbWUgPT0gXCJleGl0PEJveENvbGxpZGVyPlwiKVxyXG4gICAgeyAgICAgICBcclxuICAgICAgICAvL3RoaXMuaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmVuZGluZywgMC43ICwwKTtcclxuICAgICAgICBjYy5sb2coXCJUSEUgRU5EXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgIC8vIGJsb3F1ZXMgICAgIFxyXG4gICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcImJsb3F1ZTxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzUmlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwiYmxvcXVlPEJveENvbGxpZGVyPlwiICYmIHRoaXMuaXNMZWZ0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwiYmxvcXVlPEJveENvbGxpZGVyPlwiICYmIHRoaXMuaXNEb3duKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwiYmxvcXVlPEJveENvbGxpZGVyPlwiICYmIHRoaXMuaXNVcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbk1vdmVVcCA9IGZhbHNlO1xyXG4gICAgfSAgXHJcblxyXG5cclxuICAgICAvLyBXYWxscyAgICAgXHJcbiAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwib2JzdGFjbGUgY29weTxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzUmlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwib2JzdGFjbGUgY29weTxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzTGVmdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcIm9ic3RhY2xlIGNvcHk8Qm94Q29sbGlkZXI+XCIgJiYgdGhpcy5pc0Rvd24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvdGhlckNvbGxpZGVyLm5hbWUgPT0gXCJvYnN0YWNsZSBjb3B5PEJveENvbGxpZGVyPlwiICYmIHRoaXMuaXNVcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbk1vdmVVcCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBDb2xsaXNpb24gd2l0aCBwbGF5ZXJcclxuICAgIGlmIChvdGhlckNvbGxpZGVyLm5hbWUgPT0gXCJwbGF5ZXI8Qm94Q29sbGlkZXI+XCIgJiYgdGhpcy5pc1JpZ2h0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcInBsYXllcjxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzTGVmdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcInBsYXllcjxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzRG93bilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcInBsYXllcjxCb3hDb2xsaWRlcj5cIiAmJiB0aGlzLmlzVXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYW5Nb3ZlVXAgPSBmYWxzZTtcclxuICAgIH0gIFxyXG4gXHJcbiB9XHJcblxyXG4gICAgb25Db2xsaXNpb25FeGl0KG90aGVyQ29sbGlkZXIsc2VsZkNvbGxpZGVyKVxyXG4gICAgeyAgICAgICAgIFxyXG4gICAgICAgIGlmIChvdGhlckNvbGxpZGVyLm5hbWUgPT0gXCJvYnN0YWNsZSBjb3B5PEJveENvbGxpZGVyPlwiIHx8IG90aGVyQ29sbGlkZXIubmFtZSA9PSBcInBsYXllcjxCb3hDb2xsaWRlcj5cIiB8fCBvdGhlckNvbGxpZGVyLm5hbWUgPT0gXCJibG9xdWU8Qm94Q29sbGlkZXI+XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZUxlZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVVcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZURvd24gPSB0cnVlO1xyXG4gICAgICAgIH0gICAgICBcclxuXHJcbiAgICAgICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcIm9ic3RhY2xlMjxCb3hDb2xsaWRlcj5cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG90aGVyQ29sbGlkZXIubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9ICBcclxuXHJcblxyXG4gICAgb25Db2xsaXNpb25TdGF5KG90aGVyQ29sbGlkZXIsc2VsZkNvbGxpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHNpIGVzdGFtb3MgZW4gbW9kbyBBdXRvZGVzdHJ1Y2Npb24geSBlbiBjb250YWN0byBjb24gb3RybyByb2JvdC4gSW5pY2lhbW9zIGxhIGZhc2UgZGUgYXV0b2Rlc3RydWNjaW9uIGVuIGVzZSByb2JvdC5cclxuICAgICAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwicGxheWVyPEJveENvbGxpZGVyPlwiIHx8IG90aGVyQ29sbGlkZXIubmFtZSA9PSBcImJsb3F1ZTxCb3hDb2xsaWRlcj5cIilcclxuICAgICAgICB7ICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmluaXNoZWQpICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG90aGVyQ29sbGlkZXIubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGxvc2lvblNvdW5kLnBsYXkoKTsgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7ICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3RoZXJDb2xsaWRlci5uYW1lID09IFwib2JzdGFjbGUyPEJveENvbGxpZGVyPlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLngsdGhpcy5ub2RlLnBvc2l0aW9uLnkgKz0gdGhpcy52ZWxvY2l0eVkpO1xyXG4gICAgICAgICAgIHRoaXMudmVsb2NpdHlZIC09IHRoaXMuYWNjOyAvLyBNUlVWXHJcbiAgICAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAwOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG90aGVyQ29sbGlkZXIubmFtZSA9PSBcIm9ic3RhY2xlMzxCb3hDb2xsaWRlcj5cIilcclxuICAgICAgICB7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbi54LHRoaXMubm9kZS5wb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHlZKTtcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVkgLT0gdGhpcy5hY2M7IC8vIE1SVVZcclxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAwOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgb25FeHBsb3Npb25FbmQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gXHJcblxyXG4gICAgZW5kaW5nKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyLmVuZExldmVsKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ1RoZUVuZCcpOyAgICAgICAgICBcclxuICAgIH0gICBcclxuXHJcbiAgICBleHBsb2RlQ291bnRkb3duKClcclxuICAgIHsgICAgIFxyXG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSBmYWxzZTsgICAgXHJcbiAgICAgICAgdGhpcy5leHBsb3Npb25Tb3VuZC5wbGF5KCk7ICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7ICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/MainMenu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50c7aAmE1tLGbkKA0WNk/na', 'MainMenu');
// Script/MainMenu.ts

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
var MainMenu = /** @class */ (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //start button    
        _this.btnStart = null;
        return _this;
    }
    MainMenu.prototype.onLoad = function () {
        cc.director.preloadScene('Level1');
        // busca el boton Start
        this.btnStart = this.node.getChildByName("PlayBtn").getComponent(cc.Button);
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END, this.touchStartBtn, this);
    };
    MainMenu.prototype.start = function () {
    };
    MainMenu.prototype.touchStartBtn = function () {
        cc.director.loadScene('Level1');
    };
    MainMenu = __decorate([
        ccclass
    ], MainMenu);
    return MainMenu;
}(cc.Component));
exports.default = MainMenu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxNYWluTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlCQztRQXZCRyxrQkFBa0I7UUFDbEIsY0FBUSxHQUFjLElBQUksQ0FBQzs7SUFzQi9CLENBQUM7SUFwQkcseUJBQU0sR0FBTjtRQUdJLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxDLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCx3QkFBSyxHQUFMO0lBR0EsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFFSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBdkJnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBeUI1QjtJQUFELGVBQUM7Q0F6QkQsQUF5QkMsQ0F6QnFDLEVBQUUsQ0FBQyxTQUFTLEdBeUJqRDtrQkF6Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbk1lbnUgZXh0ZW5kcyBjYy5Db21wb25lbnQgXHJcbntcclxuICAgIC8vc3RhcnQgYnV0dG9uICAgIFxyXG4gICAgYnRuU3RhcnQ6IGNjLkJ1dHRvbiA9IG51bGw7IFxyXG4gICAgICAgIFxyXG4gICAgb25Mb2FkICgpIFxyXG4gICAgeyAgICAgICAgICAgXHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnTGV2ZWwxJyk7XHJcbiAgICBcclxuICAgICAgICAgLy8gYnVzY2EgZWwgYm90b24gU3RhcnRcclxuICAgICAgICAgdGhpcy5idG5TdGFydCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBsYXlCdG5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgIHRoaXMuYnRuU3RhcnQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy50b3VjaFN0YXJ0QnRuLHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoU3RhcnRCdG4oKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdMZXZlbDEnKTsgIFxyXG4gICAgfSAgXHJcblxyXG59XHJcblxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
