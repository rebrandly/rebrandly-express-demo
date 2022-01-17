# rebrandly-express-demo

Disclaimer: this project was generated using `node-express-boilerplate` package,  
and simplified so as to constitute an example of a simple HTTP server  
making use of [the `rebrandly-express` middleware](https://github.com/rebrandly/rebrandly-express).  

## example output
Find below evidence of content served direcly along with a 200 OK response by this app (`/`, `/home`, `/favicon.ico`, `/contact`),  
vs extra content (not found on the server) which is served via HTTP 302 redirection to Rebrandly servers (`/product-hunt` would be a branded link).

```
21:31:44 0|app  | 2022-01-15T21:31:44: info: Listening to port 3000
21:31:50 0|app  | 2022-01-15T21:31:50: info: ::1 - GET / 200 - 3.070 ms
21:31:50 0|app  | 2022-01-15T21:31:50: info: ::1 - GET /favicon.ico 200 - 1.896 ms
21:31:54 0|app  | 2022-01-15T21:31:54: info: ::1 - GET /home 200 - 0.644 ms
21:31:59 0|app  | 2022-01-15T21:31:59: info: ::1 - GET /contact 200 - 0.557 ms
21:32:03 0|app  | 2022-01-15T21:32:03: info: ::1 - GET /product-hunt 302 - 3.956 ms
```
___

## steps to activate domain aliasing

1) Add your domain name to your Rebrandly account: this is the same domain name the server is running on. Make sure to specify that this is an "alias domain".
2) Take note of the *alias domain name* Rebrandly will generate for you
3) Install the Rebrandly middleware as a project dependency
```
> npm install rebrandly-express
```

4) Open `/src/app.js` file (or equivalennt in your server): this is where typically middlewares are declared and installed
5) Include the rebrandly middleware in the file as a dependency
```
const rebrandly = require('rebrandly-express');
```

6) Locate the generic route where the 404 responses are returned. Typically, it's the latest `use` command.
```
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
```
7) Setup rebrandly middleware right before the 404 handler.  
Make sure to replace the alias in your config.js with the domain alias you noted in step 2.

```
...
app.use('/', routes);

app.use(rebrandly({ alias: config.rebrandly.alias }));

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
...
```

8) Run the server and wait for Rebrandly to verify your domain via HTTP

9) Create Branded Links in Rebrandly and enjoy your server redirecting them.
