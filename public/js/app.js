console.log('Client side javascript file is loaded');

// fetch api
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data[0].location;
                messageTwo.textContent = data[0].forecast + '. It is currently '+ 
                                            data[0].temperature + ' degrees out, but it feels like '+ data[0].feelsLike + ' degrees out. The humidity is '+data[0].humidity +'% .';
            }
            
        })
    })

})