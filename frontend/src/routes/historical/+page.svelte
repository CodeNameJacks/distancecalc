<script>
// @ts-nocheck

    import {LL} from "../../i18n/i18n-svelte"
    import Title from '$lib/pageTitle.svelte'
    import calcImg from '$lib/images/calculator_img_bk.png'
    import { goto } from '$app/navigation';
    import {onMount} from 'svelte'
    import axios from 'axios'
    

    const{VITE_BASE_URL} = import.meta.env

    
    
     
      /**
     * @type {any }
     */
     let data = [];

     // @type {any }
     
     let chunkedItems;
   
    /**** functions and API calls ****/
    
    
    function goToCalculator (){
        goto('/')
    }

  

    //get historical data 
    onMount(async () => {
        
       
        try {
            let response = await axios.get(VITE_BASE_URL + '/historical');
            // @ts-ignore
            let histData = response.data;
            //d = JSON.stringify(histData[0].source_address)
            alert((histData).length)
            alert(JSON.stringify(histData[0]).length);

           for( let i=0; i< histData.length; i++){
                 Object.entries(histData[i]).forEach(([key, value]) => {
                    if(`${key}` != "_id"){

                     data.push(`${value}`);
                    }
                
            });
        }
           
        let numOfRows = 4;
            console.log("DATA");
            console.log(JSON.stringify(data));

          // Break flat array into chunks of 'columnsPerRow'
        // @ts-ignore
        function chunkArray(array, size) {
        const chunks = [];
            for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
            }
            return chunks;
        }

         chunkedItems = chunkArray(data, numOfRows);

           // alert(data)
        }
        catch(err){
            console.log("Error getting historical quiereis: " + err);
        }
        return      
    
    })

    
   
</script>

<div class='headerWrapper'>    
    <Title/>
    <button on:click={goToCalculator} id="submit">{$LL.backToCalc()}<img src={calcImg} alt="calcImage" /></button>
</div>
<div class="main_section"> 
    <div class='subTitle'>  
        <h1>{$LL.histQueries()}</h1>
        <p>{$LL.histDescription()}</p>
    </div>
    <table width="400px">
        <thead>
            <tr>
            <th>{$LL.source()}</th>
            <th>{$LL.destination()}</th>
            <th>{$LL.distMiles()}</th>
            <th>{$LL.distKilo()}</th>
            </tr>
        </thead>
        <tbody>
            
            {#each chunkedItems as row} 
            <tr>
                {#each row as item}
                    <td >{item}</td>
                {/each}
            </tr>
            {/each}
            </tbody>
      </table>
   
</div>       




<style>
    .headerWrapper{
        width: 1255px;
        margin-right: auto;
        margin-left: auto;
    }

    button{
        float: right;
        margin-top: -85px;
        padding: 12px 13px 12px 13px;
        background-color: #F8F8F6;
        color: #313030;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        border: solid 1px #313030;
    }

    img{
        height: 12px;
        width: 14px;
        margin-top: 1px;
        margin-left: 2px;

    }

    .main_section{
        background-color: #FFFFFF;
        width: 1248px;
        margin-bottom: 32px;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 32px;

    }


    .subTitle{
        align-items: flex-start;
        padding: 16px 16px 24px 16px;
    }

    .subTitle h1{
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #1B1A1A;
    }

    .subTitle p{
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        color: #4B4949;
    }

    table{
        width: 1216px;
        border: solid 1px #000000;
        margin-left: auto;
        margin-right: auto;
       
    }
    th{
        background-color: #E0E0DE;
        box-shadow: 0px 1px 1px #DCDAD6;
    }
    tr{
        background-color: #F8F8F6;
    }
    th, tr {
        width: 304px;
        max-height: 40px;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
        color: #1B1A1A;
    }
</style>