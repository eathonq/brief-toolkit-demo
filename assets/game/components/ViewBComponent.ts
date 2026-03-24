import { _decorator, Component, Node } from 'cc';
import { I18n } from 'db://brief-toolkit-plugin/i18n';
const { ccclass, property } = _decorator;

@ccclass('ViewBComponent')
export class ViewBComponent extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    private onHandleSwitchLanguage(sender: Node, customEventData: string) {
      I18n.switch(customEventData);
    }
}


