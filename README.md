# start-page

修改 `.env.production` 文件中的 VUE_APP_DOMAIN 变量来更改打包后的网络请求域名

修改 `src/utils/global.js` 中 95 行 `backgroundImageApi` 来更改背景图片，该 api 应该返回一张图片

## 书签接口

`${api}/api/bookmark?password=`

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
