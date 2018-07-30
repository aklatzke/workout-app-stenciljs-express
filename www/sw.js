/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/css/paper-kit.css",
    "revision": "89d8c3d82a6bbf571ce24828a49ca6e9"
  },
  {
    "url": "assets/icon/favicon.ico",
    "revision": "d2f619d796fbe8bed6200da2691aa5b6"
  },
  {
    "url": "assets/icon/icon.png",
    "revision": "b96ad6e1e0b755c8cd45e6aec40bca25"
  },
  {
    "url": "assets/js/firebase.js",
    "revision": "994c17593d177da811b106b5ac53bf0d"
  },
  {
    "url": "build/app.css",
    "revision": "ac2b56b8e8f9f8d1d29cd75fc57b7d53"
  },
  {
    "url": "build/app.js",
    "revision": "d489c3ded09c145d48321a837df18366"
  },
  {
    "url": "build/app/2b23ycgv.es5.js",
    "revision": "febe9cf82ac65cbe71b397d475925059"
  },
  {
    "url": "build/app/2b23ycgv.js",
    "revision": "d9bdb7c82195f7527bf0dd5f5df87ad2"
  },
  {
    "url": "build/app/6zhb0fxf.es5.js",
    "revision": "aa0c18f264eba3c9aee969718524e015"
  },
  {
    "url": "build/app/6zhb0fxf.js",
    "revision": "eb3841d055c5400f29e93d2d4b2d4bc6"
  },
  {
    "url": "build/app/app.y1azaamh.js",
    "revision": "cb5033680987075e2287478f7b298f5d"
  },
  {
    "url": "build/app/app.ywobmiif.js",
    "revision": "616a019a2885d1ef4b0e74ea0293b9f2"
  },
  {
    "url": "build/app/ayc6wwlx.es5.js",
    "revision": "dd3f338b60ebfb1b8ef9003b7c8d5352"
  },
  {
    "url": "build/app/ayc6wwlx.js",
    "revision": "0320ba5962d7d02657f870677af2e60c"
  },
  {
    "url": "build/app/chunk-27ccbbe9.js",
    "revision": "c77e4a502e5c45df10e4336703124f8c"
  },
  {
    "url": "build/app/chunk-304dc430.js",
    "revision": "62af986d2ed391afa548f995f3319f57"
  },
  {
    "url": "build/app/chunk-807bbfbc.es5.js",
    "revision": "b1cd252d0a843d59bbcae1447a0ce71c"
  },
  {
    "url": "build/app/chunk-adebd19b.es5.js",
    "revision": "d770ebdb1181822339a58ab5ae753e23"
  },
  {
    "url": "build/app/chunk-cc815410.es5.js",
    "revision": "57b7d6f07b8a3cfa20dc30d7df477276"
  },
  {
    "url": "build/app/chunk-f2159162.js",
    "revision": "82ebe5b346c1b80e736df0c170a9b6c0"
  },
  {
    "url": "build/app/cotdvesv.es5.js",
    "revision": "c25655614cfa9334095dba0658bd1363"
  },
  {
    "url": "build/app/cotdvesv.js",
    "revision": "728b43544b15abe040607b43da981093"
  },
  {
    "url": "build/app/dwp4zn76.es5.js",
    "revision": "c9a8cb069e125b259375e7221b7b7881"
  },
  {
    "url": "build/app/dwp4zn76.js",
    "revision": "756a7867f9fbe8a4488747a0025c0f5e"
  },
  {
    "url": "build/app/jbntkkin.es5.js",
    "revision": "81b9961f918d099e8a1f325a53f0239d"
  },
  {
    "url": "build/app/jbntkkin.js",
    "revision": "2419d390a23e9f0299e25e61e1bd8b4e"
  },
  {
    "url": "build/app/m1ly74ym.es5.js",
    "revision": "a0d794e0888d5462add657546ae838a0"
  },
  {
    "url": "build/app/m1ly74ym.js",
    "revision": "3352f2ef862667ee2f07fe384fc58a49"
  },
  {
    "url": "build/app/o9hkhai2.es5.js",
    "revision": "8872a45b9cfc3cb5012cec55061fb8f7"
  },
  {
    "url": "build/app/o9hkhai2.js",
    "revision": "3bd1ca1c08b65b9d5804099f1bdf6898"
  },
  {
    "url": "build/app/ogzelk67.es5.js",
    "revision": "d2d82bc11ac04106e360bf9bb4d6117e"
  },
  {
    "url": "build/app/ogzelk67.js",
    "revision": "a0665e2caebb4039fdefc2c703331d45"
  },
  {
    "url": "build/app/ucc3bman.es5.js",
    "revision": "4c7641dfc84eb5fef0f157be0a8c2459"
  },
  {
    "url": "build/app/ucc3bman.js",
    "revision": "b9c0b704c6a7571852e1884c41388781"
  },
  {
    "url": "build/app/zcx6388d.es5.js",
    "revision": "3700dca3ad182ce5278697f0ca5ceae8"
  },
  {
    "url": "build/app/zcx6388d.js",
    "revision": "cc2c7adfcf1d021141eccac9db61828a"
  },
  {
    "url": "index.html",
    "revision": "35bdd9fa01b4950ace7e15ba9cbf5b6f"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
