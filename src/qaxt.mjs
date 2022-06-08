export default {
  // Array Operations
  
  unite(...lists) {
    let unision = []
    for (const list of lists) {
      unision = unision.concat(list) 
    }
    return unision
  },
  
  subtract(target, ...lists) {
    let sub = []
    for (const list of lists) {
      sub = sub.concat(list)
    }
    return target.filter(x => !sub.includes(x))
  },
  
  intersect(...lists) {
    let all = []
    for (const list of lists) {
      all = all.concat(list)
    }
    return all.filter((x) => {
      for (const list of lists) {
        if (!list.includes(x)) {
          return false
        }
      }
      return true
    })
  },

  intersectBy(rule, ...lists) {
    let all = []
    for (const list of lists) {
      all = all.concat(list)
    }
    return all.filter((x) => {
      for (const list of lists) {
        if (!this.includes(list, x, rule)) {
          return false
        }
      }
      return true
    })
  },
  
  exclude(...lists) {
    let all = []
    for (const list of lists) {
      all = all.concat(list)
    }
    const track = []
    const common = []
    for (const item of all) {
      ((track.includes(item)) ? common.push(item) : track.push(item))
    }
    return all.filter(x => !common.includes(x))
  },

  excludeBy(rule, ...lists) {
    let all = []
    for (const list of lists) {
      all = all.concat(list)
    }
    const track = []
    const common = []
    for (const item of all) {
      ((this.includes(track, item, rule)) ? common.push(item) : track.push(item))
    }
    return all.filter(x => !this.includes(common, x, rule))
  },
  
  // Array Purification
  
  filter(list, rule) {
    if (typeof rule === 'function') {
      const yes = list.filter(rule)
      return yes
    } else if (Array.isArray(rule)) {
      const yes = list.filter((x) => {
        return this.matchesProperty(rule[0], rule[1])(x)
      })
      return yes
    } else if (typeof rule === 'object') {
      const yes = list.filter((x) => {
        return this.matches(rule)(x)
      })
      return yes
    } else if (typeof rule === 'string') {
      const yes = list.filter((x) => {
        return this.property(rule)(x)
      })
      return yes
    }
  },
  
  partition(list, rule) {
    if (typeof rule === 'function') {
      const yes = list.filter(rule)
      const no = list.filter((x) => {
        return !rule(x)
      })
      return [yes, no]
    } else if (Array.isArray(rule)) {
      const yes = list.filter((x) => {
        return this.matchesProperty(rule[0], rule[1])(x)
      })
      const no = list.filter((x) => {
        return !this.matchesProperty(rule[0], rule[1])(x)
      })
      return [yes, no]
    } else if (typeof rule === 'object') {
      const yes = list.filter((x) => {
        return this.matches(rule)(x)
      })
      const no = list.filter((x) => {
        return !this.matches(rule)(x)
      })
      return [yes, no]
    } else if (typeof rule === 'string') {
      const yes = list.filter((x) => {
        return this.property(rule)(x)
      })
      const no = list.filter((x) => {
        return !this.property(rule)(x)
      })
      return [yes, no]
    }
  },

  pull(list, rule) {
    return list.filter(x => !rule.includes(x))
  },

  // Objects

  matches(rule) {
    return (object) => {
      for (const [key, value] of Object.entries(rule)) {
        if (object[key] !== value) {
          return false
        }
      }
      return true
    }
  },

  matchesProperty(key, value) {
    return (object) => {
      return object[key] === value
    }
  },

  property(key) {
    return (object) => {
      return object[key]
    }
  },

  must(rule) {
    return (object) => {
      for (const [key, value] of Object.entries(rule)) {
        if (typeof value === 'string') {
          if (!eval(`object[key]${value}`)) {
            return false
          }
        } else if (Array.isArray(value) && value.length > 1) {
          let str = ''
          let con = value.shift()
          value.forEach((item, index) => {
            if (index === 0) {
              str += 'object[key]' + item
            } else {
              str += con + 'object[key]' + item
            }
          })
          if (!eval(str)) {
            return false
          }
        } else if (typeof value === 'boolean') {
          if (!eval(`object[key] === ${value}`)) {
            return false
          }
        }
      }
      return true
    }
  },

  combine(...objects) {
    let combined = {}
    for (let i = 0; i < objects.length; i++) {
      for (const [key, value] of Object.entries(objects[i])) {
        if (combined[key] === undefined) {
          combined[key] = value
        }
      }
    }
    return combined
  },

  mapValues(obj, rule) {
    if (typeof rule === 'function') {
      let thing = {}
      for (const key of Object.keys(obj)) {
        thing[key] = rule(obj[key])
      }
      return thing
    } else if (typeof rule === 'string') {
      let thing = {}
      for (const key of Object.keys(obj)) {
        thing[key] = obj[key][rule]
      }
      return thing
    }
  },

  mapKeys(obj, rule) {
    if (typeof rule === 'function') {
      let thing = {}
      for (const key of Object.keys(obj)) {
        thing[rule(key, obj[key])] = obj[key]
      }
      return thing
    }
  },

  equal(...items) {
    for (let i = 0; i < items.length - 1; i++) {
      if (items[i] !== items[i + 1]) {
        if (typeof items[i] === typeof items[i + 1]) {
          if (Array.isArray(items[i])) {
            if (items[i].length === items[i + 1].length) {
              for (let j = 0; j < items[i].length; j++) {
                if (items[i][j] !== items[i + 1][j]) {
                  return false
                }
              }
            } else {
              return false
            }
          } else if (typeof items[i] === 'object') {
            if (!this.matches(items[i])(items[i + 1])) {
              return false
            }
          } else if (typeof items[i] === 'string') {
            if (items[i].toLowerCase() !== items[i + 1].toLowerCase()) {
              return false
            }
          }
        } else {
          return false
        }
      }
    }
    return true
  },
  
  // Loops

  range(start, end, step) {
    let list = []
    if (!step) step = 1
    if (start > end) {
      step *= -1
      for (let i = start; i > end; i += step) {
        list.push(i)
      }
    } else {
      for (let i = start; i < end; i += step) {
        list.push(i)
      }
    }
    return list
  },

  simul(lists, n, fun) {
    const out = []
    for (let i = 0; i < n; i++) {
      const items = []
      for (const list of lists) {
        items.push(list[i])
      }
      out.push(fun(items, i, out))
    }
    return out
  },

  // Statistics

  frequency(data) {
    const chart = new Map()
    for (const item of data) {
      const value = chart.get(item)
      if (value) {
        chart.set(item, value + 1)
      } else {
        chart.set(item, 1)
      }
    }
    return chart
  },

  mode(data) {
    const chart = this.frequency(data)
    const max = Math.max(...chart.values())
    return [...chart.keys()].filter(x => chart.get(x) === max)
  },

  indexOf(list, item) {
    const indexes = []
    for (let i = 0; i < list.length; i++) {
      if (list[i] === item) {
        indexes.push(i)
      }
    }
    return indexes
  },

  index(list, fun) {
    const indexes = []
    for (let i = 0; i < list.length; i++) {
      if (fun(list[i])) {
        indexes.push(i)
      }
    }
    return indexes
  },

  // Sorting

  quickSort(items) {
    const length = items.length
  
    if (length <= 1) {
      return items
    }
    const PIVOT = items[0]
    const GREATER = []
    const LESSER = []
  
    for (let i = 1; i < length; i++) {
      if (items[i] > PIVOT) {
        GREATER.push(items[i])
      } else {
        LESSER.push(items[i])
      }
    }
  
    const sorted = [...this.quickSort(LESSER), PIVOT, ...this.quickSort(GREATER)]
    return sorted
  },

  shellSort(items) {
    let interval = 1
  
    while (interval < items.length / 3) {
      interval = interval * 3 + 1
    }
  
    while (interval > 0) {
      for (let outer = interval; outer < items.length; outer++) {
        const value = items[outer]
        let inner = outer
  
        while (inner > interval - 1 && items[inner - interval] >= value) {
          items[inner] = items[inner - interval]
          inner = inner - interval
        }
        items[inner] = value
      }
      interval = (interval - 1) / 3
    }
    return items
  },

  // Maths

  factor(d, nums) {
    for (const num of nums) {
      if (num % d !== 0) {
        return false
      }
    }
    return true
  },

  factors(n) {
    let list = []
    for (let i of this.range(2, Math.floor(Math.sqrt(n)) + 1)) {
      if (n % i === 0) {
        list.push(i)
        list.push(n / i)
      }
    }
    return list
  },

  hcf(...nums) {
    let p = null
    for (let i of this.range(Math.min(...nums), Math.floor(Math.sqrt(Math.min(...nums))) - 1)) {
      if (this.factor(i, nums)) {
        return i
      }
      if (this.factor(Math.min(...nums) / i, nums)) {
        p = Math.min(...nums) / i
      }
    }
    return p
  },

  gcd(a, b) {
    if (b) {
      return this.gcd(b, a % b)
    } else {
      return Math.abs(a)
    }
  },

  prime(n) {
    for (let i of this.range(2, Math.floor(Math.sqrt(n)) + 1)) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  },

  // Array Management

  zip(...lists) {
    const zipped = []
    for (let i = 0; i < lists[0].length; i++) {
      const item = []
      for (const list of lists) {
        item.push(list[i])
      }
      zipped.push(item)
    }
    return zipped
  },

  chunk(list, n) {
    if (n) {
      n = Math.abs(n)
    } else {
      n = 1
    }
    const chunks = []
    for (let i = 0; i < list.length; i+= n) {
      chunks.push(list.slice(i, i + n))
    }
    return chunks
  },

  compact(list) {
    const pure = []
    for (let item of list) {
      if (item) {
        pure.push(item)
      }
    }
    return pure
  },

  drop(list, n) {
    list
    for (let i = 0; i < n; i++) {
      list.shift()
    }
    return list
  },

  juggle(list, n) {
    for (let i = 0; i < n; i++) {
      list.push(list.shift())
    }
    return list
  },

  join(items, sep) {
    const list = []
    list.push(items.shift())
    for (let item of items) {
      list.push(sep)
      list.push(item)
    }
    return list
  },
  
  dropWhile(list, fun) {
    let i = 0
    while (fun(list[i], i, list)) {
      list.shift()
    }
    return list
  },

  compress(...lists) {
    let comp = []
    for (let i = 0; i < lists.length; i++) {
      lists[i].forEach((item, index) => {
        if (comp[index] === undefined || comp[index] === null) {
          comp[index] = item
        }
      })
    }
    return comp
  },

  simplify(duplicates) {
    const list = []
    for (const duplicate of duplicates) {
      if (!list.includes(duplicate)) list.push(duplicate)
    }
    duplicates.filter(x => list.includes(x))
    return list 
  },

  includes(list, x, rule) {
    for (const item of list) {
      if (rule(x) === rule(item)) {
        return true
      }
    }
    return false
  },

  reverse(list) {
    for (let i = 0; i < Math.ceil(list.length/2); i++) {
      let left = list[i] 
      let right = list[list.length - i - 1]
      list[i] = right
      list[list.length - i - 1] = left
    }
    return list
  },

  insert(item, index, list) {
    return list.splice(index, 0, item)
  },

  // Strings
  
  title(str) {
    let text = ''
    for (let i = 0; i < str.length; i++) {
      if (!str[i - 1] || str[i - 1].toLowerCase() === ' ') {
        text += str[i].toUpperCase()
      } else {
        text += str[i].toLowerCase()
      }
    }
    return text
  },

  camelCase(str) {
    let text = ''
    for (let i = 0; i < str.length; i++) {
      if (str[i - 1] && str[i - 1].toLowerCase() === ' ') {
        text += str[i].toUpperCase()
      } else {
        text += str[i].toLowerCase()
      }
    }
    return text
  },
}