<<<<<<< HEAD
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-d1b0e804'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
=======
if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Sin título-1.png",revision:"d1abe60b5721e9800e90ca448ee8c974"},{url:"/_next/static/chunks/166-5ea32984fa071e86.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/247-3f92ef85b3b71ce5.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/451-9d14ab40c2ae361e.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/929-60e2cd68025b2899.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/main-50770868367ef490.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/_app-74fc50cbe3bfcde9.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/company/register-6b13682bc1ac1f0c.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/index-9c3839e59206bbbc.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/login-3a76c69a3ae7cca5.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/pages/user/register-fce08e28104fb2f9.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/chunks/webpack-2e51481b1d484a05.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/css/1a5ea985a8b0e277.css",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/css/1d62881109ec2017.css",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/css/33d306a40727e95f.css",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/media/bgmobile.78716540.png",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/media/bgweb.51e42ab6.png",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/w_IsqMwaIDrq-SVPv3fYm/_buildManifest.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/w_IsqMwaIDrq-SVPv3fYm/_middlewareManifest.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/_next/static/w_IsqMwaIDrq-SVPv3fYm/_ssgManifest.js",revision:"w_IsqMwaIDrq-SVPv3fYm"},{url:"/bg-ios.jpg",revision:"bc34a5333ddc684305a540dfe9afd1b9"},{url:"/bgmobile.png",revision:"bc2e452ac1b9223527e05f14cf7a4505"},{url:"/bgweb.png",revision:"6690f0d9e431a6847a78260999db89fb"},{url:"/datatable/buttons.dataTables.min.css",revision:"dab45883635e7adf11421cc67b3367ab"},{url:"/datatable/buttons.html5.min.js",revision:"19622eae27c319a8974498a0fc9eb37f"},{url:"/datatable/buttons.print.min.js",revision:"e14a75682830f1dc99c5f9c7ae4d669e"},{url:"/datatable/configDatatable.js",revision:"5eca6799266c310becbe9a1a34461477"},{url:"/datatable/dataTables.buttons.min.js",revision:"5a162addba18714d3fcec815d66569f7"},{url:"/datatable/datatables_es.json",revision:"cd180bbbdc39c10303c4820c6edf25a1"},{url:"/datatable/jquery-3.5.1.js",revision:"fb1817b96c65b6477cb55fedf53e86d9"},{url:"/datatable/jquery.dataTables.min.css",revision:"71186b8eec89152a5b99f7e271921d73"},{url:"/datatable/jquery.dataTables.min.js",revision:"0a7a08bb31cee05f0368178af261613e"},{url:"/datatable/jszip.min.js",revision:"32f5e474fb43ce373ec41e53723c2fcb"},{url:"/datatable/pdfmake.min.js",revision:"0f51e692cb625a101257b83e9a205445"},{url:"/datatable/vfs_fonts.js",revision:"be13d860967f745fb49937dcf0a8dc1b"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/login-bg-ios.jpg",revision:"c7c4a53da5844a07da5d24752378b755"},{url:"/logo.png",revision:"19af5810c96a005b007cbcf3400ebc4f"},{url:"/logo192.png",revision:"fadd102f15891302f4cd63c153c337b9"},{url:"/logo22.png",revision:"c5e036aa1b23c9fb76995fe92944fa73"},{url:"/logo2_care.png",revision:"15aae0d6e775c0c556d63c8f5e17d16b"},{url:"/logo512.png",revision:"19af5810c96a005b007cbcf3400ebc4f"},{url:"/manifest.json",revision:"85b09ee2aac9c223568a416cd681f5f1"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
>>>>>>> ec78c946e8853e40857c7062961b93b6a317b8c8
