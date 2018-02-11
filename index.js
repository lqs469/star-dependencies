const pj = require('./package.json')
const config = require('./config.json')
const octokit = require('@octokit/rest')()

const dp = pj.dependencies || {}
const ddp = pj.devDependencies || {}

console.log(dp, ddp)

function login (username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      var readline = require('readline')
      var rl = readline.createInterface(process.stdin, process.stdout)

      rl.question('what the username is? ', function(input) {
        username = input

        rl.question('what the password is? ', function(input) {
          password = input
          console.log(username, password)

          rl.close()
          process.stdin.destroy()
          resolve()
        })
      })
    }
  }).then(data => {
    octokit.authenticate({
      type: 'basic',
      username,
      password
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


function main () {
  login(config.username, config.password).then(() => {
    star('lqs469', 'star-dependencies').then(() => {
      console.log('STAR ⭐ OVER')
    })
  })
}

main()
