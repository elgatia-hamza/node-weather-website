const path = require('path');
const express = require('express');
const hbs = require('hbs');

// importing utils 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


// Define paths for express config
const publicDirectory = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location 
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));



// app.com
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Hamza El Gatia'
    });
})

// app.com/about
app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About me',
        name:'Hamza El Gatia'
    });
})


// app.com/help
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        message:'An Example of help message!',
        name:'Hamza El Gatia'
    });
})







// app.com/weather
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided!'
        })
    }else{

        geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            
            forecast(latitude, longitude, (error, {weather_descriptions}={})=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send([{
                    forecast: weather_descriptions,
                    location: location,
                    address: req.query.address
                }])
            });
        });
        
    }
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
});


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage: 'Help article not found.',
        name: 'Hamza EL GATIA'
    })
})


// 404
app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found.',
        name: 'Hamza EL GATIA'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})