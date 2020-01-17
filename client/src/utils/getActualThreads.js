import timeConverter from './timeConverter';
import getGroupThread from './getGroupThread';
import fetchByUrl from './fetchByUrl';

export async function getActualThreads(url, limit = 30, customUrl){
    const defaultUrl = url ? 'https://2ch.hk/b/threads.json' : customUrl;
    try {
        const response = await fetchByUrl(
            defaultUrl, 
            { url: true },
            'Failed load Threads'
        )

        const threadsArray = response.threads.slice(0, limit);
        const threads = await Promise.all(
                threadsArray.map( async thread => {
                const { comment, num, views, timestamp } = thread;
                    const img = await getGroupThread(num)
                    return {
                        comment: comment,
                        img: `https://2ch.hk${img}`,
                        date: timeConverter(timestamp),
                        views: views
                    }
            })
        )
        return threads.sort((prev, next) => next.views - prev.views)
    } catch (e) {
        return e;
    }
}
