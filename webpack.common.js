// Phase 3: Common config (dev/prod)
// Phase 4: Module Federation
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: 'auto'
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../lib/dist')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
    }
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/exposes/App',
        './LnbItems': './src/exposes/lnb-items.tsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        'react-router-dom': { singleton: true },
        '@reduxjs/toolkit': { singleton: true },
        'react-redux': { singleton: true }
      }
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),

    new Dotenv()
  ]
};
