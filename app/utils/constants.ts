import type {
  OptionType,
  NavInfoType,
  TabType,
  InfoDataType,
  ContactInfoType,
  StepDataType,
  MenuListType,
  ShopInfoType,
  SnsInfoType,
  StoreDetailType,
  GoodDetailType,
  MailType,
} from '@/types'

export const SITE_NAME = '好日子咖啡輕食 RIZI COFE HOUSE'

export const NAV_INFO: NavInfoType[] = [
  { label: '最新消息', link: '/news' },
  { label: '門市菜單', link: '/menu' },
  { label: '線上購物', link: '/store' },
  { label: '品牌精神', link: '/brand' },
  { label: '聯絡我們', link: '/contact' },
]

export const SHOP_INFO: InfoDataType[] = [
  {
    id: 1,
    name: '新庄店',
    tel: '07-3497E7',
    opening: '09:00 - 20:30',
    address: '高雄市新庄仔路A07號',
    mail: 'RIZI@gmail.com',
    img: 'img/map/xinzhuang',
    aos: 'fade-down',
  },
  {
    id: 2,
    name: '太保店',
    tel: '05-36256E5',
    opening: '09:00 - 20:30',
    address: '嘉義縣祥和三路東段A05號',
    mail: 'RIZI@gmail.com',
    img: 'img/map/taibao',
    aos: 'fade-up',
  },
  {
    id: 3,
    name: '健行店',
    tel: '04-22896E0',
    opening: '08:00 - 20:00',
    address: '台中市北區健行路A2號',
    mail: 'RIZI@gmail.com',
    img: 'img/map/jiansing',
    aos: 'fade-down',
  }
]

export const SHOP_INFO_TYPE: ShopInfoType[] = [
  { type: 'tel', label: '電話' },
  { type: 'opening', label: '營業時間' },
  { type: 'address', label: '地址' },
  { type: 'mail', label: '信箱' }
]

export const SNS_INFO: SnsInfoType[] = [
  { type: 'facebook', link: 'https://github.com/suanriz/rizi' },
  { type: 'instagram', link: 'https://github.com/suanriz/rizi' },
  { type: 'line', link: 'https://github.com/suanriz/rizi' },
]

export const CONTACT_OPTIONS: OptionType[] = [
  { label: '客服專區', value: '客服專區' },
  { label: '建議事項', value: '建議事項' },
  { label: '企業採購', value: '企業採購' },
  { label: '異業合作', value: '異業合作' },
  { label: '加盟專區', value: '加盟專區' },
]

export const CONTACT_INFO: ContactInfoType[][] = [
  [
    { name: '隱私政策', link: '/contact' },
    { name: '常見問題', link: '/contact' },
    { name: '加入我們', link: '/contact' },
  ],
  [
    { name: '加盟資訊', link: '/contact' },
    { name: '企業採購', link: '/contact' },
    { name: '門市查詢', link: '/contact' },
  ],
  [
    { name: '購物說明', link: '/contact' },
    { name: '會員權益', link: '/contact' },
  ],
]

export const NEWS_TYPE: OptionType[] = [
  { label: '全部', value: 0 },
  { label: '優惠', value: 1 },
  { label: '活動', value: 2 },
]

export const CART_TYPE: OptionType[] = [
  { label: '待結帳', value: 1 },
  { label: '收藏', value: 2 },
]

export const EMAIL_TYPE: MailType = {
  Contact: '40ouhzr',
  GoodsList: 'evvyk7h'
}

export const STEP_INFO: StepDataType[] = [
  {
    title: '選豆',
    sub: 'Coffee beans',
    introduction: '不同地區的氣候會有不同味道，不同的處理方式會有不同的口感',
    img: 'img/brand/step1',
    aos: 'fade-up',
  },
  {
    title: '烘豆',
    sub: 'Roas coffee',
    introduction: '淺培的豆子有較多的風味和果酸，深培的豆子則咖啡味較重',
    img: 'img/brand/step2',
    aos: 'fade-down',
  },
  {
    title: '研磨',
    sub: 'Ground beans',
    introduction: '粗的咖啡粉會越稀風味較強，越細的咖啡粉會越濃越苦',
    img: 'img/brand/step3',
    aos: 'fade-up',
  },
  {
    title: '萃取',
    sub: 'Extraction',
    introduction: '不同地區的氣候會有不同味道，不同的處理方式會有不同的口感',
    img: 'img/brand/step4',
    aos: 'fade-down',
  },
]

export const MENU_TAB_TYPE: TabType[] = [
  { name: '所有商品', sub: 'All Products', type: 0 },
  { name: '手沖咖啡', sub: 'Premium Coffee', type: 1 },
  { name: '特調飲品', sub: 'Specialty Drinks', type: 2 },
  { name: '幸福甜品', sub: 'Delightful Sweets', type: 3 },
  { name: '輕食餐點', sub: 'Light Meals', type: 4 },
]

export const MENU_TYPE_INFO: MenuListType[] = [
  {
    name: '手沖咖啡',
    introduction: '採用傳統手沖方式，讓水流均勻地穿透新鮮研磨的咖啡粉，釋放出咖啡豆最純粹的香氣與風味。每一杯手沖咖啡都展現出自然的甘醇與細膩的層次感，是品味咖啡本質的絕佳選擇。',
    img: 'img/menuView/coffee',
    link: '/menu/list?type=1',
    aos: 'fade-right',
  },
  {
    name: '特調飲品',
    introduction: '結合創新的口味搭配與精選素材，調製出獨特的飲品。從水果的清爽到奶香的濃郁，每一款特調飲品都帶來不一樣的驚喜，為您的味蕾增添豐富的層次感與多變風味。',
    img: 'img/menuView/specialty',
    link: '/menu/list?type=2',
    aos: 'fade-left',
  },
  {
    name: '幸福甜品',
    introduction: '每款甜品都如藝術品般精緻，嚴選新鮮食材並細膩製作，讓甜點口感層次豐富。無論是酥脆的外皮還是綿密的內餡，甜度恰到好處，為您帶來視覺與味覺的雙重享受。',
    img: 'img/menuView/dessert',
    link: '/menu/list?type=3',
    aos: 'fade-right',
  },
  {
    name: '輕食餐點',
    introduction: '為忙碌的您準備的健康輕食，每道餐點兼顧美味與營養，選用新鮮食材，製作簡單卻不失風味。這是您享受輕盈飲食的最佳選擇，無論作為正餐或是下午茶點心，都能令人滿足又無負擔。',
    img: 'img/menuView/snack',
    link: '/menu/list?type=4',
    aos: 'fade-left',
  },
]

export const STORE_TAB_TYPE: TabType[] = [
  { name: '所有商品', sub: 'All Products', type: 0 },
  { name: '淺焙咖啡', sub: 'Light Roast', type: 1 },
  { name: '中焙咖啡', sub: 'Medium Roast', type: 2 },
  { name: '深焙咖啡', sub: 'High Roast', type: 3 },
  { name: '咖啡禮盒', sub: 'Exquisite Gift Box', type: 4 },
]

export const STORE_DETAIL_TYPE: StoreDetailType[] = [
  { label: '主調風味', value: 'flavor' },
  { label: '風味描述', value: 'flavorDetail' },
  { label: '烘焙程度', value: 'roast' },
  { label: '酸度評鑑', value: 'acidity' }
]

export const GOOD_DETAIL_TYPE: GoodDetailType[] = [
  { label: '風味描述', value: 'flavor' },
  { label: '產品特色', value: 'features' },
  { label: '原料選用', value: 'ingredients' },
  { label: '保存期限', value: 'shelfLife' }
]
