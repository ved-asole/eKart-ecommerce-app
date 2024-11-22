import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss({
      content: [
        './index.html',
        './**/*.html',
        './src/**/*.jsx',
        './src/**/*.js',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/bootstrap/dist/css/**/*.css',
        './node_modules/bootstrap/dist/js/**/*.js',
        './node_modules/bootstrap/css/**/*.css',
        './node_modules/bootstrap/js/**/*.js',
        'node_modules/bootstrap/css/**/*.css',
        'node_modules/bootstrap/js/**/*.js'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
}