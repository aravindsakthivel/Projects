const getApiData = (api) => {
    return fetch(api).then(response => response.json())
}


const newsFeedRenderDom = async () =>{
    let newsApi = "http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=606cc152433b4263985258987aa85495"
    let newsData = await getApiData(newsApi)
    var newsBox = document.getElementById('newsfeed_holder')
    newsBox.innerHTML = ''
    // console.log(newsData.articles.length)
    let count = 0
    newsData.articles.forEach(element => {
        count++
        if(count === newsData.articles.length){
            newsBox.innerHTML += `<div class="card beta" id="last-box">
            <img src=${element.urlToImage} class="card-img-top" alt="image">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end">${element.source.name}</h6>
            <p class="card-text">${element.description}</p>
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end">${element.author}</h6>
            <a href=${element.url} class="card-link">Card link</a>`
        }
        else{
            newsBox.innerHTML += `<div class="card position-sticky beta">
            <img src=${element.urlToImage} class="card-img-top" alt="image">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end">${element.source.name}</h6>
            <p class="card-text">${element.description}</p>
            <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-end">${element.author}</h6>
            <a href=${element.url} class="card-link">Card link</a>`
        }
        
        // console.log(element)
    });
}


window.addEventListener('load', function(){
    newsFeedRenderDom()
})
