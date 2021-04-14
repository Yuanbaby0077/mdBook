# CORS跨域资源共享

## 同源策略

同源策略是一种安全机制为了限制当前文档所在的域如何于不同源的请求进行交互

### 定义

同源即：协议、域名、端口都相同的URL

## 预检请求

使用`OPTIONS`方法发送请求到服务端，询问服务端是否允许发送该请求。预检请求避免了跨域请求对服务器的用户数据产生影响。

### 预检请求头

* General

> Request URL: http://vt2-stg.paic.com.cn/api/util/getParams
> 
> Request Method: OPTIONS
> 
> Status Code: 200 Ok
> 
> Remote Address: 30.4.16.204:80
> 
> Referrer Policy: no-referrer-when-downgrade

* Request Headers
> Accept: 
> 
> Accept-Encoding: gzip, deflate
> 
> Accept-Language: zh-CN,zh;q=0.9
> 
> Access-Control-Request-Header: content-type,ws-auth,x-requested-with
> 
> Access-Control-Request-Method: POST
> 
> Host: http://vt2-stg.paic.com.cn
> 
> Origin: http://localhost:9090
> 
> Pragma: no-cache
> 
> User-Agent: Mozilla/5.0 ...

浏览器检测到，当前请求需要被预检，请求首部字段：（请注意，这些首部字段无须手动设置。 当开发者使用 XMLHttpRequest 对象发起跨源请求时，它们已经被设置就绪。）

`Origin`表示预检请求或者实际请求的源站，参数的值为源站 URI（统一资源标识符）。它不包含任何路径信息，只是服务器名称。

`Access-Control-Request-Header`表示`实际请求`首部将有自定义的三个字段`content-type`、`ws-auth`、`x-requested-with`

`Access-Control-Request-Method`表示`实际请求`中的请求方法为`POST`

* Response Headers

> Access-Control-Allow-Credentials: true
> 
> Access-Control-Allow-Header: content-type,ws-auth,x-requested-with,x-xsrf-token,origin,access-control-request-headers,access-control-request-method,user-agent,accept,referer
> 
> Access-Control-Allow-Methods: GET,POST,OPTIONS
> 
> Access-Control-Allow-Origin: http://localhost:9090
> 
> Access-Control-Max-Age: 100
> 
> Content-Type: application/octet-stream
> ...

预检请求的响应中 
`Access-Control-Allow-Header` 表示，允许实际请求的允许携带的首部字段
`content-type,ws-auth,x-requested-with,x-xsrf-token,origin,access-control-request-headers`

`Access-Control-Allow-Methods`表示，允许实际请求中允许使用的请求方法为 `GET`、`POST`、`OPTIONS`

`Access-Control-Max-Age` 表示，该预检请求结果的有效时间，上例100s以内重新发请求就不会再发起预检请求。

## 实际请求

* General

> Request URL: http://vt2-stg.paic.com.cn/api/util/getParams
> 
> Request Method: POST
> 
> Status Code: 200 Ok
> 
> Remote Address: 30.4.16.204:80
> 
> Referrer Policy: no-referrer-when-downgrade

* Request Headers
> Accept: application/json, text/plain, `*/*`
> 
> Accept-Encoding: gzip, deflate
> 
> Accept-Language: zh-CN,zh;q=0.9
> 
> Cache-Control: no-cache
> 
> Connection: keep-alive
> 
> Content-Length: 80
> 
> Content-Type: application/json;charset=UTF-8
> 
> Host: http://vt2-stg.paic.com.cn
> 
> Origin: http://localhost:9090
> 
> Pragma: no-cache
> 
> Referer: http://localhost:9090
> 
> User-Agent: Mozilla/5.0 ...
> 
> ws-auth: 
> 
> X-Requested-With: XMLHttpRequest
> 
> ...


* Response Headers

> Access-Control-Allow-Credentials: true
> 
> Access-Control-Allow-Header: content-type,ws-auth,x-requested-with,x-xsrf-token,origin,access-control-request-headers,access-control-request-method,user-agent,accept,referer
> 
> Access-Control-Allow-Methods: GET,POST,OPTIONS
> 
> Access-Control-Allow-Origin: http://localhost:9090
> 
> Access-Control-Expost-Headers: Content-Length,Content-Range
> 
> Content-Type: application/json;charset=utf-8
> ...

## crossorigin

参考[crossorigin]([crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin))

`crossorigin`属性，是用在 `<audio>`、`<img>`, `<link>`, `<script>`, 和 `<video>`元素上，支持这些元素使用`CORS`

可配置的属性值如下


value | description 
---------|----------
 anonymous | 
 use-credentials | B2 | C2
  "" | B3 | C3
