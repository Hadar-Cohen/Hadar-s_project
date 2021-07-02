$(document).ready(function () {
    navBarVisability();
    //Details about TVShow and the user:
    s = JSON.parse(localStorage.series);
    seriesId = s.seriesObj.Id;
    user = JSON.parse(localStorage.user);
    date = calcDay();
    if (localStorage.profileSrc != undefined)
        userProfile = JSON.parse(localStorage.profileSrc);
    else
        userProfile = "https://image.ibb.co/jw55Ex/def_face.jpg";

    $('#forumTitle').html("Welcome to the Fan Forum Of " + s.seriesObj.Name);
    buttonsEvents();
    showForum(seriesId, user.Id);

    //get the user and the comments he likes
    //getUserCommetsLike(user.Id, seriesId);

    /*            getUserLikeComm();*/
});
///////////////////////
//function getUserLikeComm() {
//    let api = "../api/UserLikesComm";
//    ajaxCall("GET", api, "", getFSuccessCB, error)

//}
//function getFSuccessCB(list) {
//    alert("WORK :)");
//    console.log(list);
//}
///////////////////////
function buttonsEvents() {
    submit.addEventListener('click', function publishComment() {
        let content = $("#contentText").val();
        if (content != "") {
            let comment = {
                currDate: date,
                userId: user.Id,
                userName: user.FirstName + " " + user.LastName,
                seriesId: seriesId,
                content: content,
                profile: userProfile
            }
            addComment(comment);
        }
        else {
            sweetAlert("Cant send comment...", "Content is missing!", "error")
        }
    });
}

function openDialog(commentId) {
    var dialogElem = document.getElementById("idDialog" + commentId);
    dialogElem.showModal();
}
function closeDialog(commentId) {
    var dialogElem = document.getElementById("idDialog" + commentId);
    dialogElem.close();
}



function showForum(seriesId, userId) {
    let api = "../api/Comments?seriesId=" + seriesId + "&connectedUserId=" + userId;
    ajaxCall("GET", api, "", getSuccessCB, getErrorCB)
}


function getSuccessCB(commentsList) {
    let str = "";
    for (const c of commentsList) {
        str += drawComment(c);
        getSubComments(c.SeriesId, c.CommentId);
        setTimeout(() => { updateLikes(c); }, 0);
    }
    $("#forum").html(str);

}

function getErrorCB(err) {
    alert("ERROR");
    console.log(err);
}

function getSubComments(seriesId, commentId) {
    let api = "../api/SubComments?seriesId=" + seriesId + "&commentId=" + commentId;
    ajaxCall("GET", api, "", getSCSuccessCB, getSCErrorCB);
}

function getSCSuccessCB(subCommentsList) {
    for (const c of subCommentsList) {
        let str = "";
        str += drawSubComment(c);
        let commId = document.getElementById('comment-' + c.CommentId);
        commId.innerHTML += str;
    }
}

function getSCErrorCB(err) {
    alert("ERROR");
    console.log(err);
}
function calcDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
}

function addComment(comment) {
    ajaxCall("POST", "../api/Comments", JSON.stringify(comment), postCommentSuccess, postCommentError)
}
function postCommentSuccess(series) {
    $('#contentText').val("");
    alert("Submitted to the server! success");
    console.log(series);
    showForum(series, user.Id);
}

function postCommentError(err) {
    alert("ERROR");
    console.log(err);
}
function addSubComment(commId) {
    subCommentContent = $('#reply' + commId).val();
    if (subCommentContent != "") {
        let subComment = {
            commentId: commId,
            currDate: date,
            userId: user.Id,
            userName: user.FirstName + " " + user.LastName,
            seriesId: seriesId,
            content: subCommentContent,
            profile: userProfile
        }
        console.log(subComment);
        ajaxCall("POST", "../api/SubComments", JSON.stringify(subComment), postSCommentSuccess, postSCommentError);
    }
    else {
        sweetAlert("Cant send comment...", "Content is missing!", "error")
    }
    closeDialog(commId);
}

function postSCommentSuccess(series) {
    alert("Post Success!");
    console.log(series);
    showForum(series, user.Id);
}

function postSCommentError(err) {
    alert("error");
    console.log(err);
}

