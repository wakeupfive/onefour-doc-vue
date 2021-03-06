/**
 * @implements 确保该值不是undefined或null使用Array.prototype.includes(), 比较constructor值上的属性type以检查提供的值是否属于指定的type
 * @example is(Array, [1]) // true
 * @example is(ArrayBuffer, new ArrayBuffer()) // true
 * @example is(Map, new Map()) // true
 * @example is(RegExp, /./g) // true
 * @example is(Set, new Set()) // true
 * @example is(WeakMap, new WeakMap()) // true
 * @example is(WeakSet, new WeakSet()) // true
 * @example is(String, '') // true
 * @example is(String, new String('')) // true
 * @example is(Number, 1) // true
 * @example is(Number, new Number(1)) // true
 * @example is(Boolean, true) // true
 * @example is(Boolean, new Boolean(true)) // true
 * @param {*} type
 * @param {*} val
 */
export const is = (type, val) =>
  ![, null].includes(val) && val.constructor === type

/**
 * @description 根据参数 指定生成数组
 * @implements 使用Array.from()以产生所需的长度的阵列，Array.prototype.fill()与期望的值来填充它。
 * @param {*} n
 * @param {number} [val=0]
 */
export const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val)

initializeArrayWithValues(5, 2) // [2, 2, 2, 2, 2]

/**
 * @description 通过索引确定数组的执行元素
 * @implements 如果索引是负数按照倒叙来访问
 * @param {*} list
 * @param {*} n
 * @return {*}
 */
export const nthArray = (list, n) => {
  if (n > 0) return list[n]
  let len = list.length
  return list[len + n]
}

/**
 * @description 判断数组是升序/降序，升序 1 降序 -1 其他 0
 * @param {*} arr
 * @example isSorted([0, 1, 2, 2]) // 1
 * @example isSorted([4, 3, 2]) // -1
 * @example isSorted([4, 3, 5]) // 0
 * @example isSorted([4]) // 0
 */
export const isSorted = (arr) => {
  if (arr.length <= 1) return 0
  const direction = arr[1] - arr[0]
  for (let i = 2; i < arr.length; i++) {
    console.log(arr[i] - arr[i - 1], direction, 'direction')
    if ((arr[i] - arr[i - 1]) * direction < 0) return 0
  }
  return Math.sign(direction)
}

/**
 * @description 数组合集
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const intersection = (a, b) => {
  const s = new Set(b)
  return [...new Set(a)].filter((x) => s.has(x))
}

intersection([1, 2, 3], [4, 3, 2]) // [2, 3]

/**
 * @description isDescending 升序/降序 找到对应的位置返回
 * @param {*} arr
 * @param {*} n
 */
export const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1]
  const index = arr.filter((t) => (isDescending ? t >= n : t <= n))
  return index === -1 ? arr[arr.length - 1] : dex
}

/**
 * @description 数组和除以长度
 * @param {*} arr
 */
export const average = (...arr) => arr.reduce((c, p) => c + p, 0) / arr.length

/**
 * @description 随机数组内索引位置
 * @implements while 循环 通过 Math.floor(Math.random() * m) 得到在数组长度随机的数字 在依次减少 停止循环 达到随机改变索引的效果
 * @param {*} [...arr]
 * @return {*}
 */
export const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

/**
 * @description 数组差集/合集
 * @implements 合并 ab 数组 在 Array.filter 过来判断是否在于a或者b 这里就区分了如果是 并 提取合计 如果是 或 并且不包含 提取取反
 * @param {*} a
 * @param {*} b
 */
export const uniqueSymmetricDifference = (a, b) =>
  // [...a, ...b].filter((n) => !a.includes(n) || !b.includes(n))
  [...a, ...b].filter((n) => a.includes(n) && b.includes(n))

/**
 * @description 统计数组内某一个值出现的次数
 * @implements 通过 Array.reduce 来循环 数组 然后累计 指定的值的次数
 * @param {*} arr
 * @param {*} val
 */
export const countOccurrences = (arr, val) =>
  arr.reduce((p, c) => (c === val ? (p += 1) : p), 0)

