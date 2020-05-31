var valueHolder = []

function putValueInObject(callback){
    event.preventDefault()
    var children = event.target.querySelectorAll('input')
    var dept = document.getElementById('department')
    var valueObject = {}
    valueObject['department'] = dept.value
    Array.from(children).map(function(elem){
        if (elem.name){
            valueObject[elem.name] = elem.value
        }
    })
    valueObject['average'] = ((Number(children[1].value) + Number(children[2].value)) / 2)
    callback(valueObject)
}


function pushValue(data){
    valueHolder.push(data)
    console.log(valueHolder)
}


function positionValue(data){
    var board = document.getElementById('board')
    board.innerHTML = ''
    var keys = Object.keys(data[0])
    var innerHead = document.createElement('div')
    var innerData = document.createElement('div')
    innerHead.setAttribute('class', 'inner_head')
    innerData.setAttribute('class', 'inner_data')
    keys.forEach(function(elem){
        var headingNames = document.createElement('div')
        headingNames.textContent = elem.toUpperCase()
        innerHead.append(headingNames)
    })
    data.forEach(function(item){
        var innerValueHead = document.createElement('div')
        keys.forEach(function(key){
            var innerValue = document.createElement('div')
            innerValue.textContent = item[key]
            innerValueHead.append(innerValue)
        })
        innerData.append(innerValueHead)
    })
    board.append(innerHead, innerData)
    createButton()
}


function createButton(){
    var buttonPlace = document.getElementById('button_holder')
    buttonPlace.innerHTML = ''
    var ascendingButton = document.createElement('button')
    var descendingButton = document.createElement('button')
    ascendingButton.setAttribute('id', 'ascend')
    descendingButton.setAttribute('id', 'descend')
    ascendingButton.textContent = 'Ascending'
    descendingButton.textContent = 'Descending'
    buttonPlace.append(ascendingButton, descendingButton)
    ascendingButton.addEventListener('click', function(){
        ascendData(valueHolder, positionValue)
    })
    descendingButton.addEventListener('click', function(){
        descendData(valueHolder, positionValue)
    })
}

function ascendData(data, callback){
    data.sort(function(a,b){
        return a.average - b.average
    })
    callback(data)
}

function descendData(data, callback){
    data.sort(function(a,b){
        return b.average - a.average
    })
    callback(data)
}


window.addEventListener('load', function(){
    var dataForm = document.querySelector('form')
    dataForm.addEventListener('submit', function(){
        putValueInObject(pushValue)
        positionValue(valueHolder)
    })
    
})