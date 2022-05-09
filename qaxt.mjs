export default {
  // Array Operations

function unite(...lists) {
  let unision = []
  for (list of lists) {
    unision = unision.concat(list) 
  }
  return unision
}

function subtract(target, ...lists) {
  let sub = []
  for (list of lists) {
    sub = sub.concat(list)
  }
  return target.filter(x => !sub.includes(x))
}

function intersect(...lists) {
  let all = []
  for (list of lists) {
    all = all.concat(list)
  }
  return all.filter((x) => {
    let common = true
    for (list of lists) {
      ((!list.includes(x)) ? common = false: common = common)
    }
    return common
  })
}

function exclude(...lists) {
  let all = []
  for (list of lists) {
    all = all.concat(list)
  }
  const track = []
  const common = []
  for (item of all) {
    ((track.includes(item)) ? common.push(item) : track.push(item))
  }
  return all.filter(x => !common.includes(x))
}

// Array Purification

function filter(list, fun) {
  return list.filter(fun)
}

function partition(list, rule) {
  if (typeof rule === 'function') {
    const yes = list.filter(rule)
    const no = list.filter((x) => {
      return !rule(x)
    })
    return [yes, no]
  } else if (Array.isArray(rule)) {
    const yes = list.filter((x) => {
      return matchesProperty(rule[0], rule[1])(x)
    })
    const no = list.filter((x) => {
      return !matchesProperty(rule[0], rule[1])(x)
    })
    return [yes, no]
  } else if (typeof rule === 'object') {
    const yes = list.filter((x) => {
      return matches(rule)(x)
    })
    const no = list.filter((x) => {
      return !matches(rule)(x)
    })
    return [yes, no]
  } else if (typeof rule === 'string') {
    const yes = list.filter((x) => {
      return property(rule)(x)
    })
    const no = list.filter((x) => {
      return !property(rule)(x)
    })
    return [yes, no]
  }
}  
}