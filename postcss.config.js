import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss({
      content: [
        './**/*.html',
        './src/**/*.jsx',
        './src/**/*.js',
        'node_modules/bootstrap/css/**/*.css',
        'node_modules/bootstrap/js/**/*.js'
      ]
    })
  ]
}