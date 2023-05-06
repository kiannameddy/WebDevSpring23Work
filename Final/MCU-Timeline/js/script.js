"use strict"

function imagesInit() {
	const images = document.querySelectorAll('.article__image');
	if (images.length) {
		images.forEach(image => {
			const imageItem = image.querySelector('img');
			const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
			image.style.paddingBottom = `${padding}%`;
			imageItem.classList.add('init');
		});
	}
}

function gridInit() {
	const items = document.querySelector('.articles__items');
	const itemsGrid = new Isotope(items, {
		itemSelector: '.article',
		masonry: {
			fitWidth: true,
			gutter: 20
		}
	});

	document.addEventListener('click', documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.closest('.filter-articles__item')) {
			const filterItem = targetElement.closest('.filter-articles__item');
			const filterValue = filterItem.dataset.filter;
			const filterActiveItem = document.querySelector('.filter-articles__item.active');

			filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
				itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

			filterActiveItem.classList.remove('active');
			filterItem.classList.add('active');

			e.preventDefault();
		}
	}
}


window.addEventListener('load', windowLoad);


// API Stuff
// const options = {
// 	method: "GET",
// 	headers: {
// 		'Content-Type': "application/octet-stream",
// 		'X-RapidAPI-Key': 'acd8719104msh6f43f3bfb39e534p130389jsn7ca367d53708',
// 		'X-RapidAPI-Host': 'marvel-quote-api.p.rapidapi.com',
// 		}
// 	}

// 	try {
// 		const response = await fetch(url, options);
// 		const result = await response.text();
// 		console.log(result);
// 	} catch (error) {
// 		console.error(error);
// 	}


// 	.then(res => {
// 		if (res.ok){
// 			console.log("SUCCESS")
// 		} else {
// 			console.log("Not Successful")
// 		}
// 	})
// 	.then(data => console.log(data))
// 	.catch(error => console.log("ERROR"))



function windowLoad() {
	imagesInit();
	gridInit();
}



let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";

let getQuote = () => {
	fetch(url)
	  .then((data) => data.json())
	  .then((item) => {
		quote.innerText = item.content;
		author.innerText = item.author;
	  });
  };

window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);
  