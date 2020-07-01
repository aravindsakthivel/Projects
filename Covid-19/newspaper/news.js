const getApiData = (api) => {
    return fetch(api).then(response => response.json())
}


const newsFeed = async () =>{
    let newsApi = "http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=606cc152433b4263985258987aa85495"
    // let newsData = await getApiData(newsApi)
    // renderDom(newsData)
}


const renderDom = (data) => {
    console.log(data)
}


window.addEventListener('load', function(){
    newsFeed()
})