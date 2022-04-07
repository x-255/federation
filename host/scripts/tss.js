/*
 * @Description:ts:sync ts类型同步
 * @LastEditTime: 2022-03-07 17:11:15
 */

const { DownloaderHelper } = require('node-downloader-helper')
const path = require('path')

const TYPE_DIR = path.resolve(__dirname, '../src/typings')
const DTS = [{ fileName: 'remote_app.d.ts', url: 'http://127.0.0.1:5500/remote/dist/index.d.ts' }]

async function downloadDts({ fileName, url }) {
  const dl = new DownloaderHelper(url, TYPE_DIR, {
    fileName,
    override: true,
  })

  dl.on('end', () => {
    console.log(`${fileName} 下载成功`)
  })

  dl.on('error', (err) => {
    console.log(`${fileName}下载失败`, err)
  })

  dl.start()
}

function run() {
  DTS.forEach((config) => {
    downloadDts(config)
  })
}

run()
