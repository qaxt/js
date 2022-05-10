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
      let common = true
      for (const list of lists) {
        ((!list.includes(x)) ? common = false: common = common)
      }
      return common
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
  
  // Array Purification
  
  filter(list, fun) {
    return list.filter(fun)
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

  // Objects

  matches(rule) {
    return (object) => {
      let match = true
      for (const [key, value] of Object.entries(rule)) {
        if (object[key] !== value) {
          match = false
        }
      }
      return match
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
      let match = true
      for (const [key, value] of Object.entries(rule)) {
        if (typeof value === 'string') {
          if (!eval(`object[key]${value}`)) {
            match = false
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
            match = false
          }
        } else if (typeof value === 'boolean') {
          if (!eval(`object[key] === ${value}`)) {
            match = false
          }
        }
      }
      return match
    }
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
}