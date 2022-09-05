const path=require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');




module.exports = {
    mode: "development",
    devtool:'cheap-module-source-map',
    entry: {
        popup:path.resolve('./src/popup/popup.tsx'),
        background:path.resolve('./src/background/backgroud.tsx'),
        contentScript:path.resolve('./src/contentScript/contentScript.ts'),

    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node-modules/

            }

        ]

    },
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.resolve('src/static'), to: path.resolve('dist') },
          

          ]
        }),
        ...getHtmlWebpackPlugins([
            'popup',
            'background',
          //  'contentScript'
            
        ])

      ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
            filename:'[name].js'
    },
    optimization: {
        splitChunks: {
            chunks:'all'
        }
    }
}

function getHtmlWebpackPlugins(chunks){
    return chunks.map(chunk => new HtmlWebpackPlugin({
        title:"YT AdSkipper",
        filename:chunk+".html",
        chunks:[chunk]
    }))
}