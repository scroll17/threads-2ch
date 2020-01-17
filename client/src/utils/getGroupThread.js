import fetchByUrl from './fetchByUrl';

export default async function(url){
    try{
        let {
            threads
        } = await fetchByUrl(
            `https://2ch.hk/b/res/${url}.json`, 
            { url: true },
            'Failed load GroupThread'
        )

        return threads[0]
                .posts[0]
                .files[0]
                .thumbnail
    } catch (e) {
        throw new Error(e);
    }
}
