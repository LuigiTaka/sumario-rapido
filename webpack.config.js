const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: './src/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Text Rank',
            template: "src/index.html",

        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
     resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
         ".js": [".js", ".ts"],
         ".cjs": [".cjs", ".cts"],
         ".mjs": [".mjs", ".mts"]
        }
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            
            { 
                test: /\.([cm]?ts|tsx)$/, 
                loader: "ts-loader"
            }

        ],

    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};
