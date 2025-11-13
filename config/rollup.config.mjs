import terser from '@rollup/plugin-terser';

export default [
  // IIFE build for browser script tag
  {
    input: 'src/index.js',
    output: {
      file: 'dist/adtruth.js',
      format: 'iife',
      name: 'AdTruth',
      banner: '/* AdTruth SDK v0.2.1 | MIT License | https://github.com/papa-torb/adtruth */'
    }
  },
  // Minified IIFE build for production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/adtruth.min.js',
      format: 'iife',
      name: 'AdTruth',
      banner: '/* AdTruth SDK v0.2.1 | MIT */'
    },
    plugins: [terser()]
  },
  // ESM build for modern bundlers
  {
    input: 'src/index.js',
    output: {
      file: 'dist/adtruth.esm.js',
      format: 'es',
      banner: '/* AdTruth SDK v0.2.1 | MIT License | https://github.com/papa-torb/adtruth */'
    }
  }
];
// Note: This project is still under development.
