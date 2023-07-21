<script setup lang="ts">
import { getPatientList, addPatient, editPatient, delPatient } from "@/api/user";
import type { PatientList, Patient } from '@/types/user'
import { onMounted, ref, watch, computed } from 'vue'
import cpNavBar from "@/components/cp-nav-bar.vue";
import IDValidator from "id-validator";
import { idCardRules } from '@/utils/rules'
import { showToast, showSuccessToast, showConfirmDialog } from "vant";
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const route = useRoute()
const isChange = computed(() => route.query.isChange === '1')
//验证身份证
const ValidatorId = new IDValidator();

const form = ref()
const list = ref([] as PatientList)
//遮罩层
const show = ref(false)
//添加打开遮罩层
const showAddDialog = () => {
    form.value?.resetValidation()
    Flagdefault.value = false
    patient.value = { ...defaultPatient }
    show.value = true
}
//编辑打开遮罩层
const showEditDialog = (item: Patient) => {
    console.log(item)
    form.value?.resetValidation()
    Flagdefault.value = false
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
    show.value = true
}

//获取列表信息
const loadList = async () => {
    const res = await getPatientList()
    list.value = res.data
    // 设置默认选中的ID，当你是选择患者的时候，且有患者信息的时候
    if (isChange.value && list.value.length) {
        const defPatient = list.value.find((item) => item.defaultFlag === 1)
        if (defPatient) patientId.value = defPatient.id
        else patientId.value = list.value[0].id
    }
}
//选择框数据
const RadioOption = [
    { label: '男', value: 1 },
    { label: '女', value: 0 }
]
//准备提交的患者信息
const defaultPatient: Patient = {
    name: '',
    idCard: '',
    gender: 1,
    defaultFlag: 0
}
const patient = ref<Patient>({ ...defaultPatient })
//默认患者默认值
const Flagdefault = ref(false)
watch(Flagdefault, (newval) => {
    newval ? patient.value.defaultFlag = 1 : patient.value.defaultFlag = 0
})
//保存患者按钮
const addPatientBtn = async () => {
    await form.value.validate()
    const { sex } = ValidatorId.getInfo(patient.value.idCard)
    console.log(sex)
    if (patient.value.gender !== sex) {
        showToast('身份证与性别不匹配！')
        return
    }
    patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
    show.value = false
    loadList()
    showSuccessToast(patient.value.id ? '编辑成功' : '添加成功')
}
//删除患者
const remove = async () => {
    if (patient.value.id) {
        await showConfirmDialog({
            title: '温馨提示',
            message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
        })
        await delPatient(patient.value.id)
        show.value = false
        loadList()
        showSuccessToast('删除成功')
    }
}
//点击选择效果
const patientId = ref<string>()
const selectedPatient = (item: Patient) => {
    if (isChange.value) {
        patientId.value = item.id
    }
}
//下一步
const next = async () => {
  if (!patientId.value) return showToast('请选就诊择患者')
  store.commit('consult/setPatient',patientId.value)
  router.push('/consult/pay')
}
onMounted(() => {
    loadList()
})
</script>

<template>
    <div class="patient-page">
        <cpNavBar :title="isChange ? '选择患者' : '家庭档案'"></cpNavBar>
        <!-- 头部提示 -->
        <div class="patient-change" v-if="isChange">
            <h3>请选择患者信息</h3>
            <p>以便医生给出更准确的治疗，信息仅医生可见</p>
        </div>
        <div class="patient-list">
            <div class="patient-item" v-for="item in list" :key="item.id" @click="selectedPatient(item)"
                :class="{ selected: patientId === item.id }">
                <div class="info">
                    <span class="name">{{ item.name }}</span>
                    <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1********\$2') }}</span>
                    <span>{{ item.genderValue }}</span>
                    <span>{{ `${item.age}岁` }}</span>
                </div>
                <div class="icon"><cp-icon name="user-edit" @click="showEditDialog(item)" /></div>
                <div class="tag" v-if="item.defaultFlag === 1">默认</div>
            </div>
            <div class="patient-add" @click="showAddDialog">
                <cp-icon name="user-add" />
                <p>添加患者</p>
            </div>
            <div class="patient-tip" v-if="list.length < 6">最多可添加 6 人</div>
        </div>
        <!-- 底部按钮 -->
        <div class="patient-next" v-if="isChange">
            <van-button type="primary" round block @click="next">下一步</van-button>
        </div>
    </div>

    <!-- 遮罩层 -->
    <van-popup v-model:show="show" position="bottom" style="height: 100%;">
        <cpNavBar :title="patient.id ? '编辑患者' : '添加患者'" :back="() => (show = false)" right-text="保存"
            @click-right="addPatientBtn"></cpNavBar>
        <div class="popMain">
            <van-form autocomplete="off" ref="form">
                <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名"
                    :rules="[{ required: true, message: '请输入姓名' }]" />
                <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" :rules=idCardRules />
                <van-field label="性别" class="pb4">
                    <!-- 单选按钮组件 -->
                    <template #input>
                        <cp-radio-btn :options="RadioOption" v-model="patient.gender"></cp-radio-btn>
                    </template>
                </van-field>
                <van-field label="默认就诊人">
                    <template #input>
                        <van-checkbox v-model="Flagdefault" :icon-size="18" round />
                    </template>
                </van-field>
            </van-form>
            <van-action-bar v-if="patient.id">
                <van-action-bar-button @click="remove">删除</van-action-bar-button>
            </van-action-bar>
        </div>
    </van-popup>
</template>

<style lang="scss" scoped>
.patient-page {
    padding: 46px 0 80px;
}

.patient-list {
    padding: 15px;
}

.patient-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;

    .info {
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        span {
            color: var(--cp-tip);
            margin-right: 20px;
            line-height: 30px;

            &.name {
                font-size: 16px;
                color: var(--cp-text1);
                width: 80px;
                margin-right: 0;
            }

            &.id {
                color: var(--cp-text2);
                width: 180px;
            }
        }
    }

    .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
    }

    .tag {
        position: absolute;
        right: 60px;
        top: 21px;
        width: 30px;
        height: 16px;
        font-size: 10px;
        color: #fff;
        background-color: var(--cp-primary);
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);

        .icon {
            color: var(--cp-primary);
        }
    }
}

.patient-add {
    background-color: var(--cp-bg);
    color: var(--cp-primary);
    text-align: center;
    padding: 15px 0;
    border-radius: 8px;

    .cp-icon {
        font-size: 24px;
    }
}

.patient-tip {
    color: var(--cp-tag);
    padding: 12px 0;
}

.pb4 {
    padding-bottom: 4px;
}

.popMain {
    padding-top: 46px;
}

.van-action-bar {
    padding: 0 10px;
    margin-bottom: 10px;

    .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
    }
}

.patient-change {
    padding: 15px;

    >h3 {
        font-weight: normal;
        margin-bottom: 5px;
    }

    >p {
        color: var(--cp-text3);
    }
}

.patient-next {
    padding: 15px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
}</style>