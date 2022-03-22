import {Injectable} from '@angular/core';

@Injectable()
export class CookieManagerService {

    getItem(cookies: any, sKey: any): string | null {
        if (!sKey) {
            return null;
        }
        return decodeURIComponent(cookies.replace(new RegExp(
            '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1'
            )
        ) || null;
    }

    setItem(cookies: any, sKey: any, sValue: any, vEnd?: any, sPath?: any, sDomain?: any, bSecure?: any): string {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return cookies;
        }
        let sExpires = '';
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                    break;
                case String:
                    sExpires = '; expires=' + vEnd;
                    break;
                case Date:
                    sExpires = '; expires=' + vEnd.toUTCString();
                    break;
            }
        }
        return encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires +
            (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    }

    removeItem(cookies: any, sKey: any, sPath?: any, sDomain?: any): string {
        if (!this.hasItem(cookies, sKey)) {
            return cookies;
        }
        return encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
            (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
    }

    hasItem(cookies: any, sKey: any): boolean {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        return (new RegExp('(?:^|;\\s*)' +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\='
        )).test(cookies);
    }

    keys(cookies: any) {
        const aKeys = cookies.replace(
            /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, ''
        ).split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
}