import { defineConfig } from 'vite'
import path from 'path'

import tsConfig from './tsconfig.json'

function formatPaths(paths)  {
  let obj = {}
  for (const pathKey of Object.keys(paths)) {
    obj = Object.assign(obj, {
      [pathKey.split('/*')[0]]: path.resolve(__dirname, './' + paths[pathKey][0].slice(2, paths[pathKey].includes('/*') ? -2 : -1))
    })
  }
  return obj
}

export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: formatPaths(tsConfig.compilerOptions.paths)
  }
})