import emailjs from '@emailjs/browser'
import { message } from 'ant-design-vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getSrc, getSrcSet, sendEmail } from '@/utils/tool'

vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    app: {
      baseURL: '/'
    },
    public: {
      emailServiceId: 'service_test',
      emailPublicKey: 'key_test'
    }
  })
}))

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}))

vi.mock('ant-design-vue', () => ({
  message: {
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('tool.ts utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSrc', () => {
    it('should return correct pc source with domain ', () => {
      const result = getSrc('img/test', 'pc')
      expect(result).toBe('/img/test-pc.webp')
    })

    it('should return correct phone source without domain', () => {
      const result = getSrc('img/test', 'phone', false)
      expect(result).toBe('img/test-phone.webp')
    })

    it('should return source without domain when domain is false', () => {
      const result = getSrc('img/test', 'pc', false)
      expect(result).toBe('img/test-pc.webp')
    })
  })

  describe('getSrcSet', () => {
    it('should return correct srcset string', () => {
      const result = getSrcSet('img/test', [600, 1200])
      expect(result).toBe('/img/test-phone.webp 600w, /img/test-pc.webp 1200w')
    })
  })

  describe('sendEmail', () => {
    it('should call emailjs.send and handle success with callback', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
      const callback = vi.fn()
      await sendEmail('test', {}, callback)
      expect(emailjs.send).toHaveBeenCalled()
      expect(callback).toHaveBeenCalled()
      expect(message.success).toHaveBeenCalledWith({
        content: '郵件發送成功！',
        key: 'sendMailAlertKey',
      })
    })

    it('should call emailjs.send and handle success without callback', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
      await sendEmail('test', {})
      expect(emailjs.send).toHaveBeenCalled()
      expect(message.success).toHaveBeenCalledWith({
        content: '郵件發送成功！',
        key: 'sendMailAlertKey',
      })
    })

    it('should handle failure', async () => {
      vi.mocked(emailjs.send).mockRejectedValueOnce({ status: 500, text: 'error' })
      await sendEmail('test', {}, () => { })
      expect(message.error).toHaveBeenCalledWith({
        content: '發送失敗: error',
        key: 'sendMailAlertKey',
      })
    })

    it('should show specific message when recipient email is invalid 422', async () => {
      vi.mocked(emailjs.send).mockRejectedValueOnce({ status: 422, text: 'The recipients address is corrupted' })
      const callback = vi.fn()
      await sendEmail('contact', { to_email: 'invalid-email' }, callback)
      expect(message.error).toHaveBeenCalledWith({
        content: '發送失敗: 您輸入的信箱不存在',
        key: 'sendMailAlertKey',
      })
    })

    it('should show loading without messageDOM', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
      const spy = vi.spyOn(document, 'querySelector').mockReturnValue(null)
      await sendEmail('test', {}, () => { })
      expect(message.loading).toHaveBeenCalledTimes(2)
      spy.mockRestore()
    })

    it('should show loading with messageDOM', async () => {
      vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
      const mockElement = { length: 1 }
      const spy = vi.spyOn(document, 'querySelector').mockReturnValue(mockElement as any)
      await sendEmail('test', {}, () => { })
      expect(message.loading).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })
})
