// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModule } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join, resolve } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
/* import { AppModule } from'./src/main'; */


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  // Faster server renders w/ Prod mode (dev mode never needed)
  enableProdMode();
  const server = express();
  /* const distFolder = join(process.cwd(), 'dist/client/browser'); */
  const distFolder = '/var/www/ak/dist/client/browser';
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const indexHtmlShop = existsSync(join(distFolder, 'shop/index.html'))  ? 'shop/index.html' : 'index';
  const indexHtmlNotFound = existsSync(join(distFolder, 'pages/not-found/index.html')) ? 'pages/not-found/index.html' : 'index';
  const indexHtmlThanks = existsSync(join(distFolder, 'pages/thanks/index.html')) ? 'pages/thanks/index.html' : 'index';

  const domino = require("domino");

const win = domino.createWindow(indexHtml);
win.Object = Object;
win.Math = Math;

global["window"] = win;
global["document"] = win.document;
global["localStorage"] = win.localStorage;


  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  //var REQUEST: typeof Request;
  //var RESPONSE: typeof Response; 
  // All regular routes use the Universal engine
  /* server.get('/', (req, res) => {
    res.render(indexHtmlShop, {
       req, 
       res,
       providers: [ {provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}] 
      });
  }); */
  // All regular routes use the Universal engine
  /* server.get('*', (req, res) => {
  res.render('index', { req });
}); */
  server.get('*', (request, response) => {
    renderModule(AppServerModule, {
      url: request.url,
      document: '<app-root></app-root>',
      extraProviders: [
        {provide: APP_BASE_HREF, useValue: request.baseUrl},
        {provide: REQUEST, useValue: request},
        {provide: RESPONSE, useValue: response}
      ] 
      }).then(html => {
        console.log('home success');
        response.status(200).send(html);
      }).catch(err => {
        console.log(err);
        response.sendStatus(500);
      });
    }); 
  /* server.get('/shop', (req, res) => {
    res.render(indexHtmlShop, {
       req, 
       res,
       providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}] 
      });
  }); */
  /* server.get('#/shop', (request, response) => {
  renderModule(AppServerModule, {
    url: request.url,
    document: '<app-shop-products></app-shop-products>',
    extraProviders: [
      
      {provide: APP_BASE_HREF, useValue: request.baseUrl},
      {provide: REQUEST, useValue: request},
      {provide: RESPONSE, useValue: response}
    ] 
    }).then(html => {
      console.log('shop success');
      response.status(200).send(html);
    }).catch(err => {
      console.log(err);
      response.sendStatus(500);
    });
  });  */
  /* server.get('/shop', (request, response) => {
    renderModule(ShopModule, {
      document: indexHtmlShop,
      url: request.url,
        extraProviders: [
            {provide: APP_BASE_HREF, useValue: request.baseUrl},
            {provide: REQUEST, useValue: request},
            {provide: RESPONSE, useValue: response}
       ]
  })
      .then(html => {
          response.status(200).send(html);
      })
      .catch(err => {
          console.log(err);
          response.sendStatus(500);
      }); 
}); */
  /* server.get('pages/not-found', (req, res) => {
    res.render(indexHtmlNotFound, {
       req, 
       res,
       providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}] 
      });
  });
  server.get('pages/thanks', (req, res) => {
    res.render(indexHtmlThanks, {
       req, 
       res,
       providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}] 
      });
  }); */
  /* server.get('/', (request, response) => {
    renderModule(AppServerModule, {
      url: request.url,
      document: '<app-home></app-home>',
      extraProviders: [
        {provide: APP_BASE_HREF, useValue: request.baseUrl},
        {provide: REQUEST, useValue: request},
        {provide: RESPONSE, useValue: response}
      ] 
      }).then(html => {
        console.log('home success');
        response.status(200).send(html);
      }).catch(err => {
        console.log(err);
        response.sendStatus(500);
      });
    });  */
  /* server.get('/', (request, response) => {
    renderModule(HomeModule, {
      document: indexHtml,
      url: request.url,
        extraProviders: [
            {provide: APP_BASE_HREF, useValue: request.baseUrl},
            {provide: REQUEST, useValue: request},
            {provide: RESPONSE, useValue: response}
       ]
  })
      .then(html => {
          response.status(200).send(html);
      })
      .catch(err => {
          console.log(err);
          response.sendStatus(500);
      }); 
});*/

  return server;
}

function run(): void {
  
  const port = process.env['PORT'] || 4000;
  const privateKey  = readFileSync(resolve(__dirname, '../browser/assets/ssl/cert.key'), 'utf8');
  const certificate = readFileSync(resolve(__dirname, '../browser/assets/ssl/cert.pem'), 'utf8');
  const credentials = {key: privateKey, cert: certificate};
  // Start up the Node server
  const server = require('https').createServer(credentials, app());
  server.listen(port, () => {
    console.log(`Node Express server listening on https://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
