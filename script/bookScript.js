// javascript  cover_i
const getBookName = () => {
    const bookName = document.getElementById('searchText').value;
    document.getElementById('searchText').value = '';
    return searchUrl(bookName);
}
const searchUrl = searchText => {
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(data => showBookInfo(data, data.docs));
}
const author_names = name => name;
const showBookInfo = (count, info) => {
    const bookBlock = document.getElementById('showDetail');
    bookBlock.textContent = '';
    // bookBlock.innerHTML = `<p> total result found:${count.numFound}</p>`;
    document.getElementById('totalFound').innerText=count.numFound;
    info.forEach(data => {
        const div = document.createElement('div');
        const authorNames = author_names(data.author_name);
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">book name:${data.title}</h5>
                      <h6>By :${authorNames}</h6>
                      <p class="card-text">First published in:${data.first_publish_year}</p>
                    </div>
                  </div>
                </div>
              </div>
        `;
        bookBlock.appendChild(div);

    });
}
