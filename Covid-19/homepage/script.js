async function headlines(){
    try{
        console.log(10)
        var newsApi = "https://api.smartable.ai/coronavirus/news/global"
        const options = {
            headers:{'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d'}
        }
        var newsData = await getHeadlinesData(newsApi, options)
        newsData.news.forEach(element => {
            // console.log(element)
            newsRenderDom(element)
        });
    }
    catch (error){
        console.log(error)
    }
    
}

const getHeadlinesData = (api, data) =>{
    return fetch(api, data).then(response => response.json())
}

const newsRenderDom = (data) => {
    var newsHolder = document.getElementById('news_inner')
    console.log(data)
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    console.log(randomColor)
    newsHolder.innerHTML += `<div class="carousel-item">
    <div class="card card_caro shadow p-0 mb-5 bg-white rounded"">
        <div class="card-body">
            <small>${data.excerpt}</small>
        </div>
    </div>`
}




window.addEventListener('load',function(){
    headlines()
})

