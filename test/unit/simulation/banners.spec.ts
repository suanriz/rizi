import { describe, it, expect } from 'vitest'

import { simulateBannersApi } from '../../../app/utils/simulation/banners'

describe('banners simulation', () => {
  it('should return banner list', () => {
    const result = simulateBannersApi()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
})
