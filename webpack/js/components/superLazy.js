import {lazy} from "react";

export const superLazy = func => lazy(() => func().catch(() => {
    caches.keys().then(function (keyList) {
        keyList.forEach(function (key) {
            caches.delete(key);
        });
        window.location.reload();
    })
}));