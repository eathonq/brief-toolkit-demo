# Brief Toolkit Demo

> 这是一个基于 [brief-toolkit-plugin](https://github.com/eathonq/brief-toolkit-plugin.git) 的示例项目

## 快速开始

### 启动场景 
scene-2d.scene

- **scene-2d.Canvas.Content**
  这是一个包含了多个UI组件的Canvas节点，主要挂载 [uim.ViewManager] 组件来管理视图。

- **ViewMessageBoxDemo**
  这是一个简单的消息框演示demo，展示了如何使用消息框组件来显示信息和提示用户。
  [MessageBox预制体]挂载了 [MessageBoxBase] 组件来控制消息框的显示和内容，组为默认的消息框预制体，这样就可以在代码直接使用 MessageBox.show() 方法来显示消息框。
  [Tooltip预制体]挂载了 [TooltipBase] 组件来控制提示框的显示和内容，组为默认的提示框预制体，这样就可以在代码直接使用 Tooltip.show() 方法来显示提示框。

- **ViewI18nDemo**
  这是一个国际化演示demo，展示了如何使用国际化组件来支持多语言显示。
  通过在根节点挂载[i18n.LocalizedManager]组件来管理国际化资源，设置默认的多语言资源文件，同时可以通过 [Label Model] 来在编辑器实时切换数据显示模式。
  [Label]等文本组件可以通过挂载 [i18n.LocalizedLabel] 组件来实现文本的国际化显示，设置对应的多语言资源key即可在编辑器实时预览不同语言的效果。
  [Sprite]图片组件可以通过挂载 [i18n.LocalizedSprite] 组件来实现图片的国际化显示，设置对应的多语言资源key即可在编辑器实时预览不同语言的效果。

- **ViewMvvmDemo**
  这是一个MVVM演示demo，展示了如何使用MVVM组件来实现数据绑定和视图更新。
  通过在根节点挂载 [mvvm.ViewModel] 组件来绑定视图模型数据，设置对应的数据属性和初始值。
  视图中的UI组件可以通过挂载 
    [mvvm.Bind] 自动识别 Label、Sprite、EditBox等组件来实现数据绑定和视图更新，设置对应的数据属性和绑定方式即可在编辑器实时预览数据变化的效果。
    [mvvm.DataContext] 组件来绑定数据对象，使得子节点能够访问和绑定数据属性。
    [mvvm.ItemSource] 组件来绑定数据集合，使得列表组件能够动态生成和更新列表项。
  等组件来实现数据绑定和视图更新。

- **ViewGuideDemo**
  这是一个引导演示demo，展示了如何使用引导组件来引导用户完成特定操作。
  通过在根节点挂载 [guide.GuideManager] 组件来管理引导步骤和逻辑，设置对应的引导步骤和条件。
  项目演示了自定义实现 [Click预制体] 来作为引导的点击目标的UI和相关的UI动画等。