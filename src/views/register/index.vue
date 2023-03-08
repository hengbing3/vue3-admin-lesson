<template>
  <div class="register">
    <el-card class="register-card">
      <h1 class="register-title">注册用户</h1>
      <el-form ref="registerFormRef" :model="form" :rules="registerFormRules" label-width="100px" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="form.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model.trim="form.checkPassword" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model.trim="form.idCard" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.trim="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model.trim="form.email" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="form.department" placeholder="请选择部门">
            <el-option label="计算机科学与工程学院" value="1" />
            <el-option label="自动化学院" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="学生" value="2" />
            <el-option label="教师" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { type IFormData } from "@/api/register/types/register"
import { type FormInstance, FormRules } from "element-plus"
import { ElForm, ElInput, ElSelect, ElOption, ElButton, ElFormItem, ElMessage, ElMessageBox } from "element-plus"
import { registerUserDataApi } from "@/api/register"

const registerFormRef = ref<FormInstance | null>(null)
const router = useRouter()
const form = reactive<IFormData>({
  userName: "",
  password: "",
  checkPassword: "",
  idCard: "",
  phone: "",
  email: "",
  department: null,
  role: null
})
const registerFormRules: FormRules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "密码长度为6到16位", trigger: "blur" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/,
      message: "密码强度不符合要求（要求包含大写字母，小写字母，以及数字）"
    }
  ],
  checkPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error("两次输入的密码不一致"))
        } else {
          callback()
        }
      },
      trigger: "blur"
    }
  ],
  idCard: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    {
      pattern: /^\d{17}(\d|[xX])$/,
      message: "身份证号码格式不正确",
      trigger: "blur"
    }
  ],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号码格式不正确",
      trigger: "blur"
    }
  ],
  department: [{ required: true, message: "请选择部门", trigger: "change" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }]
}
const submitForm = () => {
  registerFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      registerUserDataApi({
        userName: form.userName,
        password: form.password,
        checkPassword: form.checkPassword,
        idCard: form.idCard,
        phone: form.phone,
        email: form.email,
        department: form.department,
        role: form.role
      })
        .then((res) => {
          console.log(res)
          ElMessageBox.alert("你的账号为：" + res.data.loginName, {
            confirmButtonText: "确定",
            callback: () => {
              router.push({ path: "/login" })
            }
          })
        })
        .catch((err) => {
          ElMessage.error(err.message)
        })
    } else {
      return false
    }
  })
}

function goBack() {
  router.go(-1)
}
</script>

<style lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 600px;
}

.register-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
