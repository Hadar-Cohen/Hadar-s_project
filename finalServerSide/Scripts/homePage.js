﻿$(document).ready(function () {
    $("#nav-bar").load("signup.html");
    key = "90f77ef6862d870eb9f5fff3bc587100";
    url = "https://api.themoviedb.org/";
    imagePath = "https://image.tmdb.org/t/p/w500/";
    method = "3/tv/";
    api_key = "api_key=" + key;

    getTopRated();  
    getMostViewed();
    getMostViewedEpisodes();
    getGenres()

    if (localStorage.user != null) {
        user = JSON.parse(localStorage["user"]);
        getRecommendForYou(user);
    }

});
///////////////////////////////////////////////// Get Top Rated from the movie DB api ////////////////////////////////////////////////////////
function getTopRated() {
    topRatedList = "<div class='container'>";
    topRatedList += "<div class='owl-carousel owl-theme row'>";

    let apiCall = url + "3/trending/tv/week?" + api_key;
    ajaxCall("GET", apiCall, "", getSuccesstopRated, apiError);
}

r = 0; //index in result array that contain all the tv shows in the TMDB services
topRatedArr = [];//local arrey to render and play onclick function

function getSuccesstopRated(topRated) {
    topRatedArr = topRated.results;
    topRatedArr.forEach(TVShow => {
        topRatedList += drawtopRated(TVShow);
        r++;
    });
    topRatedList += "</div></div>";
    $("#topRated").html(topRatedList);
    r = 0;
}
///ERROR FROM API///
function apiError(err) {
    console.log(err);
}

function drawtopRated(TVShow) {
    console.log(TVShow);
    let stars = 5;
    let popularity = TVShow.popularity;
    switch (true) {
        case (popularity < 40):
            stars = 1
            break;
        case (popularity < 60):
            stars = 2
            break;
        case (popularity < 200):
            stars = 3
            break;
        case (popularity < 400):
            stars = 4
            break;
    }
    str = "";
    str = `<div class='item recommand-card' onclick = 'showAbout(topRatedArr[` + r + `])'>
                           <img src='` + imagePath + TVShow.poster_path + `'>
                           <h4><b>` + TVShow.name + `</b></h4>
                           <img class='starsPopularity' src= '../images/` + stars + `stars.png'/></div>`
    return str;
}

/////////////////// Recommended series for the user according to our algorithm according to our calculation (from our DB) /////////////////////////////

function getRecommendForYou(user) {
    let api = "../api/Totals?userId=" + user.Id; 
    ajaxCall("GET", api, "", getSuccessRecommendForYou, errortRecommendForYou);
}

r = 0; //index in result array that contain all the tv shows in the TMDB services
recommendForYouArr = [];//local arrey to render and play onclick function

function getSuccessRecommendForYou(recForYou) {
    recommendForYouArr = recForYou;
    recommendForYouList = "<div style= 'display:flex; justify-content:center;' class='row'>";
    while (r < 8 && recForYou[r] != undefined) {
        recommendForYouList += drawRecommendForYou(recForYou[r]);
        r++;
    }
    recommendForYouList += "</div>";
    $("#RecommendForYou").html(recommendForYouList);
    r = 0;
}

function errortRecommendForYou(err) {
    console.log(err);
}
function drawRecommendForYou(TVShow) {
    console.log(TVShow);
    let stars = 5;
    let popularity = TVShow.Popularity;
    switch (true) {
        case (popularity < 40):
            stars = 1
            break;
        case (popularity < 60):
            stars = 2
            break;
        case (popularity < 200):
            stars = 3
            break;
        case (popularity < 400):
            stars = 4
            break;
    }
    str = "";
    str = `<div class='recommand-card' onclick = 'showAboutFromOurWeb(recommendForYouArr[` + r + `])'>
                           <img src='`+ TVShow.Poster_path + `'>
                           <h4><b>` + TVShow.Name + `</b></h4>
                           <img class='starsPopularity' src= '../images/` + stars + `stars.png'/></div>`
    return str;
}

