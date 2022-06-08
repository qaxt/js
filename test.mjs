import _ from './src/qaxt.mjs'

var result = null

/* Array Operations */

const one = ['foo', 'bar', 'baz']
const two = ['bar', 'baz']
const three = ['baz', 'qux']

// Unites multiple arrays
result = _.unite(one, two, three)
console.log(result)

// Subtracts an array from another
result = _.subtract(one, two, three)
console.log(result)

// Returns the common elements in arrays
result = _.intersect(one, two, three)
console.log(result)

// Gets the symmetric difference
result = _.exclude(one, two, three)
console.log(result)

// Intersect using an iteratee shorthand
result = _.intersectBy(Math.floor, [0.5, 1.5], [0, 1], [1, 2])
console.log(result)

// Exclude using an iteratee shorthand
result = _.excludeBy(Math.floor, [0.5, 1.5], [0, 1], [1, 2])
console.log(result)

/* Array Purification */

const users = [
  {
    name: 'foo',
    age: 8,
    deleted: false,
  },
  {
    name: 'bar',
    age: 18,
    deleted: false,
  },
  {
    name: 'baz',
    age: 13,
    deleted: true,
  },
  {
    name: 'qux',
    age: 13,
    deleted: false,
  },
]

// Filter with function rule
result = _.filter(users, _.must({ name: `[0] === 'b'` }))
console.log(result) // name starts with b

// The matches() shorthand
result = _.filter(users, { age: 13 })
console.log(result) // 13 year olds

// The matchesProperty() shorthand
result = _.filter(users, ['name', 'qux'])
console.log(result) // object for qux

// The property() shorthand
result = _.filter(users, 'deleted')
console.log(result) // deleted users

// Partition with function rule
result = _.partition(users, _.must({ name: `[0] === 'b'` }))
console.log(result) // name starts with b

// The matches() shorthand
result = _.partition(users, { age: 13 })
console.log(result) // 13 year olds

// The matchesProperty() shorthand
result = _.partition(users, ['name', 'qux'])
console.log(result) // object for qux

// The property() shorthand
result = _.partition(users, 'deleted')
console.log(result) // deleted users

/* Objects */

// Combines objects with missing properties
result = _.combine({ x: 'foo' }, { y: 'bar' }, { x: 'baz', z: 'qux' })
console.log(result) // x: foo, y: bar, z: qux

// Gets objects with the same key & value pairs
result = users.filter(_.matches({ name: 'foo' }))
console.log(result) // object for foo

// Gets objects where a key is equal to a value
result = users.filter(_.matchesProperty('age', 13))
console.log(result) // 13 year olds

// Gets objects with truthy deleted values
result = users.filter(_.property('deleted'))
console.log(result) // deleted users

// Gets objects with key & value pairs with an expression
result = users.filter(_.must({ age: `>= 13` }))
console.log(result) // 13+ year olds

// Like before but takes multiple expressions
result = users.filter(_.must({ age: ['||', '=== 18', '=== 8'] }))
console.log(result) // must be 18 or 8 years old

// Checks if two lists or objects are identical
result = _.equal([0, 1], [0, 1], [0, 1])
console.log(result)
result = _.equal({ x: 0 }, { x: 0 })
console.log(result)

// Friend suggested I added this lodash method
result = _.mapKeys({ 'a': 1, 'b': 2 }, (key, value) => {
  return key + value
})
console.log(result)
result = _.mapValues({
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
}, (value) => {
  return value.age
})
console.log(result)

/* Loops */

// The first 2 parameters are compulsory while the third is optional
for (let i of _.range(0, 10, 2)) {
  console.log(i)
}

// Reverse loop with auto increment
for (let i of _.range(10, 0)) {
  console.log(i)
}

// Simultaneous iteration?
const people = ['qaxt', 'dotargz', 'nodexninja', 'devxan']
const ids = _.range(0, people.length)

result = _.simul([people, ids], people.length, (items, i, o) => {
  console.log(items, i, o)
  return {
    name: items[0],
    id: items[1]
  }
})
console.log(result)

/* Stastics and Data */

const companies = ['google', 'amazon', 'microsoft', 'google', 'apple', 'amazon', 'netflix']

// Statistics
result = _.frequency(companies)
console.log(result)

result = _.mode(companies)
console.log(result)

// Gets all indexes in order
result = _.indexOf(companies, 'google')
console.log(result)

result = _.index(companies, x => x[0] === 'a')
console.log(result)

/* Maths */

// Returns true if the number is prime
console.log(_.prime(7))

// Gets the highest common factor of multiple integers
console.log(_.hcf(24, 51, 18))

// Same as hcf() but only takes 2 integers recursively
console.log(_.gcd(138, 207))

// Gets the factors of a number in pairs
console.log(_.factors(144))

/* Sorting */

result = _.quickSort(_.factors(144))
console.log(result)

result = _.shellSort(_.factors(128))
console.log(result)

/* Array Management */

// Remove duplicate values
result = _.simplify(['foo', 'bar', 'baz', 'foo'])
console.log(result)

// Split a list into chunks
result = _.chunk(['foo', 'bar', 'baz', 'qux'], 2)
console.log(result) // 2 and 2 items

result = _.chunk(['foo', 'bar', 'baz', 'qux'], 3)
console.log(result) // 3 and 1 items

// Row to column and vice versa
result = _.zip(['username', 'pasword'], ['foo', 'bar'], ['baz', 'qux'])
console.log(result)

// Compress like combine() for lists
result = _.compress(['foo', null, 'baz', 'qux'], ['qaxt', 'bar', 'baz', null])
console.log(result)

// Drop the first n items
result = _.drop([0, 1, 2, 3], 2)
console.log(result)

// Cycle the items n times
result = _.juggle([0, 1, 2, 3], 2)
console.log(result)

// Join items into a list
result = _.join([0, 'qaxt', ['foo', 'bar']], '*')
console.log(result)

// Drop while a condition is true
result = _.dropWhile([0, 1, 2, 3], x => x < 2)
console.log(result)

// Includes but better
console.log(_.includes([0, 2.5, 4], 2, Math.floor))

// Reverses and mutates a list
const order = [0, 1, 2]
console.log(_.reverse(order))
console.log(order)

// Inserts an item and mutates the list
const missing = ['foo', 'baz', 'qux']
console.log(_.insert('bar', 1, missing))
console.log(missing)

/* Strings */

console.log(_.title('tHis WiLL be FiXeD'))
console.log(_.camelCase('tHis WiLL be FiXeD'))