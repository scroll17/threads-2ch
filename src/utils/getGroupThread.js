import fetchByUrl from './fetchByUrl';

export default async function(url){
    try{
        let {
            BoardName
        } = await fetchByUrl(`https://2ch.hk/b/res/${url}.json`, 'Failed load GroupThread')
        return {
            BoardName
        }
    } catch (e) {
        throw new Error(e);
    }
}
