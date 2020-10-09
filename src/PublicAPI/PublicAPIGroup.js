import React from 'react';
import AirQuality from './AirQuality';
import Weather from './Weather';
export default class PublicAPIGroup extends React.Component{
    render(){
        return(

            <div className="board-wedget">
                <div className="board-wedget-header">
                
                </div>
                <div className ="board-wedget-body">
                    <Weather />
                    <AirQuality />
                </div>
            </div>
            
        )
    }
}