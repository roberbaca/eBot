
const {ccclass, property} = cc._decorator;


@ccclass
export default class MainMenu extends cc.Component 
{
    //start button    
    btnStart: cc.Button = null; 
        
    onLoad () 
    {           

        cc.director.preloadScene('Level1');
    
         // busca el boton Start
         this.btnStart = this.node.getChildByName("PlayBtn").getComponent(cc.Button);
         this.btnStart.node.on(cc.Node.EventType.TOUCH_END,this.touchStartBtn,this);            
    }

    start () 
    {
        
    }

    touchStartBtn()
    {        
        cc.director.loadScene('Level1');  
    }  

}

