'use strict';
// import { apiKey } from './config.js';


const container = document.getElementById('container'); // Container element where all the pages will be rendered
const refreshButton = document.getElementById('refreshButton');// refreshButton elemnt where home icon refresh 
const whishList=document.getElementById('Wishlist');// wishlist elemnt which take user to the whishlist page

console.log('whish', whishList);


// ----------------------NAVBAR AND WHISHLIST USING MOCKAPI ------------------------------//



// Add an event listener to the refresh button to take user to home page
refreshButton.addEventListener('click', () => {
    // Reload the page
    location.reload();
});



// fetching the wishlist from mockapi to get the data stored 
const fetchWishList = async () => {
    try {
        //fetching the MockApi to add the post method later 
        const apiUrl = `https://6552f02e5449cfda0f2defd1.mockapi.io/api/com`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('data', data);
        return data;
    } catch (error) {
        //return any errors that occur during the fetch operation
        return error;
    }
}




// post function to add the data to the wishlist in server 
async function postWishList(newWish){
    try {
        const apiUrl = 'https://6552f02e5449cfda0f2defd1.mockapi.io/api/com';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWish),
        });

        const data = await response.json();
        
        // Fetch the updated wish list after adding a new wish
        const updatedWishList = await fetchWishList();

        return updatedWishList;
    } catch (error) {
        console.error('Error adding wish:', error);
        return error;
    }
}


// add click event for the whis list in nav to fetch data and render the page
whishList.addEventListener('click', async()=>{
    container.innerHTML = '';
    const resultsWishList=await fetchWishList();
    console.log(`whish results : ${resultsWishList}`);
    addingNewhForm(); // to show the form of the wish
    renderWhishlistCards(resultsWishList);  // to render all wishes comes from api
});


// creatin form in the wish list page to submit the new wish 
function addingNewhForm(){
     // add new place wish to visit
     const newWishesSection = document.createElement('section');// creating section the place form
     container.appendChild(newWishesSection); //add form to contaier
     newWishesSection.innerHTML = `
         <form id="newWishForm">
         <h1>Share a place you wish to visit..</h1>
             <label for="newWishName">Name:</label>
             <input type="text" id="newWishName" name="newWishName" required>
 
             <label for="newWishCountry">Country:</label>
             <input type="text" id="newWishCountry" name="newWishCountry" required>
 
             <label for="newWishPlace">Place:</label>
             <input type="text" id="newWishPlace" name="newWishPlace" required>
 
             <label for="newWishPhoto">Photo URL:</label>
             <input type="text" id="newWishPhoto" name="newWishPhoto" required>
 
             <button id="addWishButton" type="button">Add Wish</button>
         </form>
     `;
     document.getElementById('addWishButton').addEventListener('click', addNewWish);
}


// Function to add a new wish to the wishlist when click the add wish button 
async function addNewWish() {

    // getting all values from user inputs

    const newWishName = document.getElementById('newWishName').value;
    const newWishCountry = document.getElementById('newWishCountry').value;
    const newWishPlace = document.getElementById('newWishPlace').value;
    const newWishPhoto = document.getElementById('newWishPhoto').value;

    // Prepare wish data
    const newWish = {
        name: newWishName,
        country: newWishCountry,
        place: newWishPlace,
        photo: newWishPhoto,
    };
    // add the object of data that recived from user to the post function to send it to server 
    const updatedWishList = await postWishList(newWish);
    renderWhishlistCards(updatedWishList);
    
}

/// render the data fetched from the Api and show the input fields to post the new user data
function renderWhishlistCards(resultsWishList) {
    
    // Find and remove the existing cardsSection if it exists
    const existingCardsSection = document.querySelector('.cardsSection');
    if (existingCardsSection) {
        existingCardsSection.remove();
    };
    
    // render the fetched data from mock api
    const whishListsection = document.createElement('section'); // creating section to show all items of list

    container.appendChild(whishListsection); // add the section to the container
    
    // create card for each wish 
    resultsWishList.map((wishItem) => {
        const cardElement = document.createElement('div'); // create card for each place in wishing list
        whishListsection.appendChild(cardElement); // add each card to the section
        whishListsection.classList.add('cardsSection');
        cardElement.classList.add('resultCard');
        cardElement.innerHTML = `
            <div class='wish-img'>
                <img alt='icon' src='${wishItem.photo}'>
            </div>
            <div class='card-info'>
                <h3>${wishItem.name}</h3>
                <p><b>country:</b>  ${wishItem.country} </p>
                <p class="address"><b>Address:</b> ${wishItem.place} </p>
            </div>
        `;
    });
}




// ----------------------HOMEPAGE AND ONE PAGE USING Foursquare API ------------------------------//


// API key for accessing Foursquare API
const newApi = {
    headers: {
        method: 'GET',
        Authorization: 'fsq30AyH5MolLobwlnUXLbTsFLLOutfHHBSSk+yLoc7mgKA='
        
    }
};



