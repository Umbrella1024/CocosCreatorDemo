
enum Direction {
    LEFT_TO_RIGHT = 1,
    RIGHT_TO_LEFT,
    TOP_TO_BOTTOM,
    BOTTOM_TO_TOP
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollItemList extends cc.Component {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property({
        tooltip: "滚动时，每秒滚动的速度"
    })
    m_moveSpeed: number = 50;

    @property({
        tooltip: "每个item的间隔"
    })
    m_gapWidth: number = 10;

    @property({
        tooltip: "移动的方向（1左->右、2右->左、3上->下、4下->上）"
    })
    m_direction: Direction = 1;

    m_xLeftEnd: number = 0;
    m_xRightEnd: number = 0;
    m_yTopEnd: number = 0;
    m_yBottomEnd: number = 0;

    m_bCanScroll: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initData();
        this.initView();
    }

    initData() {

        this.m_xLeftEnd = this.node.x - this.node.width * this.node.anchorX;
        this.m_xRightEnd = this.node.x + this.node.width * this.node.anchorX;
        this.m_yBottomEnd = this.node.y - this.node.height * this.node.anchorY;
        this.m_yTopEnd = this.node.y + this.node.height * this.node.anchorY;
    }

    initView() {

        let length = 4;
        if (length === 0) {
            return;
        }

        //横向
        if (this.m_direction === Direction.LEFT_TO_RIGHT || this.m_direction === Direction.RIGHT_TO_LEFT) {
            //检测 node容器的高度
            let tempNode = cc.instantiate(this.itemPrefab);
            if (this.node.height < tempNode.height) {
                this.node.height = tempNode.height;
            }
            tempNode.destroy();

            //添加item
            let xStart = this.m_xLeftEnd;
            this.node.destroyAllChildren();
            for (let i = 0; i < length; i++) {
                let itemNode = cc.instantiate(this.itemPrefab);
                itemNode.anchorX = 0;
                itemNode.anchorY = 0.5;

                itemNode.x = xStart + (itemNode.width + this.m_gapWidth) * i;
                this.node.addChild(itemNode);
            }

            let children = this.node.children;
            let xDelta = children[length - 1].x + children[length - 1].width - children[0].x;
            this.m_bCanScroll = xDelta > this.node.width;

        } else {
            //纵向

            //检测 node容器的高度
            let tempNode = cc.instantiate(this.itemPrefab);
            if (this.node.width < tempNode.width) {
                this.node.width = tempNode.width;
            }
            tempNode.destroy();

            //添加item
            let yStart = this.m_yBottomEnd;

            this.node.destroyAllChildren();
            for (let i = 0; i < length; i++) {
                let itemNode = cc.instantiate(this.itemPrefab);
                itemNode.anchorX = 0.5;
                itemNode.anchorY = 1;

                itemNode.y = yStart + (itemNode.height + this.m_gapWidth) * i;
                this.node.addChild(itemNode);
            }

            let children = this.node.children;
            let yDelta = children[length - 1].y + children[length - 1].height - children[0].y;
            this.m_bCanScroll = yDelta > this.node.height;
        }
    }

    update(dt) {
        if (!this.m_bCanScroll) {
            return;
        }

        let children = this.node.children;
        let length = children.length;
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            if (this.m_direction === Direction.LEFT_TO_RIGHT) {
                if (item.x >= this.m_xRightEnd) {
                    if (i === length - 1) {
                        item.x = children[0].x - (item.width + this.m_gapWidth);
                    } else {
                        item.x = children[i + 1].x - (item.width + this.m_gapWidth);
                    }
                } else {
                    item.x += this.m_moveSpeed * dt;
                }
            } else if (this.m_direction === Direction.RIGHT_TO_LEFT) {
                if (item.x <= this.m_xLeftEnd) {
                    if (i === 0) {
                        item.x = children[length - 1].x + (item.width + this.m_gapWidth);
                    } else {
                        item.x = children[i - 1].x + (item.width + this.m_gapWidth);
                    }
                } else {
                    item.x -= this.m_moveSpeed * dt;
                }
            } else if (this.m_direction === Direction.TOP_TO_BOTTOM) {
                if (item.y <= this.m_yBottomEnd) {
                    if (i === 0) {
                        item.y = children[length - 1].y + (item.height + this.m_gapWidth);
                    } else {
                        item.y = children[i - 1].y + (item.height + this.m_gapWidth);
                    }
                } else {
                    item.y -= this.m_moveSpeed * dt;
                }
            } else if (this.m_direction === Direction.BOTTOM_TO_TOP) {
                if (item.y >= this.m_yTopEnd) {
                    if (i === length - 1) {
                        item.y = children[0].y - (item.height + this.m_gapWidth);
                    } else {
                        item.y = children[i + 1].y - (item.height + this.m_gapWidth);
                    }
                } else {
                    item.y += this.m_moveSpeed * dt;
                }
            }

        }

    }
}