function drawComment(comm) {
    return `<div class="be-comment">
                        <div class="be-img-comment">
                                <img src="`+ comm.Profile + `" alt="" class="be-ava-comment">
                        </div>
                        <div class="be-comment-content">
                            <span class="be-comment-name">
                                `+ comm.UserName + `
                            </span>
                            <span class="be-comment-time">
                                <i class="fa fa-clock-o"></i>
                                `+ comm.CurrDate + `
                            </span>
                            <p class="be-comment-text">
                                `+ comm.Content + `
                            </p>
                            ` + drawLike(comm) + `

                            <button id="replying" class="replyBtn" onclick="openDialog(` + comm.CommentId + `)"><i class="material-icons">&#xe15e;</i></button>
                            <dialog id="idDialog` + comm.CommentId + `">
                                <label for="reply">Reply:</label>
                                <br>
                                <textarea id="reply` + comm.CommentId + `" type="text" class="replyModal" name="reply"></textarea>
                                <br>
                                <div id="modalBtns">
                                    <button id="send`+ comm.CommentId + `" class="close" onclick="addSubComment(` + comm.CommentId + `)">Send</button>
                                    <button id="close`+ comm.CommentId + `" class="close" onclick="closeDialog(` + comm.CommentId + `)">Close</button>
                                </div>
                            </dialog>
                        </div>
                    </div>
                    <div id=comment-`+ comm.CommentId + `></div>`

}

function drawLike(comm) {
    let likeId = "like" + comm.CommentId;
    let dislikeId = "dislike" + comm.CommentId;
    return `<label id="count-` + likeId + `" class="likes" style = "color: green"> ` + comm.Likes + `</label>
                    <i id="` + likeId + `" onclick="toggleLike(this, '` + dislikeId + `', ` + comm.CommentId + `, 'fa-thumbs-up', 'fa-thumbs-down', updateCommentLikes)" class="fa fa-thumbs-o-up"></i>
                    <label id="count-` + dislikeId + `" class="dislikes" style = "color: red"> ` + comm.Dislikes + `</label>
                    <i id="` + dislikeId + `" onclick="toggleLike(this, '` + likeId + `',` + comm.CommentId + `, 'fa-thumbs-down', 'fa-thumbs-up', updateCommentDislikes)" class="fa fa-thumbs-o-down"></i>
                    `;
}

function updateLikes(comm) {
    let likeId = "like" + comm.CommentId;
    let dislikeId = "dislike" + comm.CommentId;

    if (comm.IsLike) {
        document.getElementById(likeId).classList.toggle('fa-thumbs-up');
    }
    if (comm.IsDislike) {
        document.getElementById(dislikeId).classList.toggle('fa-thumbs-down');
    }
}

function toggleLike(x, otherThumbId, commentId, myClass, otherClass, updateCallback) {
    let y = document.getElementById(otherThumbId);
    if (y.classList.contains(otherClass)) {
        y.click();
    }

    let numberOfLikes = 0;
    x.classList.toggle(myClass);

    if (x.classList.contains(myClass)) {
        numberOfLikes++;
    } else {
        numberOfLikes--;
    }
    updateCounterLable(x.id, numberOfLikes);
    updateCallback(commentId, numberOfLikes);
}

function updateCounterLable(btnId, number) {
    let x = parseInt(document.getElementById("count-" + btnId).innerHTML);
    document.getElementById("count-" + btnId).innerHTML = x + number;
}

function updateCommentLikes(commentId, number) {
    alert("change " + commentId + " likes by " + number);
    //update comment with this commentId likes on db ny number
    let api = "../api/Comments?commentId=" + commentId + "&likes=" + number + "&dislikes=0";
    ajaxCall("PUT", api, "", updateLikesSuccess, error);
    ////////////////////////////////////////POST USERLIKESCOMM
    updateUserLikeComment(commentId, true, number > 0);
}

function updateCommentDislikes(commentId, number) {
    alert("change " + commentId + " dislikes by " + number);
    //update comment with this commentId dislikes on db ny number
    let api = "../api/Comments?commentId=" + commentId + "&likes=0" + "&dislikes=" + number;
    ajaxCall("PUT", api, "", updateLikesSuccess, error);
    updateUserLikeComment(commentId, false, number > 0);
}

function updateUserLikeComment(commentId, isLike, value) {
    let api = "../api/UserLikesComm?commentId=" + commentId + "&userId=" + user.Id + "&seriesId=" + seriesId + "&like=" + value + "&dislike=" + isLike;
    ajaxCall("PUT", api, "", updateUserLikeCommentSuccess, error)
}
function updateUserLikeCommentSuccess() {
    console.log("update user like / dislike comment success");
}
function updateLikesSuccess() {
    console.log("update like / dislike success");
}
function error(err) {
    alert("ERROR :(")
}

function drawSubComment(comm) {
    return `<div class="be-comment" style= "margin-left: 60px;">
                        <div class="be-img-comment">
                                <img src="`+ comm.Profile + `" alt="" class="be-ava-comment">
                        </div>
                        <div class="be-comment-content">
                            <span class="be-comment-name">
                                `+ comm.UserName + `
                            </span>
                            <span class="be-comment-time">
                                <i class="fa fa-clock-o"></i>
                                `+ comm.CurrDate + `
                            </span>
                            <p class="be-comment-text">
                                `+ comm.Content + `
                            </p>
                        </div>
                    </div>`
}