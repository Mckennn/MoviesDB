// https://api.themoviedb.org/3/movie/top_rated?api_key=8e45f6ec2c281d81b0594cba9e93629f&language=en-US&page=

let page = 0;
let totalPages = 0;
const URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=8e45f6ec2c281d81b0594cba9e93629f&language=en-US&page='

function getApi(url, pageNumber, op) {
    if (op === "back") {
        --pageNumber;
    } else if (op === 'next') {
        ++pageNumber;
    }
    let localMovies = localStorage.getItem('movies');
    if (localMovies === null || pageNumber !== page) {
        fetch(url + pageNumber).then(
            function (results) {
                results.json().then(function (movies) {
                    console.log(movies);
                    localStorage.setItem('movies', JSON.stringify(movies));
                    jsonToHtml(movies);
                    page = movies.page;
                    totalPages = movies.total_pages;
                })
            }
        );
    } else {
        jsonToHtml(JSON.parse(localMovies));
    }

    console.log('getApi');
}

function jsonToHtml(movies) {
    let str = '';

    for (const m of movies.results) {
        str += `
            <article>
                <h3>${m.title}</h3>
                <figure>
                    <img src="https://image.tmdb.org/t/p/w300${m.poster_path}" alt="${m.title}">
                    <figcaption>${m.overview}</figcaption>
                </figure>                
            </article>
        `;
    }

    document.getElementById('movies').innerHTML = str;
}

function onClickBtn() {
    let back = document.getElementById('back');
    let next = document.getElementById('next');

    back.addEventListener('click', function () {
        if (page > 1) {
            getApi(URL, page, "back");
        }
    })

    next.addEventListener('click', function () {
        if (page < totalPages) {
            getApi(URL, page, 'next');
        }
    })
}

onClickBtn();

getApi(URL, 1);