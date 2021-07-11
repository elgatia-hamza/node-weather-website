const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a65ca1f87c8c0724d5627371c8ba27d0&query='+ encodeURIComponent(latitude)+','+encodeURIComponent(longitude);


    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined);
        }else if(body.error){
            callback('Unable to find location!', undefined);
        }else{ 
            callback(undefined, {
                location: body.location.name,
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity,
                weather_descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}


module.exports = forecast;
