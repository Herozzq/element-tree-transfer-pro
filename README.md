### 插件说明
- 该插件是在vue2和element环境下的简易树穿梭框组件

<p>点击 <a href="https://herozzq.github.io/element-mini-tree-transfer/#/">🥳 立即体验 🥳</a></p>

- 安装：npm i element-mini-tree-transfer

- 使用方法如下案例


```html
<template>
    <tree-transfer
        ref="treeTransfer"
        :title="treeTitle"
        :from_data.sync="fromData"
        :right_data.sync="toData"
        :defaultProps="{ label: 'label' }"
        @add-btn="add"
        @remove-btn="remove"
        @left-check-change="handleLeftCheckChange"
        height="540px"
        filter
        openAll
        :defaultCheckedKeys="defaultValue"
        :rightOptions="rightOptions"
        :isRadio="isRadio"
    ></tree-transfer>
</template>

<script>
    import treeTransfer from 'element-mini-tree-transfer'
    export default {
        name: 'DemoTreeTransfer',
        components: {
            treeTransfer
        },
        props: {},
        data() {
            return {
                isRadio: false, //树穿梭框是否单选
                //树穿梭框的参数
                fromData: [
                    {
                        label: '数据中心',
                        deptCode: '200',
                        deptName: '数据中心',
                        id: '1',
                        children: [
                            {
                                label: '小红',
                                children: [],
                                id: '1-1',
                                nickName: '小红',
                                supCode: '200',
                                userId: '1-1',
                            },
                            {
                                label: '小明',
                                children: [],
                                id: '1-2',
                                nickName: '小明',
                                supCode: '200',
                                userId: '1-2',
                            },
                            {
                                label: '小王',
                                children: [],
                                id: '1-3',
                                nickName: '小王',
                                supCode: '200',
                                userId: '1-3',
                            },
                        ],
                    },
                    {
                        label: '开发中心',
                        deptCode: '201',
                        deptName: '开发中心',
                        id: '2',
                        children: [
                            {
                                label: '小绿',
                                children: [],
                                id: '2-1',
                                nickName: '小绿',
                                supCode: '201',
                                userId: '2-1',
                            },
                            {
                                label: '小黄',
                                children: [],
                                id: '2-2',
                                nickName: '小黄',
                                supCode: '201',
                                userId: '2-2',
                            },
                            {
                                label: '小蓝',
                                children: [],
                                id: '2-3',
                                nickName: '小蓝',
                                supCode: '201',
                                userId: '2-3',
                            },
                        ],
                    },
                ],
                toData: [],
                defaultValue: [],

                rightOptions: { suffix: '', connector: '' },
                treeTitle: ['人员选择', '已有人员'],
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {
            this.getChoosePeople()
        },
        methods: {
            //获取已选人
            getChoosePeople() {
                let list = JSON.parse(JSON.stringify(this.fromData))
                this.toData = [
                    {
                        deptCode: '200',
                        deptName: '数据中心',
                        phone: '18953249201',
                        userId: '1-2',
                        nickName: '小明',
                        label: '小明',
                        id: '1-2',
                    },
                ]
                this.defaultValue = this.toData.map(item => item.id)
                if (this.isRadio && this.toData.length > 0) {
                    //回显判断如果是单选，左侧树全部disable
                    this.$refs.treeTransfer.setDisable(list)
                    this.fromData = list
                } else if (!this.isRadio && this.toData.length > 0) {
                    //回显判断如果是多选，选择的disable
                    this.$refs.treeTransfer.chooseDisable(
                        this.defaultValue,
                        list,
                    )
                    this.fromData = list
                }
            },

            // 监听穿梭框组件添加
            add(fromData) {
                console.log('add:', fromData)
            },
            // 监听穿梭框组件移除
            remove(fromData) {
                console.log('remove:', fromData)
            },
              // 左侧树选项改变
            handleLeftCheckChange(fromData) {
                console.log('handleLeftCheckChange:', fromData)
            }
            
        },
    }
</script>

<style scoped></style>
```

:::

### 基础属性

| 参数 | 说明 | 类型 | 默认值 | 补充 |
| ---- | ---- | ---- | ---- | ---- |
| width | 宽度 | String |  100% | 建议在外部盒子设定宽度和位置|
| height | 高度 | String | 320px | - |
| title | 标题 | String |  ["源列表", "目标列表"] | - |
| button_text | 按钮名字 | Array | - | - |
| from_data | 源数据 | Array | - | 数据格式同element-ui tree组件，但必须有id |
| right_data | 目标数据 | Array | - | 数据格式同element-ui tree组件，但必须有id |
| rightOptions | 目标数据配置项 | Object | {suffix: String, connector: String} | suffix-> label后想要拼接的字段（如id，即取此条数据的id拼接在后方）默认suffix connector -> 连接符（字符串）默认- |
| defaultProps | 配置项-同el-tree中props | Object | { label: "label", children: "children", isLeaf: "leaf", disable: "disable" } | 用法和el-tree的props一样 |
| node_key | 自定义node-key的值，默认为id | String | id | 必须与treedata数据内的id参数名一致，必须唯一 |
| filter | 是否开启筛选功能 | Boolean | false | 根据defaultProps参数的label字段筛选 |
| openAll | 是否默认展开全部 | Boolean | false | 存在性能问题 |
| defaultCheckedKeys | 默认选中节点 | Array | false | 只匹配初始时默认节点，不会在你操作后动态改变默认节点 |
| placeholder | 设置搜索框提示语 | String | 输入关键词进行筛选 | - |
| filterNode | 自定义搜索函数 | Function | - | 不传则仍默认根据defaultProps参数的label字段筛选 |
| defaultExpandedKeys | 默认展开节点 | Array | - | 要展开的节点id数组，会自动去重生效在左右两侧 |
| checkStrictly | 是否父子不关联 | Boolean | false | 此模式不支持lazy，返回的fromData和toData是最新数据，obj里面的keys，nodes不完整。且对删空子节点后的父节点左右两边处理逻辑有差异：当授权时既然要在右边出现，必然需要左侧父节点，而删除授权时，移除子权限并不代表想移除父权限 |
| renderAfterExpand | 是否在第一次展开某个树节点后才渲染其子节点 | Boolean | true | - |
| expandOnClickNode | 是否在点击节点的时候展开或者收缩节点 | Boolean | true | - | 
| checkOnClickNode | 是否在点击节点的时候选中节点 | Boolean | false | - |
| icon-class | 自定义树节点的图标 | String | - | - |
| isRadio | 左侧树是否为单选 | Boolean | false | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| add-btn | 点击添加按钮时触发的事件 | function(fromData) fromData 为添加的数据 |
| remove-btn | 点击移除按钮时触发的事件 | function(fromData) fromData 为移除的数据 |
| left-check-change | 左侧源数据勾选事件 | function(nodeObj, treeObj, checkAll)见el-tree组件check事件返回值, 新增checkAll参数表示是否全部选中 |

### 方法

| 方法名称 | 说明 |
| ---- | ---- |
| clearChecked | 清除选中节点 |
| getChecked | 获取选中数据 |
| setChecked | 设置选中数据 function(Keys = []) |


如果觉得有帮到你，可以点一个 star🌟 支持一下～