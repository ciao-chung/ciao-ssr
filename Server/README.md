# Ciao SSR

> A server side render service based on puppeteer

This is a puppeteer(chrome headless) server side render service.

## Feature

* Can limit render origin
* Cache

## Required

- Node.js 8.x up

## Dependencies

* [express](https://github.com/expressjs/express)
* [cache-manager](https://github.com/BryanDonovan/node-cache-manager)
* [puppeteer](https://github.com/GoogleChrome/puppeteer)

## How server side render work?

Before use this service, you must know how server side render work.

<img src="https://goo.gl/ioZGex" style="width: 800px; height: 600px; max-width: 100%">

Step | Role | File path| Do
-----|-----|-----|-----
1 | Proxy(.htaccess) | dist/.htaccess | Detect origin is crawler or not by checking user agent. 
2 | Middleware(ssr.php) | dist/ssr.php | Send the request with page's url to this service's http server.
3 | Puppeteer | :x: | If origin is valid, it will trigger server side render crawler(puppeteer) start.
4 | Response | :x: | The http server of this service will return response with render result.
5 | Middleware(ssr.php) | dist/ssr.php | Render the result to crawler.


**Icon Credit**

- **Person** icon made by [Vectors Market](https://www.flaticon.com/authors/vectors-market) from [www.flaticon.com](https://www.flaticon.com)
- **SPA** icon made by [Smashicons](https://smashicons.com) from [www.flaticon.com](https://www.flaticon.com)
- **Middleware** icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
- **Crawler** icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
- **Proxy** icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)
- **SSR Server** icon made by [Nhor Phai](https://www.flaticon.com/authors/nhor-phai) from [www.flaticon.com](https://www.flaticon.com)
- **Chrome** icon made by [Pixel perfect](https://icon54.com) from [www.flaticon.com](https://www.flaticon.com)


## Install Google Chrome

> Skip this step if you has install chrome browser

```bash
curl -sL https://raw.githubusercontent.com/ciao-chung/ciao-ssr/develop/Meta/install-chrome.sh | bash
```

## Setup/Start server

**Installation**

```bash
yarn global add ciao-ssr
```

**Start server**

```bash
ciao-ssr --config=/file-to-your/config.json
```

**Clean cache**

```bash
ciao-ssr --clean
```

## Configuration

> config json

**Example**

```json
{
  "allowOrigin": [
    "http://localhost:8081", "https://foo.bar"
  ],
  "cache": {
    "ttl": 60,
    "maxsize": 1000
  },
  "debug": true
}
```

* port(optional): **Number**, port of Node.js express app, default is 3000.
* host(optional): **String**, host of Node.js express app, default is 'localhost'.
* allowOrigin(required): **String/Array**, allow origin, you can set it as * if you don't want to limit any origin.
* timeout(optional): **Number**, if client don't trigger server side render service in this timeout, crawler will auto get page result and response, default is 5000ms, at most 15000ms.
* cache(optional): **Object**, configure cache feature.
  * ttl(optional): **Number**, time to life of cache(minutes), default is 1 minute.
  * maxsize(optional): **Number**, maxsize of cache file on disk(Kilobyte), default is 1MB.
  * path(optional): **String**, cache file store path, default is 'cache'.
* debug(optional): **Boolean**, debug mode, it will open chrome without headless mode.
* launchOptions(optional): **Object**, you can setup any custom puppeteer [launch option](https://goo.gl/zoshDo) by this property 

## Client side(web)

### Installation

```bash
yarn add ciao-ssr-client
```

### Copy proxy(.htaccess) and middleware(ssr.php) to web root

You can find them in node_modules/ciao-ssr-client

Or copy here

**.htaccess**

```apacheconfig
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{HTTP_USER_AGENT} !(firefox|chrome|safari|msie|edge|opera) [NC]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.*)$ ssr.php [L]

  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**ssr.php**

```php
<?php

$ssrHost = 'https://ssr.server';
$host = $_SERVER["REQUEST_SCHEME"].'://'.$_SERVER["SERVER_NAME"];
$user_agent = urlencode($_SERVER['HTTP_USER_AGENT']);
$port = '';

if($_SERVER["REQUEST_SCHEME"] == 'http' && $_SERVER["SERVER_PORT"] != 80){
    $port = ':'.$_SERVER["SERVER_PORT"];
}

if($_SERVER["REQUEST_SCHEME"] == 'https' && $_SERVER["SERVER_PORT"] != 443){
    $port = ':'.$_SERVER["SERVER_PORT"];
}
$requestUrl = $host.$port.$_SERVER['REQUEST_URI'];
$result = json_decode(file_get_contents($ssrHost.'/render?url='.$requestUrl), true);

if(!$result || !$result['statusCode']) {
    header("HTTP/1.0 404 Not Found");
    die;
}

http_response_code($result['statusCode']);
echo $result['content'];
```


### Use client library in web

We provide a client side library to trigger server side render service

```javascript
import ServerSideRenderClient from 'ciao-ssr-client'
ServerSideRenderClient()

// when your all async data are ready and render
SSR.done()

// when your page is in error type
SSR.error()

// when you want to custom error status code in error page
SSR.error(403)
```

## Apache configuration

**Enable apache rewrite/proxy/proxy_http modules**

```bash
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo service apache2 restart
```

**Setup domain**

```apacheconfig
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    ProxyRequests Off
    ProxyPreserveHost On
    ProxyVia Full
    <Proxy *>
        Require all granted
    </Proxy>
    <Location />
        ProxyPass http://localhost:3000/
        ProxyPassReverse http://127.0.0.1:3000
    </Location>
</VirtualHost>
```

**Enable domain and restart apache**
```bash
sudo a2ensite example.com.conf
sudo service apache2 restart
```

## Manage service with PM2

[PM2](http://pm2.keymetrics.io) is an advanced Node.js process manager.

You can manage server side render service easily by using PM2.

**Installation**

```bash
sudo yarn global add pm2
```

**Management**

```bash
# start service
pm2 start ciao-ssr --name="ssr" -- --config=/file-to-your/config.json

# stop service
pm2 stop ssr

# delete service
pm2 delete ssr

# show status
pm2 status ssr

# show log
pm2 log ssr
```