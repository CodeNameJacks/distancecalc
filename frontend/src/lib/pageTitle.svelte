<script>
    import {LL} from "../i18n/i18n-svelte"
</script>


<div class='pageTitle'>  
    <h1>{$LL.title()}</h1>
    <p>{$LL.calcDescription()}</p>
</div>

 <style>
    .pageTitle{
        align-items: flex-start;
    }
    .pageTitle h1{
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 32px;
        line-height: 40px;
        letter-spacing: 0px;
        color: #222222;
    }

    .pageTitle p{
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.16px;
        color: #4B4949;
    }
</style>
