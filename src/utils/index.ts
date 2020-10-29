export type NArityFn<Args extends unknown[], Result> = (
  ...args: [...Args]
) => Result

export function memoize<A extends unknown[], B>(
  f: NArityFn<A, B>
): NArityFn<A, B> {
  const cache = new Map<A, B>()
  return (...args: [...A]): B => {
    if (cache.has(args)) {
      return cache.get(args) as B
    }
    const value = f(...args)
    cache.set(args, value)
    return value
  }
}

export const cx = memoize(<T extends unknown[]>(...args: [...T]): string => {
  return args.filter((arg) => typeof arg === 'string').join(' ')
})