/**
 * @description 矩阵
 * @implements 低配版的生成二维举证
 * @param {*} w
 * @param {*} h
 * @param {*} val
 */
export const initialize2DArray = (w, h, val) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val))

/**
 * @description 按照指定长度分割数组
 * @param {*} arr
 * @param {*} n
 */
export const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
    arr.slice(i * n, i * n + n),
  )

/**
 * @description 数组比对是否相同
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const haveSameContents = (a, b) => {
  for (const v of new Set(a, b)) {
    let aLen = a.filter((n) => n === v).length
    let bLen = b.filter((n) => n === v).length
    if (aLen !== bLen) return false
  }
  return true
}

/**
 * @description 根据传入 args 的值生成每一层的矩阵信息
 * @implements 以递归的形式通过 Array.from 生成对应长度数组 呈现出指定矩形的效果
 * @param {*} val
 * @param {*} args
 */
export const initializeNDArray = (val, ...args) => {
  let result =
    args.length === 0
      ? val
      : Array.from({ length: args[0] }).map(() =>
          initializeNDArray(val, ...args.slice(1)),
        )
  return result
}

/**
 * @description 判断 b 数组内 是否包含 a
 * @implements 通过 set 自动去重的形式 b 只要包含了 a 并且长度没有变化 那么就是完全包含的 但是这里有个小缺陷 并不能区分 字符串和数字类型
 * @param {*} a
 * @param {*} b
 */
export const isContainedIn = (a, b) =>
  [...new Set([...a, ...b])].length === b.length

/**
 * @description a b 是否有包含的内容
 * @param {*} a
 * @param {*} b
 */
export const isDisjoint = (a, b) =>
  new Set([...new Set(a), ...new Set(b)]).size === a.size + b.size

/**
 * @description 柯里化
 * @implements 返回方法 判断 方法参数长度是
 * @param {*} fn
 * @return {*}
 */
export const curry = (fn) => {
  return (judge = (...args) => {
    let result = args.length >= fn.length
    if (result) {
      return fn(...args)
    } else {
      return (...arg) => judge(...args, arg)
    }
  })
}

/**
 * @deprecated 创建一个n由连续元素组成的元组数组
 * @param {*} n
 * @param {*} arr
 */
export const aperture = (n, arr) =>
  n > arr.length ? [] : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n))

/**
 * @description 自定义实现 bing 方法
 * @implements fn 调用 apply 改变 this 到 context，同时传入返回方法的参数 args
 * @param {*} fn
 * @param {*} context
 * @param {*} boundArgs
 * @return {*}
 */
export const bind = (fn, context, ...boundArgs) => {
  return (...args) => {
    return fn.apply(context, [...boundArgs, ...args])
  }
}

/**
 * @description 查找val数组中的所有索引。如果val从未发生，则返回一个空数组
 * @implements 通过数组自带 reduce 方法，用数组记录 val 一样的值 存储索引 最后返回数组
 * @param {*} arr
 * @param {*} val
 */
export const indexOfAll = (arr, val) =>
  arr.reduce((p, c, i) => (c === val ? [...p, i] : p), [])

/**
 * @description 返回数组重复的值
 * @implements 一层循环，记录每一个元素重复的次数，得到所有元素重复的次数，这时返回想要的即可
 * @param {*} arr
 */
export const filterUnique = (arr) => {
  const result = new Map()
  arr.reduce((p, c) => {
    let val = p.get(c)
    !p.has(c) ? p.set(c, 0) : p.set(c, (val += 1))
    return p
  }, result)
  return [...result.keys()].filter(
    (val, index) => [...result.values()][index] !== 0,
  )
}

/**
 * @description 返回数组不重复的值
 * @implements 一层循环，记录每一个元素重复的次数，得到所有元素重复的次数，这时返回想要的即可
 * @param {*} arr
 */
export const filterNonUnique = (arr) => {
  const result = new Map()
  arr.reduce((p, c) => {
    let val = p.get(c)
    !p.has(c) ? p.set(c, 0) : p.set(c, (val += 1))
    return p
  }, result)
  return [...result.keys()].filter(
    (val, index) => [...result.values()][index] === 0,
  )
}

