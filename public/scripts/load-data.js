const latestContainer = document.querySelector("#latestContainer");
const commentsByFilmContainer = document.querySelector("#commentsByFilmContainer");
const commentForm = document.querySelector("#commentForm");

const idToName = [];
idToName[1464335] = "Uncharted";
idToName[11252248] = "Dog";
idToName[10872600] = "Spider-Man: No Way Home";
idToName[7657566] = "Death on the Nile";

function getJsonAsync(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject("Unable to load");
            }
        }
        xhr.onerror = () => {
            reject("Unable to load");
        };
        xhr.send();
    });
}

function submitAsync(url, data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
}

async function updateLatestComments() {
    const url = "http://localhost:8081/latest_comments?limit=3";
    const json = await getJsonAsync(url);
    const data = JSON.parse(json);

    rerenderLatest(data);
}

async function updateCommentsByFilm(filmId) {
    const url = "http://localhost:8081/movie_comments?imdbId=" + filmId;
    const json = await getJsonAsync(url);
    const data = JSON.parse(json);

    rerenderCommentsByFilm(data);
}

function rerenderLatest(data) {
    latestContainer.innerHTML = "";
    data.forEach((comment) => latestContainer.insertAdjacentHTML('beforeend', getCommentHtml(comment)));
}

function rerenderCommentsByFilm(data) {
    commentsByFilmContainer.innerHTML = "";
    data.forEach((comment) => commentsByFilmContainer.insertAdjacentHTML('beforeend', getCommentHtml(comment)));
}

function getCommentHtml(comment) {
    return '' +
        '<div class="list-group-item py-3">' +
        '    <div' +
        '        class="d-flex align-items-center justify-content-between">' +
        '        <strong class="mb-1">' + (idToName[comment.imdbId] ?? 'Unknown film') + '</strong>' +
        '        <small class="text-muted">' + comment.rating + ' stars</small>' +
        '    </div>' +
        '    <div class="col-10 mb-1 small">' +  comment.comment + '</div>' +
        '    <small class="text-muted"> (by ' + comment.author + ')</small>' +
        '</div>';
}

async function sendComment() {
    const url = "http://localhost:8081/add_comment";
    const data = Object.fromEntries(new FormData(commentForm));
    const result = await submitAsync(url, data);

    updateLatestComments();
    updateCommentsByFilm(data.imdbId);
}

document.addEventListener('submit', function (event) {
    event.preventDefault();
    sendComment();
});

updateLatestComments();
