// javascript  cover_i https://openlibrary.org/dev/docs/api/search  mangerbata  10909258
const getBookName = () => {
    const bookName = document.getElementById('searchText').value;
    if(!bookName){
      alert('please enter book name')
    }else{
      document.getElementById('searchText').value = '';
      return searchUrl(bookName);
    }
}
const searchUrl = searchText => {
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(data => showBookInfo(data, data.docs));
}
const visibleMassage=showOrNot=>document.getElementById('noResult').style.display=showOrNot;
const author_names = name => {
  if(typeof(name)==='undefined'){
    return name='Unknown author';
  }else{
    return name;
  }
};
const publishYear= year=>{
  if(typeof(year)==='undefined'){
    return year='Unknown year';
  }else{
    return year;
  }
}
const coverImage=image=>{
  if(typeof(image)==='undefined'){
    return image=10909258;
  }else{
    return image;
  }
}
const showBookInfo = (count, info) => {
    visibleMassage('none');
    const bookBlock = document.getElementById('showDetail');
    bookBlock.textContent = '';
    document.getElementById('totalFound').innerText=count.numFound;   
    if(info.length===0){
      visibleMassage('block');
      document.getElementById('noResult').innerText='No Result Found';
    }  
    info?.forEach(data => {
        const div = document.createElement('div');
        const authorNames = author_names(data.author_name);
        const firstPublishYear =publishYear(data.first_publish_year);
        const cover_i =coverImage(data.cover_i);
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title"><span class="text-primary">${data.title}</span></h5>
                      <h6>By :<span class="text-primary">${authorNames}</span></h6>
                      <p class="card-text">First published in:<span class="text-primary">${firstPublishYear}</span></p>
                    </div>
                  </div>
                </div>
              </div>
        `;
        bookBlock.appendChild(div);
    });
}
