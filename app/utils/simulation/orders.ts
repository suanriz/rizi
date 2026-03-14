import db from '../../assets/db.json'
import type { ApiParamsType } from '../../types'

export const simulateOrdersApi = (
  query: ApiParamsType = {},
) => {
  const { pageSize, page, status } = query
  const _pageSize = Number(pageSize) || 10
  const _page = Number(page) || 1
  const _status = Number(status)
  const start = (_page - 1) * _pageSize
  let data = db.orders

  if (_status && _status !== 0) {
    data = data.filter((x) => x.status === _status)
  }

  return {
    list: data.slice(start, start + _pageSize),
    total: data.length,
  }
}
