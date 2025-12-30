import { describe, it, expect } from 'vitest'

import { simulateMenuApi, simulateMenuDetailApi } from '../../../app/utils/simulation/menu'

describe('menu simulation', () => {
  it('should return paginated list', () => {
    const result = simulateMenuApi({ page: 1, pageSize: 5 })
    expect(result.list.length).toBeLessThanOrEqual(5)
    expect(result.total).toBeGreaterThan(0)
  })

  it('should filter by type', () => {
    const result = simulateMenuApi({ type: 1 })
    result.list.forEach((item: any) => {
      expect(item.type).toBe(1)
    })
  })

  it('should return detail by id', () => {
    const detail = simulateMenuDetailApi('1')
    expect(detail).toBeDefined()
    expect(detail?.id).toBe(1)
  })
})
