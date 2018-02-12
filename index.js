#!/usr/bin/env node

const pj = require('./package.json')
const config = require('./config.json')
const fetch = require('isomorphic-fetch')
const octokit = require('@octokit/rest')()

const dp = pj.dependencies || {}
const ddp = pj.devDependencies || {}

console.log(`[${Object.keys(dp).length} dependencies]`)
Object.keys(dp).forEach((d) => console.log('-', d))
console.log('\n')

console.log(`[${Object.keys(ddp).length} devDependencies]`)
Object.keys(ddp).forEach((d) => {
  console.log('-', d)
  dp[d] = ddp[d]
})
console.log('\n')

function login (username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      const prompt = require('prompt')

      prompt.message = ''
      prompt.start()
      prompt.get([
        { name: 'username', description: 'Github Usrname' },
        { name: 'password', hidden: true, replace: '*', description: 'Github Password' }
      ], (err, result) => {
        resolve(result)
      })
    } else {
      resolve({ username, password })
    }
  }).then(data => {
    octokit.authenticate({
      type: 'basic',
      username: data.username,
      password: data.password
    })
  })
}

function star (owner, repo) {
  return octokit.activity.starRepo({ owner, repo }).then(result => {
    return result
  })
}

function unstar (owner, repo) {
  return octokit.activity.unstarRepo({ owner, repo }).then(result => {
    return result
  })
}

function findAllRepo (dp) {
  const registryurl = 'http://registry.cnpmjs.org'

  const ap = Object.keys(dp).map(d => {
    return new Promise((resolve, reject) => {
      const url = registryurl + '/' + d
      fetch(url).then(res => res.json())
      .then(res => {
        const matched = (/github.com\/(.+)\/(.+)\./g).exec(res.repository.url)
        resolve({
          owner: matched[1],
          repo: matched[2]
        })
      })
    })
  })

  return Promise.all(ap)
}

function main () {
  login(config.username, config.password).then(() => {
    findAllRepo(dp).then(data => {
      data.forEach(r => {
        star(r.owner, r.repo).then(() => {
          console.log(`⭐  Star => ${r.repo}(${r.owner})`)
        })
      })
    })
  })
}
main()