/**
 * @description 将数组分为 n 块的数组
 * @implements 先取出 n 块的大小 然后 Array.from 把 n 当做长度 通过 size 切割数组
 * @param {*} arr
 * @param {*} n
 * @return {*}
 */
export const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n)
  return Array.from({ length: n }, (val, i) => {
    arr.slice(size, size * i + size)
  })
}

/**
 * @description 将多维数组转变成一维数组
 * @implements 通过 Array.from 迭代数组 判断当前项是否是数组 如果是数组 那就递归调用当前方法 如果不是 那就累计所有结果
 * @param {*} arr
 * @return {*}
 */
export const flatten = (arr) => {
  return arr.reduce((p, c) => {
    return Array.isArray(c) ? flatten([...p, ...c]) : [...p, c]
  }, [])
}

/**
 * @description 对象数组 提取最大值
 * @implements 调用 Array.map 把指定属性 fn 提取成数组 调用 Math.max 提取数组最大值 对象数组
 * @param {*} arr
 * @param {*} fn
 */
export const maxBy = (arr, fn) =>
  Math.max.apply(
    null,
    arr.map((item) => (typeof fn === 'function' ? item.n : item[fn])),
  )

/**
 * @description 对象数组 提取最小值
 * @implements 对象数组 调用 Array.map 把指定属性 fn 提取成数组 调用 Math.min 提取数组最小值
 * @param {*} arr
 * @param {*} fn
 */
export const minBy = (arr, fn) =>
  Math.min.apply(
    null,
    arr.map((item) => (typeof fn === 'function' ? item.n : item[fn])),
  )

/**
 * @description 有序数组中查找指定值的索引
 * @implements 因为是有序数组 可以采用对撞指针循环的方式来查找对应值的索引
 * @param {*} arr
 * @param {*} item
 * @return {*}
 */
export const binarySearch = (arr, item) => {
  let l = 0,
    r = arr.length - 1
  while (r > l) {
    const mid = Math.floor((l + r) / 2)
    const guess = arr[mid]
    if (guess === item) return mid
    guess > item ? (r = mid - 1) : (l = mid + 1)
  }
  return -1
}

/**
 * @description 合并两个有序数组
 * @implements 双指针从前变更
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const mergeSort = (a, b) => {
  let l = 0,
    r = 0,
    result = []
  while (l < a.length || r < b.length) {
    if (a[l] > b[r]) {
      result.push(b[r])
      r++
    } else if (a[l] < b[r]) {
      result.push(a[l])
      l++
    } else {
      a[l] && result.push(a[l])
      b[r] && result.push(b[r])
      r++
      l++
    }
  }
  return result
}

/**
 * @description 组合多个对象数组，使用指定的键来匹配合并对象
 * @implements Array.reduce 传入 对象 把指定的键作为key，合并累计之前的值
 * @param {*} list
 * @param {*} prop
 * @return {*}
 */
export const combine = (list, prop) => {
  let result = {}
  return Object.values(
    list.reduce((p, c) => {
      if (c[prop]) {
        p[c[prop]] = { ...p[c[prop]], ...c }
      }
      return p
    }, result),
  )
}

/**
 * @description 笛卡尔积结果
 * @param {*} arr
 * @return {*}
 */
export const xProd = (...arr) =>
  arr.reduce(
    (prev, current) =>
      prev.flatMap((prevVal) =>
        current.map((currentVal) => [prevVal, currentVal]),
      ),
    [],
  )

/**
 * @description 冒泡排序
 * @implements 双重循环 前后比对
 * @param {*} arr
 * @return {*}
 */
export const bubbleSort = (arr) => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

/**
 * @description 将两个已排序的数组合并为一个
 * @implements 利用 Array.from 得到两个数组合并之后长度，然后再比对两个有序数组之间的值
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const mergeSortedArrays = (a, b) => {
  const _a = [...a]
  const _b = [...b]
  return Array.from({ length: _a.length + _b.length }, () => {
    if (_a.length) {
      return _a.shift()
    } else if (_b.length) {
      return _b.shift()
    } else {
      return _a[0] > _b[0] ? _b.shift() : _a.shift()
    }
  })
}
