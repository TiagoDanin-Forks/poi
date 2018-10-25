const setSharedCLIOptions = require('./utils/shared-cli-options')

exports.apply = api => {
  api.setCommandMode('build', 'production')

  const command = api.registerCommand('build', 'Build your app', async () => {
    await api.bundle()
  })

  setSharedCLIOptions(command)
  command.option(
    'no-clean-out-dir',
    `Don't clean output directory before bundling (default: true)`
  )

  if (api.options.command === 'build') {
    api.chainWebpack(config => {
      config.plugin('report-status').tap(([options]) => [
        Object.assign({}, options, {
          showFileStats: true
        })
      ])
    })
  }
}

exports.name = 'builtin:command-build'
