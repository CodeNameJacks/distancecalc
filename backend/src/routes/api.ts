import axios from "axios";
import express from 'express'
import logger from '../logger/logger';
import { Router, Request, Response } from 'express';
import {connectToDatabase} from '../db/database'
import morganMiddleware from '../middleware/morganMiddleware'; 
require("dotenv").config();


const router = Router();
const cors = require('cors');
const app = express();
router.use(morganMiddleware);
app.use(express.json());


/***** Rate Limiting *****/
const rateLimit = require('express-rate-limit');

// Rate limiter 
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: 'Too many requests from this IP, try again later.',
});

// Apply the rate limiter to all routes on this router
router.use(apiLimiter);



/******* FUNCTIONS ********/

/*save the distance query to the database
* @params address1
* @params address2
* @params distArr
* returns Success or Failed
*/
const saveDistance  = async (address1, address2, distArr) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('historical');
  
        const result =  await collection.insertOne({source_address: address1, distination_address: address2, distance_miles: distArr[0], distance_kilos: distArr[1]});
        
        if(result.acknowledged){
            return "Success"
        } else{ 
            logger.info('Database save attempt failed');
            console.log('Database save attempt failed');
            return "Failed"
        }
    } 
    catch (err) {
        logger.info('Try/catch triggered. Something when wrong saving to database. Error:' + err);
        console.log('Try/catch triggered. Something when wrong saving to database:', err);
        return ('Failed');
    }   
}

/*get Geocode address from Nominatim API
* @params address
* retruns an object of coordinates
*/
const getGeocode = async (address) => {
    const geoUrl = `https://nominatim.openstreetmap.org/search`;
    try{
        const response = await axios.get(geoUrl, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
        });
    
        if (!response.data.length) {
            throw new Error('Address not found');
        }
    
        const lat:string = response.data[0].lat;
        const lon:string = response.data[0].lon;
        console.log(lat);
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
    }
    catch(err){
        logger.info('Unable to get location geocode. ' +err);
        console.log("Try/catch triggered. Count not get geocode: error " +err );
        return ('Unable to get location. ' +err);
    }
}
  

/*compute distance usng Haversine Distance formula
* @params coord1 and coord2
* @params type
* @params address 1 adn address2
* returns and array (distArr)
*/
const calculateDistance = (coord1, coord2, type, address1, address2) => {
    let saveSuccess;
    try{
        let distArr:any = [ ]
        let cord1:any = JSON.parse(coord1);
        let cord2:any = JSON.parse(coord2);
        
        //function to covert degrees to radians
        const toRad = (x:number) => {return (x * (Math.PI/180))};
        const R = 3958.8; //radius of earth in miles

        const d1:number= toRad(cord1.lat);
        const d2:number = toRad(cord2.lat);
        
        const dLat:number = toRad(cord2.lat - cord1.lat);
        const dLon :number= toRad(cord2.lon - cord1.lon);

        const lat1:number = toRad(cord1.lat);
        const lat2:number = toRad(cord2.lat);

        const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) ** 2;
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        let distMiles:number = R * c;
    
        switch(type){
            case type ='Both': 
                distArr.push(distMiles.toFixed(2));
                distArr.push((distMiles * 1.6093).toFixed(2));
                break;
            case type = 'Miles':
                distArr.push(distMiles.toFixed(2));
                distArr.push('');
                break;
            case type ='Kilometers':
                distArr.push('');
                distArr.push((distMiles * 1.6093).toFixed(2));
                break;
            default:
                break; 
        }  

        if (distArr.length !){
            saveSuccess = saveDistance(address1, address2, distArr)
        }

        if(saveSuccess != 'Success'){
            return distArr; 
        }else{
            logger.info('Distance could not be computed for '+address1 + ' and ' + address2);
            console.log("Distance could not be computed");
            return("Failed: Not able to compete distance");
        }
    }
    catch(err){
        logger.info('Not able to compute distance for for ' + address1 + ' and ' + address2 + 'Error: ' + err);
        console.log('Try/catch triggerd. Not able to compute distance. Error ' +err);
        return (' Not able to compute distance. ' + err) ;
    }
}
 

/***** API ENDPOINTS  *****/

//Route api to calculate distance 
router.get('/calculateDistance', async (req, res) => {
    try {
        const { address1, address2, unit }= req.query;

        const getCoord1 = await getGeocode(address1);
        const getCoord2 = await getGeocode(address2);

        const coord1 = JSON.stringify(getCoord1);
        const coord2 = JSON.stringify(getCoord2);
        
        if(coord1.includes("Error")||(coord2.includes("Error"))){
            logger.info('Error: Address could not be found for ' + address1 +' or ' + address2 );
            console.log('Error: Address could not be found for ' + address1 +' or ' + address2 );
            res.send('400');
        }
        else{
            const distance = calculateDistance(coord1, coord2, unit, address1, address2);
            res.json({ distance: distance});
        }
    } 
    catch (err) {
        logger.info('Something went wrong in calculate distance API. Error: ' + err);
        console.log('Try/catch triggered in calculate distance API. Error: ' + err)
        res.status(400).json({ error: err });
    }
});
  


//get historical queries
router.get('/historical', async (req: Request, res: Response) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('historical');
  
        const data = await collection.find({}).toArray();
        res.json(data);   
    } 
    catch (err) {
        logger.info('Problem fetching historical data. Error: ' + err);
        console.log('Try/catch triggered in get hotorical data. Error: ', err);
        res.status(500).json({ error: err });
    }   
});
  
  

  module.exports = router;