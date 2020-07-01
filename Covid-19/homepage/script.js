let patientDatas;

const createHeadlines = async() => {
    try{
        let newsApi = "https://api.smartable.ai/coronavirus/news/global"
        const options = {
            headers:{'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'}
        }
        let newsData = await getApiData(newsApi, options)
        newsData.news.forEach(element => {
            newsRenderDom(element)
        });
    }
    catch (error){
        console.log(error)
    }
    
}


const getApiData = (api, data) =>{
    return fetch(api, data).then(response => response.json())
}


const newsRenderDom = (data) => {
    var newsHolder = document.getElementById('news_inner')
    newsHolder.innerHTML += `<div class="carousel-item">
    <div class="card card_caro shadow p-0 mb-5 bg-white rounded"">
        <div class="card-body d-flex flex-column">
            <small>${data.excerpt}</small>
            <p class="ml-auto mt-1 text-info">- ${data.provider.name}</p>
        </div>
    </div>`
}


const createContinentChart = async() => {
    try{
        let caseCount = []
        let continentName = []
        var randBr = []
        let id = 'globalDataChart'
        let label = 'Total cases by continent'
        let type = 'bar'
        let globalDataApi = "https://corona.lmao.ninja/v2/continents?yesterday=true&sort"
        let chartDatas = await getApiData(globalDataApi)
        await chartDatas.forEach(element => {
            continentName.push(element.continent)
            caseCount.push(element.cases)
            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);
            var brColor = "rgb(" + y + "," + x + "," + z + ")"
            randBr.push(brColor)
        })
        chartRenderDom(continentName, caseCount, randBr,id, label,type)
    }
    catch (error){
        console.log(error)
    }
}


const chartRenderDom = (xData, yData, brClr, idData, labelData, typeData) => {
    var ctx = document.getElementById(idData).getContext('2d');
    var myChart = new Chart(ctx, {
        responsive: true,
        maintainAspectRatio: false,
        type: typeData,
        data: {
            labels: xData,
            datasets: [{
                label: labelData,
                data: yData,
                backgroundColor: 'rgba(146, 168, 209,0.2)',
                borderColor: brClr,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


const createIndividualCountryData = async () =>{
    try{
        let countryNameApi = "https://api.covid19api.com/summary"
        const options = {
            headers:{'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'}
        }
        let countryNamesData = await getApiData(countryNameApi, options)
        countrySelectorRenderDom(countryNamesData)
    }
    catch (error){
        console.log(error)
    }
    
}


const countrySelectorRenderDom = (data) => {
    var countryHolder = document.getElementById('country_holder')
    countryHolder.innerHTML += `<div class="card">
    <div class="card-body p-2 py-3" id="country_card_bd">
        <form>
            <div class="form-group">
                <select class="form-control border-0 pb-2" id="country_holder_selector">
                </select>
                </div>
            </form>
        </div>
    </div>`
    var conSel = document.getElementById("country_holder_selector")
    conSel.innerHTML += `<option>Global</option>`
    data.Countries.forEach((element, index) => {
        conSel.innerHTML+=`<option value=${index} class="cnt_op">${element.Country}</option>`
    });

}


const createPatientData = async () =>{
    try{
        let patientDataApi = "https://api.covid19api.com/summary"
        const options = {
            headers:{'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'}
        }
        patientDatas = await getApiData(patientDataApi, options)
        patientDataRenderDom(patientDatas.Global)
    }
    catch (error){
        console.log(error)
    }
}


const patientDataRenderDom = (data) =>{
    let ptCnt = document.getElementById('pt_cnt').innerText =Math.ceil(Number(data.TotalConfirmed)/1000)
    let dtCnt = document.getElementById('dt_cnt').innerText =Math.ceil(Number(data.TotalDeaths)/1000)
    let rcCnt = document.getElementById('rc_cnt').innerText =Math.ceil(Number(data.TotalRecovered)/1000)
}


const countryPatients = () =>{
    let chosen = event.target.value
    let slug = patientDatas.Countries[chosen].Slug
    let country = patientDatas.Countries[chosen].Country
    console.log(country)
    patientDataRenderDom(patientDatas.Countries[chosen])
    let chartCard = document.getElementById('individual_country_chart')
    chartCard.innerHTML = ""
    chartCard.innerHTML += `<div class="card" id="ind_chart_card">
    <canvas id="indivDataChart" width="400" height="300"></canvas>
    </div>`
    individualCountryChart(country, slug)
}


const individualCountryChart = async (country, slug) =>{
    try{
        let dates = []
        let caseCount = []
        let randBr = []
        let type = 'line'
        let id = 'indivDataChart'
        let label = 'Increase in cases every week' + country + " (in thousands)"
        let indivApi = 'https://api.covid19api.com/dayone/country/'+slug+'/status/confirmed'
        const options = {
            headers:{'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'}
        }
        let countryData = await getApiData(indivApi, options)
        // console.log(slug)
        let count = 0
        await countryData.forEach(element => {
            count++
            if (count % 7 === 0 && slug !== 'united-states'){
                // console.log(count)
                dates.push(element.Date.slice(5,10))
                caseCount.push(Math.ceil(Number(element.Cases)/1000))
                var x = Math.floor(Math.random() * 256);
                var y = Math.floor(Math.random() * 256);
                var z = Math.floor(Math.random() * 256);
                var brColor = "rgb(" + y + "," + x + "," + z + ")"
                randBr.push(brColor)
            }
            else if(slug === 'united-states' && count % 10000 === 0){
                // console.log(count)
                dates.push(element.Date.slice(5,10))
                caseCount.push(Math.ceil(Number(element.Cases)/1000))
                var x = Math.floor(Math.random() * 256);
                var y = Math.floor(Math.random() * 256);
                var z = Math.floor(Math.random() * 256);
                var brColor = "rgb(" + y + "," + x + "," + z + ")"
                randBr.push(brColor)
            }
        })
        chartRenderDom(dates,caseCount,randBr,id, label, type)
        let knCard = document.getElementById('know_more')
        knCard.innerHTML = ""
        knCard.innerHTML += `<div class="card" id="kn_more_card">
            <button class="btn btn-block bg-success" id='know_about'>Know more about ${country}</button>
        </div>`
    }
    catch (error){
        console.log(error)
    }

}


const getNews = () => {
    // let newsApi = "http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=606cc152433b4263985258987aa85495"
    // return fetch(newsApi).then(response => response.json()).then(resp => console.log(resp))
    location.href = '../newspaper/news.html'
}


window.addEventListener('load',async function(){
    try{
        await createHeadlines()
        await createContinentChart()
        await createIndividualCountryData()
        await createPatientData()
        var cntSelect = document.getElementById("country_holder_selector")
        cntSelect.addEventListener('change', countryPatients)
        var newsFeed = document.getElementById('newspaper')
        newsFeed.addEventListener('click', getNews)
        // getNews()
    }
    catch (error){
        console.log(error)
    }

})