<template>
  <div class="register">
    <el-form ref="registerFormRef" :model="form" :rules="registerFormRules" label-width="100px" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="form.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model.trim="form.confirmPassword" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="idcard">
        <el-input v-model.trim="form.idcard" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.trim="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model.trim="form.email" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="form.department" placeholder="请选择部门">
          <el-option label="计算机科学与工程学院" value="计算机科学与工程学院" />
          <el-option label="自动化学院" value="自动化学院" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option label="学生" value="学生" />
          <el-option label="教师" value="教师" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { type IFormData } from "@/api/register/types/register"
import { type FormInstance, FormRules } from "element-plus"
import { ElForm, ElInput, ElSelect, ElOption, ElButton, ElFormItem, ElMessage } from "element-plus"
import { registerUserDataApi } from "@/api/register"

const registerFormRef = ref<FormInstance | null>(null)
const router = useRouter()
const form = reactive<IFormData>({
  username: "",
  password: "",
  confirmPassword: "",
  idcard: "",
  phone: "",
  email: "",
  department: "",
  role: ""
})
const registerFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度为6到20位", trigger: "blur" }
  ],
  confirmPassword: [
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
  idcard: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    {
      pattern: /^[1-9]\d{5}(19|20)\d{2}(0\d|1[0-2])([0-2]\d|3[0-1])\d{3}[0-9Xx]$/,
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
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        idcard: form.idcard,
        phone: form.phone,
        email: form.email,
        department: form.department,
        role: form.role
      })
        .then(() => {
          router.push({ path: "/" })
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
