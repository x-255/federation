import type { VitePluginFederationOptions as Options } from '@originjs/vite-plugin-federation'
import * as dtsBundle from 'dts-bundle'
import path from 'path'
import replace from 'replace-in-file'

const DTS_OUT_PATH = getDistPath('index.d.ts')

type Exposes = Record<string, string>

export function createMFDts(options: Options) {
  return function () {
    bundleDts(options)
    replaceModuleName(options)
  }
}

function bundleDts(options: Options) {
  dtsBundle.bundle({
    name: options.name,
    main: getDistPath('src/main.d.ts'),
    out: DTS_OUT_PATH,
    indent: '  ',
  })
}

function replaceModuleName(options: Options) {
  const { exposes } = options
  const config = exposes2replaceConfig(exposes as Exposes)

  // @ts-ignore
  replace(config).catch((err) => {
    console.error(err)
  })
}

function exposes2replaceConfig(exposes: Exposes) {
  const entries = Object.keys(exposes).map((key) => [
    replaceExposeValue(exposes[key]),
    replaceExposekey(key),
  ])

  const from = getSubArray(entries, 0).map(string2re)
  const to = getSubArray(entries, 1)

  return {
    files: DTS_OUT_PATH,
    from,
    to,
  }
}

function string2re(value: string) {
  return new RegExp(value, 'g')
}

function getSubArray<T>(arr: T[][], index: number) {
  return arr.map((sub) => sub[index])
}

function replaceExposekey(key: string) {
  return key.replace('.', '')
}

function replaceExposeValue(value: string) {
  return value.replace('./src', '')
}

function getDistPath(...paths: string[]) {
  return path.resolve(__dirname, '../dist', ...paths)
}
