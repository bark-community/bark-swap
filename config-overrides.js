const webpack = require('webpack')
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {}
    Object.assign(fallback, {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve("browserify-zlib"),
        os: require.resolve('os-browserify'),
        url: require.resolve('url/'),
    })
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
    config.resolve.fallback = fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ])
    return config
}

// const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = function override(config, env) {
//     if (!config.plugins) {
//         config.plugins = [];
//     }

//     config.plugins.push(
//         (process.env.NODE_ENV === 'production') ?
//             new CopyWebpackPlugin([{ from: 'src/lib/legacyLib.js' }]) :
//             new CopyWebpackPlugin([{ from: 'src/lib/legacyLib.js', to: 'dist' }])
//     );

//     return config;
// }

