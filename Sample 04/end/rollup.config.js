// @ts-check
export default [
    {
        input: 'src/client/speaker/index.js',
        output: {
            file: 'public/javascripts/index.es.js',
            format: 'es',
            sourcemap: true
        }
    },

    // SystemJS version, for older browsers
    {
        input: 'src/client/speaker/index.js',
        output: {
            file: 'public/javascripts/index.legacy.js',
            format: 'system',
            sourcemap: true
        }
    }
]