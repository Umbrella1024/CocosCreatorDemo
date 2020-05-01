/*
 * @Description: 
 * @version: 
 * @Author: 周曾辉
 * @Date: 2020-04-26 20:19:48
 * @LastEditors: 周曾辉
 * @LastEditTime: 2020-05-01 12:46:11
 */
const { ccclass, property } = cc._decorator;

enum Direction {
    LEFT_TO_RIGHT = 1,
    RIGHT_TO_LEFT,
}

@ccclass
export default class HorseReceLamp extends cc.Component {

    @property(cc.RichText)
    label: cc.RichText = null;

    @property(cc.Mask)
    maskNode: cc.Mask = null;

    @property
    m_speed: number = 100;

    @property
    text: string = 'hello';


    m_xLeftEnd: number = 0;


    m_xRightEnd: number = 0;

    m_yPos: number = 0;

    @property
    m_direction: number = Direction.LEFT_TO_RIGHT;


    start() {
        // init logic

        this.label.string = this.text;
        this.m_xRightEnd = this.node.x + this.maskNode.node.width * this.maskNode.node.anchorX;
        this.m_xLeftEnd = this.node.x - this.maskNode.node.width * this.maskNode.node.anchorX;

        let contentSize = this.label.node.getContentSize();
        
        let xPos:number = 0;
        if(this.m_direction === Direction.LEFT_TO_RIGHT){
            xPos = this.m_xLeftEnd - contentSize.width;
        }else{
            xPos = this.m_xRightEnd;
        }

        this.label.node.x = xPos;
    }

    update(dt) {
        if (this.m_direction === Direction.LEFT_TO_RIGHT) {
            let contentSize = this.label.node.getContentSize();
            if (this.label.node.x >= this.m_xRightEnd) { 
                this.label.node.x = this.m_xLeftEnd - contentSize.width;
            }

            this.label.node.x += this.m_speed * dt;
            
        }else{
            let contentSize = this.label.node.getContentSize();
            if (this.label.node.x <= this.m_xLeftEnd - contentSize.width) { 
                this.label.node.x = this.m_xRightEnd;
            }

            this.label.node.x -= this.m_speed * dt;
        }
    }
}
