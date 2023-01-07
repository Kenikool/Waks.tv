

//selecting element from the DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container')

function movieSection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';

     movies.map((movie) => {
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
           
            section.appendChild(img);
            } 

       
    })

    return section;

}

function createMovieContainer(movies,  title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.innerHTML = title;

    const  content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<p id="content-close"></P>`;

    content.innerHTML = contentClose;

    const section = movieSection(movies)

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;
}

function  renderSearhMovies(data)  {
     const movies = data.results;
     const movieBlock = createMovieContainer(movies);
     movieSearchable.appendChild(movieBlock);
     
}

function  renderMovies(data)  {
    const movies = data.results;
    const movieBlock = createMovieContainer(movies,  this.title);
    moviesContainer.appendChild(movieBlock);
    
}


function handdleError(error) {
    console.log('Error: ', error)
}
buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);
    inputElement.value = '';
    console.log('Value: ', value);




}

function createIframe(video){
    const iframe = document.createElement('iframe')
    iframe.src=`https://www.youtube.com/embed/${video.key}`
    iframe.width = 360
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function  createVideoTemplate(data,  content)  {
    //TODO
     //display  movie  videos

     content.innerHTML = '<p  id="content-close">X</p>';
    console.log('Videos: ', data)
    const  videos = data.results;
    const length = videos.length > 4 ?  4 : videos.length;
    const  iframeContainer = document.createElement('div');

    for (let i = 0; i < videos.length; i++) {
        const video = videos[i]; //video
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

//event delegation
document.onclick = function (event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
       // console.log('Hello  World');
        //console.log('Eevnt: ', event);
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ',  movieId)
        const section = event.target.parentElement; //  section
        const content  = section.nextElementSibling; // content
        content.classList.add('content-diplay');

        const  path = `/movie/${movieId}/videos`;
        const url=  generateUrl(path);
        //  fetch  movie videos

        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate (data,  content))
            .catch((error) => {
                    console.log('Error: ', error)
                
        });

    }
    
    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display'); 
    }
}

searchMovie('Black Panther');
getUpcomingMovies();
getTopRatedMovies();
getPopularMovies();




// Initial Values
/*const INITIAL_SEARCH_VALUE = 'spiderman';
const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#exampleInputEmail1');
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function createIframe(video) {
    const videoKey = (video && video.key) || 'No key found!!!';
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${videoKey}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function insertIframeIntoContent(video, content) {
    const videoContent = document.createElement('div');
    const iframe = createIframe(video);

    videoContent.appendChild(iframe);
    content.appendChild(videoContent);
}


function createVideoTemplate(data) {
    const content = this.content;
    content.innerHTML = '<p id="content-close">X</p>';
    
    const videos = data.results || [];

    if (videos.length === 0) {
        content.innerHTML = `
            <p id="content-close">X</p>
            <p>No Trailer found for this video id of ${data.id}</p>
        `;
        return;
    }

    for (let i = 0; i < 4; i++) {
        const video = videos[i];
        insertIframeIntoContent(video, content);
    }
}

function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;

    return header;
}


function renderMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}



function renderSearchMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}



// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

   if (value) {
    searchMovie(value);
   }
    resetInput();
}

// Click on any movies
// Event Delegation
document.onclick = function (event) {
    log('Event: ', event);
    const { tagName, id } = event.target;
    if (tagName.toLowerCase() === 'img') {
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getVideosByMovieId(movieId, content);
    }

    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}

// Initialize the search
searchMovie(INITIAL_SEARCH_VALUE);
searchUpcomingMovies();
getTopRatedMovies();
searchPopularMovie();
getTrendingMovies();*/

