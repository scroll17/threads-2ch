import React from 'react';

function Thread(props){
    const { comment, img: src, date } = props;

    return(
        <div>
            <div>
                {date}
            </div>
            <div>
                <img src={src}/>
                <p>
                    {comment}
                </p>
            </div>
        </div>
    )
}

export default Thread;