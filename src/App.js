import React, { Component } from 'react';
import { getActualThreads } from './utils/getActualThreads';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            threads: {}
        }
    }

    render(){
        const { threads } = this.state;
        console.log('threads: ', threads);
        return(
            <div>
                Threads:

            </div>
        )
    }

    async componentDidMount(){
        try{
            const threads = await getActualThreads();
            this.setState({
                threads
            })
        }catch(e){
            console.warn("Error: ", e)
        }
    }
}


export default App;
