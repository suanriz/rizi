export type ApiParamsType = {
  page?: number
  pageSize?: number
  type?: number
}

export type ApiListResponse<T> = {
  list: T[]
  total: number
}

export type OptionType = {
  label: string
  value: number | string
}

export type BannerType = {
  id: number
  img: string
  link?: string
  alt: string
}

export type TabType = {
  name: string
  sub: string
  type: number
}

export type StoreDetailType = {
  label: string
  value: keyof CoffeeDetailType['features']
}

export type GoodDetailType = {
  label: string
  value: keyof CakeDetailType['features']
}

export type CakeDetailType = {
  imgs: string[]
  features: {
    flavor: string
    features: string
    ingredients: string
    shelfLife: string
  }
  nutritionFacts: string[]
}
export type CoffeeDetailType = {
  imgs: string[]
  features: {
    flavor: string
    flavorDetail: string
    roast: string
    acidity: string
  }
  info: string[]
}
export type GoodType<T extends CakeDetailType | CoffeeDetailType> = {
  id: number
  name: string
  link: string
  img: string
  price: number
  onSale?: number
  type: number
  tag: number[]
  detail: T
} & (T extends CoffeeDetailType
  ? {
    count?: number
    checked?: boolean
  }
  : {
    indexImg: string
    indexImagePCSize: [number, number] | number[]
    indexImagePhoneSize: [number, number] | number[]
  })

export type NewsModelType = {
  isOpen: boolean
  list: NewsType[]
  data: NewsType
}

export type MailType = Readonly<Record<'Contact' | 'GoodsList', string>>

export type NavInfoType = Readonly<Record<'label' | 'link', string>>

export type ShopInfoType = Readonly<Record<'label' | 'type', string>>

export type SnsInfoType = Readonly<Record<'link' | 'type', string>>

export type BreadcrumbType = Readonly<Record<'title' | 'to', string>>

type InfoDataKeyStr = 'name' | 'tel' | 'opening' | 'address' | 'img' | 'aos' | 'mail'
export type InfoDataType = Readonly<Record<InfoDataKeyStr, string> & Record<'id', number>>

type NewsKeyStr = 'title' | 'introduction' | 'img'
export type NewsType = Record<NewsKeyStr, string> &
  Record<'id' | 'type', number>

type MenuListKeyStr = 'name' | 'introduction' | 'img' | 'link' | 'aos'
export type MenuListType = Readonly<Record<MenuListKeyStr, string>>

export type PageConfigType = Readonly<Record<'current' | 'pageSize', number>>

type EmailKeyStr = 'cause' | 'name' | 'email' | 'subject' | 'content'
export type EmailType = Readonly<Record<EmailKeyStr, string>>

type GoodsListMailKeyStr = 'email' | 'data' | 'content'
export type GoodsListMailType = Record<GoodsListMailKeyStr, string> &
  Record<'totalSale', number>

export type BreadcrumbDataType = Readonly<Record<'name' | 'link', string>>

export type ContactInfoType = Readonly<Record<'name' | 'link', string>>

type StepDataKeyStr = 'title' | 'sub' | 'introduction' | 'img' | 'aos'
export type StepDataType = Readonly<Record<StepDataKeyStr, string>>
