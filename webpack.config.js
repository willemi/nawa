const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');//抽离css样式,防止将样式打包在js中
const HtmlWebpackPlugin = require('html-webpack-plugin');//为html文件中引入的外部资源
const CleanWebpackPlugin = require('clean-webpack-plugin');//删除你以前build

let output = {
	path: path.resolve(__dirname, 'public'),
	filename: 'resource/js/[name].js',
	// chunkFilename: 'resource/js/common.js'
	},
	modules = {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				cacheDirectory: true
			}
		}, {
			test: /\.css$/,
			use: ExtractTextWebpackPlugin.extract({
				// publicPath: '../../',
				use: ['css-loader'],
				fallback: 'style-loader'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextWebpackPlugin.extract({
				// publicPath: '../../',
				use: ['css-loader','sass-loader'],
				fallback: 'style-loader'
			})
		},{
			test: /\.(eot|svg|ttf|woff|woff2)\w*/,
			loader: 'file-loader',
			query: {
				publicPath: '../fonts',
				outputPath: 'resource/fonts/',
				name: '[name].[ext]'
			}
		},{
			// 图片文件，生产环境使用url-loader，将小于10k的图片base64，并且名称hash化
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			query: {
				publicPath: '../img',
				outputPath: 'resource/img/',
				name: '[name].[ext]'
			}
		}, {
		// 当前新标签页统一使用的doT.js模板引擎，tpl模板文件引入dot-loader，返回doT.template('xxx.tpl')
			test: /\.tpl$/,
			loader: 'dot-loader',
			options: {}
		}]
	},
	plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		// 单独打包css文件
		new ExtractTextWebpackPlugin({
			filename: 'resource/css/[name].css',
			allChunks: true
		}),
		new CleanWebpackPlugin('public')
	],
	optimization = {
		splitChunks: {
			chunks: "all", 
			minSize: 0,   
			name: 'common',// 最小尺寸，默认0
			minChunks: 1,// 最小 chunk ，默认1
		}
	};
function getEntry(dir) {
	let entrys = {};
	try {
		fs.readdirSync(dir).forEach(file => {
			let filePath = dir + '/' + file;
			let fileName = path.basename(file, '.js');
			if (/\.js$/.test(filePath)) {
				entrys[fileName] = filePath;
			}
		})
	} catch (e) {}
	return entrys
};
function getPlugin(dir) {
	let entrys = [];
	try {
		fs.readdirSync(dir).forEach(file => {
			let fileName = path.basename(file, '.html');
			console.log(fileName,file)
			if (/\.html$/.test(file)) {
				entrys.push(new HtmlWebpackPlugin({
					chunks: ['common', fileName],
					// favicon: dir+'/resource/img/favicon.ico',
					// 生成目标文件时加上hash值，防止缓存
					// hash: true,
					// html主文件打包到跟目录，方便在客户端中调试
					filename: file,
					// html主模板文件
					template: dir + '/' + file
				}));
			}
		})
	} catch (e) {}
	return entrys
};
module.exports = {
	entry: getEntry('./src/resource/js'),
	output,
	module: modules,
	plugins: plugins.concat(getPlugin('./src')),
	optimization
};