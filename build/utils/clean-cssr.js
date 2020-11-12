module.exports = function cleanCssr (code) {
  return code.replace(/\n\s+/g, '\n')
}
