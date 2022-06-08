<template>
  <div id="app">
    <tree-transfer ref="treeTransfer" :data-source.sync="dataSource" :defaultCheckedKeys="defaultValue"
      @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange"
      :isRadio="false" :filterable="true" :father-choose="false">
    </tree-transfer>
  </div>
</template>

<script>
import treeTransfer from "./components/tree-transfer.vue"
const tree = [
  {
    label: "A部门",
    id: "1",
    children: [
      {
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
    children: [
      {
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
      defaultValue: [],

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
};
</script>

<style>
#app {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
