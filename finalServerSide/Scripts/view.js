﻿$(document).ready(function () {

    $("#nav-bar").load("signup.html");
    imagePath = "https://image.tmdb.org/t/p/w500/";
    //navBarVisability();
    /*modal();*/

    $("#phView").html("");
    str = "<select id='series' onchange=showEpisodes(this)>";
    str += "<option>select</option>";
    if (localStorage.user != null) {
        user = JSON.parse(localStorage["user"]);
    }
    userId = user.Id;
    userEmail = user.Email;
    userName = user.FirstName + " " + user.LastName;
    userTmp = {
        id: userId,
        name: userName
    }
    /*series = document.getElementById('series');*/
    //selectedText = series.options[series.selectedIndex].innerHTML;
    let api = "../api/Totals?UserId=" + userId + "&email=" + userEmail;
    ajaxCall("GET", api, "", getSeriesSuccessCB, getSeriesErrorCB);
});

function getSeriesSuccessCB(series) {

    for (const s of series) {
        str += "<option value=" + s.Id + ">" + s.Name + "</option>";
    }
    str += "</select>";
    $("#phView").html(str);
}
function getSeriesErrorCB(err) {
    alert("Error -cant get the Series names");
}
episodesList = "";
seriesReload = 0;
function showEpisodes(series) {
    var selectedText = series.options[series.selectedIndex].innerHTML;
    selectedVal = series.options[series.selectedIndex].value;
    saveToLocalS(selectedText);
    seriesReload = selectedText;
    getToDBShowEpisodes(selectedText);
  
}
function getToDBShowEpisodes(selectedText)
{
    let api = "../api/Totals?seriesName=" + selectedText + "&userId=" + userId;
    ajaxCall("GET", api, "", getEpisodesSuccessCB, Error);
}

function getEpisodesSuccessCB(episodes) {
    checkClub(selectedVal);
    console.log(episodes);
    episodesList = "";

    episodes.forEach(ep => {
        episodesList += drawEpisodeCard(ep);
    });

    $("#episodesView").html(episodesList);
}

i = 0;
episodes = [];
function drawEpisodeCard(episode) {
    episodes[i] = episode;
    let str = "<div class='card2 cardInView' style='width:800px; height: 400px'><a class='deleteEpisodeBtn' onclick=deleteEpisode(episodes["+i+"]) tabindex='0' role='button'>X</a> <center><b><p class='episodeTitle'>" + episode.SeriesName + " season " + episode.SeasonNum + "</p></b></center><img class= 'imgCard' src='" + episode.ImageURL + "'>";
    str += "<div class='episodeBlock'><br><b>" + episode.EpisodeName + "</b></br > " + episode.AirDate + "</br></br><div id='episodeOverView'>" + episode.Overview + "</div></div></div>";
    i++;
    return str;
}

function Error(err) {
    console.log(err);
}

function exitFunc() {
    localStorage.clear();
    document.location = 'homePage.html';
}

function deleteEpisode(episode) {
    let api = "../api/Totals?episodeId=" + episode.EpisodeId + "&seriesId=" + episode.SeriesId + "&userId=" + userId;
    ajaxCall("DELETE", api, "", deleteEpisodesSuccess, Error);
}

function deleteEpisodesSuccess()
{
    getToDBShowEpisodes(seriesReload);
   // location.reload();
    alert('deleted');
}

function checkClub(seriesId) {
    let api = "../api/ClubMembers?seriesId=" + seriesId + "&userId=" + userId;
    ajaxCall("GET", api, "", getClubmMSuccessCB, Error);
}
function addToClub(seriesId) {
    let api = "../api/ClubMembers?seriesId=" + seriesId + "&userId=" + userId;
    ajaxCall("POST", api, "", postClubmMSuccessCB, Error);
}
function getClubmMSuccessCB(ma) {
    console.log(ma);
    if (ma.UserId == 0) {
        str = `  <div class="wrapper">
              <a id="`+ selectedVal + `" onclick="addToClub(this.id)" href="#">Join the fan club of!</a>
           </div> `;
    }

    else {
        str = `  <div class="wrapper">
              <a id="`+ selectedVal + `" onclick="commentP()">to the chat</a>
           </div> `;
    }
    $("#forum").html(str);
}


function postClubmMSuccessCB(ma) {
    alert("welcome to the gruop :)");

    str = `  <div class="wrapper">
              <a id="`+ selectedVal + `" href="comment.html">to the forum</a>
           </div> `;
    $("#episodesView").html(episodesList);
    $("#forum").html(str);
}
function commentP() {
    window.location.replace("comment.html");
}


function saveToLocalS(selectedText) {
    seriesObj = {
        Id: selectedVal,
        Name: selectedText,
    }
    extras = {

        Backdrop_path: "",
        Genre_ids: ""

    }
    totalSeries = {
        seriesObj,
        extras
    }
    console.log(totalSeries);

    localStorage.setItem("series", JSON.stringify(totalSeries));
}
