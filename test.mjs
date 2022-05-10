import _ from './src/qaxt.mjs'

var result = null

for (let i of _.range(0, 10, 2)) {
  console.log(i)
}

for (let i of _.range(10, 0)) {
  console.log(i)
}

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

// Gets objects with the same key & value pairs
result = users.filter(_.matches({ name: 'foo' }))
console.log(result)

// Gets objects where a key is equal to a value
result = users.filter(_.matchesProperty(['age', 13]))
console.log(result)

// Gets objects with truthy deleted values
result = users.filter(_.property('deleted'))
console.log(result)

// Gets objects with key & value pairs with an expression
result = users.filter(_.must({ age: `>= 13` }))
console.log(result) // 13+ year olds

// Like before but takes multiple expressions
result = users.filter(_.must({ age: ['||', '=== 18', '=== 8'] }))
console.log(result) // must be 18 or 8 years old

/* Returns list of [0] matched values [1] other values */

// Partition with function rule
result = _.partition(users, _.must({ name: `[0] === 'b'` }))
console.log(result) 

// The matches() shorthand
result = _.partition(users, { age: 13 })
console.log(result)

// The matchesProperty() shorthand
result = _.partition(users, ['name', 'qux'])
console.log(result)

// The property() shorthand
result = _.partition(users, 'deleted')
console.log(result)

/* OR, NOT, AND, XOR operations on arrays */

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

/* Stastics and Data */

const companies = ['google', 'amazon', 'microsoft', 'google', 'apple', 'amazon', 'netflix']

result = _.frequency(companies)
console.log(result)

result = _.mode(companies)
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

// Sorting
result = _.quickSort(_.factors(144))
console.log(result)

result = _.shellSort(_.factors(128))
console.log(result)

/* Array Management */

// Zip
result = _.zip(['username', 'pasword'], ['foo', 'bar'], ['baz', 'qux'])
console.log(result)