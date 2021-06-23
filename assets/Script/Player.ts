
import GameController from "./GameController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{ 
 
 // declaracion de variables 

 // banderas para determinar direccion del personaje
 isLeft: boolean = false;
 isRight: boolean = false;
 isDown: boolean = false;
 isUp: boolean = false;
 
 lookLeft: boolean = false;
 lookRight: boolean = false;
 lookDown: boolean = true;
 lookUp: boolean = false;

 canMoveRight: boolean = true;
 canMoveLeft: boolean = true;
 canMoveUp: boolean = true;
 canMoveDown: boolean = true;
 canMove: boolean = true;

 // animaciones
 walkRightAnimation : cc.AnimationState;
 walkLeftAnimation : cc.AnimationState; 
 idleAnimation : cc.AnimationState;
 shutDownAnimation : cc.AnimationState;
 explodenAnimation : cc.AnimationState;
 shuttedAnimation : cc.AnimationState;
  

 // movimiento
 velocityX: number = 0;
 velocityY: number = 0;
 maxVel: number = 4;   
 acc: number = 2; 

 // posicion original
 originX: number;
 originY: number;      

  // banderas para las llaves
 isYellowKey: boolean = false;

 // banderas para los powerUps
 
 isPotion: boolean = false;
 

 // asignamos el componente del GameController
 gameController: GameController = null;

 isGameOver: boolean = false;

 destroyEnemy: boolean = false;

 isShutDown: boolean = false;   // bandera para inactivar al personaje
 isOriginal: boolean = true;    // bandera para identificar al bot activo
 isExploding: boolean = false;
 finished: boolean = false;


 @property(cc.AudioSource)
 explosionSound: cc.AudioSource = null;

 @property(cc.AudioSource)
 powerOffSound: cc.AudioSource = null;



 // eventos del teclado
 movePlayer(event)
{
    switch(event.keyCode)
    {
        case cc.macro.KEY.left:
            this.isLeft = true;
            this.lookLeft = true;
            this.lookRight = false;
            this.lookUp   = false;
            this.lookDown = false;
            break;

        case cc.macro.KEY.right:
            this.isRight = true;
            this.lookLeft = false;
            this.lookRight = true;
            this.lookUp   = false;
            this.lookDown = false;             
            break;

         case cc.macro.KEY.up:
             this.isUp = true;
             this.lookLeft = false;
             this.lookRight = false;
             this.lookUp   = true;
             this.lookDown = false;           
             break;

         case cc.macro.KEY.down:
             this.isDown = true;
             this.lookLeft = false;
             this.lookRight = false;
             this.lookUp   = false;
             this.lookDown = true;        
             break;

         case cc.macro.KEY.ctrl:
             this.isExploding = true;             
             break;

         case cc.macro.KEY.s:
             this.isShutDown = true;
             break;
     }
 }

 stopPlayer(event)
 {     
     switch(event.keyCode)
     {
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
 }

 
 onLoad () 
 {      
     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.movePlayer,this);
     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.stopPlayer,this);    
     this.gameController = cc.Canvas.instance.node.getComponent("GameController");   
     
     this.walkLeftAnimation = this.getComponent( cc.Animation ).getAnimationState('walkLeft');
     this.walkRightAnimation = this.getComponent( cc.Animation ).getAnimationState('walkRight');
     this.idleAnimation = this.getComponent( cc.Animation ).getAnimationState('idle');    
     this.shutDownAnimation = this.getComponent( cc.Animation ).getAnimationState('shutDown');
     this.shuttedAnimation = this.getComponent( cc.Animation ).getAnimationState('shutted');
     this.explodenAnimation = this.getComponent( cc.Animation ).getAnimationState('explode');        
 }

 start () 
 {
     this.originX = this.node.position.x;
     this.originY = this.node.position.y;
     this.isShutDown = false;
 }

 update(dt)
 {             

    // Se apaga el robot
    if (this.isShutDown)
    {
        if (!this.shuttedAnimation.isPlaying)
        {
            this.shutDownAnimation.play();             
        }        
        this.powerOffSound.play();   
        this.gameController.newClone();
        this.isOriginal = false;
        this.isShutDown = false;        
    }
    
    // Autodestruccion = Countdown + Explosion
    if (this.isExploding && this.isOriginal)
    {
        this.gameController.createAnewOne = true;        
        this.schedule(this.explodeCountdown, 2.7, 0);       
        this.explodenAnimation.play();
        this.isExploding = false;                
    }
     
     // Limito la velocidad para que no se acelere de forma infinita
     if (this.velocityX <= (-this.maxVel))
     {
         this.velocityX = -this.maxVel;
     }

     if (this.velocityX >= this.maxVel)
     {
         this.velocityX = this.maxVel;
     }        
     
     if (this.velocityY <= (-this.maxVel))
     {
         this.velocityY = -this.maxVel;
     }
 
     if (this.velocityY >= this.maxVel)
     {
         this.velocityY = this.maxVel;
     }


    if (!this.gameController.isLevelCompleted)
    {
        if (this.isOriginal && !this.isExploding && !this.isShutDown && !this.explodenAnimation.isPlaying) 
        {
            // move left
            if (this.isLeft && this.canMoveLeft) 
            {
                this.node.setPosition(this.node.position.x += this.velocityX,this.node.position.y);
                this.velocityX -= this.acc; // MRUV
                this.velocityY = 0;
                this.walkLeftAnimation.play();                   
            }
     
            // move right
            else if (this.isRight && this.canMoveRight)
            {
                this.node.setPosition(this.node.position.x += this.velocityX,this.node.position.y);
                this.velocityX += this.acc; // MRUV
                this.velocityY = 0;  
                this.walkRightAnimation.play();        
            }

            // move up
            else if(this.isUp && this.canMoveUp)
            {
                //this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
                //this.velocityY += this.acc; // MRUV
                //this.velocityX = 0;     
                //this.walkUpAnimation.play(); 
            } 

            // move down
            else if(this.isDown && this.canMoveDown)
            {
                //this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
                //this.velocityY -= this.acc; // MRUV
                //this.velocityX = 0; 
                //this.walkDownAnimation.play();              
            }  

            else if (!this.isLeft && !this.isRight)
            {
                this.idleAnimation.play();
            }        
        }
    }

        if (!this.isShutDown && !this.isOriginal && !this.isExploding)
        {
            if (!this.shutDownAnimation.isPlaying)
            {
                this.shuttedAnimation.play();
            }
        }          

}



 
 onCollisionEnter(otherCollider,selfCollider)
 {   

    if (otherCollider.name == "exit<BoxCollider>")
    {       
        //this.isGameOver = true;
        this.schedule(this.ending, 0.7 ,0);
        cc.log("THE END");
    }
    

     // bloques     
    if (otherCollider.name == "bloque<BoxCollider>" && this.isRight)
    {
        this.canMoveRight = false;
    }

    if (otherCollider.name == "bloque<BoxCollider>" && this.isLeft)
    {
        this.canMoveLeft = false;
    }

    if (otherCollider.name == "bloque<BoxCollider>" && this.isDown)
    {
        this.canMoveDown = false;
    }

    if (otherCollider.name == "bloque<BoxCollider>" && this.isUp)
    {
        this.canMoveUp = false;
    }  


     // Walls     
    if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isRight)
    {
        this.canMoveRight = false;
    }

    if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isLeft)
    {
        this.canMoveLeft = false;
    }

    if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isDown)
    {
        this.canMoveDown = false;
    }

    if (otherCollider.name == "obstacle copy<BoxCollider>" && this.isUp)
    {
        this.canMoveUp = false;
    }


    // Collision with player
    if (otherCollider.name == "player<BoxCollider>" && this.isRight)
    {
        this.canMoveRight = false;
    }

    if (otherCollider.name == "player<BoxCollider>" && this.isLeft)
    {
        this.canMoveLeft = false;
    }

    if (otherCollider.name == "player<BoxCollider>" && this.isDown)
    {
        this.canMoveDown = false;
    }

    if (otherCollider.name == "player<BoxCollider>" && this.isUp)
    {
        this.canMoveUp = false;
    }  
 
 }

    onCollisionExit(otherCollider,selfCollider)
    {         
        if (otherCollider.name == "obstacle copy<BoxCollider>" || otherCollider.name == "player<BoxCollider>" || otherCollider.name == "bloque<BoxCollider>")
        {
            this.canMoveRight = true;
            this.canMoveLeft = true;
            this.canMoveUp = true;
            this.canMoveDown = true;
        }      

        if (otherCollider.name == "obstacle2<BoxCollider>")
        {
            otherCollider.node.destroy();
        }        
    }  


    onCollisionStay(otherCollider,selfCollider)
    {
        // si estamos en modo Autodestruccion y en contacto con otro robot. Iniciamos la fase de autodestruccion en ese robot.
        if (otherCollider.name == "player<BoxCollider>" || otherCollider.name == "bloque<BoxCollider>")
        {        
            if (this.finished)            
            {               
                otherCollider.node.destroy();
                this.explosionSound.play();    
                this.finished = false;        
            }                    
        }

        if (otherCollider.name == "obstacle2<BoxCollider>")
        {
           this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
           this.velocityY -= this.acc; // MRUV
           this.velocityX = 0;            
        }

        if (otherCollider.name == "obstacle3<BoxCollider>")
        {           
            this.node.setPosition(this.node.position.x,this.node.position.y += this.velocityY);
            this.velocityY -= this.acc; // MRUV
            this.velocityX = 0;                  
        }
    }


    onExplosionEnd()
    {
        this.finished = true;
    }
 

    ending()
    {
        this.gameController.endLevel();
        
        //cc.director.loadScene('TheEnd');          
    }   

    explodeCountdown()
    {     
        this.isExploding = false;    
        this.explosionSound.play();    
        this.node.destroy();               
    }
}
