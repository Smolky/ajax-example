/**
 * Example about AJAX request againsts OpenWeather API 
 *
 */

/** @var city String The String we are requesting */
var city = 'Murcia, es';

 
/** @var openweather_endpoint String OpenWeather API endpoint */
var openweather_endpoint = '//api.openweathermap.org/data/2.5/weather';


/** 
 * @var api_key String
 *
 * This is a sample API KEY, but it is possible to create 
 * an account and custom API Keys
 *
 * @see https://openweathermap.org/api 
 */
var api_key = '8ca74bce26e640f543f43338c59ed9d8';


/** @var weather_list DOM  */
var weather_list = $('.weather-list');



/** 
 * Refresh weather
 */

$('.reload-action').click (function (e) {
    
    // Empty
    weather_list.html ('');
    
    
    // Fetch a GET request in your city
    $.ajax ({
        
        // The base entry point to the request
        url: openweather_endpoint,
        
        // The datatype we expect to obtain
        dataType: 'json',
        
        // The type of the request
        type: 'GET',
        
        
        // The request
        data: {
           q: city,
           appid: api_key
       }, 
       
       
       // Ajax is asynchronous. When the request is done, this function
       // will be executed
       success: function (r) {
            
            // If succesfull, R will contain the response
            if ( ! r.weather) {
                return;
            }
            
            
            // Store in local storage
            window.localStorage.setItem ('weather-info', JSON.stringify (r));
            
            
            /** @var weather Object Information about the weather */
            var weather = r.weather[0];
            
            
            /** @var template DOM The HTML elements from the template inside a jQuery */
            var template = $($('#weather-template').html ());
            
            
            /** @var temperatureInCelsius float Convert from Kelvin */
            var temperatureInCelsius = ((r.main.temp * 1) - 273.15).toFixed (2);
            
            
            /** @var icon String  */
            var icon = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
                
                
            // Update the template with the weather info
            template
                .find ('.weather-card-state').html (weather.description).end ()
                .find ('.weather-card-location').html (r.name).end ()
                .find ('.weather-card-pressure').html (r.main.pressure).end ()
                .find ('.weather-card-temp').html (temperatureInCelsius).end ()
                .find ('.weather-card-humidity').html (r.main.humidity).end ()
                .find ('.weather-card-icon').attr ('src', icon).end ()
            ;
            
            // Put the item
            weather_list.html (template.prop ('outerHTML'));
           
       }
    });
    
}).trigger ('click');

