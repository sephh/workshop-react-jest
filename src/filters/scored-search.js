import {isArray, lowerCase, deburr, orderBy} from 'lodash';
import {findBestMatch} from 'string-similarity';

/**
 * @param originalArr: any[]
 * @param strSearch: string
 * @param fieldSearch: string | string[]
 * @param qtdRetItem: number
 * @param minRate: number
 * @returns {*[]}
 */
export default function scoredSearch(originalArr, strSearch, fieldSearch, qtdRetItem = 4, minRate = 0.3) {
    if ((originalArr.length === 0) || (strSearch === '')) {
        return originalArr;
    }

    const fields = (isArray(fieldSearch) ? fieldSearch : [fieldSearch]);

    let ret = originalArr.filter(f =>
        fields.reduce(
            (bool, field) =>
                lowerCase(deburr(f[field])).indexOf(lowerCase(deburr(strSearch))) > -1 || bool, false)
    );

    if (ret.length > 0) {
        return ret;
    }

    ret = [];
    const bms = fields.reduce((arr, field) => {
        const arrOpt = originalArr.map(item => item[field]);
        return [...arr, findBestMatch(strSearch, arrOpt)];
    }, []);

    const ratings = bms.reduce((arr, bm) => [...arr, ...bm.ratings], []);
    const sortedBm = orderBy(ratings, ['rating'], ['desc']);

    for (let i = 0; i < qtdRetItem; i++) {
        if (sortedBm[i]) {
            const it = originalArr.filter(f =>
                fields.reduce((bool, field) =>
                    (f[field] === sortedBm[i].target && sortedBm[i].rating > minRate) || bool,
                    false));
            ret.push(...it);
        }
    }

    return ret;
}