////////////////////////////////////// The most watched Series - according our DB ///////////////////////////////////////////////////
function getMostViewed() {
    let api = "../api/Seriess";
    ajaxCall("GET", api, "", getSuccessMostViewed, errorMostViewed);
}

r = 0; //index in result array that contain all the tv shows in the TMDB services
mostViewedArr = [];//local arrey to render and play onclick function

function getSuccessMostViewed(mostView) {
    mostViewedArr = mostView;
    mostViewedList = "<div style= 'display:flex; justify-content:center;' class='row'>";
    while (r < 8) {
        mostViewedList += drawMostViewed(mostView[r]);
        r++;
    }
    mostViewedList += "</div>";
    $("#mostViewed").html(mostViewedList);
    r = 0;
}

function errorMostViewed(err) {
    console.log(err);
}

function drawMostViewed(TVShow) {
    console.log(TVShow);
    let stars = 5;
    let popularity = TVShow.Popularity;
    switch (true) {
        case (popularity < 40):
            stars = 1
            break;
        case (popularity < 60):
            stars = 2
            break;
        case (popularity < 200):
            stars = 3
            break;
        case (popularity < 400):
            stars = 4
            break;
    }
    str = "";
    str = `<div class='recommand-card' onclick = 'showAboutFromOurWeb(mostViewedArr[` + r + `])'>
                           <img src='`+ TVShow.Poster_path + `'>
                           <h4><b>` + TVShow.Name + `</b></h4>
                           <img class='starsPopularity' src= '../images/` + stars + `stars.png'/></div>`
    return str;
}

////////////////////////////////////// The most watched Episodes - according our DB ///////////////////////////////////////////////////

function getMostViewedEpisodes() {
    let api = "../api/Episodes";
    ajaxCall("GET", api, "", getSuccessMostViewedEpisodes, errorMostViewedEpisodes);
}
r = 0; //index in result array that contain all the tv shows in the TMDB services
mostViewedEpisodesArr = [];//local arrey to render and play onclick function

function getSuccessMostViewedEpisodes(mostViewEpisodes) {
    mostViewedEpisodesArr = mostViewEpisodes;/////
    mostViewedEpisodesList = "<div style= 'display:flex; justify-content:center;' class='row'>";

    while (r < 8) {
        mostViewedEpisodesList += drawMostViewedEpisodes(mostViewEpisodes[r]);
        r++;
    }
    mostViewedEpisodesList += "</div>";
    $("#mostViewedEpisodes").html(mostViewedEpisodesList);
    r = 0;
}

function errorMostViewedEpisodes(err) {
    console.log(err);
}

function drawMostViewedEpisodes(TVShow) {
    str = "";
    str = `<div class='recommand-card'>
                           <img src='`+ TVShow.ImageURL + `'>
                           <h5><b>` + TVShow.SeriesName + "</b><br>Season" + TVShow.SeasonNum + `</h5>
                           <h5>` + TVShow.EpisodeName + `</h5></div>`
    return str;
}


//////////////////////////////////////////search according genre - /////////////////////////////////////////////////////////
function getGenres() {
    genresList = "<div> <select id='genre' onchange=showSeriesAccoGenre(this.value)>";
    genresList += "<option value=" + null + "> Select By Genre </option>";

    let apiCall = url + "3/genre/tv/list?" + api_key;
    ajaxCall("GET", apiCall, "", getSuccessGenres, errorGenres);
}

r = 0; //index in result array that contain all the tv shows in the TMDB services
genresArr = [];//local arrey to render and play onclick function
function getSuccessGenres(genre) {
    genresArr = genre.genres;
    genresArr.forEach(genre => {
        genresList += drawGenres(genre);
        r++;
    });
    genresList += "</select></div>";
    $("#genreSearch").html(genresList);
    r = 0;

}
function errorGenres(err) {
    console.log(err);
}
function drawGenres(genre) {
    console.log(genre);
    str = "";
    str += "<option value=" + genre.id + ">" + genre.name + "</option>";
    return str;
}

