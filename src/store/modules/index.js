const requireModule = require.context('.', false, /^((?!index|\.unit\.).)*\.js$/)
const modulesCache = {}
const modules = {}

requireModule.keys().forEach(fileName => {
  const moduleDefinition = requireModule(fileName).default || requireModule(fileName)

  if (modulesCache[fileName] === moduleDefinition) return

  modulesCache[fileName] = moduleDefinition

  const modulePath = fileName
    .replace(/^\.\//g, '')
    .replace(/\.\w+$/, '')

  modules[modulePath] = {
    namespaced: true,
    ...moduleDefinition
  }
})

export default modules
