var fs = require('fs');
const _ = require('lodash')

const title = process.argv[2]
const slug = _.kebabCase(title)

const today = new Date()

const day = today.getDate()
const month = today.getMonth() + 1
const year = today.getFullYear()

const pad = (n) => {
  return n < 10 ? '0' + n : '' + n;
}

const fullDate = `${year}-${pad(month)}-${pad(day)}`
const folderName = `${fullDate}___${slug}`

const pathContent = `./src/content/${folderName}`

if (!fs.existsSync(pathContent)) {
  fs.mkdirSync(pathContent);
}

const ISODate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString();

const headerTemplate = `---
title: "${process.argv[2]}"
date: "${ISODate}"
category: ""
tags: [""]
published: false
description: ""
---
`

const filename = `${pathContent}/index.md`
fs.writeFileSync(filename, headerTemplate)