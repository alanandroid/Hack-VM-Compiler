/**
 * File Overview:
 *
 */
function removeExtraWhiteSpaceFrom(string) {
  return string.replace(/\s+/g, ' ').trim();
}

module.exports = {
  removeExtraWhiteSpaceFrom
}
