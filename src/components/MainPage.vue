<script setup lang="ts">
import { reactive, ref, unref } from "vue";

import GarrasionModal from "./GarrasionModal.vue";
import AlchemyModal from "./AlchemyModal.vue";
import Panel from "./Panel.vue";
import { GlobalModel } from "../models/GlobalModel";
import { SystemEngine } from "../models/SystemEngine";
import { BuildingBase } from "../models/Buildings/BuildingBase";

const { msgList } = SystemEngine;
const showXinFaSelector = () => {
  // 选择
};

const model = SystemEngine.start();
const pageModel = reactive<GlobalModel>(model);
const garrsionModal = ref<any>(null);
const setBuildignGarrsion = (building: BuildingBase) => {
  if (unref(garrsionModal)) unref(garrsionModal).show(building, pageModel);
};
const setGarrasion = (key: string) => {
  console.log(key);
};

const alchemyModal = ref<any>(null);
const showAlchemyModal = () => {
  unref(alchemyModal)?.show(pageModel.sect);
};
</script>
<template>
  <el-row :gutter="8">
    <el-col :span="6">
      <Panel>
        <template #title><span>设置</span></template>
        <template #body>
          <div>
            <label for="autoTuPo">自动突破：</label
            ><input
              id="autoTuPo"
              type="checkbox"
              v-model="SystemEngine.autoTuPo"
            />
          </div>

          <div>时间：{{ SystemEngine.dateTime }}</div>
          <template v-if="pageModel.sect.BuffList.length > 0">
            <div>BUff：</div>
            <div v-for="x in pageModel.sect.BuffList">
              <el-tooltip class="box-item" effect="dark" placement="top">
                <template #content>
                  <small>过期时间：{{ x.expired }}</small>
                </template>
                {{ x.Name }}
              </el-tooltip>
            </div>
          </template>

          <div class="message-box margin-top-12">
            <div v-for="(msg, index) in msgList" :key="index">
              {{ msg }}
            </div>
          </div>
        </template>
      </Panel>

      <Panel>
        <template #title>物品</template>
        <template #body>
          <div v-for="x in pageModel.sect.items" :key="x.itemId">
            {{ x.Item.Name }}: {{ x.count
            }}<span v-if="x.itemId === 1">
              <el-tooltip class="box-item" effect="dark" placement="top">
                <template #content>
                  <p>{{ pageModel.lingKuang.name }}产出：{{ pageModel.lingKuang.ValueOfProduction }}</p>
                  <p>
                    {{ pageModel.lianGongFang.name }}消耗：{{ pageModel.lianGongFang.ValueOfConsumption }}
                  </p>
                  <p>
                    {{ pageModel.biGuanShi.name }}消耗：{{ pageModel.biGuanShi.ValueOfConsumption }}
                  </p>
                  <p>{{ pageModel.yaoYuan.name }}消耗：{{ pageModel.yaoYuan.ValueOfConsumption }}</p>
                </template>
                <span>
                  （<span v-if="pageModel.IncomeOfLingShi > 0">+</span>
                  {{ pageModel.IncomeOfLingShi }}）
                </span>
              </el-tooltip></span
            >
          </div>
        </template>
      </Panel>
    </el-col>

    <el-col :span="14" style="max-height: 660px; overflow-y: auto">
      <Panel>
        <template #title
          >弟子({{ pageModel.sect.discipleList.length }}名)
          <a class="btn-control-small" @click="pageModel.addNewDisciple()"
            >收徒</a
          >
        </template>
        <template #body>
          <div style="display: block; overflow: hidden; white-space: nowrap">
            <Panel
              v-for="p in pageModel.sect.discipleList"
              :key="p.key"
              style="width: calc(33.33% - 2px); float: left; height: 440px"
            >
              <template #title
                >{{ p.name
                }}<span v-if="pageModel.zhangMengKey === p.key"> - 掌门</span>
                <a v-else @click="pageModel.dismiss(p)"> 逐出</a>
                <a @click="p.resetTalent(pageModel.sect)"> 洗筋伐髓</a>
              </template>
              <template #body>
                <div
                  :title="(p.IsWeakness || p.Soul) ? (p.IsWeakness ? p.weaknessBefore! : p.dyingBefore!).toString() : ''"
                >
                  状态：{{ p.StatusName }}
                  <a v-if="p.Soul" @click="pageModel.revive(p)"
                    >使用{{ p.ReviveMedicine }}</a
                  >
                  <span>{{ p.BuffDisplay }}</span>
                </div>
                <div>境界: {{ p.LevelName }}</div>
                <div>战斗力: {{ p.getScore() }}</div>
                <div>
                  <a
                    v-if="pageModel.sect.hasItem(p.ExpPotion.id)"
                    @click="
                      p.useMedicine(pageModel.sect.findItem(p.ExpPotion.id)!)
                    "
                  >
                    修为: {{ p.exp }} / {{ p.getLevelUpCost() }}
                  </a>
                  <template v-else>
                    修为: {{ p.exp }} / {{ p.getLevelUpCost() }}
                  </template>
                  <el-tooltip class="box-item" effect="dark" placement="top">
                    <template #content>
                      <p>
                        练功房：{{
                          p.getIncomeExpByLianGongFang(pageModel.lianGongFang)
                        }}
                      </p>
                      <p v-if="p.IsBiGuang">
                        闭关室：{{
                          p.getIncomeExpByBiGuan(pageModel.biGuanShi)
                        }}
                      </p>
                    </template>
                    <span>
                      （+{{
                        p.getIncomeExpTotal(
                          pageModel.lianGongFang,
                          pageModel.biGuanShi
                        )
                      }}）
                    </span>
                  </el-tooltip>

                  <a
                    class="btn-control-small"
                    v-if="p.CanLevelUp"
                    @click="p.levelUp()"
                    >突破</a
                  >
                  <a
                    v-if="
                      p.CanLevelUp && pageModel.sect.hasItem(p.TuPoPotion.id)
                    "
                    @click="
                      p.useMedicine(pageModel.sect.findItem(p.TuPoPotion.id)!)
                    "
                    >使用{{ p.TuPoPotion.Name }}进行突破</a
                  >
                </div>
                <div>突破成功率: {{ p.TuPoSuccessRate }}%</div>
                <div>金灵根: {{ p.jinLingGen.quality }}</div>
                <div>木灵根: {{ p.muLingGen.quality }}</div>
                <div>水灵根: {{ p.shuiLingGen.quality }}</div>
                <div>火灵根: {{ p.huoLingGen.quality }}</div>
                <div>土灵根: {{ p.tuLingGen.quality }}</div>
                <div>魅力: {{ p.meiLi.quality }}</div>
                <div>悟性: {{ p.wuxing.quality }}</div>
                <div>根骨: {{ p.gengGu.quality }}</div>
                <div>天赋总分: {{ p.TalentTotal }}({{ p.TalentLevel }})</div>
                <div>
                  心法：{{ p.xinFa?.name }}
                  <a class="btn-control" @click="showXinFaSelector">设置</a>
                </div>
                <div v-if="p.garrisonBuilding">
                  已驻守 {{ p.garrisonBuilding!.name }}
                </div>
              </template>
            </Panel>
          </div>
        </template>
      </Panel>
    </el-col>

    <el-col :span="4" class="text-left">
      <Panel>
        <template #title>建筑</template>
        <template #body>
          <div>
            <a @click="setBuildignGarrsion(pageModel.cangJingGe)">{{
              pageModel.cangJingGe.name
            }}</a>
            <a @click="pageModel.cangJingGe.toggle()">{{
              pageModel.cangJingGe.isOpened ? "关闭" : "开启"
            }}</a>
            <div>
              等级{{ pageModel.cangJingGe.level }}
              <div>
                <a
                  class="btn-control-small"
                  @click="pageModel.cangJingGe.levelUp()"
                  >升级（花费{{ pageModel.cangJingGe.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
          <hr />
          <div>
            <a @click="setBuildignGarrsion(pageModel.lingKuang)">
              {{ pageModel.lingKuang.name }}</a
            >
            <a @click="pageModel.lingKuang.toggle()">{{
              pageModel.lingKuang.isOpened ? "关闭" : "开启"
            }}</a>
            <div>
              等级{{ pageModel.lingKuang.level }}
              <div v-if="pageModel.lingKuang.CanLevelUp">
                <a
                  class="btn-control-small"
                  @click="pageModel.lingKuang.levelUp()"
                  >升级（花费{{ pageModel.lingKuang.getLevelUpCost() }}）</a
                >
              </div>
              <div class="tips-cost">
                （基础效果：+{{ pageModel.lingKuang.ValueOfProduction }}）
              </div>
            </div>
          </div>
          <hr />
          <div>
            <a @click="setBuildignGarrsion(pageModel.yaoYuan)">{{
              pageModel.yaoYuan.name
            }}</a>
            <a @click="pageModel.yaoYuan.toggle()">{{
              pageModel.yaoYuan.isOpened ? "关闭" : "开启"
            }}</a>
            <div>
              等级{{ pageModel.yaoYuan.level }}
              <div v-if="pageModel.yaoYuan.CanLevelUp">
                <a
                  class="btn-control-small"
                  
                  @click="pageModel.yaoYuan.levelUp()"
                  >升级（花费{{ pageModel.yaoYuan.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
          <hr />
          <div>
            <a @click="showAlchemyModal">{{ pageModel.lianDanLu.name }}</a>
            <div>
              等级{{ pageModel.lianDanLu.level }}
              <div v-if="pageModel.lianDanLu.CanLevelUp">
                <a
                  class="btn-control-small"
                  @click="pageModel.lianDanLu.levelUp()"
                  >升级（花费{{ pageModel.lianDanLu.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
          <hr />
          <div>
            <a @click="setBuildignGarrsion(pageModel.biGuanShi)">{{
              pageModel.biGuanShi.name
            }}</a>
            <a @click="pageModel.biGuanShi.toggle()">{{
              pageModel.biGuanShi.isOpened ? "关闭" : "开启"
            }}</a>
            <div>
              等级{{ pageModel.biGuanShi.level }}
              <div v-if="pageModel.biGuanShi.CanLevelUp">
                <a
                  class="btn-control-small"
                  @click="pageModel.biGuanShi.levelUp()"
                  >升级（花费{{ pageModel.biGuanShi.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
          <hr />
          <div>
            {{ pageModel.lianGongFang.name }}
            <a @click="pageModel.lianGongFang.toggle()">{{
              pageModel.lianGongFang.isOpened ? "关闭" : "开启"
            }}</a>
            <div>
              等级{{ pageModel.lianGongFang.level }}
              <div v-if="pageModel.lianGongFang.CanLevelUp">
                <a
                  class="btn-control-small"
                  @click="pageModel.lianGongFang.levelUp()"
                  >升级（花费{{ pageModel.lianGongFang.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
          <hr />
          <div>
            {{ pageModel.lianQiShi.name }}
            <div>
              等级{{ pageModel.lianQiShi.level }}
              <div v-if="pageModel.lianQiShi.CanLevelUp">
                <a
                  class="btn-control-small"
                  @click="pageModel.lianQiShi.levelUp()"
                  >升级（花费{{ pageModel.lianQiShi.getLevelUpCost() }}）</a
                >
              </div>
            </div>
          </div>
        </template>
      </Panel>
    </el-col>

    <GarrasionModal
      ref="garrsionModal"
      :disciple-list="pageModel.sect.discipleList"
      @submit="setGarrasion"
    ></GarrasionModal>

    <AlchemyModal ref="alchemyModal"> </AlchemyModal>
  </el-row>
</template>

<style scoped>
a {
  cursor: pointer;
  margin: 0px 6px;
}

.btn-control-small {
  cursor: pointer;
  font-size: 0.75rem;
}

.message-box {
  max-height: 240px;
  overflow-y: auto;
  text-align: left;
}

.text-left {
  text-align: left;
}

.tips-cost {
  font-size: 0.75rem;
}
</style>
