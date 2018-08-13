# Puppeteer Server Side Render

> A server side render service based on puppeteer

This is a puppeteer(chrome headless) server side render service.

## Feature

* Can limit render origin
* Cache

## Dependencies

* [express](https://github.com/expressjs/express)
* [cache-manager](https://github.com/BryanDonovan/node-cache-manager)
* [puppeteer](https://github.com/GoogleChrome/puppeteer)

## How server side render work?

Before use this service, you must know how server side render work.

Step | Role | File path| Do
-----|-----|-----|-----
1 | Proxy(.htaccess) | dist/.htaccess | Detect origin is crawler or not by checking user agent. 
2 | Middleware(ssr.php) | dist/ssr.php | Send the request with page's url to this service's http server.
3 | Puppeteer | :x: | If origin is valid, it will trigger server side render crawler(puppeteer) start.
4 | Response | :x: | The http server of this service will return response with render result.
5 | Middleware(ssr.php) | dist/ssr.php | Render the result to crawler.

## Install Google Chrome

> Skip this step if you has install chrome browser

```bash
sudo apt-get install libxss1 libappindicator1 libindicator7 -y
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f
rm google-chrome-stable_current_amd64.deb
```

## Start service

**Clone repository**

```bash
git clone git@github.com:ciao-chung/puppeteer-server-side-render.git
```

**Go into Server folder and install node modules**

```bash
cd Prod/Server

yarn
```

**Setup config by coping the example config**

> In Prod/Server/static

```bash
cp config.example.json config.json
```

**Start server**

> In Prod/Server

```bash
npm run start
```

## Configuration

> Prod/Server/static/config.json

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
* cache(optional): **Object**, configure cache feature.
  * ttl(optional): **Number**, time to life of cache(minutes), default is 1 minute.
  * maxsize(optional): **Number**, maxsize of cache file on disk(Kilobyte), default is 1MB.
  * path(optional): **String**, cache file store path, default is 'cache'.
* debug(optional): **Boolean**, debug mode, it will open chrome without headless mode. 

## Client side(web)

**Installation**

**npm**

```bash
npm install puppeteer-server-side-render --save
```

**yarn**

```bash
yarn add puppeteer-server-side-render
```

**Copy proxy(.htaccess) and middleware(ssr.php) to web root**

> You can find them in puppeteer-server-side-render in node_modules

```bash
cd node_modules/puppeteer-server-side-render/dist/
```

**Use client library in web**

We provide a client side library to trigger server side render service

```javascript
import SSR from 'puppeteer-server-side-render'

// when your all async data are ready and render
SSR.done()

// when your page is in error type
SSR.error()

// when you want to custom error status code in error page
SSR.error(403)
```

## Apache configuration

**Enable apache proxy/proxy_http modules**

```bash
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
pm2 start app.js --name "ssr" --cwd==/path-to-ssr

# stop service
pm2 stop ssr

# delete service
pm2 delete ssr

# show status
pm2 status ssr

# show log
pm2 log ssr
```