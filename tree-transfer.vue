<template>
    <div class="wl-transfer transfer" :style="{ width, height }">
        <!-- 左侧穿梭框 原料框 -->
        <div class="transfer-left">
            <h3 class="transfer-title">
                <el-checkbox
                    :indeterminate="from_is_indeterminate"
                    v-model="from_check_all"
                    @change="fromAllBoxChange"
                ></el-checkbox>
                <span>{{ fromTitle }}</span>
            </h3>
            <!-- 内容区 -->
            <div class="transfer-main">
                <slot name="from"></slot>
                <el-input
                    v-if="filter"
                    clearable
                    size="small"
                    class="filter-tree"
                    :placeholder="placeholder"
                    v-model="filterFrom"
                ></el-input>
                <el-tree
                    ref="from-tree"
                    show-checkbox
                    :icon-class="iconClass"
                    :node-key="node_key"
                    :props="defaultProps"
                    :data="self_from_data"
                    :accordion="accordion"
                    :default-expand-all="openAll"
                    :highlight-current="highLight"
                    :render-content="renderContentLeft"
                    :filter-node-method="filterNodeFrom"
                    :check-on-click-node="checkOnClickNode"
                    :render-after-expand="renderAfterExpand"
                    :expand-on-click-node="expandOnClickNode"
                    :default-checked-keys="defaultCheckedKeys"
                    :default-expanded-keys="from_expanded_keys"
                    @check="fromTreeChecked"
                ></el-tree>
            </div>
        </div>
        <!-- 穿梭区 按钮框 -->
        <div class="transfer-center address-list-center">
            <p class="transfer-center-item address-only-item">
                <el-button
                    type="primary"
                    @click="addressListTransfer()"
                    icon="el-icon-arrow-right"
                    class="address-first-btn"
                    :disabled="from_disabled"
                    >添加</el-button
                >
            </p>
        </div>
        <!-- 右侧列表区 -->
        <div class="transfer-right">
            <div class="transfer-right-item transfer-right-only">
                <h3 class="transfer-title">
                    <span>{{ toTitle }}</span>
                    <span class="u-clear" @click="clearList('all')">清空</span>
                </h3>
                <!-- 内容区 -->
                <div class="transfer-main">
                    <slot name="to"></slot>
                    <el-input
                        v-if="filter"
                        clearable
                        :placeholder="placeholder"
                        v-model="filterListFirst"
                        size="small"
                        class="filter-tree"
                    ></el-input>
                    <ul class="address-list-ul">
                        <li
                            class="address-list-li"
                            v-for="item of addressee"
                            :key="item[node_key]"
                        >
                            <label>
                                {{ item[defaultProps.label] }}
                                {{ rightOptions.connector }}
                                {{ item[rightOptions.suffix] }}
                            </label>
                            <i
                                class="address-list-del el-icon-close"
                                @click="clearList(item[node_key])"
                            ></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TransferTree',
    data() {
        return {
            from_is_indeterminate: false, // 源数据是否半选
            from_check_all: false, // 源数据是否全选
            from_expanded_keys: [], // 源数据展开节点
            from_disabled: true, // 添加按钮是否禁用
            from_check_keys: [], // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
            filterFrom: '', // 源数据筛选
            filterListFirst: '', // 右侧数据筛选
            archiveFirst: [], // 存档右侧筛选前数据
            addressee: [], //右侧数据列表
        }
    },
    props: {
        // 宽度
        width: {
            type: String,
            default: '100%',
        },
        // 高度
        height: {
            type: String,
            default: '320px',
        },
        // 右侧列表数据
        right_data: {
            type: Array,
            default: () => {
                return []
            },
        },

        // 标题
        title: {
            type: Array,
            default: () => ['源列表', '目标列表'],
        },
        // 源数据
        from_data: {
            type: Array,
            default: () => [],
        },
        // el-tree 配置项
        defaultProps: {
            type: Object,
            default: () => {
                return { label: 'label', children: 'children' }
            },
        },
        // el-tree node-key 必须唯一
        node_key: {
            type: String,
            default: 'id',
        },

        // 是否启用筛选
        filter: {
            type: Boolean,
            default: false,
        },
        // 是否展开所有节点
        openAll: {
            type: Boolean,
            default: false,
        },
        // 左侧自定义树节点
        renderContentLeft: Function,
        // suffix-> label后想要拼接的字段（如id，即取此条数据的id拼接在后方）connector -> 连接符（字符串）
        rightOptions: {
            type: Object,
            default: () => {
                return {
                    suffix: 'suffix',
                    connector: '-',
                }
            },
        },
        // 源数据 默认选中节点
        defaultCheckedKeys: {
            type: Array,
            default: () => [],
        },
        // 源数据 默认展开节点
        defaultExpandedKeys: {
            type: Array,
            default: () => [],
        },
        // 筛选placeholder
        placeholder: {
            type: String,
            default: '输入关键字进行过滤',
        },
        // 自定义筛选函数
        filterNode: Function,

        // 是否高亮当前选中节点，默认值是 false。
        highLight: {
            type: Boolean,
            default: false,
        },
        // 是否遵循父子不关联
        checkStrictly: {
            type: Boolean,
            default: false,
        },
        // 是否每次只打开一个同级树节点
        accordion: {
            type: Boolean,
            default: false,
        },
        // 是否在第一次展开某个树节点后才渲染其子节点
        renderAfterExpand: {
            type: Boolean,
            default: true,
        },
        // 是否在点击节点的时候展开或者收缩节点
        expandOnClickNode: {
            type: Boolean,
            default: true,
        },
        // 是否在点击节点的时候选中节点
        checkOnClickNode: {
            type: Boolean,
            default: false,
        },

        // 是否单选
        isRadio: {
            type: Boolean,
            default: false,
        },
        // 	自定义树节点的图标
        iconClass: String,
    },
    computed: {
        // 左侧数据
        self_from_data() {
            let from_array = [...this.from_data]
            return from_array
        },
        // 左侧菜单名
        fromTitle() {
            let [text] = this.title
            return text
        },
        // 右侧菜单名
        toTitle() {
            let [, text] = this.title
            return text
        },
    },
    watch: {
        // 左侧 状态监测
        from_check_keys(val) {
            if (val.length > 0) {
                // 穿梭按钮是否禁用
                this.from_disabled = false
                // 总半选是否开启
                this.from_is_indeterminate = true

                // 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等
                let allCheck = val.filter(item => item[this.id] == 0)
                if (allCheck.length == this.self_from_data.length) {
                    // 关闭半选 开启全选
                    this.from_is_indeterminate = false
                    this.from_check_all = true
                } else {
                    this.from_is_indeterminate = true
                    this.from_check_all = false
                }
            } else {
                this.from_disabled = true
                this.from_is_indeterminate = false
                this.from_check_all = false
            }
        },
        // 左侧 数据筛选
        filterFrom(val) {
            this.$refs['from-tree'].filter(val)
        },
        // 右侧 筛选
        filterListFirst(newval, oldval) {
            if (oldval == '') {
                this.archiveFirst = this.addressee
            }
            if (newval == '') {
                this.addressee = this.archiveFirst
            }
            let reg = RegExp(newval)
            this.addressee = this.addressee.filter(item => reg.test(item.label))
        },

        // 监视默认选中
        defaultCheckedKeys(val) {
            this.from_check_keys = val || []
        },
        // 监视默认展开
        defaultExpandedKeys: {
            handler(val) {
                let _form = new Set(this.from_expanded_keys.concat(val))
                this.from_expanded_keys = [..._form]
            },
            immediate: true,
        },
        // 右侧列表数据默认值监测
        right_data: {
            handler(val) {
                this.addressee.push(...val)
            },
            immediate: true,
        },
    },
    methods: {
        // -------------------------------提供输出函数---------------------
        // 源树选中事件 - 是否禁用穿梭按钮
        fromTreeChecked(nodeObj, treeObj) {
            this.from_check_keys = treeObj.checkedNodes
            if (this.isRadio) {
                this.setChecked([nodeObj.id])
            }
            this.$nextTick(() => {
                this.$emit(
                    'left-check-change',
                    nodeObj,
                    treeObj,
                    this.from_check_all,
                )
            })
        },
        // 源数据 总全选checkbox
        fromAllBoxChange(val) {
            if (this.self_from_data.length == 0) {
                return
            }
            if (val) {
                this.from_check_keys = this.self_from_data
                this.$refs['from-tree'].setCheckedNodes(this.self_from_data)
            } else {
                this.$refs['from-tree'].setCheckedNodes([])
                this.from_check_keys = []
            }
            this.$emit('left-check-change', null, null, this.from_check_all)
        },
        // 源数据 筛选
        filterNodeFrom(value, data) {
            if (this.filterNode) {
                return this.filterNode(value, data, 'form')
            }
            if (!value) return true
            return data[this.defaultProps.label].indexOf(value) !== -1
        },
        // 穿梭操作
        addressListTransfer() {
            // 选中节点数据
            let arrayCheckedNodes = this.$refs['from-tree'].getCheckedNodes(
                true,
            )
            // 去重筛选
            let arrayDeWeighting = []

            arrayDeWeighting = arrayCheckedNodes.filter(item => {
                if (
                    !this.addressee.some(
                        ite => ite[this.node_key] == item[this.node_key],
                    )
                ) {
                    return item
                }
            })
            this.addressee = [...this.addressee, ...arrayDeWeighting]
            console.log('穿梭', this.addressee)

            if (this.isRadio) {
                this.setDisable(this.self_from_data)
            } else {
                for (const item of this.addressee) {
                    item.disabled = true
                }
            }
            // 传递信息给父组件
            this.$emit('add-btn', this.addressee)
        },
        // 清理 右侧选中 数据
        clearList(id) {
            this.addressee =
                id == 'all'
                    ? []
                    : this.addressee.filter(item => item[this.node_key] != id)
            console.log('移除', this.self_from_data)

            let chooseId = this.addressee.map(item => item.id)
            this.chooseDisable(chooseId, this.self_from_data)
            // 处理完毕取消选中
            this.$refs['from-tree'].setCheckedKeys(chooseId)
            // 传递信息给父组件
            this.$emit('remove-btn', this.addressee)
        },

        // 以下为提供方法 ----------------------------------------------------------------方法--------------------------------------
        /**
         * @name 清空选中节点
         *
         */
        clearChecked() {
            this.$refs['from-tree'].setCheckedKeys([])
            this.from_is_indeterminate = false
            this.from_check_all = false
        },
        /**
         * @name 获取选中数据
         */
        getChecked() {
            // 左侧选中信息
            let leftKeys = this.$refs['from-tree'].getCheckedKeys()
            let leftHarfKeys = this.$refs['from-tree'].getHalfCheckedKeys()
            let leftNodes = this.$refs['from-tree'].getCheckedNodes()
            let leftHalfNodes = this.$refs['from-tree'].getHalfCheckedNodes()

            return {
                leftKeys,
                leftHarfKeys,
                leftNodes,
                leftHalfNodes,
            }
        },
        /**
         * @name 设置选中数据
         * @param {Array} leftKeys 左侧ids
         *
         */
        setChecked(leftKeys = []) {
            this.$refs['from-tree'].setCheckedKeys(leftKeys)
        },
        /**
         * @name 清除搜索条件
         * @param {String} type left左边 right右边 all全部 默认all
         */
        clearFilter() {
            this.filterFrom = ''
        },

        //使移动到右边的数据在左侧树下不可编辑
        chooseDisable(value, arr) {
            for (const item of arr) {
                let choose = value.includes(item.id)

                if (choose) {
                    item.disabled = true
                } else {
                    item.disabled = false
                }
                if (this.isRadio && item.children.length > 0) {
                    item.disabled = true
                }
                if (item.children) {
                    this.chooseDisable(value, item.children)
                }
            }
        },

        //单选模式禁用左边的树选项
        setDisable(arr) {
            for (const item of arr) {
                // item.disabled = true;
                this.$set(item, 'disabled', true)
                if (item.children) {
                    this.setDisable(item.children)
                }
            }
        },
    },
}
</script>

