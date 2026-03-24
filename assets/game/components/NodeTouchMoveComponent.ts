import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodeTouchMoveComponent')
export class NodeTouchMoveComponent extends Component {
  @property({
    tooltip: '移动速度，值越大跟随越快'
  })
  public moveSpeed: number = 10;

  private _isDragging: boolean = false;
  private _targetPos: Vec3 = new Vec3();
  private _offset: Vec3 = new Vec3();

  onEnable() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  }

  onDisable() {
    this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    this._isDragging = false;
  }

  update(dt: number) {
    if (!this._isDragging) return;

    // 获取当前位置
    const currentPos = this.node.position;
    
    // 计算到目标位置的距离
    const dx = this._targetPos.x - currentPos.x;
    const dy = this._targetPos.y - currentPos.y;
  
    // 如果已经很接近目标，直接设置
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      this.node.position = this._targetPos;
      return;
    }
    
    // 平滑移动到目标位置
    const step = this.moveSpeed * dt;
    const newX = currentPos.x + dx * step;
    const newY = currentPos.y + dy * step;
    
    this.node.setPosition(newX, newY);
  }

  private onTouchStart(event: EventTouch) {
    this._isDragging = true;
    
    // 获取触摸位置
    const touchPos = event.getLocation();
    
    // 计算触摸点与节点的偏移
    this._offset.x = this.node.position.x - touchPos.x;
    this._offset.y = this.node.position.y - touchPos.y;
    
    // 初始化目标位置为当前位置
    this._targetPos.set(this.node.position);
    
    event.propagationStopped = true;
  }

  private onTouchMove(event: EventTouch) {
    if (!this._isDragging) return;
    
    // 获取当前触摸位置
    const touchPos = event.getLocation();
    
    // 更新目标位置：让节点跟随鼠标，但保持点击时的相对位置
    this._targetPos.x = touchPos.x + this._offset.x;
    this._targetPos.y = touchPos.y + this._offset.y;

    event.propagationStopped = true;
  }

  private onTouchEnd(event: EventTouch) {
    this._isDragging = false;
    event.propagationStopped = true;
  }

  private onTouchCancel(event: EventTouch) {
    this._isDragging = false;
    event.propagationStopped = true;
  }

  public get isDragging(): boolean {
    return this._isDragging;
  }
}