## 安装

```bash
npm install vue-bluer --save
# 或者
yarn add vue-bluer
```

## 使用

导入全部组件

```js
import bluerVue from 'vue-bluer'

Vue.use(bluerVue)
```

按需引入部分组件

```js
import { Toast, Modal, Scroll, Slide, SlideItem } from 'vue-bluer'

Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$modal = Vue.prototype.$modal = Modal;

Vue.component(`Bl${Scroll.name}`, Scroll);
Vue.component(`Bl${Slide.name}`, Slide);
Vue.component(`Bl${SlideItem.name}`, SlideItem);
```

### JS Components

#### Toast

简短的消息提示框，支持自定义位置、持续时间、手动关闭。

基本用法：

```js
// components
import Toast from 'components/toast'

Toast('提示信息')
```

在调用 Toast 时传入一个对象即可配置更多选项

```js
Toast({
    position: 'bottom',
    message: '提示信息',
    duration: 5000
})
```

若需在文字上方显示一个 icon 图标，可以将图标的类名作为 iconClass 的值传给 Toast（图标需自行准备）

```js
Toast({
    message: '操作成功',
    iconClass: 'icon icon-success'
})
```

这样做每次要用到的时候都要`import`显得很麻烦，如果把toast方法挂载到vue对象上，每个页面只需要调用`this.$toast`方法就可以，岂不很方便，具体代码如下：

```js
// src/main.js 中加入下面代码
import Toast from 'components/toast'

Vue.$toast = Vue.prototype.$toast = Toast;

// 在vue文件中调用
this.$toast('提示信息')
```

执行 `Toast` 方法会返回一个 `Toast` 实例，每个实例都有 `close` 方法，用于手动关闭 `Toast`，手动关闭需要把`duration`参数设置成`loading`，这样才不会2秒自动关闭。

```js
let toastd = this.$toast({
  iconClass: 'preloader white',
  message: '加载中',
  duration: 'loading'
})
setTimeout(() => toastd.close(), 3000)
```

#### Modal

弹出式提示框，有多种交互形式。

基本用法：

```js
import Modal from 'components/modal'
Vue.$modal = Vue.prototype.$modal = Modal;

this.$modal({
    title: '提示',
    content: '操作成功'
})
```

弹出`confirm`框，自定义按钮组的文字和点击后的回调函数

```js
this.$modal({
    title: '提示',
    content: '操作成功',
    buttons: [{
      text: '取消',
      onClick: () => {
        this.$toast('取消')
      }
    }, {
      text: '确定',
      onClick: () => {
        this.$toast('确定')
      }
    }]
})
```

#### Action sheet

操作表，从屏幕下方移入。

基本用法：

`actions` 属性绑定一个由对象组成的数组，每个对象有 `name` 和 `method` 两个键，`name` 为菜单项的文本，`method` 为点击该菜单项的回调函数。

将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `actionsheet` 的显示与隐藏。

```html
<bl-actionsheet
    :actions="actions"
    v-model="sheetVisible">
</bl-actionsheet>
```

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
actions | 菜单项数组 | Array | |
cancelText | 取消按钮的文本。若设为空字符串，则不显示取消按钮 | String | | '取消'
closeOnClickModal | 是否可以通过点击 modal 层来关闭 actionsheet | Boolean | | true

#### Popup

弹出框，可自定义内容。

基本用法：

`position` 属性指定了 `popup` 的位置。比如，`position` 为 `'bottom'` 时，`popup` 会从屏幕下方移入，并最终固定在屏幕下方。移入/移出的动效会根据 `position` 的不同而自动改变，无需手动配置。

将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `popup` 的显示与隐藏。

```js
<bl-popup
  v-model="popupVisible"
  position="bottom">
  ...
</bl-popup>
```

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
position | popup 的位置。省略则居中显示 | String | 'top','right','bottom','left' |
pop-transition | 显示/隐藏时的动效，仅在省略 position 时可配置 | String | 'popup-fade' | 'popup-slide'
modal | 是否创建一个 modal 层 | Boolean | - | true
closeOnClickModal | 是否可以通过点击 modal 层来关闭 popup | Boolean | - | true

Slot

name | 描述
---|---|---|---|---
- | popup弹出框的内容

#### Picker

选择器，支持多 slot 联动。

基本用法：

```js
<bl-picker :slots="slots" @change="onValuesChange"></bl-picker>
```
```js
export default {
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  }
};
```

在 `change` 事件中，可以使用注册到 `picker` 实例上的一些方法：