<style lang="less">
.wl-transfer {
    position: relative;
    overflow: hidden;

    .el-tree {
        min-width: 100%;
        display: inline-block !important;
    }

    .transfer-left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .transfer-right {
        position: absolute;
        top: 0;
        right: 0;
    }

    .transfer-right-item {
        height: calc((100% - 41px) / 2);
    }

    .transfer-right-only {
        height: 100%;
    }

    .transfer-main {
        padding: 10px;
        height: calc(100% - 41px);
        box-sizing: border-box;
        overflow: auto;
    }

    .transfer-left,
    .transfer-right {
        border: 1px solid #ebeef5;
        width: 40%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        vertical-align: middle;
    }

    .transfer-center {
        position: absolute;
        top: 50%;
        left: 40%;
        width: 20%;
        transform: translateY(-50%);
        text-align: center;
    }

    .transfer-center-item {
        padding: 10px;
        overflow: hidden;
    }

    .address-list-center {
        height: 100%;
    }

    .address-list-center > .transfer-center-item {
        height: 50%;
        padding: 70px 10px 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .address-list-center > .address-only-item {
        height: 100%;
        position: relative;
    }

    .address-only-item > .address-first-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .transfer-title {
        border-bottom: 1px solid #ebeef5;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        color: #333;
        font-size: 16px;
        background-color: #f5f7fa;
    }

    .transfer-title .el-checkbox {
        margin-right: 10px;
    }

    .filter-tree {
        margin-bottom: 10px;
        font-style: normal !important;
    }

    .address-list-ul {
        padding-bottom: 20px;
    }

    .address-list-li {
        position: relative;
        padding: 4px 24px 4px 4px;
        border-radius: 3px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .address-list-li:hover {
        background-color: #f5f7fa;
    }

    .address-list-li:hover .address-list-del {
        display: block;
    }

    .address-list-del {
        display: none;
        position: absolute;
        top: 50%;
        right: 2px;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        text-align: center;
        color: #f56c6c;
        cursor: pointer;
        font-style: normal !important;
    }

    .u-clear {
        float: right;
        color: #409eff;
        font-size: 14px;
        cursor: pointer;
    }

    .move_up_img {
        float: right;
        margin-top: 10px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .move_down_img {
        transform: rotate(180deg);
    }

    .el-icon-arrow-right:before {
        font-style: normal !important;
    }
}
</style>
