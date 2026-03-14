<script lang="ts" setup>
import { navigateTo } from '#imports'
import { ref, reactive } from 'vue'
import type { UnwrapRef } from 'vue'

import { GoogleOutlined } from '@ant-design/icons-vue'

import { useAuth } from '@/composables/useAuth'
import type { LoginModelType } from '@/types'

const isOpen = defineModel<boolean>({ required: true })
const segmentedOptions = ['登入', '註冊']
const formData: UnwrapRef<LoginModelType> = reactive({
  email: '123',
  password: '123',
  passwordConfirm: '123',
  name: '測試人員',
})

const activeTab = ref('登入')
const { login, register } = useAuth()
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    if (activeTab.value === '登入') {
      await login({
        email: formData.email,
        password: formData.password
      })
    } else {
      await register(formData)
    }
    isOpen.value = false
    navigateTo('/user')
  } catch {
    // TODO: 錯誤處理
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <a-modal
    v-model:open="isOpen"
    :closable="false"
    label-align="left"
    :width="400"
  >
    <a-segmented v-model:value="activeTab" block :options="segmentedOptions" />
    <a-form
      ref="formRef"
      :model="formData"
      hide-required-mark
      label-align="left"
      :label-col="{ style: { width: '80px' } }"
      class="w-full flex flex-col items-center !mt-[20px]"
    >
      <a-form-item
        label="信箱"
        name="email"
        :rules="[
          { required: true, message: '請輸入信箱' },
          { type: 'email', message: '輸入信箱有誤' }
        ]"
      >
        <a-input v-model:value="formData.email" />
      </a-form-item>
      <a-form-item
        label="密碼"
        name="password"
        :rules="[
          { required: true, message: '請輸入密碼' },
        ]"
      >
        <a-input v-model:value="formData.password" type="password" />
      </a-form-item>
      <a-form-item
        v-if="activeTab === '註冊'"
        label="確認密碼"
        name="passwordConfirm"
        :rules="[
          { required: true, message: '請確認密碼' },
          {
            validator: async (_rule: any, value: string) => {
              if (value && formData.password !== value) {
                throw new Error('兩次輸入的密碼不一致');
              }
            },
          },
        ]"
      >
        <a-input v-model:value="formData.passwordConfirm" type="password" />
      </a-form-item>
      <a-form-item
        v-if="activeTab === '註冊'"
        label="姓名"
        name="name"
        :rules="[
          { required: true, message: '請輸入姓名' },
        ]"
      >
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-button
        type="primary"
        class="w-full mt-[20px]"
        :loading="loading"
        @click="handleLogin"
      >
        {{ activeTab }}
      </a-button>
    </a-form>
    <a-divider>or</a-divider>
    <a-button class="w-full !flex items-center justify-center">
      <GoogleOutlined class="text-[18px]" /> 使用 Google 帳號登入
    </a-button>
    <template #footer />
  </a-modal>
</template>

<style scoped>
.ant-modal .ant-modal-footer {
  display:none !important;
}
</style>
