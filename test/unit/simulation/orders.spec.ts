import { describe, it, expect } from 'vitest'

import { simulateOrdersApi } from '../../../app/utils/simulation/orders'

describe('orders simulation', () => {
  it('should return paginated list with default params', () => {
    const result = simulateOrdersApi()
    expect(result.list.length).toBeGreaterThan(0)
    expect(result.total).toBe(4)
  })

  it('should return paginated list with custom page and pageSize', () => {
    const result = simulateOrdersApi({ page: 2, pageSize: 2 })
    expect(result.list).toHaveLength(2)
    expect(result.total).toBe(4)
  })

  it('should filter by status', () => {
    const result = simulateOrdersApi({ status: 1 })
    expect(result.list).toHaveLength(1)
    expect(result.list[0].status).toBe(1)
    expect(result.total).toBe(1)
  })
})
