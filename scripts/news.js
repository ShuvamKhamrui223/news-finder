// import sidebarMenu from "./sidebar";
/* Targeting DOM elements */
const container = document.querySelector(".container");

const loader = document.querySelector(".loader");

// Global variable declarations
const newsPerPage = 10

let MAX = 0,
  currentPage = 1,
  country = 'in';

/* API purposes only */
const API_KEY = "0ee806272c28419c9fae4499bf1e34f5";

// Base API URL
const BASE_URL = new URL("https://newsapi.org/v2")

const URL_TOP_HEADLINES = new URL(BASE_URL + `/top-headlines`)

URL_TOP_HEADLINES.searchParams.set("country", country)

URL_TOP_HEADLINES.searchParams.set("pageSize", newsPerPage)

URL_TOP_HEADLINES.searchParams.set("page", currentPage)

URL_TOP_HEADLINES.searchParams.set("apiKey", API_KEY)


/* Event listeners */
// window.addEventListener("DOMContentLoaded", () => getData)
getData()

/* Making API call to get desired informations */
async function getData() {
  loader.classList.add("show")

  const res = await fetch(URL_TOP_HEADLINES)

  const data = await res.json()

  loader.classList.remove("show")

  showNews(data.articles)

  MAX = data.totalResults

  generatePagination(MAX)
}

/* Preparing and adding HTML boiler code for presenting the received information from the API */
const showNews = (newsData) => {
  container.innerHTML = ''
  if (newsData.length > 0) {

    newsData.map(({ title, urlToImage, publishedAt, source, url }) => {
      console.log(urlToImage)
      let card
      if (publishedAt && title && source.name && url) {
        card = `
      <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden mb-3">
          <img src=${urlToImage} loading="lazy" class="lg:h-80 md:h-36 w-full object-cover object-center" src="" alt="blog">
          <div class="p-6">
            <h2 class="tracking-widest text-base title-font font-medium text-gray-400 mb-1">${new Date(publishedAt).toDateString()}</h2>
            <h1 class="title-font text-2xl font-medium text-gray-900 mb-3">${title}</h1>
            <span class="text-base bg-red-500 py-3 px-4 
        my-2 text-white rounded-full">${source.name}</span>
                     <button class="py-4 px-5 rounded mt-4 bg-blue-500 text-xl text-white block"><a href=${url} target="blank">Read More</a></button>
            </div>
          </div>
        </div>
  `;
      }

      container.insertAdjacentHTML("afterbegin", card)
    })
  } else {
    let pageEmptyNote = `
    <div class="w-full d-flex align-items-center justify-content-center">
    <img class="w-3/6" src="./icons/no-data-found.svg" alt="">
  </div>
`
    container.insertAdjacentHTML("beforeend", pageEmptyNote)
  }
}

/*const generateChunks = (total_results) => {
  console.log(total_results);
  totalResults.push()
}
*/

const generatePagination = (totalResults) => {
  const chunk = Math.floor(totalResults / newsPerPage)
  let pages
  for (let i = 0; i <= chunk; ++i) {
    pages +=
      `<li class="page-item mx-2 hover:bg-blue-400 text-white ">
        <a class="page-link category p-3 fs-4" href="#">${i + 1}</a>
      </li>`
  }

  let pagination = `<nav aria-label="..." class="mw-100% mt-5 py-2 px-3 col-span-3 justify-content-center bg-blue-200">
    <ul class="pagination overflow-x-auto">
    ${pages}
    </ul>
  </nav>`;

  container.insertAdjacentHTML("beforeend", pagination)
}


document.addEventListener("click", (e) => {
  const clickedElement = e.target

  if (clickedElement.classList.contains("page-link")) {

    clickedElement.classList.add("active")
    URL_TOP_HEADLINES.searchParams.set("page", clickedElement.innerText)
    currentPage = clickedElement.innerText
    getData()
  }

  currentPage = clickedElement.innerText
})

const allCatgories = document.querySelectorAll(".category")
allCatgories.forEach(category => {
  category.addEventListener("click", (e) => {
    e.preventDefault()
    searchByCategories(category.innerText.toLowerCase())
  })
})

const searchByCategories = (selectedCategory) => {
  URL_TOP_HEADLINES.searchParams.set("category", selectedCategory)
  getData()

}



/* search functionality */
const searchBox = document.getElementById("searchBox"),
  searchDiv = document.querySelector(".searchDiv"),
  searchBtn = document.querySelector(".searchIcon");

searchBtn.addEventListener("click", (e) => {
  const searchedTerm = searchBox.value
  if (searchedTerm.length > 3) {
    const URL_TOP_SEARCH = new URLSearchParams(BASE_URL + `/everything`)
    URL_TOP_SEARCH.set("q", searchedTerm)
    fetch(BASE_URL + `/everything?q=${searchedTerm}&pageSize=${newsPerPage}&apiKey=${API_KEY}`).then(res => res.json()).then(data => {
      const receivedData = data
      showNews(receivedData.articles)
      MAX = data.totalResults
      console.log(MAX)
      generatePagination(MAX)
    })
  } else {
    searchDiv.style.borderColor = "red";
  }
  searchedTerm.length > 3 ? console.log(searchedTerm) : null
})