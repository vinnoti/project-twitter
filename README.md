# project-twitter

List End Point:

- GET (url)/api/twitter/detail?id=2
- GET (url)/api/twitter/list
- POST (url)/api/twitter/create
- PATCH (url)/api/twitter/update?id=2
- DELETE (url)/api/twitter/delete?id=2

response example:

## Success
```
{
    "errorMessage": null,
    "result": [
        {
            "id": 2,
            "username": "christian",
            "post": "ini adalah post"
        },
        {
            "id": 15,
            "username": "christianmahardhika",
            "post": "ini post 2"
        }
    ],
    "success": true
}
```
## Failed
```
{
    "errorMessage": "Record not found!",
    "result": null,
    "success": false
}
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
