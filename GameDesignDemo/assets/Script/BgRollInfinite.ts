/*
 * @Description: 
 * @version: 
 * @Author: 周曾辉
 * @Date: 2020-05-01 16:37:46
 * @LastEditors: 周曾辉
 * @LastEditTime: 2020-05-02 00:26:17
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class BgRollInfinite extends cc.Component {

    @property(cc.Node)
    bg1: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;

    @property({
        tooltip:'移动速度（每秒多少像素）'
    })
    m_speed: number = 5;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.bg1.x = 0;
        this.bg1.y = 0;

        this.bg2.x = 0;
        this.bg2.y = this.bg1.y + this.bg1.height;

        const viewSize = cc.view.getVisibleSize();
        this.bg2.getComponent(cc.Widget).top = viewSize.height;
        this.bg2.getComponent(cc.Widget).bottom = -viewSize.height;
    }

    update (dt) {

        let dis = dt * this.m_speed;
        if(this.bg2.y - dis <= 0){
            if(this.bg2.y - dis < 0){
                dis = this.bg2.y;
            }
            this.bg1.y = this.bg2.y;
            this.bg2.y = this.bg1.y + this.bg1.height;
            
        }

        this.bg1.y -= dis;
        this.bg2.y -= dis;           
    }
}
