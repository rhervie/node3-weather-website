const express = require('express')
const path = require('path')
const app= express()
const hbs = require('hbs')
const forecast = require('./utlity/forecast')
const geocode = require('./utlity/geocode')

// Port from Heroku
const port = process.env.PORT || 3000

// Define paths for Express Path to connect ot the file path

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath= path.join(__dirname,'/templates/partials')
const text = console.log(path.join(__dirname,'/'))
// Call the path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location 
app.use(express.static(publicDirectoryPath))

// Router to connect dynamic HTLM, CSS and Javascript

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Roosevelt Hervie',
        footer:''

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name : 'Roosevelt Hervie',
        profile: '',
        footer:''
    }) 
    })
app.get('/help',(req,res) =>{
    res.render('help', {        
        title: 'Help',
        name:'Roosevelt Hervie ',
        footer:''
    })
})
app.get('/Name', (req,res) =>{
    res.send([{
        Name:'Roosevelt Hervie',
        Location:'Weija Accra',
        footer:'Black'      
    },{
        name:'Wonder Tettey Hervie'
    }])
})
app.get('/weather',  (req,res)=>{
   if (!req.query.address) {
       return res.send({ 
        error:'You must provide an address'
    })
   }
  geocode(req.query.address, (error,{latitude,longitude,location}= {})=>{
   if (error) {
       return res.send({error})
   }
   forecast(latitude,longitude,(error, forcastData)=>{
       if (error){
          return ({error})
       }
       res.send({
           forecast:forcastData,
           location,
           address:req.query.address
       })
    })  
  
  })
})


app.get('/products', (req,res) =>{
    if (!req.query.search) {
    return     res.send({
         error:"You must provide a search citerial"       
        })
    }
    
app.get('/help/*', (req,res)=>{
    res.render('Page404',{
        title:'Page404',
        name:'Roosevelt Hervie',
        errorMessage:'Page Not Setup for Help Unit'
    })
    
})
})
app.get('*',(req,res)=>{
    res.render('Page404',{
        title:'Page404',
        name:'Roosevelt Hervie',
        errorMessage:'Page 404 not Found'
    })
})
app.listen(port ,()=>{
    console.log('Serve is up on port' + port)
})
