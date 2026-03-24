import { _decorator, Component, instantiate, Label, Node, tween, Vec3 } from 'cc';
import { Views } from 'db://brief-toolkit-plugin/uim';
const { ccclass, property } = _decorator;

@ccclass('ViewMenuComponent')
export class ViewMenuComponent extends Component {

  @property(Label)
  label: Label = null;

  start() {
    if (!this.label) {
      console.error('ViewMenuComponent: label is not assigned');
      return;
    }
    this.label.node.active = false; // Hide the template label

    const views = Views.getAllViewNames();
    views.forEach(element => {
      const labelNode = instantiate(this.label.node);
      labelNode.parent = this.label.node.parent;
      const labelComp = labelNode.getComponent(Label);
      labelComp.string = element;
      labelNode.on(Node.EventType.MOUSE_DOWN, () => {
        this.setClickEffect(labelNode);
        Views.showView(element);
      });
      labelNode.active = true;
    });
  }

  update(deltaTime: number) {

  }

  // 设置点击效果动画
  private setClickEffect(node: Node) {
    const vecNormal = new Vec3(1, 1, 1);
    const vecPressed = new Vec3(1.2, 1.2, 1.2);
    // 简单的缩放动画
    tween(node)
      .to(0.1, { scale: vecPressed })
      .to(0.1, { scale: vecNormal })
      .start();
  }
}


