import { describe, it, expect } from 'vitest'

import { simulateGoodsApi, simulateGoodsDetailApi } from '../../../app/utils/simulation/goods'

describe('goods simulation', () => {
  it('should return paginated list', () => {
    const result = simulateGoodsApi({ page: 1, pageSize: 2 })
    expect(result.list).toHaveLength(2)
    expect(result.total).toBeGreaterThan(0)
  })

  it('should filter by type', () => {
    const result = simulateGoodsApi({ type: 1 })
    result.list.forEach((item: any) => {
      expect(item.type).toBe(1)
    })
  })

  it('should return detail by id', () => {
    const detail = simulateGoodsDetailApi('1')
    expect(detail).toBeDefined()
    expect(detail?.id).toBe(1)
  })
})
