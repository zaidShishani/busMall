'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let midImg = document.getElementById('midImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('finalResult');
let productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']
let maxAttempts = 25;
let attempt = 1;
let product = [];
let showResult = document.getElementById('showResult');
let showResultEL



function ProductImg(productName) {
    this.pName = productName.split('.')[0];
    this.pImg = `img/${productName}`;
    this.votes = 0;
    this.views = 0;
    product.push(this);
}

for (let i = 0; i < productImg.length; i++) {
    new ProductImg(productImg[i]);
}

function randomImage() {
    return Math.floor(Math.random() * product.length);
}
let leftIndex;
let midIndex;
let rightIndex;

function renderImg() {
    leftIndex = randomImage();
    midIndex = randomImage();
    rightIndex = randomImage();
    while (leftIndex === rightIndex || leftIndex === midIndex) 
    {
        leftIndex = randomImage();
    }
    while(rightIndex === midIndex)
    {
        rightIndex = randomImage();
    }
    leftImg.setAttribute('src', product[leftIndex].pImg);
    midImg.setAttribute('src', product[midIndex].pImg);
    rightImg.setAttribute('src', product[rightIndex].pImg);
    product[leftIndex].views++;
    product[midIndex].views++;
    product[rightIndex].views++;
    console.log(product);
}
renderImg();

leftImg.addEventListener('click', clickHandler);
midImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);



function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            product[leftIndex].votes++;
        } else if (clickedImage === 'midImg') {
            product[midIndex].votes++;
        }else if (clickedImage === "rightImg"){
            product[rightIndex].votes++ 
        }
        renderImg();
        console.log(product);
        attempt++;
    } else {
        showResultEL = document.createElement('button');
        showResultEL.textContent = 'View Results';
        showResultEL.addEventListener('click', renderResult);
        showResult.appendChild(showResultEL);

        leftImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
        midImg.removeEventListener('click', clickHandler);
    }

    function renderResult(event){
        event.preventDefault();
        for (let i = 0; i < product.length; i++) {
            let liEl = document.createElement('li');
            finalResult.appendChild(liEl);
            liEl.textContent = `${product[i].pName} has ${product[i].votes} votes and  ${product[i].views} views.`;
        }
        showResultEL.remove();
    }


}