/*
 * @Description: 
 * @version: 
 * @Author: CoderXZ
 * @Date: 2020-05-02 13:59:20
 * @LastEditors: CoderXZ
 * @LastEditTime: 2020-05-02 19:36:25
 */



const {ccclass, property} = cc._decorator;

@ccclass
export default class Rocker extends cc.Component {

    @property(cc.Node)
    targetNode: cc.Node = null;

    @property(cc.Node)
    joyStick: cc.Node = null;

    m_canMove:boolean = false;

    @property({
        tooltip:"每秒移动距离（单位：像素）"
    })
    m_speed:number = 100;
    // LIFE-CYCLE CALLBACKS:

    m_angle:number = 0;


    // onLoad () {}

    start () {
        this.initEvent();
    }

    initEvent(){
        this.joyStick.on(cc.Node.EventType.TOUCH_START,()=>{
            this.m_canMove = true;
        });

        this.joyStick.on(cc.Node.EventType.TOUCH_MOVE,(event:cc.Event.EventTouch)=>{

            let radius = this.node.width / 2 - this.joyStick.width / 2;
            // let radius = this.node.width / 2
            let curPos = event.getLocation();
            
            let curPos2 = this.node.convertToNodeSpaceAR(curPos);

            //获取角度
            this.m_angle = cc.v2(1,0).signAngle(curPos2);
            
            const offsetX = radius * Math.cos(this.m_angle);
            const offsetY = radius * Math.sin(this.m_angle);

            let box = this.node.getBoundingBox();

            let bIn = cc.rect(box.x,box.y,box.width,box.height).contains(curPos2);

            this.joyStick.setPosition(bIn?curPos2:cc.v2(offsetX,offsetY));
            
        });

        this.joyStick.on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.m_canMove = false;
            this.joyStick.setPosition(cc.v2(0,0));
            
        })

        this.joyStick.on(cc.Node.EventType.TOUCH_CANCEL,(event)=>{
            this.m_canMove = false;
            this.joyStick.setPosition(cc.v2(0,0));
        })
    }
    
    update (dt) {
        if(!this.m_canMove){
            return;
        }

        this.targetNode.x += dt * this.m_speed * Math.cos(this.m_angle);
        this.targetNode.y += dt * this.m_speed * Math.sin(this.m_angle);        
    }
}
