import { _decorator, Component, instantiate, Node, Prefab, ToggleContainer, tween, v3 } from 'cc';
import { Guider } from 'db://brief-toolkit-plugin/guide';
const { ccclass, property } = _decorator;

const GUIDE_MASK_CLICK_ICON = "GUIDE_MASK_CLICK_ICON";

@ccclass('ViewDComponent')
export class ViewDComponent extends Component {

  @property({
    type: Prefab,
    tooltip: "用于引导步骤中指示点击位置的图标资源",
  })
  private click: Prefab = null;

  protected start(): void {
  }

  private onHandleStartTask() {
    // 示例：自动开始一个任务
    Guider.startTask("task_01", {
      stepIndex: 0,
      onFocusCallback: (focusData, step) => {
        if (!this.click) return;

        const { maskNode, position, rect } = focusData;

        // 创建一个张图片节点，设置为iconClick资源，并放置在目标节点附近
        let clickNode = maskNode.getChildByName(GUIDE_MASK_CLICK_ICON);
        let prePosition = clickNode ? clickNode.getPosition() : null;
        if (!clickNode) {
          clickNode = instantiate(this.click);
          maskNode.addChild(clickNode);
          clickNode.name = GUIDE_MASK_CLICK_ICON;
        }

        // 设置图标位置（可以根据需要调整偏移）
        const targetPosition = v3(position.x + rect.width / 2, position.y + rect.height / 2 + 20, position.z);
        let moveDuration = 0.3;
        if (!prePosition) {
          prePosition = targetPosition;
          moveDuration = 0; // 如果是第一次创建，直接设置到目标位置，不需要动画
        }
        //clickNode.setPosition(position.x + rect.width / 2, position.y + rect.height / 2 + 20, position.z);

        // 停止之前的动画，防止重复创建时动画叠加
        tween(clickNode).stop();
        // 设置图标动画
        tween(clickNode)
          // 移动
          .to(moveDuration, { position: targetPosition })
          // 移动完成后，开始重复缩放
          .call(() => {
            tween(clickNode)
              .to(0.5, { scale: v3(1.2, 1.2, 1) })
              .to(0.5, { scale: v3(1, 1, 1) })
              .union()
              .repeatForever()
              .start();
          })
          .start();
      }
    });
  }
}
