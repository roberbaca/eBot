"use strict";
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