<script>
    import {LL} from "../i18n/i18n-svelte"
    import viewedImg from '$lib/images/viewed_img.png';
    import { goto } from '$app/navigation';
    
    /**** functions and API calls *****/
    function goToHistorical (){
        goto('/historical')
    }

</script>

<div>
    <button on:click={goToHistorical}>{$LL.viewHist()} <img src={viewedImg} alt="recentlyViewedImg" /></button>
</div>

<style>
    button{
        float: right;
        margin-top: -85px;
        padding: 12px 13px 12px 13px;
        background-color: #000000;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.16px;
    }

    img{
        height: 12px;
        width: 14px;
        margin-top: 1px;
        margin-left: 2px;

    }
</style>
