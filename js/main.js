$( document ).ready(function() {
    const apikey = '1c8ab2ee6c9278c1787402e27c011570';
    const allowCORS = `https://cors-anywhere.herokuapp.com/`
    let country ='us'
    let musixUrl = `${allowCORS}https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=${country}&f_has_lyrics=1@&apikey=${apikey}`
    let itunesUrl = `${allowCORS}https://itunes.apple.com/search?term=`;
    
    console.log(musixUrl);
    
    // $('.list').click(function(){
    //     $('.list').append('<li>Earl</li>')
    // })
    
    // console.log(url)


    // write a function for getting album art and preview song from itunes api

  
      fetch(`${allowCORS}https://itunes.apple.com/search?term=bad+guy`)
        .then(res => res.json())
        .then(function(data){
          let artprev = data.results[0].artworkUrl100;
          `<img src="${artprev}" class="album-art" height="100px" width="100px">`
          // console.log(artprev)
        })
    

    // console.log(getArtPrev())

    
    // QUERYING TOP SONGS
    fetch(musixUrl)
        .then(res => res.json())
        .then(function(chart){
            const topSongs = chart.message.body.track_list;
            // var replaced = str.split(' ').join('+');
           
              //  albumidURL = ${topSongs[x].track.track_name}
            //  let str;
              fetch(`${allowCORS}https://itunes.apple.com/search?term=bad+guy`)
                .then(res => res.json())
                .then(function(data){
                  let artprev = data.results[0].artworkUrl100;
                  let songprev = data.results[0].previewUrl
                  let artString = JSON.stringify(artprev);
                  
                  // let str = artString;                 
                  
                  // console.log(artString)
               
              for(let x in topSongs){

                let rank = Number(x)+1;
                $('.rank-container').append(`
                <div class="rank-box">
                <div class="rank-info">
                <span class="rank-num">${rank}</span>
                <div class="album-art-box">
                <img src=${artString} class="album-art" height="100px" width="100px">
                </div>
                <div class="song-info">
                    <span class="song-title">${topSongs[x].track.track_name}</span>
                    <span class="song-artist">${topSongs[x].track.artist_name}</span>
                    <span class="song-album">${topSongs[x].track.album_name}</span>
                </div>
                <div class="play-btn-box">
                  <span class="fas fa-play-circle"></span>
                </div>
                
              </div>
            </div>
               
                `)
                // console.log(topSongs[x].track.track_name);
                }
              })
            

        })

        // fetch(itunesUrl)
        // .then(res => res.json())
        // .then(function(song){
        //     let thesong = song.results[0].artworkUrl100;
            
        //     $('.album-art').attr('src', thesong.toString())
        // })
});