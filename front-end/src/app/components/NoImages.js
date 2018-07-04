import React from 'react'
import SadIcon from '../../assets/sad.png'
const NoImages  = () => (
    <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
            <img src={SadIcon} style={{width:"80px", height:"80px", textAlign:"center"}} />
            <h1 class="title">
                You don't have any photo yet!
            </h1>
            <h2 class="subtitle">
               But you can change this! Upload your best moment and share with bride and bride friends!
            </h2>
        </div>
    </div>
);

export default NoImages;