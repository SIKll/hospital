/**
 * @author iitii
 * @date 2021/1/25 19:31
 */
'use strict';
const axios = require('axios'),
  cheerio = require('cheerio')

async function getRawText(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => cheerio.load(res.data))
      .then($ => {
        // const table = $('#listTable tbody tr')
        // table.map(_ => _.text())
        return resolve($('#listTable').text())
      })
      .catch(e => reject(e))
  })
}

function decodeRaw(text) {
  // console.log(text)
  const s1 = text.replace(/\t/g, '').split(/\n+/g)
  const s2 = s1.slice(1, s1.length - 1)
  const s3 = []
  for (let i = 0; i < s2.length; i++) {
    if (s2[i].match('个') !== null) {
      s3.push(s2.slice(i - 3, i + 2))
    }
  }
  // console.log(s4)
  // console.log(text)
  return s3.map(_ => _.join(','))
}

// getRawText(`http://reg.btch.edu.cn/web/ghao?outdepid=1E200&currentdate=2021-01-28&hospitalid=17`)
//   .then(raw => {
//     decodeRaw(raw)
//   })

// setInterval(
(async () => {
  for (let i = 27; i < 30; i++) {
    await getRawText(`http://reg.btch.edu.cn/web/ghao?outdepid=1E200&currentdate=2021-01-${i}&hospitalid=17`)
      .then(raw => {
        console.log(`Date: 2021-01-${i}`)
        console.log(decodeRaw(raw).join('\n'))
      })
  }
})()
// }, process.env.SPIDER_TIMEOUT || 1000 * 60)
