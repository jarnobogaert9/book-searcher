var link = window.location.href;
var wrapper = document.querySelector('#wrapper');

if (link == 'http://localhost:3000/search') {
  let searchEl = document.getElementById('search');
  searchEl.addEventListener('input', (e) => {
    e.preventDefault();
    clearWrapper();
    // console.log(searchEl.value);
    let book = searchEl.value;
    $.ajax({
      method: 'post',
      url: '/searching',
      contentType: 'application/json',
      data: JSON.stringify({
        searchedBook: book
      }),
      success: (data) => {
        showData(data);
      }
    });
  });
}

function showData(books) {
  for (let i = 0; i < books.length; i++) {
    const element = books[i];
    console.log(element.book_name);
    wrapper.innerHTML += `
      <div class="row">
        <div class="col s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">${element.book_name}</span>
              <a href="book/${element.book_id}" class="waves-effect waves-light btn">More about the book</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  console.log('----------------');
}

function clearWrapper() {
  wrapper.innerHTML = '';
}