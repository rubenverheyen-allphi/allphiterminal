class Parser {
  constructor(command) {
    if (!command || !command.length) {
      throw new Error('Parser: command provided is empty.')
    }
		if (typeof command !== 'string') {
			throw new Error('Parser: command must be a string!')
		}

    this.raw = command

    // Split string by space, but keep intact spaces if between quotes
    let argv = this.stringToArray(command.replace(/\s{2,}/g, '').replace(/\t|\n/g, ' '))

    this.command = argv[0]
    this._ = []

    // Swallow copy without the command and send to parsing
    if (argv.length) {
      const parsed = this.parse(argv.slice(1))

      // If no Object.assign do the old way
      if (!Object.assign) {
        for (let key in parsed) {
          if (parsed.hasOwnProperty(key)) {
            this[key] = parsed[key]
          }
        }
        return true
      }
      return Object.assign(this, parsed)
    }
  }

  /**
   * @method stringToArray()
   * Get a command string
   * split but spaces
   * keep intect substring with single or double quotes
   * @return Array
   */
  stringToArray(string) {
    return string.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
  }

  /**
   * @method parse()
   * Parse an array of ARGV to an Object of { flag:value }
   *
   * Every other value outside of flag is pushed
   * in an array in the order of appearance
   *
   * Flag Type:
   *  -f option
   *  -f
   *  --verboseflag="value stringed"
   *  --verboseflag=value
   *
   * Recursion
   * Parse an option and reduce the array size,
   * recall untill it return the parsed object
   *
   * @return {Object} Parsed Options
   */
  parse(options, parsed = {} ) {
    if (!options.length) return parsed

    /**
     * Matches a flag starting with only one hyphen
     * [-f val] or [-f] standalone boolean
     * input passed as ['-p', 'val', ...]
     */
    if (options[0].match(/^\-[^\-].*/)) {
      const optionName = options[0].replace('-', '')

      /**
       * if -f is followd by another flag
       * is a booloeadn flag
       */
      if (options[1] && options[1].match(/^\-.*/)) {
        parsed[optionName] = true
        return this.parse(options.splice(1), parsed)
      }

      /**
       * IF -f as last element
       * is a booloeadn flag
       */
      if (!options[1]) {
        parsed[optionName] = true
        return this.parse(options.splice(1), parsed)
      }

      parsed[optionName] = options[1]
      return this.parse(options.splice(2), parsed)
    }

    /**
     * Matches verbose flag with string
     * --flag="val val2"
     * input passed as ['--flag', '"val val2"']
     */
    if (options[0].match(/^\-{2}.*\=$/)) {
      // capture the flag name
      const optionName = options[0].match(/--(.*)=/)[1]
      // capture the flag value
      parsed[optionName] = options[1].replace(/"/g, '')
      return this.parse(options.splice(2), parsed)
    }

    /**
     * Matches verbose flag with non spaced value
     * --flag=value
     * input passed as ['--flag=value]
     */
    if (options[0].match(/^\-{2}.*\={1}.*$/)) {
      // capture the flag name
      const optionName = options[0].match(/\-{2}(.*)=/)[1]
      // capture the flag value
      parsed[optionName] = options[0].match(/\={1}(.*)/)[1]
      return this.parse(options.splice(1), parsed)
    }

    /**
     * Matches verbose flag with no value as a boolean
     */
    if (options[0].match(/^\-{2}.*$/)) {
      const optionName = options[0].replace('--', '')
      /**
       * If not followed by options
       * OR if followed by options and options is another flag
       * then set as boolean verbose flag
       */
      if (!options[1] || (options[1] && options[1].match(/^\-{1,}/))) {
        parsed[optionName] = true
        return this.parse(options.slice(1), parsed)
      }

      if (options[1] && !options[1].match(/^\-{1,}/)) {
        parsed[optionName] = options[1]
        return this.parse(options.slice(2), parsed)
      }
    }

    // If it's not a flag is source/dest path
    this['_'].push(options.shift())
    return this.parse(options, parsed)
  }
}

try {
  module.exports = Parser
} catch (e) {}
