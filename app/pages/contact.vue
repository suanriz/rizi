<script lang="ts" setup>
import { useSeoMeta, definePageMeta } from '#imports'
import { ref } from 'vue'

import type { EmailType } from '@/types'
import { CONTACT_OPTIONS, EMAIL_TYPE } from '@/utils/constants'
import { sendEmail } from '@/utils/tool'

const formRef = ref<HTMLFormElement | null>(null)
const initData = {
  cause: '',
  name: '',
  email: '',
  subject: '',
  content: '',
}
const formData = ref<EmailType>({ ...initData })

const resetFormData = () => formData.value = { ...initData }

const handleSendEmail = () => {
  if (!formRef.value?.checkValidity()) return
  sendEmail(EMAIL_TYPE.Contact, { ...formData.value }, resetFormData)
}

useSeoMeta({
  title: '聯絡我們',
  description: '好日子咖啡輕食聯絡方式，歡迎諮詢客服專區、異業合作或加盟資訊。',
})
definePageMeta({ title: '聯絡我們' })
</script>

<template>
  <section class="contentWrap flex flex-col items-center">
    <Divider title="聯絡我們" />
    <div class="contactWrap max-w-[800px] w-full">
      <form
        ref="formRef"
        action=""
        method="get"
        class="space-y-[22px]"
        @submit.prevent="handleSendEmail"
      >
        <div class="contact-item contactFull:!w-[50%] contactFull:pr-[4%]">
          <label for="cause" class="contact-label">聯絡事項</label>
          <select
            id="cause"
            v-model="formData.cause"
            class="flex-1 h-[30px] bg-[var(--mainWhite)] border border-[var(--deepGray)] min-w-[143.78px] text-[13.33px] font-[400] text-[var(--mainTxt)]"
            name="input_cause"
            required
          >
            <option
              v-for="option in CONTACT_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="flex flex-wrap w-full contactFull:flex-nowrap">
          <div class="contact-item contactFull:!w-[50%] contactFull:!flex-nowrap">
            <label for="name" class="contact-label">姓名</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              name="input_name"
              required
              class="contact-input contactFull:mr-[8%]"
            >
          </div>
          <div class="contact-item mt-[22px] contactFull:mt-0 contactFull:!w-[50%] contactFull:!flex-nowrap">
            <label for="email" class="contact-label">信箱</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              name="input_email"
              class="contact-input"
              required
            >
          </div>
        </div>
        <div class="contact-item">
          <label for="subject" class="contact-label">主旨</label>
          <input
            id="subject"
            v-model="formData.subject"
            type="text"
            name="input_subject"
            class="contact-input"
            required
          >
        </div>
        <div class="contact-item">
          <label for="content" class="contact-label">內容</label>
          <textarea
            id="content"
            v-model="formData.content"
            class="flex-1 h-[130px] resize-none border border-[var(--deepGray)] min-w-[143.78px] px-[4px] text-[13.33px]"
            name=""
            cols="80"
            rows="10"
            required
          />
        </div>
        <div
          class="flex justify-end"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-easing="ease-in-sine"
        >
          <button type="submit">
            送出信件
          </button>
        </div>
      </form>
    </div>
    <p class="text-[var(--mainTxt)] text-[16px] font-[300] tracking-[.08em] mt-[30px] flex items-center">
      <img
        src="/img/icon/mail.webp"
        alt="信箱"
        class="mr-[8px] aspect-square w-[24px]"
      >
      真的會收到信件哦！
    </p>
  </section>
</template>

<style>
.contact-item {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  text-align: right;
}

@media (max-width: 258px) {
  .contact-item {
    text-align: left;
  }
}

.contact-label {
  color: var(--mainTxt);
  font-size: 16px;
  font-weight: 300;
  margin-right: 25px;
  width: 64px;
  line-height: 30px;
}

.contact-input {
  flex: 1;
  border: 1px solid var(--deepGray);
  height: 30px;
  min-width: 143.78px;
  font-size: 13.33px;
  padding: 0 4px;
}
</style>
