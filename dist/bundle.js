/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiKey: () => (/* binding */ apiKey)\n/* harmony export */ });\n\r\nconst apiKey = 'fsq30AyH5MolLobwlnUXLbTsFLLOutfHHBSSk+yLoc7mgKA=';\r\n\r\n\n\n//# sourceURL=webpack:///./config.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./config.js\");\n\r\n\r\n\r\n\r\n// adding the home icon refresh \r\nconst refreshButton = document.getElementById('refreshButton');\r\n// Add an event listener to the refresh button\r\nrefreshButton.addEventListener('click', () => {\r\n    // Reload the page\r\n    location.reload();\r\n});\r\n\r\n// API key for accessing Foursquare API\r\nconst newApi = {\r\n    headers: {\r\n        method: 'GET',\r\n        Authorization: `${_config_js__WEBPACK_IMPORTED_MODULE_0__.apiKey}`\r\n        \r\n    }\r\n};\r\n\r\n// Function to fetch search results from the Foursquare API based on user input\r\nconst fetchSearchResult = async (searchInput) => {\r\n    try {\r\n        // Constructing the API URL with the search query and limiting results to 10\r\n        const apiUrl = `https://api.foursquare.com/v3/places/search?query=${searchInput}&limit=10`;\r\n        const response = await fetch(apiUrl, newApi);\r\n        const data = await response.json();\r\n        console.log('data', data);\r\n        return data;\r\n    } catch (error) {\r\n        // Log and return any errors that occur during the fetch operation\r\n        return error;\r\n    }\r\n}\r\n\r\n\r\nconst fetchOnePlacePhotos = async (CardId) => {\r\n    const queryTypes = ['photos', 'tips'];\r\n    const results = [];\r\n\r\n    for (const queryType of queryTypes) {\r\n        try {\r\n            // Constructing the API URL for fetching photos or tips, limiting to 5, and sorting by popularity\r\n            const apiUrl = `https://api.foursquare.com/v3/places/${CardId}/${queryType}?limit=5&sort=POPULAR`;\r\n            const response = await fetch(apiUrl, newApi);\r\n            const data = await response.json();\r\n            console.log(`data of one place (${queryType})`, data);\r\n            results.push({ [queryType]: data });\r\n        } catch (error) {\r\n            // Log and push any errors that occur during the fetch operation\r\n            console.error(`Error fetching ${queryType}:`, error);\r\n            results.push({ [queryType]: error });\r\n        }\r\n    }\r\n    console.log(results);\r\n    return results;\r\n};\r\n\r\nconst fetchWishList = async () => {\r\n    try {\r\n        //fetching the MockApi to add the post method later \r\n        const apiUrl = `https://6552f02e5449cfda0f2defd1.mockapi.io/api/com`;\r\n        const response = await fetch(apiUrl);\r\n        const data = await response.json();\r\n        console.log('data', data);\r\n        return data;\r\n    } catch (error) {\r\n        //return any errors that occur during the fetch operation\r\n        return error;\r\n    }\r\n}\r\nfetchWishList();\r\n\r\n// Container element where all the pages will be rendered\r\nconst container = document.getElementById('container');\r\n\r\n// Rendering the container to show the home page first \r\nfunction renderingHomePage() {\r\n    // Creating the search input in the HTML with an ID to reference it\r\n    container.innerHTML = `\r\n        <section id='search-section'>\r\n            <h1>Where would you like to go?</h1>\r\n            <div class='search-input'>\r\n                <input id='searchInput' type='text' placeholder='places to go'></input>\r\n                <i id='searchButton' class=\"fa fa-search fa-2x\" aria-hidden=\"true\"></i>\r\n            </div>\r\n        </section>`;\r\n\r\n    // Getting references to the search input and search button\r\n    const searchInput = document.getElementById('searchInput');\r\n    const searchButton = document.getElementById('searchButton');\r\n\r\n    // Adding event listener to the search button to handle user input\r\n    searchButton.addEventListener('click', async () => {\r\n        // Getting the search input value\r\n        const searchValue = searchInput.value;\r\n        // Using callback function to handle search and render results\r\n        const result = await handleSearch(searchValue);\r\n        renderSearchResults(result);\r\n    });\r\n\r\n    // Function to handle the search by fetching data from the API\r\n    async function handleSearch(searchValue) {\r\n        const dataMatchSearch = await fetchSearchResult(searchValue);\r\n        console.log(dataMatchSearch.results);\r\n        return dataMatchSearch.results;\r\n    }\r\n\r\n    // Function to render search results in the UI\r\n    function renderSearchResults(cards) {\r\n        console.log(`here is the cards ${cards}`);\r\n\r\n        // Find and remove the existing cardsSection if it exists\r\n    const existingCardsSection = document.querySelector('.cardsSection');\r\n    if (existingCardsSection) {\r\n        existingCardsSection.remove();\r\n    };\r\n        // creating new cards section to desplay the search results \r\n        const cardsSection = document.createElement('section');\r\n        container.appendChild(cardsSection); \r\n        cardsSection.classList.add('cardsSection');\r\n\r\n        // show each place in a card \r\n        cards.forEach((card) => {\r\n            const resultCard = document.createElement('div');\r\n            cardsSection.appendChild(resultCard);// Append to cardsSection\r\n            resultCard.classList.add('resultCard');\r\n\r\n            // Rendering information about the place in the result card\r\n            resultCard.innerHTML = `\r\n            <div class='card-img'>\r\n            <img alt='icon' src='${card.categories[0].icon.prefix}120${card.categories[0].icon.suffix}'>\r\n            </div>\r\n\r\n            <div class='card-info'>\r\n            <h3>${card.name} </h3>\r\n            <p><b>country:</b>  ${card.location.country} </p> \r\n            <p><b>category:</b>${card.categories[0].name}</p>\r\n            <p class=\"address\"><b>Address:</b> ${card.location.formatted_address} </p>\r\n            </div>\r\n            `;\r\n\r\n            // Handling the click of the card to fetch and render photos and tips\r\n            resultCard.addEventListener('click', async () => {\r\n                let cardId = card.fsq_id;\r\n                const photosResults = await fetchOnePlacePhotos(cardId);\r\n                console.log(`new photos data: ${photosResults[0].photos[0]}`)\r\n                renderPhotos(photosResults[0].photos);\r\n                renderTips(photosResults[1].tips);\r\n\r\n            });\r\n\r\n            // Function to render photos of the place \r\n            function renderPhotos(photos) {\r\n                console.log(photos);\r\n                container.innerHTML = '';\r\n                const photosSection = document.createElement('section');\r\n                photosSection.classList.add('photosSection');\r\n                container.appendChild(photosSection);\r\n                photosSection.innerHTML=`\r\n                <h1>Plcae Photos:</h1>\r\n                `\r\n                photos.forEach((photo) => {\r\n                    console.log(`photo: ${photo.id}`)\r\n                    const photoElement = document.createElement('div');\r\n                    photoElement.classList.add('photos');\r\n                    photoElement.innerHTML = `\r\n                    \r\n                    <img src='${photo.prefix}300x300${photo.suffix}'>\r\n                    `;\r\n                    photosSection.appendChild(photoElement);\r\n                });\r\n            }\r\n\r\n            //  Function to render tips of the place \r\n            function renderTips(tips) {\r\n                console.log(tips);\r\n                const tipsSection = document.createElement('section');\r\n                tipsSection.classList.add('tipsSection');\r\n                container.appendChild(tipsSection);\r\n                tipsSection.innerHTML = `\r\n                    <h1>Place Reviews:</h1>\r\n                `;\r\n            \r\n                tips.forEach((tip) => {\r\n                    console.log(`tip: ${tip.text}`)\r\n                    const tipsElement = document.createElement('div'); \r\n                    tipsElement.classList.add('tips');\r\n                    tipsElement.innerHTML = `\r\n                        <p>'${tip.text}'</p>\r\n                    `;\r\n                    tipsSection.appendChild(tipsElement);\r\n                });\r\n            }\r\n            \r\n\r\n            \r\n        });\r\n    }\r\n}\r\n\r\n// Event listener for when the DOM content is fully loaded to call renderingHomePage\r\ndocument.addEventListener(\"DOMContentLoaded\", renderingHomePage);\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.js");
/******/ 	
/******/ })()
;