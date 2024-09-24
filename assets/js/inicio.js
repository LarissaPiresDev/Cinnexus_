const sliders = document.querySelector(".carrosel_box");
var scrollPerClick;
var ImagePadding = 20
let scrollAmount = 0;


showMovieData();

function sliderScrollLeft(){
    scrollAmount -= scrollPerClick;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    sliders.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: "smooth"
    });
}

function sliderScrollRight() {
    if (scrollAmount < sliders.scrollWidth - sliders.clientWidth) {
        scrollAmount += scrollPerClick;
        sliders.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: "smooth"
        });
    }
}




async function showMovieData() {
    const api_key = "fb1b0dc2bf972804afad53a21170a64a";

    try {
        const result = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc`
        );

        const movies = result.data.results;

        movies.forEach((cur, index) => {
            sliders.insertAdjacentHTML(
                "beforeend",
                `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" alt="${cur.title}"/>`
            );
        });

        scrollPerClick = 400; // Ajuste conforme necessário
    } catch (error) {
        console.error("Erro ao buscar dados dos filmes:", error);
    }
}