'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1132d70f669cb3db341d155fb6800d48",
"assets/assets/giaidoan/giaidoan.jpg": "d934215971d201432ecd4c0e239903a0",
"assets/assets/images/logo.png": "edf86854de668859182ee6005164f3e9",
"assets/assets/images/logo2.png": "cddd839c9cd50c466d75f47dc62c1137",
"assets/assets/khoaglocom/bsDotan1.png": "ad8eddfaa6e13bf7659cbb1f69764b83",
"assets/assets/khoaglocom/bsHien.jpg": "a9caf5814f4c3642f3c1a1056bcf8bec",
"assets/assets/khoaglocom/bsVA.jpeg": "6d9aa208a744e27028f38dff9c652fbb",
"assets/assets/khoaglocom/chucnang.jpg": "51cc18553a70c2309f98ccb1af9d467f",
"assets/assets/khoaglocom/giangbai.jpg": "60b002db6e8104110343e2a1c0b34a92",
"assets/assets/nhanap/nhanap1.JPG": "feac6cef507d36d7ccdc0d931098483d",
"assets/assets/nhanap/nhanap2.jpg": "c8f1458fb5ecf5207047fff7a109bc73",
"assets/assets/nhanap/nhanap3.jpg": "f3001cac34fd667ea98cd2904e3b8d99",
"assets/assets/nhanap/nhanap4.png": "6f1f6581abd6b1c1664946b1834aa90e",
"assets/assets/phacdo/phacdo0.png": "7e2a1c86d924d80c2adeec3959f06d13",
"assets/assets/phacdo/phacdo1.jpg": "e5ff5134503238c207e0cc2074f067fb",
"assets/assets/phacdo/phacdo2.jpg": "02a582ff4841152bb4bbb5fd1cc0e757",
"assets/assets/phacdo/phacdo3.jpg": "54020336b1ed16338f32a4bbd0b535f4",
"assets/assets/phacdo/phacdo4.jpg": "8ac0de0a99c12ec2699554f1b7a58d02",
"assets/assets/phacdo/phacdo5.jpg": "ac59f0efc01af551bfffff5e92f404a9",
"assets/assets/tailieu/baibao1.JPG": "dd2f79a36b8f88ace5611269273408af",
"assets/assets/tailieu/baibao2.jpg": "2c8f6f640117e6fd789747cae3a500df",
"assets/assets/tailieu/baibao3.jpg": "02fc16c19cc65ed94b98c848a3b41a7a",
"assets/assets/tailieu/baibao4.JPG": "a87b2cf4173403dea98c75c208b102a2",
"assets/assets/thuoc/alpha.JPG": "4d4d647783989d3576719d88182680f4",
"assets/assets/thuoc/alpha2.JPG": "4ad7f062a670ffcda329cf12995721c9",
"assets/assets/thuoc/beta.JPG": "b3fe14a0e1eeb322246ab6ab17290f47",
"assets/assets/thuoc/cai.JPG": "e7c361be532f547640779b09c67d7220",
"assets/assets/thuoc/cholinergic.JPG": "56410bb41540180a9fba2e81843156f9",
"assets/assets/thuoc/pg.JPG": "595289970370fb936759af83cc0d034b",
"assets/assets/thuoc/phoihop.JPG": "bcc58dabc9d1b17c9f8a5435e022393f",
"assets/assets/thuoc/phoihop2.JPG": "605f69c6e04a50e3b3b3cc1b54bdf3c9",
"assets/assets/thuoc/phoihopthuoc.JPG": "ce2241b8ff7780e35f2b728d38915f88",
"assets/assets/thuoc/thuoc0.JPG": "09f8ad873eab9e449d80779cf6ae6c6a",
"assets/assets/thuoc/thuoc1.jpg": "7672d0ad1e2b7cf3a9931f401fe40e5e",
"assets/assets/thuoc/thuoc2.jpg": "fc1eed9ffe106a2bea9d7125c2d2bfe3",
"assets/assets/thuoc/thuoc3.jpg": "28bd1cc4972d80f6bc05b22f38beb5d3",
"assets/assets/thuoc/thuoc4.jpg": "7ccbe6e1f885e31091c2ad2a6d5b3f70",
"assets/assets/thuoc/thuoc5.JPG": "5d1721a03fc5d6a27fe3cdaf380cada2",
"assets/assets/thuoc/thuoc6.JPG": "d0f30cb30e7839b838dee25b7b6290ad",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "272623dbbdf32acf2e4a78061062b9a6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "59ab48ec10f316001be2b2e9b257df18",
"/": "59ab48ec10f316001be2b2e9b257df18",
"main.dart.js": "1583b8755503afa8ac5d7d1942a0c022",
"manifest.json": "f3198846d4d3359f9b4671816a8dbfd6",
"version.json": "6f839aedb79facc1045e2cda73fd1559"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
