// write your code here
const ramenMenu = document.querySelector('#ramen-menu')
const form = document.querySelector('#new-ramen')


//get the images for ramen menu from the server
fetch('http://localhost:3000/ramens')
  .then(resp => resp.json())
  .then(data => displayImages(data))

//add functionality to each image 
function displayImages(data) {
    for (let i=0; i<data.length; i++){
        const img = document.createElement('img')
        img.src = data[i].image 
        img.addEventListener('click', (e) => {
            document.querySelector('.detail-image').src = data[i].image
            document.querySelector('.name').innerText = data[i].name
            document.querySelector('.restaurant').innerText = data[i].restaurant
            document.getElementById('rating-display').innerText = data[i].rating
            document.querySelector('p#comment-display').innerText = data[i].comment
        })
        ramenMenu.appendChild(img)
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newRamen = {
        name : document.querySelector('#new-name').value,
        restaurant: document.querySelector('#new-restaurant').value,
        image: document.querySelector('#new-image').value,
        rating: document.querySelector('#new-image').value,
        comment: document.querySelector('#new-comment').value 
    }
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    }).then(
        resp => resp.json()).then(
        data => {
            const img = document.createElement('img')
            img.src = data.image
            ramenMenu.appendChild(img)
        })
})