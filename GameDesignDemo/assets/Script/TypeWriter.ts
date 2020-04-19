/*
 * @Description: 
 * @version: 
 * @Author: 周曾辉
 * @Date: 2020-04-18 22:19:38
 * @LastEditors: 周曾辉
 * @LastEditTime: 2020-04-19 12:53:45
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class TypeWriter extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = '';

    @property({
        tooltip:"打字机打字的时间间隔（ms）",
    })
    duration: number = 100;

    start () {
        // init logic
        
        let strLen = this.text.length;
        let content = this.text.split("");
        let curStr = "";
        let self = this;
        for(let i = 0; i < strLen; i++){
            // (function(i){
            //     setTimeout(()=>{
            //         curStr += content[i];
            //         self.label.string = curStr;
            //     },self.duration*(i));
            // })(i)

            setTimeout(()=>{
                curStr += content[i];
                self.label.string = curStr;
            },self.duration*(i));
            
        }
        
    }
}