// Function to fetch search results from the Foursquare API based on user input
const fetchSearchResult = async (searchInput) => {
    try {
        // Constructing the API URL with the search query and limiting results to 10
        
        const apiUrl = `https://api.foursquare.com/v3/places/search?query=${searchInput}&limit=10`;
        const response = await fetch(apiUrl, newApi);
        const data = await response.json();
        console.log('data', data);
        return data;
    } catch (error) {
        // Log and return any errors that occur during the fetch operation
        return error;
    }
}



// fetchin one place photos and tips that will be shown when click the card 
const fetchOnePlacePhotos = async (CardId) => {
    const queryTypes = ['photos', 'tips'];
    const results = [];

    for (const queryType of queryTypes) {
        try {
            // Constructing the API URL for fetching photos or tips, limiting to 5, and sorting by popularity
            const apiUrl = `https://api.foursquare.com/v3/places/${CardId}/${queryType}?limit=5&sort=POPULAR`;
            const response = await fetch(apiUrl, newApi);
            const data = await response.json();
            console.log(`data of one place (${queryType})`, data);
            results.push({ [queryType]: data });
        } catch (error) {
            // Log and push any errors that occur during the fetch operation
            console.error(`Error fetching ${queryType}:`, error);
            results.push({ [queryType]: error });
        }
    }
    console.log(results);
    return results;
};



// Rendering the container to show the home page first 
function renderingHomePage() {
    // Creating the search input in the HTML with an ID to reference it
    container.innerHTML = `
        <section id='search-section'>
            <h1>Where would you like to go?</h1>
            <div class='search-input'>
                <input id='searchInput' type='text' placeholder='places to go'></input>
                <i id='searchButton' class="fa fa-search fa-2x" aria-hidden="true"></i>
            </div>
        </section>`;

    // Getting references to the search input and search button
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Adding event listener to the search button to handle user input
    searchButton.addEventListener('click', async () => {
        // Getting the search input value
        const searchValue = searchInput.value;
        // Using callback function to handle search and render results
        const result = await handleSearch(searchValue);
        renderSearchResults(result);
    });

    // Function to handle the search by fetching data from the API
    async function handleSearch(searchValue) {
        const dataMatchSearch = await fetchSearchResult(searchValue);
        console.log(dataMatchSearch.results);
        return dataMatchSearch.results;
    }

    // Function to render search results in the UI
    function renderSearchResults(cards) {
        console.log(`here is the cards ${cards}`);

        // Find and remove the existing cardsSection if it exists
    const existingCardsSection = document.querySelector('.cardsSection');
    if (existingCardsSection) {
        existingCardsSection.remove();
    };
        // creating new cards section to desplay the search results 
        const cardsSection = document.createElement('section');
        container.appendChild(cardsSection); 
        cardsSection.classList.add('cardsSection');

        // show each place in a card 
        cards.forEach((card) => {
            const resultCard = document.createElement('div');
            cardsSection.appendChild(resultCard);// Append to cardsSection
            resultCard.classList.add('resultCard');

            // Rendering information about the place in the result card
            resultCard.innerHTML = `
            <div class='card-img'>
            <img alt='icon' src='${card.categories[0].icon.prefix}120${card.categories[0].icon.suffix}'>
            </div>

            <div class='card-info'>
            <h3>${card.name} </h3>
            <p><b>country:</b>  ${card.location.country} </p> 
            <p><b>category:</b>${card.categories[0].name}</p>
            <p class="address"><b>Address:</b> ${card.location.formatted_address} </p>
            </div>
            `;

            // Handling the click of the card to fetch and render photos and tips
            resultCard.addEventListener('click', async () => {
                let cardId = card.fsq_id;
                const photosResults = await fetchOnePlacePhotos(cardId);
                console.log(`new photos data: ${photosResults[0].photos[0]}`)
                renderPhotos(photosResults[0].photos);
                renderTips(photosResults[1].tips);

            });

            // Function to render photos of the place 
            function renderPhotos(photos) {
                console.log(photos);
                container.innerHTML = '';
                const photosSection = document.createElement('section');
                photosSection.classList.add('photosSection');
                container.appendChild(photosSection);
                photosSection.innerHTML=`
                <h1>Plcae Photos:</h1>
                `
                photos.forEach((photo) => {
                    console.log(`photo: ${photo.id}`)
                    const photoElement = document.createElement('div');
                    photoElement.classList.add('photos');
                    photoElement.innerHTML = `
                    
                    <img src='${photo.prefix}300x300${photo.suffix}'>
                    `;
                    photosSection.appendChild(photoElement);
                });
            }

            //  Function to render tips of the place 
            function renderTips(tips) {
                console.log(tips);
                const tipsSection = document.createElement('section');
                tipsSection.classList.add('tipsSection');
                container.appendChild(tipsSection);
                tipsSection.innerHTML = `
                    <h1>Place Reviews:</h1>
                `;
            
                tips.forEach((tip) => {
                    console.log(`tip: ${tip.text}`)
                    const tipsElement = document.createElement('div'); 
                    tipsElement.classList.add('tips');
                    tipsElement.innerHTML = `
                        <p>'${tip.text}'</p>
                    `;
                    tipsSection.appendChild(tipsElement);
                });
            }
            

            
        });
    }
}


// Event listener for when the DOM content is fully loaded to call renderingHomePage
document.addEventListener("DOMContentLoaded", renderingHomePage);


