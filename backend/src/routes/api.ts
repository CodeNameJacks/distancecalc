import axios from "axios";
import express from 'express'
import { Router, Request, Response } from 'express';
import {connectToDatabase} from '../db/database'

const router = Router();
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();

app.use(express.json());


/**** FUNCTIONS AND API ENDPOINTS  *****/
/*
//get Geocode address from Nominatim API
async function getGeocode(address) {
    const geoUrl = `https://nominatim.openstreetmap.org/search`;
    const response = await axios.get(geoUrl, {
        params: {
            q: address,
            format: 'json',
            limit: 1
        },
        headers: {
            'User-Agent': 'DistanceCalculatorApp'
        }
    });
  
    if (!response.data.length) {
        throw new Error('Address not found');
    }
  
    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  }
  
  //compute distance usng Haversine Distance formula
  function calculateDistance(coords1, coords2) {
    let distArr = []
    
    const toRad = (x:number) => x * (Math.PI / 180);
    const R = 3958.8; //radius of earth in miles
  
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
  
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);
  
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
  
    let miles = R * c;
   // if(mile){
    //  distArr.push(miles);
   // }
   /* if(kiloparam || both){
      let kilo = miles * 1.60934;
    }
    */
    
   // return R * c;
  //}
  
  // Route to calculate distance 
 /* app.post('/distance', async (req, res) => {
    try {
        const { address1, address2 } = req.body;
        const coords1 = await getGeocode(address1);
        const coords2 = await getGeocode(address2);
  
        const distance = calculateDistance(coords1, coords2);
  
        res.json({ distance: distance.toFixed(2) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });
  */

  //get historical queries
  router.get('/historical', async (req: Request, res: Response) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('historical');
  
        const data = await collection.find({}).toArray();
        res.json(data);
    
    } 
    catch (error) {
        console.error('Error fetching historical data:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
    
  });
  
  

  module.exports = router;