module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        jsEngine: 'hermes',
        enableHermes: true
      }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components', 
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@constants': './src/constants',
            '@utils': './src/utils',
            '@dao': './src/dao',
            '@types': './src/types',
            '@assets': './assets'
          },
        },
      ],
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-template-literals',
      '@babel/plugin-transform-runtime',
    ],
  };
};
