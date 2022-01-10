# start-page

一个简单的起始页

# get 参数

- backgroundImageApi

    base64 编码的图片 URL

- bookmarkApi

    base64 编码的后端地址，默认为：

    ```js
    const api = `${process.env.VUE_APP_TRANSFER_PROTOCOL}://${process.env.VUE_APP_DOMAIN}`
    const bookmarkApi = Base64.encode(`${api}/api/bookmark`)
    ```

- bookmarkApiPassword

    后端接口所使用的密码，不要进行编码

# 书签接口

假设您的后端地址为 `https://yoursite.com/api/bookmark`，则向后端请求时的 URL 将会被拼接成如下形式：

`https://yoursite.com/api/bookmark?password=yourpassword`

您的后端需要验证 query 参数 `password`

- get 请求

    获取书签

- post 请求

    保存书签

## 格式

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
