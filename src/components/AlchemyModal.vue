<template>
  <el-dialog v-model="visible" title="炼丹">
    <el-row>
      <el-col :span="8">
        <el-select v-model="drug">
          <el-option
            v-for="x in drugList"
            :key="x.id"
            :value="x.id"
            :label="x.name"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="4"
        ><el-input v-model="count" :max="maxCount"></el-input
      ></el-col>
    </el-row>
    <el-row> 需要消耗{{ costName }} {{ count * 50 }} 个 </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="submit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { ItemMap, getCost } from "../models/Constants/ItemMap";
import { Item } from "../models/Items/Item";
import { SectInfo } from "../models/SectInfo";

let bag: SectInfo;
const visible = ref(false);
const show = (sect: SectInfo) => {
  visible.value = true;
  bag = sect;
};
const hide = () => {
  visible.value = false;
};

const drug = ref(0);
const drugListItem: number[] = [
  16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
];
const drugList = reactive([
  ...drugListItem.map((x: number) => ({ id: x, name: ItemMap[x] })),
]);

const count = ref(0);
const maxCount = computed(() => {
  return (bag.items.find((x) => x.item.id === drug.value)?.count ?? 0) / 50;
});
const costId = computed(() => {
  return getCost(drug.value);
});
const costName = computed(() => {
  return ItemMap[costId.value];
});

const submitEmits = defineEmits(["submit"]);
const submit = () => {
  if (bag.removeItem(new Item({ id: costId.value }),  50 * count.value)) {
    bag.addItemFromItem(new Item({ id: drug.value}), +count.value );
    submitEmits("submit");
    hide();
  }
};

defineExpose({
  show,
  hide,
});
</script>
