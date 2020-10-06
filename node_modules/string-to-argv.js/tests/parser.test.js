const { expect } = require('chai')
const Parser = require('../bin/Parser')

describe('Parser Class', () => {

  it('should throw if no value passed', () => {
    expect(() => new Parser()).to.throw(Error)
    expect(() => new Parser('')).to.throw(Error)
  })

  it('should parse only the command with no arguments', () => {
    let parsed = new Parser('command')
    expect(parsed).to.eql({
      _: [],
      command: 'command',
      raw: 'command'
    })
  })

  it('should set boolean value to flag when last element of the string [single-flag]', () => {
    let parsed = new Parser('command -p')
    expect(parsed).to.eql({
      _: [],
      command: 'command',
      raw: 'command -p',
      p: true,
    })
  })

  it('should set boolean value to flag when last element of the string [verbose]', () => {
    let parsed = new Parser('command --verbose')
    expect(parsed).to.eql({
      _: [],
      command: 'command',
      raw: 'command --verbose',
      verbose: true,
    })
  })

  it('should onechar flag when last element of the string', () => {
    let raw = 'command --shouldbetrue --shouldbetruetoo --shouldbethevaluepassed asd asd123'
    let parsed = new Parser(raw)
    expect(parsed).to.eql({
      raw,
      command: 'command',
      _: [ 'asd123' ],
      shouldbetrue: true,
      shouldbetruetoo: true,
      shouldbethevaluepassed: 'asd'
    })
  })

  it('should parse some options', () => {
    let raw = 'cmd -p -f test --flag=flag --flagstring="flag with a string with space" source/ dest/'
    let parsed = new Parser(raw)
    expect(parsed).to.eql({
      raw,
      command: 'cmd',
      _: [ 'source/', 'dest/' ],
      p: true,
      f: 'test',
      flag: 'flag',
      flagstring: 'flag with a string with space'
    })
  })

  it('should parse this not nice looking string', () => {
    let raw = 'cmd -z -c -v -flag1 123 -p -f test --depth=0 -s --string=noquotes --flagstring="with spaces" source/ dest/'
    let parsed = new Parser(raw)
    expect(parsed).to.eql({
      raw,
      command: 'cmd',
      _: [ 'source/', 'dest/' ],
      z: true,
      c: true,
      v: true,
      flag1: "123",
      p: true,
      f: "test",
      depth: "0",
      s: true,
      string: 'noquotes',
      flagstring: "with spaces"
    })
  })
})