- getSlotValue(index)：获取给定 slot 目前被选中的值
- setSlotValue(index, value)：设定给定 slot 被选中的值，该值必须存在于该 slot 的备选值数组中
- getSlotValues(index)：获取给定 slot 的备选值数组
- setSlotValues(index, values)：设定给定 slot 的备选值数组
- getValues()：获取所有 slot 目前被选中的值（分隔符 slot 除外）
- setValues(values)：设定所有 slot 被选中的值（分隔符 slot 除外），该值必须存在于对应 slot 的备选值数组中

slots

绑定到 `slots 属性的数组由对象组成，每个对象都对应一个 slot，它们有如下键名

key | 描述
---|---|---|---|---
divider | 对应 slot 是否为分隔符
content | 分隔符 slot 的显示文本
values	| 对应 slot 的备选值数组。若为对象数组，则需在 mt-picker 标签上设置 value-key 属性来指定显示的字段名
defaultIndex | 对应 slot 初始选中值，需传入其在 values 数组中的序号，默认为 0
textAlign | 对应 slot 的对齐方式
flex | 对应 slot CSS 的 flex 值
className | 对应 slot 的类名

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
slots | slot 对象数组 | Array | - | []
valueKey | 当 values 为对象数组时，作为文本显示在 Picker 中的对应字段的字段名	 | String | - | ''
showToolbar | 是否在组件顶部显示一个 toolbar，内容自定义 | Boolean | - | false
visibleItemCount | slot 中可见备选值的个数 | Number | - | 5

Slot


name | 描述
---|---|---|---|---
- | 当 showToolbar 为 true 时，toolbar 中的内容

#### Datetime picker

日期时间选择器，支持自定义类型。

基本用法：

`v-model` 属性为组件的绑定值。

`type` 属性表示 `datetime-picker` 组件的类型，它有三个可能的值：

- datetime: 日期时间选择器，可选择年、月、日、时、分，value 值为一个 Date 对象
- date: 日期选择器，可选择年、月、日，value 值为一个 Date 对象
- time: 时间选择器，可选择时、分，value 值为一个格式为 HH:mm 的字符串

`datetime-picker` 提供了两个供外部调用的方法：`open` 和 `close`，分别用于打开和关闭选择器。

```vue
<template>
  <bl-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue">
  </bl-datetime-picker>
</template>

<script>
  export default {
    methods: {
      openPicker() {
        this.$refs.picker.open();
      }
    }
  };
</script>
```

可以为选项提供自定义模板。模板须为一个包含了 `{value}` 的字符串，`{value}` 会被解析为相应选项的值。

```vue
<bl-datetime-picker
  v-model="pickerVisible"
  type="date"
  year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日">
</bl-datetime-picker>
```

当点击确认按钮时会触发 `confirm` 事件，参数为当前 `value` 的值。

```vue
<bl-datetime-picker
  v-model="pickerVisible"
  type="time"
  @confirm="handleConfirm">
</bl-datetime-picker>
```

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
type | 组件的类型 | String | 'datetime', 'date', 'time' | 'datetime'
cancelText | 取消按钮文本 | String | - | '取消'
confirmText | 确定按钮文本 | String | - |	'确定'
startDate | 日期的最小可选值 | Date | - | 十年前的 1 月 1 日
endDate | 日期的最大可选值 | Date | - | 十年后的 12 月 31 日
startHour | 小时的最小可选值 | Number | - | 0
endHour | 小时的最大可选值 | Number | - | 23
yearFormat | 年份模板 | String | - | '{value}'
monthFormat | 月份模板 | String | - | '{value}'
dateFormat | 日期模板 | String | - | '{value}'
hourFormat | 小时模板 | String | - | '{value}'
minuteFormat | 分钟模板 | String | - | '{value}'

Events


事件名称 | 说明 | 回调参数
---|---|---|---|---
confirm | 点击确认按钮时的回调函数 | 目前的选择值

#### Scroll

下拉/上拉刷新。

基本用法：

```vue
<bl-scroll :enableRefresh="true" :onRefresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="isLoading">
    // ...
