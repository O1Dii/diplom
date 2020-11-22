const CACHE_NAME = "genomic-prediction-lab-portal-cache";
const urlsToCache = [];
const APP_URL_MAP = {};
const SKIP_URLS = [
    '/login',
    'http[s|]:\\/\\/.*\\/lab\\/.*',
    '/reset_password',
    '/admin/*'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((function(cache) {
                return cache.addAll(urlsToCache);
            }))
    )
});

self.addEventListener('fetch', function(event) {
    var request = event.request;

    if (event.request.method !== 'POST') {
        let noParamsUrl = event.request.url
            .replace(/\?.*$/, '');
        for (let link in APP_URL_MAP) {
            let re = new RegExp(link + '(/|)$');
            if (noParamsUrl.match(re)) {
                request = APP_URL_MAP[link];
                break;
            }
        }
    }

    var matchDone = function(response) {
        // Cache hit - return response
        if (response) {
            return response;
        }

        return fetch(event.request).then(
            function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                if (event.request.method === 'POST') {
                    return response;
                }

                for(let url of SKIP_URLS) {
                    let re = new RegExp(url);
                    if (event.request.url.match(re)) {
                        return response;
                    }
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(request, responseToCache);
                    });

                return response;
            }
        );
    };



    event.respondWith(
        caches.match(request)
            .then(matchDone)
    );
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
});