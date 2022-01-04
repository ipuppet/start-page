# start-page

修改 `src/utils/global.js` 中 95 行 `backgroundImageApi` 来更改背景图片，该 api 应该返回一张图片

## 书签

书签需要 password 参数

如 https://yoursite.com/start-page/index.html?password=yourpassword

## 书签接口

修改 `.env.production` 文件中的 VUE_APP_DOMAIN 变量来更改打包后的网络请求域名

网络请求地址如下

```js
`${process.env.VUE_APP_TRANSFER_PROTOCOL}://${process.env.VUE_APP_DOMAIN}/api/bookmark?password=yourpassword`
```

因此您的后端需要有 `/api/bookmark` 的路由，并且需要验证 query 参数 `password`

- get 请求

    获取书签

- post 请求

    保存书签

### 格式

```json
[
    {
        "title": "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
        "url": "https://www.bilibili.com"
    },
    {
        "title": "Github",
        "url": "https://github.com"
    }
]
```