</bl-scroll>
```

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
offset | 下拉多少距离时触发下拉刷新操作 | Number | - | 44
enableInfinite | 是否启用滑动到底部加载更多 | Boolean | - | true
enableRefresh | 是否启用下拉刷新 | Boolean | - | true
onRefresh | 下拉刷新的回调函数 | Function | - | undefined
onInfinite | 滑动到底部的回调函数 | Function | - | undefined

<p class="danger">如果同时有下拉刷新和popup，actionsheet，datetime-picker，picker组件的时候，不能放到`<bl-scroll></bl-scroll>`里，不然其他组件会异常，因为下拉刷新的`div`给了绝对定位，`popup`组件是固定定位`bottom: 0`，如果刚好出现在绝对定位里，那么popup固定定位就会在页面最下面。解决办法就是两个组件分开。</p>


#### Slide

轮播图，需要搭配`slide-item`一起使用

基本用法：

```vue
<bl-slide>
  <bl-slide-item>
    <a href="javascript:;"><img _src="http://placeholder.qiniudn.com/750x375" alt=""></a>
  </bl-slide-item>
  <bl-slide-item>
    <a href="javascript:;"><img _src="http://placeholder.qiniudn.com/750x375" alt=""></a>
  </bl-slide-item>
</bl-slide>
```

API

slide

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
pagination | 是否启用下面的点点点分页导航| Boolean | - | true
effect | 效果，支持 left、leftLoop | String | 'left','leftLoop' | 'leftloop'
autoPlay | 自动播放 | Boolean | - | false
switchLoad | 图片的真实路径 | String | - | '_src'

### CSS Components

#### Switch

开关

基本用法：

```vue
<bl-switch v-model="values" type="pink"></bl-switch>
```

`v-model`绑定一个本地变量代表开还是关，`type`代表显示颜色

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 绑定值 | Boolean | - | -
type | 显示颜色 | String | 'primary', 'pink', 'danger', 'orange', 'purple' | 'primary'

#### Button

按钮，提供几种基础样式和尺寸，可自定义图标。

改变颜色

```vue
<bl-button type="primary">主要按钮</bl-button>
<bl-button type="secondary">次要按钮</bl-button>
<bl-button type="other">其他按钮</bl-button>
```

改变大小

```vue
<bl-button>大按钮</bl-button>
<bl-button size="small">小按钮</bl-button>
<bl-button size="middle">中等按钮</bl-button>
```

禁用按钮

```vue
<bl-button disabled>禁用按钮</bl-button>
```

普通按钮

```vue
<bl-button inline>普通按钮</bl-button>
```

带图标

```vue
<bl-button icon="icon-success">成功按钮</bl-button>
```

自定义图标

```vue
<bl-button>
  <img src="../assets/100x100.png" height="20" width="20" slot="icon">
  带自定义图标
</bl-button>
```

API

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
disabled | 禁用状态 | Boolean | - | false
type | 按钮显示样式 | String | 'primary','secondary','other' | 'primary'
size | 尺寸 | String | 'small','middle' | -
icon | 图标 | String | - | -
inline | 普通按钮 | Boolean | - | false

Slot

name | 描述
---|---|---|---|---
- | 显示的文本内容
icon | 自定义显示的图标

#### Navbar

顶部选项卡，与 `Tabbar` 类似，依赖 `tab-item` 组件。

搭配 tab-container 组件使用

```vue
<bl-navbar :fixed="true" v-model="selected">
  <bl-tab-item id="1">已分配</bl-tab-item>
  <bl-tab-item id="2">可分配</bl-tab-item>
  <bl-tab-item id="3">已失效</bl-tab-item>
  <bl-tab-item id="4">已失效</bl-tab-item>
</bl-navbar>

<bl-tab-container :swipeable="false" v-model="selected">
  <bl-tab-container-item id="1">
    1
  </bl-tab-container-item>
  <bl-tab-container-item id="2">
    2
  </bl-tab-container-item>
  <bl-tab-container-item id="3">
    3
  </bl-tab-container-item>
  <bl-tab-container-item id="4">
    4
  </bl-tab-container-item>
</bl-tab-container>
```

API

navbar

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
fixed | 固定在页面顶部 | Boolean | - | false
value | 返回当前选中的 tab-item 的 id | * | - | -

tab-item

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
id | 选中后的返回值 | * | - | -

#### tabContainer

面板，可切换显示子页面。

搭配 tab-container-item 组件使用

```vue
<bl-tab-container :swipeable="false" v-model="selected">
  <bl-tab-container-item id="1">
    1
  </bl-tab-container-item>
  <bl-tab-container-item id="2">
    2
  </bl-tab-container-item>
  <bl-tab-container-item id="3">
    3
  </bl-tab-container-item>
  <bl-tab-container-item id="4">
    4
  </bl-tab-container-item>
</bl-tab-container>
```

API

tab-container

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
swipeable | 显示滑动效果 | Boolean | - | false
value | 	当前激活的 id | * | - | -

tab-container-item

参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
id | item 的 id | * | - | -




