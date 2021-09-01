// javascript  cover_i
const getBookName = () => {
    const bookName = document.getElementById('searchText').value;
    document.getElementById('searchText').value = '';
    return searchUrl(bookName);
}
const searchUrl = searchText => {
    console.log('here')
    fetch(`http://openlibrary.org/search.json?q="${searchText}"`)
        .then(response => response.json())
        .then(data => showBookInfo(data,data.docs) );
}
const author_names = name => name;
const showBookInfo = (count,info )=> {
    console.log(info);
    const bookBlock = document.getElementById('showDetail');
    bookBlock.textContent = '';
    bookBlock.innerHTML=`<p> total result found:${count.numFound}</p>`
    info.forEach(data => {
        const div = document.createElement('div');
        const authorNames =author_names(data.author_name);
        div.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg" alt="">
        <p> book name:${data.title}</p>
        <p>By :${authorNames}</p>
        <p>First published in:${data.first_publish_year}</p>
        `;
        bookBlock.appendChild(div);

    });
    // for (const data of info) {}
}
