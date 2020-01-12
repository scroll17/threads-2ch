import timeConverter from './timeConverter';
//import getGroupThread from './getGroupThread';
import fetchByUrl from './fetchByUrl';

export async function getActualThreads(url = 'https://2ch.hk/b/threads.json'){
    try {
        const response = await fetchByUrl(url, 'Failed load Threads')
        const threads = await Promise.all(
                response.threads.map( async thread => {
                const { comment, num, views, timestamp } = thread;
                    //const details = await getGroupThread(num)
                    return {
                        comment: comment,
                        //details: details,
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
