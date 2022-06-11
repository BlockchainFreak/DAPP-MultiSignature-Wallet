import React from "react";
import LoadingScreen from 'react-loading-screen';
 
export default function Loading() {
    return(
        <LoadingScreen
            loading={true}
            bgColor='#f1f1f1'
            spinnerColor='#7ec5d8'
            textColor='#676767'
            logoSrc=''
            text='Initializing your Wallet'
        > 
        </LoadingScreen>
    )
}