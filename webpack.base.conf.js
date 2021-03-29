let
    path = require ('path'),
    HtmlWebpackPlugin = require ('html-webpack-plugin'),
    { CleanWebpackPlugin } = require ('clean-webpack-plugin'),
    MiniCssExtractPlugin = require ('mini-css-extract-plugin'),
    CopyWebpackPlugin = require ('copy-webpack-plugin'),
    autoprefixer = require ('autoprefixer'),
    cssnano = require ('cssnano')

const PATHS = {
    src: path.join (__dirname, './src'),
    dist: path.join (__dirname, './dist'),
    assets: 'assets/'
}

let createHTMLWebpackPlugin = filename => {
    return new HtmlWebpackPlugin ({
        template: `./pug/pages/${filename}.pug`,
        chunks: [filename],
        filename: `./${filename}.html`
    })
}

module.exports = {
    context: PATHS.src,
    entry: {
        task: `${PATHS.src}/assets/ts/task.ts`,
        canvas: `${PATHS.src}/assets/ts/canvas.ts`,
        formulas: `${PATHS.src}/assets/ts/formulas.ts`,
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].js`
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.pug', '.css', '.sass', '.scss', '.png']
    },
    plugins: [
        createHTMLWebpackPlugin ('task'),
        createHTMLWebpackPlugin ('canvas'),
        createHTMLWebpackPlugin ('formulas'),
        new CleanWebpackPlugin (),
        new MiniCssExtractPlugin ({
            filename: `${PATHS.assets}/css/[name].css`
        }),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}images`,
                    to: `${PATHS.assets}images`
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }
                    }
                ],

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../images/',
                            outputPath: `${PATHS.assets}images`
                        }
                    }
                ]
            },
        ]
    }
}