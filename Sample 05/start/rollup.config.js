// import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from "rollup-plugin-uglify";

export default [
    {
        input: 'src/client/index.js',
        output: {
            file: 'public/javascripts/index.es.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            nodeResolve({
                module: true,
                jsnext: true,
                main: true,
                browser: true,
                extensions: ['.js']
            }),
            commonjs({
                include: [
                    'node_modules/urijs/**'
                ]
            }),
            // uglify()
        ]

    },

    // SystemJS version, for older browsers
    {
        input: 'src/client/index.js',
        output: {
            file: 'public/javascripts/index.legacy.js',
            format: 'system',
            sourcemap: true
        },
        plugins: [
            nodeResolve({
                module: true,
                jsnext: true,
                main: true,
                browser: true,
                extensions: ['.js']
            }),
            commonjs({
                include: [
                    'node_modules/urijs/**'
                ]
            })
        ]
    }


    // {
    //     input: 'client/index.ts',
    //     output: {
    //         dir: 'public/javascripts/module',
    //         format: 'es'
    //     },
    //     plugins: [
    //         typescript(/*{ plugin options }*/)
    //     ],
    //     experimentalCodeSplitting: true,
    //     experimentalDynamicImport: true
    // },
    // {
    //     input: 'client/index.ts',
    //     output: {
    //         dir: 'public/javascripts/nomodule',
    //         format: 'system',
    //     },
    //     plugins: [
    //         typescript(/*{ plugin options }*/)
    //     ],
    //     experimentalCodeSplitting: true,
    //     experimentalDynamicImport: true
    // }
]