function showSeriesAccoGenre(genreId) {
    seriesAccoGenreList = "<div class='container'>";
    seriesAccoGenreList += "<div class='owl-carousel owl-theme row'>";
    let apiCall = url + "3/discover/tv?" + api_key + "&sort_by=popularity.desc&with_genres=" + genreId;
    ajaxCall("GET", apiCall, "", getSuccessTVShowGenres, errorGenres);
}
r = 0; //index in result array that contain all the tv shows in the TMDB services
seriesAccoGenreArr = [];//local arrey to render and play onclick function
function getSuccessTVShowGenres(seriess) {
    seriesAccoGenreArr = seriess.results;
    
    seriesAccoGenreArr.forEach(TVShow => {
        seriesAccoGenreList += drawAccoGenre(TVShow);
        r++;
    });
    seriesAccoGenreList += "</div></div>";
    $("#seriesAccoGenre").html(seriesAccoGenreList);
    ///////////////////////////////////////////////// carousel function ////////////////////////////////////////////////////////////
    jQuery(function ($) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })
    });
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    r = 0;
  //  $("html, #seriesAccoGenre").animate({ scrollTop: document.body.getElementsById.scrollHeight }, "slow");


}
function drawAccoGenre(TVShow) {
    console.log(TVShow);
    let stars = 5;
    let popularity = TVShow.popularity;
    switch (true) {
        case (popularity < 40):
            stars = 1
            break;
        case (popularity < 60):
            stars = 2
            break;
        case (popularity < 200):
            stars = 3
            break;
        case (popularity < 400):
            stars = 4
            break;
    }
    str = "";
    str = `<div class='item recommand-card' onclick = 'showAbout(seriesAccoGenreArr[` + r + `])'>
                           <img src='` + imagePath + TVShow.poster_path + `'>
                           <h4><b>` + TVShow.name + `</b></h4>
                           <img class='starsPopularity' src= '../images/` + stars + `stars.png'/></div>`

    return str;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showAbout(tvShow) {
    console.log(tvShow);
    storeToLS(tvShow);
    window.location.replace("searchTv.html");
    // location.reload();
}
//Store to Local Storage the tvShow that was clicked
function storeToLS(tvShow) {
    seriesObj = {
        Id: tvShow.id,
        First_air_date: tvShow.first_air_date,
        Name: tvShow.name,
        Origin_country: tvShow.origin_country,
        Original_language: tvShow.original_language,
        Overview: tvShow.overview,
        Popularity: tvShow.popularity,
        Poster_path: imagePath + tvShow.poster_path
    }
    extras = {

        Backdrop_path: imagePath + tvShow.backdrop_path,
        Genre_ids: tvShow.genre_ids

    }
    totalSeries = {
        seriesObj,
        extras
    }
    localStorage.setItem("series", JSON.stringify(totalSeries));
}

///////////in our prij we need Upper letters - property//////////
function showAboutFromOurWeb(tvShow) {
    console.log(tvShow);
    storeToLsFromSeriesDB(tvShow);
    window.location.replace("searchTv.html");
    // location.reload();
}
///////////in our proj we need Upper letters - property//////////
function storeToLsFromSeriesDB(tvShow) {
    seriesObj = {
        Id: tvShow.Id,
        First_air_date: tvShow.First_air_date,
        Name: tvShow.Name,
        Origin_country: tvShow.Origin_country,
        Original_language: tvShow.Original_language,
        Overview: tvShow.Overview,
        Popularity: tvShow.Popularity,
        Poster_path: tvShow.Poster_path
    }
    extras = {

        Backdrop_path: imagePath + tvShow.backdrop_path,
        Genre_ids: tvShow.genre_ids

    }
    totalSeries = {
        seriesObj,
        extras
    }
    localStorage.setItem("series", JSON.stringify(totalSeries));
}