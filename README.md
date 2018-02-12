![](./star.jpg)

---

> Give star to your repo's all dependent npm package.

## Why ?

I seen [@hzoo's "Maintainer, Heal Thyself"](https://github.com/hzoo/maintainer-heal-thyself). So I realized that's a diffcult and exhausting thing to be a open source maintainer. So I just want to say a 'Thank you' to all open source maintainers and contributors. So I lit their repository and made this tool.

## Install

You can install in gloabl or local. Recommend install in global to use it.

```
npm i star-dependencies -g
```

## Usage

Just `star` in repo path (with `package.json`).

```
star
```

## Auth

You can set your github username and password in `./config.json`, or you will input it everytime you run it.

> How to set `config.json` when installed global ?

You can check global npm installed path by `npm root -g`, If you install `star-dependencies` then will find this package in npm global node_modules. Then set the file `config.json`.


## License
MIT you know.
