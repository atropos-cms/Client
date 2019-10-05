const req = require.context('./en/', true, /^.*\.js$/)

const importLangFiles = req =>
  req.keys().reduce((obj, filename) => {
    const langKey = filename.match(/\.\/([A-Za-z]*)\.js/)[1]
    obj[langKey] = req(filename).default
    return obj
  }, {})

export default {
  en: importLangFiles(req)
}
