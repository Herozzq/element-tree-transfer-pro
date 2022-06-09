### 插件简介

该插件是作为element下树穿梭框的补全。不仅拥有基础穿梭框的功能，还额外添加了是否单选，是否可选父级的功能，从而可以适用更多复杂的业务场景。
此外样式充分还原element的原生样式，更好的跟element项目契合。操作交互和各种api也基本还原了element原生, 简单易用，无上手门槛，可以放心使用。
（此插件是基于vue2和element, 使用前请确保正确的运行环境）

### 安装方法

* npm i element-tree-transfer-pro

### 范例展示

<p>点击 <a href="https://herozzq.github.io/element-tree-transfer-pro/#/">立即体验</a></p>

```html
<template>
    <div id="app">
        <tree-transfer ref="treeTransfer" :data-source.sync="dataSource" :default-checked-keys="defaultValue" @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange" :isRadio="false" :filterable="true" :father-choose="false">
        </tree-transfer>
    </div>
</template>

<script>
    import treeTransfer from 'element-mini-tree-transfer'
    const tree = [{
            label: "A部门",
            id: "1",
            children: [{
                    label: "小明",
                    children: [],
                    id: "1-1",
                },
                {
                    label: "小红",
                    children: [],
                    id: "1-2",
                },
                {
                    label: "小刚",
                    children: [],
                    id: "1-3",
                },
            ],
        },
        {
            label: "B部门",
            id: "2",
            children: [{
                    label: "小王",
                    children: [],
                    id: "2-1",
                },
                {
                    label: "小李",
                    children: [],
                    id: "2-2",
                },
                {
                    label: "小朱",
                    children: [],
                    id: "2-3",
                },
            ],
        },
    ]
    export default {
        name: "App",
        components: {
            treeTransfer,
        },
        data() {
            return {
                dataSource: tree,
                defaultValue: '',

            };
        },
        mounted() {
            this.defaultValue = ["1-2"]
        },
        methods: {
            handleChange(value, direction, currentKeys) {
                console.log('handleChange', value, direction, currentKeys)
            },
            handleLeftCheckChange(value, currentKeys) {
                console.log("handleLeftCheckChange:", value, currentKeys);
            },
            handleRightCheckChange(value, currentKeys) {
                console.log("handleRightCheckChange:", value, currentKeys);
            },
        },
    }
</script>
```
:::
### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 容器总宽度 | string | — | 800px |
| height | 容器总高度 | string | — | 500px |
| dataSource | 左侧树数据源 | array | — | [ ] |
| nodeKey | el-tree的key（必须唯一） | string | — | id |
| defaultProps | el-tree 配置项 | Object | — | { label: "label", children: "children" } |
| default-checked-keys | 左侧树默认选中穿梭节点 | array | — | [ ] |
| default-expanded-keys | 树默认展开节点 | array | — | [ ] |
| accordion | 是否每次只打开一个树节点 | boolean | — | false |
| render-after-expand | 是否在第一次展开某个树节点后才渲染其子节点 | boolean | — | true |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点 | boolean | — | true |
| father-choose | 是否严格的遵循父子不互相关联的做法, 父节点是否可被选择穿梭 | boolean | — | false |
| isRadio | 左侧数据源是否为单选 | boolean | — | false |
| openAll| 树节点是否默认展开 | boolean | — | false |
| filterable | 是否可搜索 | boolean | — | false |
| filter-placeholder | 搜索框占位符 | string | — | 请输入搜索内容 |
| filter-method | 自定义搜索方法 | function | — | — |
| titles | 自定义标题 | array | — | ['源数据', '目标列表'] |
| button-texts | 自定义按钮文案 | array | — | [ ] |

### Slot

| name | 说明 |
|------|--------|
| left-footer | 左侧列表底部的内容 |
| right-footer | 右侧列表底部的内容 |

### Methods

| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearQuery | 清空某个面板的搜索关键词 | 'left' / 'right' / 'all'，指定需要清空的搜索框 |
| getTreeChecked | 获取左侧树全部选中状态 | 'leftKeys', 'leftHarfKeys', 'leftNodes', 'leftHalfNodes' |

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 右侧列表元素变化时触发 | 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组 |
| left-check-change | 左侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组 |
| right-check-change | 右侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组 |

如果觉得好用，可以点一个 star🌟 支持一下～