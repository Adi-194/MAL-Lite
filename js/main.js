$(document).ready(function () {
    $('#searchForm').on('submit',(e)=>{
        let searchText = $('#searchText').val();
        getAnimes(searchText);
        e.preventDefault();
    })
});

function getAnimes(searchText){
    axios.get(' https://api.jikan.moe/v3/search/anime?q='+searchText)
    .then((response)=>{
        console.log(response);
        let animes = response.data.results;
        let output = "";
        $.each(animes, (index,anime)=>{
            output += `
            <div class="col-md-3">
                <div class="text-center well">
                    <img src="${anime.image_url}" class="pt-5">
                    <h5>${anime.title}</h5>
                    <a onclick="animeSelected('${anime.image_url}','${anime.title.replace(/"/g,'&quot;').replace(/'/g,"&quot;")}','${anime.synopsis.replace(/"/g,'&quot;').replace(/'/g,"&quot;")}')" class="btn btn-warning" href="#">Anime Details</a>
                </div>
            </div>
            `;
        });
        $('#animes').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
}

function animeSelected(image,title,syn){
    console.log(image,title,syn);
    let display = "";
    $('#animes').html(display);
    //sessionStorage.setItem('image',image);
    //sessionStorage.setItem('title',title);
    //sessionStorage.setItem('synopsis',syn);
    //window.location = 'anime.html';
    display = `
    <div class="text-center">
        <div class="col-lg-4 col-mg-4 col-12">
         <img src='${image}' class="img-fluid">
        </div>
        <div class="col-lg-8 col-mg-8 col-12 text-light">
            <h2>${title}</h2>
            <hr color="white">
            <p class="text-warning">
              ${syn}
            </p>
        </div>
    </div>
    `;
    $('#animes').html(display);
    
    return false; 
}
/*function getAnime(){
    let image = sessionStorage.getItem('image');
    let title = sessionStorage.getItem('title');
    let synopsis = sessionStorage.getItem('synopsis');
    let display = `
    <div class="row pt-5 pr-5">
        <div class="col-lg-6 col-mg-6 col-12">
         <img src='${image}' class="img-fluid">
        </div>
        <div class="col-lg-6 col-mg-6 col-12 text-light">
            <h2>${title}</h2>
            <hr color="white">
            <p>
              ${synopsis}
            </p>
        </div>
    </div>
    `;
    $('#anime').html(display);
}*/