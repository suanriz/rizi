import emailjs from '@emailjs/browser'
import { message } from 'ant-design-vue'

export const sendEmail = async (templateKey: string, formData: any, callback?: () => void) => {
  const key = 'sendMailAlertKey'
  const messageDOM = document.querySelector('.ant-message-notice') as NodeListOf<HTMLElement> | null
  if (!messageDOM || messageDOM?.length === 0) message.loading({ content: '正在發送郵件...' })
  message.loading({ content: '正在發送郵件...', key })
  const config = useRuntimeConfig()
  await emailjs.send(config.public.emailServiceId, `template_${templateKey}`, formData, { publicKey: config.public.emailPublicKey })
    .then(() => {
      if (callback) callback()
      message.success({ content: '郵件發送成功！', key })
    })
    .catch((error) => {
      message.error({ content: `發送失敗: ${error.status === 422 ? '您輸入的信箱不存在' : error.text}`, key })
    })
}

export const getSrc = (
  url: string,
  size: 'phone' | 'pc' = 'pc',
  domain = true
) => {
  const { app: { baseURL } } = useRuntimeConfig()
  return domain ? `${baseURL}${url}-${size}.webp` : `${url}-${size}.webp`
}

export const getSrcSet = (url: string, widths: [number, number]) => {
  const [phoneWidth, pcWidth] = widths
  const phone = getSrc(url, 'phone')
  const pc = getSrc(url, 'pc')
  return `${phone} ${phoneWidth}w, ${pc} ${pcWidth}w`
}
