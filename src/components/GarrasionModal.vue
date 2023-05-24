<template>
  <el-dialog v-model="visible" :title="model.building?.name">
    <el-select v-model="selectedDiscisple">
      <el-option
        v-for="x in props.discipleList"
        :key="x.key"
        :value="x.key"
        :label="x.name"
      >
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="submit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Build } from "../models/Buildings/Build";
import { BuildingBase } from "../models/Buildings/BuildingBase";
import { Disciple } from "../models/Disciple";
import { GlobalModel } from "../models/GlobalModel";

const visible = ref(false);
const selectedDiscisple = ref<string | null>(null);
const model = reactive<{ building: BuildingBase | null }>({ building: null });
const show = (building: BuildingBase, sect: GlobalModel) => {
  visible.value = true;
  model.building = building;
  selectedDiscisple.value =
    sect.sect.discipleList.find(
      (x) => x.garrisonBuilding?.name === building.name
    )?.key ?? null;
};
const hide = () => {
  visible.value = false;
  model.building = null;
};

const props = defineProps({
  discipleList: {
    default: (): Disciple[] => [],
  },
});

const submitEmits = defineEmits(["submit"]);
const submit = () => {
  const disciple = props.discipleList.find(
    (x) => x.key === selectedDiscisple.value
  )!;
  if (disciple) {
    disciple.setGarrison(new Build({name: model.building?.name}));
    submitEmits("submit", selectedDiscisple.value);
  }

  hide();
};

defineExpose({
  show,
  hide,
});
</script>
