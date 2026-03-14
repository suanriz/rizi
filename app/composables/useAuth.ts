export const useAuth = () => {
  const user = useState<any>('auth_user', () => null)
  const showLoginModal = useState<boolean>('showLoginModal', () => false)
  const isAuthenticated = computed(() => !!user.value)

  // 取得當前登入用戶資訊
  const fetchUser = async () => {
    // TODO: 串接 API
    // try {
    //   const data = await $fetch('/api/me')
    //   user.value = data
    // } catch {
    //   user.value = null
    // }
  }

  // 登入
  const login = async (credentials: any) => {
    // 模擬登入
    if (credentials.email === '123' && credentials.password === '123') {
      user.value = {
        id: 1,
        name: '測試管理員',
        email: '123@example.com',
        avatar: '/img/logoFooter.webp'
      }
      return { message: '模擬登入成功' }
    }

    const response = await $fetch('/api/login', {
      method: 'POST',
      body: credentials
    })
    // 登入成功後重新獲取用戶資料，確保狀態同步
    await fetchUser()
    return response
  }

  // 註冊
  const register = async (data: any) => {
    // 測試用模擬邏輯
    if (data.email === '123') {
      user.value = {
        id: 1,
        name: data.name || '測試人員',
        email: data.email,
        avatar: '/img/logoFooter.webp'
      }
      return { message: '模擬註冊成功' }
    }

    const response = await $fetch('/api/register', {
      method: 'POST',
      body: data
    })
    // 註冊成功後通常我們會直接幫使用者登入，或者重新 fetch
    await fetchUser()
    return response
  }

  // 登出
  const logout = async () => {
    try {
      // await $fetch('/api/logout', { method: 'POST' })
    } finally {
      // 無論後端登出成功與否，前端都清除狀態
      user.value = null
      navigateTo('/')
    }
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    login,
    register,
    logout,
    showLoginModal
  }
}
