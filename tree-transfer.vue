<template>
  <div class="transfer-box transfer" :style="{ width, height }">
    <!-- 左侧树框 -->
    <div class="transfer-left">
      <div class="transfer-title">
        <el-checkbox
          :indeterminate="treeIndeterminate"
          v-model="treeCheckAll"
          @change="treeAllBoxChange"
        >
        </el-checkbox>
        <span>{{ treeTitle }}</span>
        <span class="total">{{ treeLength }}/{{ treeCheckKeys.length }}</span>
      </div>
      <div class="transfer-main">
        <el-input
          v-if="filterable"
          clearable
          size="small"
          class="filter-input"
          :placeholder="filterPlaceholder"
          v-model="filterTree"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- 左侧树 -->
        <el-tree
          ref="from-tree"
          show-checkbox
          :node-key="nodeKey"
          :props="defaultProps"
          :data="treeFromData"
          :accordion="accordion"
          :default-expand-all="openAll"
          :filter-node-method="filterNodeFrom"
          :render-after-expand="renderAfterExpand"
          :expand-on-click-node="expandOnClickNode"
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="treeExpandedKeys"
          @check="fromTreeChecked"
          :check-strictly="fatherChoose"
        >
        </el-tree>
        <div class="slot-footer" v-if="$slots['left-footer']">
          <slot name="left-footer"></slot>
        </div>
      </div>
    </div>
    <!-- 穿梭区 按钮框 -->
    <div class="transfer-center right-list-center">
      <el-button
        type="primary"
        @click="listToTree()"
        :disabled="listCheckKey.length == 0"
      >
        <i class="el-icon-arrow-left el-icon--left"></i>
        {{ leftButtonText }}
      </el-button>

      <el-button
        type="primary"
        @click="treeToList()"
        :disabled="transferDisabled"
      >
        {{ rightButtonText }}
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </div>
    <!-- 右侧列表区 -->
    <div class="transfer-right">
      <div class="transfer-title">
        <el-checkbox
          :indeterminate="listIndeterminate"
          v-model="listCheckAll"
          @change="listAllBoxChange"
        >
        </el-checkbox>
        <span>{{ listTitle }}</span>
        <span class="total"
          >{{ rightList.length }}/{{ listCheckKey.length }}</span
        >
      </div>
      <div class="transfer-main">
        <el-input
          v-if="filterable"
          clearable
          :placeholder="filterPlaceholder"
          v-model="filterList"
          size="small"
          class="filter-input"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- 右侧列表 -->
        <el-checkbox-group
          v-model="listCheckKey"
          class="el-transfer-panel__list"
        >
          <el-checkbox
            class="el-transfer-panel__item"
            v-for="item of rightList"
            :label="item[nodeKey]"
            :key="item[nodeKey]"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
        <div class="slot-footer" v-if="$slots['right-footer']">
          <slot name="right-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferTree",
  data() {
    return {
      treeKeys: [], //树所有节点的key
      treeLength: 0, // 树所有节点数量
      treeIndeterminate: false, // 源数据是否半选
      treeCheckAll: false, // 源数据是否全选
      treeExpandedKeys: [], // 源数据展开节点
      treeCheckKeys: [], // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
      filterTree: "", // 源数据筛选
      filterList: "", // 右侧数据筛选
      archiveFirst: [], // 存档右侧筛选前数据
      rightList: [], //右侧数据列表
      listCheckKey: [], //右选中数据
      listCheckAll: false, // 右侧列表是否全选
    };
  },
  props: {
    // 宽度
    width: {
      type: String,
      default: "800px",
    },
    // 高度
    height: {
      type: String,
      default: "500px",
    },
    // 标题
    titles: {
      type: Array,
      default: () => ["源数据", "目标列表"],
    },
    // 源数据
    dataSource: {
      type: Array,
      default: () => [],
    },
    // el-tree 配置项
    defaultProps: {
      type: Object,
      default: () => {
        return { label: "label", children: "children" };
      },
    },
    // el-tree node-key 必须唯一
    nodeKey: {
      type: String,
      default: "id",
    },
    // 是否启用筛选
    filterable: {
      type: Boolean,
      default: false,
    },
    // 是否展开所有节点
    openAll: {
      type: Boolean,
      default: true,
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
    filterPlaceholder: {
      type: String,
      default: "请输入搜索内容",
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
    // 是否严格的遵循父子不互相关联的做法,父节点是否可选
    fatherChoose: {
      type: Boolean,
      default: false,
    },
    // 是否单选
    isRadio: {
      type: Boolean,
      default: false,
    },
    // 穿梭按钮文案
    buttonTexts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // 左侧数据
    treeFromData() {
      let fromArray = JSON.parse(JSON.stringify(this.dataSource));
      return fromArray;
    },
    // 左侧菜单名
    treeTitle() {
      let [text] = this.titles;
      return text;
    },
    // 右侧菜单名
    listTitle() {
      let [, text] = this.titles;
      return text;
    },
    // 左侧按钮名
    leftButtonText() {
      let [text] = this.buttonTexts;
      return text;
    },
    // 右侧侧按钮名
    rightButtonText() {
      let [, text] = this.buttonTexts;
      return text;
    },
    // 右侧列表是否半选
    listIndeterminate() {
      const checkedLength = this.listCheckKey.length;
      return checkedLength > 0 && checkedLength < this.rightList.length;
    },
    // 树穿梭按钮是否禁用
    transferDisabled() {
      let rightKeys = this.rightList.map((item) => item[this.nodeKey]);
      let result =
        this.treeCheckKeys.length > 0 &&
        this.treeCheckKeys.every((item) => rightKeys.indexOf(item) > -1);
      if (rightKeys.length == 0 && this.treeCheckKeys.length == 0) {
        result = true;
      }
      return result;
    },
  },
  watch: {
    // 左侧树选中的key
    treeCheckKeys(val) {
      if (val.length > 0) {
        // 总半选是否开启
        this.treeIndeterminate = true;
        if (val.length == this.treeLength) {
          // 关闭半选 开启全选
          this.treeIndeterminate = false;
          this.treeCheckAll = true;
        } else {
          this.treeIndeterminate = true;
          this.treeCheckAll = false;
        }
      } else {
        this.treeIndeterminate = false;
        this.treeCheckAll = false;
      }
    },
    // 右侧列表选中的key
    listCheckKey(val, oldVal) {
      const movedKeys = [...val, ...oldVal].filter(
        (v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1
      );
      this.updateListAllChecked();
      this.$emit("right-check-change", val, movedKeys);
    },
    // 左侧 数据筛选
    filterTree(val) {
      this.$refs["from-tree"].filter(val);
    },
    // 右侧 筛选
    filterList(newval, oldval) {
      if (oldval == "") {
        this.archiveFirst = this.rightList;
      }
      if (newval == "") {
        this.rightList = this.archiveFirst;
      }
      let reg = RegExp(newval);
      this.rightList = this.rightList.filter((item) => reg.test(item.label));
    },

    // 监视默认选中
    defaultCheckedKeys(val) {
      this.treeCheckKeys = val;
      this.findItem(this.treeFromData);
      if (this.isRadio && this.rightList.length > 0) {
        //回显判断如果是单选，左侧树全部disable
        this.setDisable(this.treeFromData);
      } else {
        //回显判断如果是多选，选择的disable
        this.chooseDisable(this.treeCheckKeys, this.treeFromData);
      }
    },
    // 监视默认展开
    defaultExpandedKeys: {
      handler(val) {
        let _form = new Set(this.treeExpandedKeys.concat(val));
        this.treeExpandedKeys = [..._form];
      },
      immediate: true,
    },
  },

  mounted() {
    this.setTreeMsg(this.treeFromData);
  },
  methods: {
    // 左侧树选中事件
    fromTreeChecked(nodeObj) {
      this.treeCheckKeys = this.$refs["from-tree"].getCheckedKeys(
        !this.fatherChoose
      );
      if (this.isRadio) {
        this.setChecked([nodeObj.id]);
      }
      let currentKeys = [];
      if (this.fatherChoose) {
        currentKeys = [nodeObj[this.nodeKey]];
      } else {
        currentKeys = this.findChildKey([nodeObj]);
      }
      console.log("left-check-change", this.treeCheckKeys, currentKeys);
      this.$nextTick(() => {
        this.$emit("left-check-change", this.treeCheckKeys, currentKeys);
      });
    },

    // 左侧树总全选checkbox
    treeAllBoxChange(val) {
      if (this.treeFromData.length == 0) {
        return;
      }
      let listKey = this.rightList.map((item) => item[this.nodeKey]);
      if (val) {
        this.setChecked(this.treeKeys);
        this.treeCheckKeys = this.treeKeys;
      } else {
        this.setChecked(listKey);
        this.treeCheckKeys = listKey;
      }
      this.$emit("left-check-change", this.treeCheckKeys);
    },

    // 左侧树筛选
    filterNodeFrom(value, data) {
      if (this.filterNode) {
        return this.filterNode(value, data, "form");
      }
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },

    // 穿梭操作
    treeToList() {
      // 选中节点数据
      let arrayCheckedNodes = this.$refs["from-tree"].getCheckedNodes(
        !this.fatherChoose
      );
      //取出本次移动的keys
      let rightKeys = JSON.parse(
        JSON.stringify(this.rightList.map((item) => item[this.nodeKey]))
      );
      const movedKeys = [...new Set(this.treeCheckKeys)].filter(
        (item) => !new Set(rightKeys).has(item)
      );
      // 去重筛选
      let arrayDeWeighting = [];
      arrayDeWeighting = arrayCheckedNodes.filter((item) => {
        if (
          !this.rightList.some((ite) => ite[this.nodeKey] == item[this.nodeKey])
        ) {
          return item;
        }
      });
      this.rightList = [...this.rightList, ...arrayDeWeighting];
      if (this.isRadio) {
        this.setDisable(this.treeFromData);
      } else {
        let chooseId = this.rightList.map((item) => item[this.nodeKey]);
        this.chooseDisable(chooseId, this.treeFromData);
      }
      this.$emit("change", this.treeCheckKeys, "right", movedKeys);
    },

    // 右侧列表数据 总全选checkbox
    listAllBoxChange(val) {
      if (val) {
        this.listCheckKey = this.rightList.map((item) => item[this.nodeKey]);
      } else {
        this.listCheckKey = [];
      }
    },

    // 右侧列表全选状态更新
    updateListAllChecked() {
      const keys = this.rightList.map((item) => item[this.nodeKey]);
      this.listCheckAll =
        keys.length > 0 &&
        keys.every((item) => this.listCheckKey.indexOf(item) > -1);
    },

    // 右侧列表选中的数据回穿
    listToTree() {
      //树选中节点和列表选中节点的并集,筛选出移动的key
      const movedKeys = [...new Set(this.treeCheckKeys)].filter((item) =>
        new Set(this.listCheckKey).has(item)
      );
      this.rightList = this.listCheckAll
        ? []
        : this.rightList.filter(
            (item) => !this.listCheckKey.includes(item[this.nodeKey]) && item
          );
      let chooseId = this.rightList.map((item) => item[this.nodeKey]);
      this.chooseDisable(chooseId, this.treeFromData);
      if (this.rightList.length == 0) {
        this.treeIndeterminate = false;
        this.treeCheckAll = false;
      }
      // 树选中节点和列表选中节点的差集,筛选出剩余的key
      this.treeCheckKeys = [...new Set(this.treeCheckKeys)].filter(
        (item) => !new Set(this.listCheckKey).has(item)
      );
      this.listCheckKey = [];
      // 处理完毕取消选中
      this.setChecked(chooseId);
      this.$emit("change", this.treeCheckKeys, "left", movedKeys);
    },

    //获取树所有节点key和数量,处理原始数据
    setTreeMsg(arr) {
      for (const item of arr) {
        this.treeLength++;
        this.treeKeys.push(item[this.nodeKey]);
        if (item.children) {
          this.setTreeMsg(item.children);
        }
      }
    },

    // 设置选中数据
    setChecked(leftKeys = []) {
      this.$refs["from-tree"].setCheckedKeys(leftKeys);
    },

    //根据key找节点
    findItem(arr) {
      for (const item of arr) {
        if (this.defaultCheckedKeys.includes(item[this.nodeKey])) {
          this.rightList.push(item);
        }
        if (item.children) {
          this.findItem(item.children);
        }
      }
    },

    //找出子节点的key
    findChildKey(arr, result = []) {
      for (const item of arr) {
        if (item.children.length == 0) {
          result.push(item[this.nodeKey]);
        }
        if (item.children) {
          this.findChildKey(item.children, result);
        }
      }
      return result;
    },

    //使移动到右边的数据在左侧树下不可编辑
    chooseDisable(value, arr) {
      for (const item of arr) {
        let choose = value.includes(item[this.nodeKey]);
        if (choose) {
          this.$set(item, "disabled", true);
        } else {
          this.$set(item, "disabled", false);
        }
        if (this.isRadio && !this.fatherChoose && item.children.length > 0) {
          this.$set(item, "disabled", true);
        }
        if (item.children) {
          this.chooseDisable(value, item.children);
        }
      }
    },

    //单选模式禁用左边的树选项
    setDisable(arr) {
      for (const item of arr) {
        this.$set(item, "disabled", true);
        if (item.children) {
          this.setDisable(item.children);
        }
      }
    },

    // 获取左侧树选择信息
    getTreeChecked() {
      let leftKeys = this.$refs["from-tree"].getCheckedKeys();
      let leftHarfKeys = this.$refs["from-tree"].getHalfCheckedKeys();
      let leftNodes = this.$refs["from-tree"].getCheckedNodes();
      let leftHalfNodes = this.$refs["from-tree"].getHalfCheckedNodes();
      return {
        leftKeys,
        leftHarfKeys,
        leftNodes,
        leftHalfNodes,
      };
    },

    // 清除搜索条件
    clearQuery(type = "all") {
      switch (type) {
        case "all":
          this.filterTree = "";
          this.filterList = "";
          break;
        case "left":
          this.filterTree = "";
          break;
        case "right":
          this.filterList = "";
          break;
      }
    },
  },
};
</script>

<style>
.transfer-box {
  position: relative;
  overflow: hidden;
}

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
  text-align: center;
  vertical-align: center;
}

.right-list-center {
  height: 100%;
}

.transfer-title {
  display: grid;
  grid-template-columns: 25px auto 50px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  color: #333;
  font-size: 16px;
  background-color: #f5f7fa;
  margin-top: 0;
}

.title-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.total {
  text-align: right;
  color: #909399;
  font-size: 12px;
}

.el-transfer-panel__item {
  padding-left: 6px;
}

.filter-input .el-input__inner {
  margin-bottom: 10px;
  height: 32px;
  width: 100%;
  font-size: 12px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 16px;
}

.el-input__icon {
  height: 32px;
}

.el-icon--left {
  margin-right: 0;
}

.el-icon--right {
  margin-left: 0;
}

.slot-footer {
  height: 40px;
  background: #fff;
  margin: 0;
  padding: 0;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
