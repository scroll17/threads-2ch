import React, { Component } from 'react';
import { getActualThreads } from './utils/getActualThreads';

import Thread from './Thread/Thread';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            threads: []
        }
    }

    render(){
        const { threads } = this.state;
        console.log('threads: ', threads);
        return(
            <div>
                Threads:
                {
                    threads.map( data => {
                        return <Thread {...data}/>
                    })
                }
            </div>
        )
    }

    async componentDidMount(){
        try{
            const threads = await getActualThreads('https://2ch.hk/b/threads.json', 5);
            this.setState({
                threads
            })
        }catch(e){
            console.warn("Error: ", e)
        }
    }
}


export default App;
