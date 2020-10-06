# Parse String to ARGV as object

Parse a string of a unix-like command line and parse it into a more usable Object

## Usage in node
```js
  let Parser = require('string-to-argv.js')
  let parsed = new Parser('cmd -z -c -v -flag1 123 -p -f test --depth=0 -s --string=noquotes --flagstring="with spaces" source/ dest/')
  // @return
  {
    raw: 'cmd -z -c -v -flag1 123 -p -f test --depth=0 -s --string=noquotes --flagstring="with spaces" source/ dest/',
    command: 'cmd',
    _: [ 'source/', 'dest/' ],
    z: true,
    c: true,
    v: true,
    flag1: '123',
    p: true,
    f: 'test',
    depth: '0',
    s: true,
    string: 'noquotes',
    flagstring: 'with spaces'
  }
```

##Usage in Browser
```html
  <script src="node_modules/string-to-argv.js/dist/Parser.js"></script>
  <script>
    var Parser = new Parser(/* ... */)
    // ...
  </script>
```

## Know Issue

  - nesting quotes in stringed flag not implemented.

##Error
```js
  try{
    let parsed = new Parser() // or empty string
  } catch(e) {
    console.log(e.message)
  }
  //> 'Parser: command provided is empty.'
```

###Dev

Source must be compiled to use with es2015

Run `npm install` or `yarn install`

Build with `npm run build`

Test with `npm test`
