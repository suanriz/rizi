import db from '../../assets/db.json'
import type { ApiParamsType } from '../../types'

export const simulateGoodsApi = (
  query: ApiParamsType = {}
) => {
  const { page, type, pageSize } = query
  const _pageSize = Number(pageSize) || 12
  const _page = Number(page) || 1
  const _type = Number(type)
  const start = (_page - 1) * _pageSize
  let data = db.goods

  if (_type && _type !== 0) {
    data = data.filter((item) => item.type === _type)
  }

  const list = data.map(({ detail: _detail, ...rest }) => rest)

  return {
    list: list.slice(start, start + _pageSize),
    total: data.length,
  }
}

export const simulateGoodsDetailApi = (id: string) => {
  return db.goods.find((item) => String(item.id) === id)
}
