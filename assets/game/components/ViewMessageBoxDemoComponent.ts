import { _decorator, Component, EditBox, Node } from 'cc';
import { MessageBox, MessageBoxButtons, MessageBoxResult, Tooltip } from 'db://brief-toolkit-plugin/uim';
const { ccclass, property } = _decorator;

@ccclass('ViewMessageBoxDemoComponent')
export class ViewMessageBoxDemoComponent extends Component {
  @property(EditBox)
  editBox: EditBox = null;

  start() {
    if (!this.editBox) {
      console.error('ViewMessageBoxDemoComponent: editBox is not assigned');
      return;
    }

    this.editBox.string = 'Hello, this is ViewMessageBoxDemoComponent!';
  }

  update(deltaTime: number) {

  }

  private async onHandleShowMessageBox() {
    const text = this.editBox.string;
    const result = await MessageBox.show(text, '提示', MessageBoxButtons.OKCancel);
    if (result === MessageBoxResult.OK) {
      Tooltip.show('你点击了确定', 3, false);
    } else if (result === MessageBoxResult.Cancel) {
      Tooltip.show('你点击了取消', 3, false);
    } else {
      Tooltip.show('你关闭了消息框', 3, false);
    }
  }

  private onHandleShowTooltip() {
    const text = this.editBox.string;
    Tooltip.show(text, 0, true);
  }
}
