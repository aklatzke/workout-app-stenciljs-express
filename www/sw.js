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
    "revision": "f30f73601c1ed52f838887f71b7d291d"
  },
  {
    "url": "build/app/97cbuadv.es5.js",
    "revision": "1aab5691a55ce6253aaadc108cb1517b"
  },
  {
    "url": "build/app/97cbuadv.js",
    "revision": "f7b701b9a0d573c54a3a3149f7451f0d"
  },
  {
    "url": "build/app/app.vwnlfls8.js",
    "revision": "5563657cbb3cadd8097497ab733a11c5"
  },
  {
    "url": "build/app/app.ywobmiif.js",
    "revision": "616a019a2885d1ef4b0e74ea0293b9f2"
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
    "url": "build/app/d1xzug9o.es5.js",
    "revision": "a3e6ff70003dc354c8305e83294a0bee"
  },
  {
    "url": "build/app/d1xzug9o.js",
    "revision": "775fd765483da32a800bbec7c06a75c5"
  },
  {
    "url": "build/app/ge4gxuoo.es5.js",
    "revision": "ddf74c4bd2a4a013f5d0b427d160d046"
  },
  {
    "url": "build/app/ge4gxuoo.js",
    "revision": "81ee20c54a0e0143f4553a4050a0fafe"
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
    "url": "build/app/rh3kbbdg.es5.js",
    "revision": "645df8ca0f29adc9ca37afc17bf509c9"
  },
  {
    "url": "build/app/rh3kbbdg.js",
    "revision": "447de405b760e1e1ce05400d7c4d3ee7"
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
    "url": "build/app/wzzqawsd.es5.js",
    "revision": "ab3cf8a566ea6723d930dae5abdfd691"
  },
  {
    "url": "build/app/wzzqawsd.js",
    "revision": "c19cd06b049d8f8bb02497fedd424cb5"
  },
  {
    "url": "build/app/yahdu7bt.es5.js",
    "revision": "42ff4b7a4c9bf312ada47d0886fcd911"
  },
  {
    "url": "build/app/yahdu7bt.js",
    "revision": "c9a84353b6ed3021a436cdb72be83af5"
  },
  {
    "url": "build/app/zwyr53wo.es5.js",
    "revision": "ff6a2f2eb2524c4b0e494f1d12ebd788"
  },
  {
    "url": "build/app/zwyr53wo.js",
    "revision": "cd6611e77c2814a6ddd2bcc5aaae5dff"
  },
  {
    "url": "index.html",
    "revision": "38a109f1d0caa451259498315ec4de6f"
  },
  {
    "url": "manifest.json",
    "revision": "0c129721ede7cd25304ebdd238d774ad"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
