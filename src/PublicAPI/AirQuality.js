import React from 'react';
import "./AirQuality.css"
export default class AirQuality extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            AqiData : {}
        }
        this.fetchAirQualityData = this.fetchAirQualityData.bind(this)
    }

    componentDidMount(){
        this.fetchAirQualityData();
    }

    fetchAirQualityData(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://api.weatherbit.io/v2.0/forecast/airquality?city=Provo,UT&country=US&key=72761be16d86427e9f4cee1e8c5e5d43", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                result.data.forEach(element=>{
                    var str = element.timestamp_local;
                    var res = str.split("T");
                    // console.log(res[0]);
                    // console.log(res[1]);
                    
                    var c = element.aqi;
                    if(c<=50){
                        element.aqi_color='#009966';
                    }else if(c>50||c<=100){
                        element.aqi_color='#ffde33';
                    }else if(c>100||c<=150){
                        element.aqi_color='#ff9933';
                    }else if(c>150||c<=200){
                        element.aqi_color='#cc0033';
                    }else if(c>200||c<=300){
                        element.aqi_color='#660099';
                    }else{
                        element.aqi_color='#7e0023';
                    }

                    element.local_date=res[0];
                    element.local_time=res[1];
                    // console.log(element);
                    // element.push("local_time",res[1])
                })
                // console.log(result)
                this.setState({AqiData:result})
            })
            .catch(error => console.log('error', error));
    }

    render(){
        if(this.state.AqiData.data){
            return(
            <div className="airquality-wedget">
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            {this.state.AqiData.data.map((item,index)=>(
                            <td key={index} style={{backgroundColor:item.aqi_color}}>
                                <ul>
                                    <li>{item.local_date}</li>
                                    <li>{item.local_time}</li>
                                    <li>{item.aqi}</li>
                                </ul>
                            </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>)
        }else{
            return(<div>waiting for data</div>)
        }

        
    }
}