import { describe, it, expect } from 'vitest'

import db from '../../../app/assets/db.json'
import { simulateNewsApi } from '../../../app/utils/simulation/news'

describe('news simulation', () => {
  it('should return paginated list', () => {
    const result = simulateNewsApi({ page: 1, pageSize: 3, type: 0 })
    expect(result.list.length).toBeLessThanOrEqual(3)
    expect(result.total).toBeGreaterThan(0)
  })

  it('should filter by type', () => {
    const result = simulateNewsApi({ page: 1, pageSize: 10, type: 1 })
    result.list.forEach((item: any) => {
      expect(item.type).toBe(1)
    })
  })

  it('should use default pageSize=10 when pageSize is missing or invalid', () => {
    const result1 = simulateNewsApi({ page: 1 })
    expect(result1.list.length).toBeLessThanOrEqual(10)
    expect(result1.total).toBe(db.news.length)

    const result2 = simulateNewsApi({ page: 1, pageSize: '' } as any)
    expect(result2.list.length).toBeLessThanOrEqual(10)

    const result3 = simulateNewsApi({ page: 1, pageSize: undefined } as any)
    expect(result3.list.length).toBeLessThanOrEqual(10)
  })

  it('should use default page=1 when page is missing or invalid', () => {
    const result1 = simulateNewsApi({ pageSize: 5 })
    expect(result1.list).toEqual(db.news.slice(0, 5))

    const result2 = simulateNewsApi({ pageSize: 5, page: '' } as any)
    expect(result2.list).toEqual(db.news.slice(0, 5))

    const result3 = simulateNewsApi({ pageSize: 5, page: undefined } as any)
    expect(result3.list).toEqual(db.news.slice(0, 5))
  })

  it('should use defaults when both page and pageSize are missing', () => {
    const result = simulateNewsApi({})
    expect(result.list).toEqual(db.news.slice(0, 10))
    expect(result.total).toBe(db.news.length)
  })
})
