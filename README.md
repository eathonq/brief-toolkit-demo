# Brief Toolkit Demo

> 这是一个基于 [brief-toolkit-plugin](https://github.com/eathonq/brief-toolkit-plugin.git) 的示例项目

## 示例场景

### scene-2d.Canvas.Content
这是一个包含了多个UI组件的Canvas节点，主要挂载 `uim.ViewManager` 组件来管理视图。

---

### ViewBse
这是一个基础视图demo，通过挂载该组件就能够放到 `uim.ViewManager` 中的List中进行管理和切换显示，同时可以通过代码的形式加入到视图管理器中进行显示。
同时可以通过 View.show() 方法来显示视图，View.hide() 方法来隐藏视图，View.close() 方法来销毁视图，等其它更多的功能方法来控制视图的显示和生命周期。

---

### ViewMessageBoxDemo
这是一个简单的消息框演示demo，展示了如何使用消息框组件来显示信息和提示用户。

- **MessageBox预制体**
  - 挂载了 `MessageBoxBase` 组件来控制消息框的显示和内容
  - 作为默认的消息框预制体，可以在代码中直接使用 `MessageBox.show()` 方法来显示消息框

- **Tooltip预制体**
  - 挂载了 `TooltipBase` 组件来控制提示框的显示和内容
  - 作为默认的提示框预制体，可以在代码中直接使用 `Tooltip.show()` 方法来显示提示框

---

### ViewI18nDemo
这是一个国际化演示demo，展示了如何使用国际化组件来支持多语言显示。

- **根节点配置**
  - 在根节点挂载 `i18n.LocalizedManager` 组件来管理国际化资源
  - 设置默认的多语言资源文件
  - 通过 **Label Model** 在编辑器实时切换数据显示模式

- **文本国际化（Label）**
  - 文本组件挂载 `i18n.LocalizedLabel` 组件
  - 设置对应的多语言资源key
  - 支持在编辑器通过修改key实时预览不同语言的效果
  - 支持的组件类型：`Label`、`RichText`、`EditBox`

- **图片国际化（Sprite）**
  - 图片组件挂载 `i18n.LocalizedSprite` 组件
  - 设置对应的多语言资源key
  - 支持在编辑器通过修改key实时预览不同语言图片的效果
  - 支持的组件类型：`Sprite`

---

### ViewMvvmDemo
这是一个MVVM演示demo，展示了如何使用MVVM组件来实现数据绑定和视图更新。

- **viewmodel类实现**
  - 本实例演示了 `DataViewModel` 类的实现，它通过 vm, model, prop, func 这些装饰器来定义数据属性和方法
  - 设置对应的数据属性和初始值
  - 后续可以单独对 `DataViewModel` 进行代码的使用，和编写单元测试

- **根节点配置**
  - 在根节点挂载 `mvvm.ViewModel` 组件来绑定视图模型数据，并选择对应的viewmodel类

- **UI组件绑定**
  - 视图中的UI组件可通过挂载以下组件实现数据绑定：
  
  | 组件 | 功能说明 |
  |------|----------|
  | `mvvm.Binding` | 自动识别 Label、Sprite、EditBox、Button、Toggle、Slider 等组件，设置对应的数据属性和绑定方式，支持在编辑器实时预览数据变化效果 |
  | `mvvm.DataContext` | 绑定数据对象，使子节点能够访问和绑定数据属性 |
  | `mvvm.ItemsSource` | 绑定数据集合，使列表组件能够动态生成和更新列表项 |

  - 这样就可以在这些mvvm组件上`选择设置`(不需要手动输入)对应的数据属性和绑定方式，实现数据与视图的自动同步更新

---

### ViewGuideDemo
这是一个引导演示demo，展示了如何使用引导组件来引导用户完成特定操作。

- **根节点配置**
  - 在根节点挂载 `guide.GuideManager` 组件来管理引导步骤和逻辑
  - 设置对应的引导步骤和条件

- **自定义引导目标**
  - 项目演示了自定义实现 **Click预制体** 作为引导的点击目标
  - 包含相关的UI动画效果

---

## 组件挂载快速参考

| 功能模块 | 根节点组件 | 子节点组件 |
|----------|------------|------------|
| UI管理 | `uim.ViewManager` | - |
| 消息框 | - | `MessageBoxBase`、`TooltipBase` |
| 国际化 | `i18n.LocalizedManager` | `i18n.LocalizedLabel`、`i18n.LocalizedSprite` |
| MVVM | `mvvm.ViewModel` | `mvvm.Binding`、`mvvm.DataContext`、`mvvm.ItemsSource` |
| 引导 | `guide.GuideManager` | 自定义预制体 |