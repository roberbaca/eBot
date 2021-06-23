const {ccclass, property} = cc._decorator;


@ccclass
export default class GameController extends cc.Component 
{    
    // PLAYER PREFAB
    @property(cc.Prefab)
    PlayerPrefab:cc.Prefab  = null;

    startPosX: number;
    startPosY: number;

    // OBJECTS
    @property(cc.Sprite)
    startDoor:cc.Sprite  = null;

    @property(cc.Sprite)
    exitDoor:cc.Sprite  = null;


    // AUDIO SFX
    @property(cc.AudioSource)
    slideDoorSound:cc.AudioSource  = null;

    @property(cc.AudioSource)
    newOnlineSound: cc.AudioSource = null;

    @property(cc.AudioClip)
    music: cc.AudioClip = null;
    
    @property(cc.Label)
    levelText: cc.Label = null;    


    // LEVEL COMPLETED SCREEN
    @property(cc.RichText)
    levelCompletedLabel: cc.RichText = null; 

    @property(cc.Sprite)
    BlackBackground:cc.Sprite  = null;

    @property(cc.Sprite)
    BlackLabel:cc.Sprite  = null;
    
    createAnewOne: boolean = false;

    isLevelCompleted: boolean = false;

    onLoad () 
    {              
       
       // activamos el sistema de Colisiones
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
         
        // debug draw
        collisionManager.enabledDebugDraw = false;           
       
        this.BlackBackground.node.active = false;
        this.BlackLabel.node.active = false;
        this.levelCompletedLabel.node.active = false;       
    }

    start () 
    {
        this.isLevelCompleted = false;
        this.startPosX = this.startDoor.node.position.x;
        this.startPosY = this.startDoor.node.position.y;
        this.newClone();           
    }

    update (dt) 
    {
       if (this.createAnewOne)
       {
           this.schedule(this.newClone, 2, 0);           
           this.createAnewOne = false;
       }
        
    }
    

   newClone()
{    
    this.startDoor.getComponent(cc.Animation).play();
    var newPlayer = cc.instantiate(this.PlayerPrefab);       
    newPlayer.setPosition(this.startPosX, this.startPosY);                   
    this.node.getChildByName("player").addChild(newPlayer);  
    this.newOnlineSound.play();   
}
     

endLevel()
{
    this.isLevelCompleted = true;
    this.exitDoor.getComponent(cc.Animation).play();
    this.slideDoorSound.play();      
    this.BlackBackground.node.active = true;
    this.BlackLabel.node.active = true;
    this.levelCompletedLabel.node.active = true;
    this.schedule(this.nextLevel, 3, 0);
}
  
nextLevel()
{
    if (this.levelText.string == "level2")
    {
        cc.director.loadScene('Level2');
    }
    if (this.levelText.string == "level3")
    {
        cc.director.loadScene('Level3');
    }
    if (this.levelText.string == "level4")
    {
        cc.director.loadScene('TheEnd');
    }
}

}
