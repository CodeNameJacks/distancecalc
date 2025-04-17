<script lang=ts>
// @ts-nocheck

import {LL} from '../i18n/i18n-svelte'
import Title from '$lib/pageTitle.svelte'
import Hist_Btn from '$lib/viewHistBtn.svelte'
import calcImg from '$lib/images/calculator_img_wh.png'
import failedImg from '$lib/images/failed.png';
import closeImg from '$lib/images/close_x.png';
import axios from 'axios'
    import { setContext } from 'svelte';


 
const{VITE_BASE_URL} = import.meta.env
 

let address1 : '';
let address2 : '';
let distance1 : '';
let distance2 : '';
let address1Error : '';
let address2Error : '';
let radioTypes:string = [$LL.miles(), $LL.kilo(), $LL.both()];
let radioChoice : '';
let somethingWrong = false;

//  check if all fields are filled
$: allFilled = address1 && address2 && radioChoice;
$: addError= address1Error || address2Error
$: wrong = somethingWrong




const close =() =>{
    somethingWrong = false;
}

/* function calculate the distance between two addresses which exist as state variables. 
* No need to have them as parameters
*/
const calculateDistance = async() => {

    //check if the street inputs are of valid form 
    let isValid = validateAddressInput(address1, address2)
    if(isValid == false) return

    //if address valid compute distance
    try {
        const params = {
            address1 : address1,
            address2: address2,
            unit: radioChoice    
        };

        let response = await axios.get(VITE_BASE_URL + '/calculateDistance?', {params});
        let results = response.data.distance; 
        
        distance1 = results[0];
        distance2 = results[1]; 
        
    }
    catch(err){
        somethingWrong = true;
        console.log("Try/catch triggered. Something went wrong in calculateDistance. Error: " + err);

    }
return   
}

//helper function to reset Error message if input field empty
function validate() {
    if (address1.trim() === '' || address2.trim() === '') {
        address1Error = 'Enter a valid address (at least 3 characters, letters, numbers, spaces, or punctuation).';  
    } else {
        address1Error = '';
        address2Error = '';
    }
  }

/*check if address is valid. Gets called form calculate distance and prevents 
* distance calculation if address is not valid
* @parms address1
* @params address2
* return boolean isValid
*/
const validateAddressInput = (address1, address2) =>{
    let isValid = true;
    //regex to validate address input
    const addressRegex = /^\s*\S+(?:\s+\S+){2}/i;

    if (!addressRegex.test(address1)) {
        address1Error = 'Enter a valid address (at least 3 characters, letters, numbers, spaces, or punctuation).';
        isValid = false;
    }

    if (!addressRegex.test(address2)) {
        address2Error = 'Enter a valid address (at least 3 characters, letters, numbers, spaces, or punctuation).';
        isValid = false;
    }

    return isValid;
}
 

/* keep this to test initial set up connection to backend api
let data = "";
function test() {
  const url = 'http://localhost:3000/';
  const response = fetch("http://localhost:3000/api")
    .then(data => {
      console.log('Got data from API!', data)
    }).catch(err => {
      console.log('Something went wrong', err);
    });
}
test();
*/ 

</script>


<div class='headerWrapper'>    
    <Title/>
    <Hist_Btn/>
</div>
<div class="address_section"> 
    <div class='row'> 
        <div class="input_sections">
            <label for="address1" class="address_label">{$LL.source()}<span> *</span></label><br/>
            <input class="input" id="address1" bind:value={address1} oninput={validate} placeholder="input address" require />
            <p disabled={!addError} >{address1Error}</p>
        </div>
        <div class="input_sections">
            <label for='address2' class="address_label">{$LL.destination()}<span>*</span></label><br/>
            <input type="text" class="input" id="address2" bind:value={address2} placeholder="input address" require="require" />
            <input type="hidden" id="radioChoice" name="radioChoice" value={radioChoice}  require/>
        </div>
        <div id="radioButtons">
            <p class="address_label">{$LL.unit()}<span> *</span><br />
                {#each radioTypes as options}
                <label class="radioLabel"><input class="radioButton" type="radio" name="radio"  value={options} bind:group={radioChoice} />{options} </label><br/>
                {/each}
            </p>   
        </div>
        <div>
            <p class="address_label">{$LL.distance()}</p>
            <p id="distance_data" > {distance1} &nbsp; &nbsp; &nbsp; {distance2}</p>
        </div>
    </div>  
    <div>
        <button disabled={!allFilled} onclick={calculateDistance()} >{$LL.calcDistance()}<img src={calcImg} alt="calcImage" /></button>
    </div>  
</div>
<div hidden={!wrong} id="FailedBox">
   <img id="failedImg" src={failedImg} alt="failed Img"/> <h1>{$LL.calculationFailed()}</h1>
    <p>{$LL.wrongMessage()}</p>
    <button onclick={close} id="closeBtn"><img id="closeImg" src={closeImg} alt="close Img"/></button>
</div>



<style>
    span{
        color: #ff0000;
    }

    .input_sections p{
        color: #ff0000;
        font-size: 12px;
    }

   .headerWrapper{
        width: 1255px;
        margin-right: auto;
        margin-left: auto;
    }

    .input_sections{
        width: 413.5px;
    }

    .address_label{
        width: 100%;
        height: 20px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.32px;
        color: #4B4949
    }

    .input{
        width: 100%;
        padding: 11px 16px 11px 16px;
        margin-bottom: 16px;
        color: #000000;
        background-color: #F8F8F6;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        border: none;
        border-bottom: solid 1px #7D7D7C;
    }

    .address_section{
        background-color: #FFFFFF;
        width: 1248px;
        height: Hug(212px);
        margin-bottom: 32px;
        margin-right: auto;
        margin-left: auto;
    }

    .row{
        display: flex;
        justify-content: space-around;
        width: 1216px;
        margin-bottom: 32px;
    }

    .radioButton{
        accent-color: #000000;               
    }

    .radioLabel{
        padding-top: 1px;
        padding-bottom: 1px;
    }
    
    #distance_data{
        height: 18px;
        overflow-x: scroll;
        position: static; 
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
    }

    button:disabled {
		background-color: #e5e4e2;
		color: #666;
		cursor: not-allowed;
        opacity: 0.4;
	}

    button{
        padding: 12px 13px 12px 13px;
        margin-bottom: 32px;
        border: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        color: #FFFFFF;
        margin-left: 26px;
        background-color: #D10001;
    }

    img{
        height: 12px;
        width: 14px;
        margin-top: 2px;
        margin-left: 3px;
    }

    #FailedBox{
        height: 85px;
        border: solid 3px #FF3710;
        background-color: #FFF9ED;
        margin-bottom: 32px;
        margin-right:10px;
        position: fixed;
        bottom: 0;
        right: 0;       
    }
    
    #FailedBox h1{
        font-family: 'Inter' sans-serif;
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        letter-spacing: 0.16px;
        margin-top: -25px;
        margin-left: 40px;
    }
    #FailedBox p{
        font-family: 'Inter' sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        margin-top:-2px;
        margin-left: 10px;
    }

    #failedImg{
        width: 30px;
        height: 30px;
        margin-top: 2px;
    }
    
    #closeImg{
        margin-top: -9px;
        float:right;
        margin-right:-5px; 

    }
    #closeBtn{
        margin-top: -65px;
        float:right;
        opacity:1;
        background: #fff9ed;
        width:5px;
        height:5px;


    }

    

</style>
