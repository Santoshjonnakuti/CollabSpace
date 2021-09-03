import React from 'react';

function Img(props){
    // console.log(props);
    return (
        <img src={props.src} alt={props.alt} width={props.width} height={props.height}/>
    )
}

export default Img
