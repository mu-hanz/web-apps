const config = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', {'legacy': true }],
    ['@babel/plugin-transform-class-properties', { 'loose': false }]
  ],
};

export default config;