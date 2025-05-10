module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser')
    }
  }
  return config
}