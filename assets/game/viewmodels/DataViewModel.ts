import * as mvvm from "db://brief-toolkit-plugin/mvvm";

const { vm, model, prop, func } = mvvm._decorator;

let id = 1;
function createUser() {
  const type = Math.floor(Math.random() * 13);
  const index = Math.floor(Math.random() * 4) + 1;
  return {
    id: id++,
    path: `images/goods/i_${type}_${index}`,
  }
}

let imgIndex = -1;
// 图片+1
function nextImg() {
  imgIndex = (imgIndex + 1) % 12;
  return `images/goods/i_${imgIndex + 1}_1`;
}
// 所有图片
function allImg() {
  const list = [];
  for (let i = 0; i < 4; i++) {
    list.push(`images/goods/i_0_${i + 1}`);
  }
  return list;
}
@model("ItemModel")
export class ItemModel {
  @prop(Number)
  id: number;

  @prop(String)
  path: string;

  private _temp: string
  @prop(String)
  get temp() {
    return this._temp;
  }
  set temp(value: string) {
    this._temp = value;
    console.log('set temp:', value);
  }

  constructor() {
    const data = createUser();
    this.id = data.id;
    this.path = data.path;
  }
}

@vm("DataViewModel")
export class DataViewModel implements mvvm.IViewModel {
  @prop
  strData = "BindingViewModel";

  @prop()
  logData = "Log Data";

  @prop
  boolData = true;

  @prop
  numData = 100;

  @prop
  progress = 0;

  @prop
  pageIndex = 0;

  @prop
  checkIndex = 0;

  @prop(String)
  image: string;

  @prop([String])
  imageList: string[];

  @prop([ItemModel])
  modelList: ItemModel[];

  @prop(ItemModel)
  modelItem: ItemModel;

  @prop(Number)
  start: number;

  @prop(Number)
  deleteCount: number;

  @prop(Number)
  addCount: number;

  @prop(String)
  jsonStr: string;

  onLoaded(): void {
    this.strData = 'BindingViewModel';
    this.boolData = true;
    this.numData = 1;
    this.progress = 0;
    this.pageIndex = 0;
    this.checkIndex = 0;
    this.image = nextImg();
    this.imageList = allImg();

    this.modelList = [];
    this.modelList.push(new ItemModel());
    this.modelItem = this.modelList[0];

    this.start = 0;
    this.deleteCount = 0;
    this.addCount = 0;

    this.jsonStr = '';
    const self = this;
    mvvm.watchEffect(() => {
      self.jsonStr = JSON.stringify({
        strData: self.strData,
        boolData: self.boolData,
        numData: self.numData,
        progress: self.progress,
        pageIndex: self.pageIndex,
        checkIndex: self.checkIndex,
        image: self.image,
        modelItem: `id: ${self.modelItem?.id ?? 'null'}`,
        modelList: self.modelList.map(item => `id: ${item.id}, path: ${item.path}`),
      }, null, 2);
    });

    console.log('BindingViewModel onLoaded');
  }

  @func
  doDeleteSprite(item: string) {
    const index = this.imageList.indexOf(item);
    if (index >= 0) {
      this.imageList.splice(index, 1);
    }
  }

  @func()
  doClick(custom: string) {
    this.numData += 1;
    this.boolData = !this.boolData;
    this.image = nextImg();
    this.logData = `doClick: ${custom ? 'custom:' + custom : ''}`;
  }

  @func
  touchStart(custom: string) {
    this.logData = `touchStart ${custom ? 'custom:' + custom : ''}`;
  }

  @func
  touchMove(custom: string) {
    this.logData = `touchMove ${custom ? 'custom:' + custom : ''}`;
  }

  @func
  touchEnd(custom: string) {
    this.logData = `touchEnd ${custom ? 'custom:' + custom : ''}`;
  }

  @func
  pushItem() {
    this.modelList.push(new ItemModel());
  }

  @func
  popItem() {
    this.modelList.pop();
  }

  @func
  shiftItem() {
    this.modelList.shift();
  }

  @func
  unshiftItem() {
    this.modelList.unshift(new ItemModel());
  }

  @func
  spliceItem() {
    const _start = Number(this.start);
    const _deleteCount = Number(this.deleteCount);
    const _itemsCount = Number(this.addCount);
    if (Number.isNaN(_start) || Number.isNaN(_deleteCount) || Number.isNaN(_itemsCount)) {
      return;
    }
    const items = [];
    for (let i = 0; i < _itemsCount; i++) {
      items.push(new ItemModel());
    }

    this.modelList.splice(_start, _deleteCount, ...items);
  }
}
