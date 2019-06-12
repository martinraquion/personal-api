$( document ).ready(function() {
    const apikey = '1c8ab2ee6c9278c1787402e27c011570';
    const allowCORS = `https://cors-anywhere.herokuapp.com/`
    let musixUrl = `${allowCORS}https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=us&f_has_lyrics=1@&apikey=${apikey}`
    let itunesUrl = `${allowCORS}https://itunes.apple.com/search?term=bad+guy`;
    countriesURL = `https://restcountries.eu/rest/v2/all`
    
    console.log(musixUrl);

    $('.countries-bar').hide()
    $('.searchbox').hide()
    $('#cur-country').hide()
    // $('.info-bar').hide()  
    // $('.sub-title').hide()

    $('#song-search').click(function(){
      $('.searchbox').slideToggle(200)
      $('.searchInp').focus()
    })

    $('#globe').click(function(){
      $('.countries-bar').slideToggle(100)
    })

    $('#ctoggle').click(function(){
      $('.countries-bar').hide()
    })


    
    // $('.list').click(function(){
    //     $('.list').append('<li>Earl</li>')
    // })
    
    // console.log(url)
    $('.rank-box').click(function(){
      $('#info-bar').show()
    })
    
    // QUERYING TOP SONGS
    fetch(musixUrl)
        .then(res => res.json())
        .then(function(chart){
            const topSongs = chart.message.body.track_list;
            
            for(let x in topSongs){
                   
                let rank = Number(x)+1;
                $('.rank-container').append(`
                <div class="rank-box">
              <div class="rank-info" id="${topSongs[x].track.track_id}">
                <span class="rank-num">${rank}</span>
                <div class="album-art-box">
                  <img src="img/album-art.jpg" class="album-art" height="100px" width="100px">
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
            }

            
            // FOR THE INFO BOX
            $('.rank-info').on('click', function(){
              // $('.lyrics-box').html('')
              let trackID = this.id            
              fetch(`${allowCORS}https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&apikey=${apikey}`)
              .then(res => res.json())
              .then(function(data){
                let lyrics = data.message.body.lyrics.lyrics_body;
                $('.lyrics-box').append(lyrics)
                console.log(lyrics)
              })
            
            })
        })





      //  FOR OTHER COUNTRIES

        fetch(countriesURL)
          .then(res => res.json())
          .then(function(country){
           
            for(let x in country){
              let countryCode = country[x].alpha2Code
              $('.cb-container').append(`
              <div class="cb-box" id ="${countryCode.toLowerCase()}">
              <span class="flag-pic">
              <img src="${country[x].flag}" alt="" width="44vw" height="30vw">
              </span>
              <div class="cb-name" id="${countryCode.toLowerCase()}">
              ${country[x].alpha3Code}            
              </div>
            </div>
              `)
              // <option value='${countryCode.toLowerCase()}'>${country[x].alpha3Code}</option>
             }


             $('.cb-box').on('click', function(){
              console.log('changed')
              let newcountry = $(this).attr('id')
              console.log(newcountry)
              $('#cur-country').show()
              let flagUrl = $(this).children().first().children().attr('src')
              
              $('#cur-countryIMG').attr('src', flagUrl)
              $('#globe').hide()
             
              $('.rank-container').html('')
              let newmusixUrl = `${allowCORS}https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=${newcountry}&f_has_lyrics=1@&apikey=${apikey}`

              fetch(newmusixUrl)
              .then(res => res.json())
              .then(function(chart){
                  const topSongs = chart.message.body.track_list;
                  for(let x in topSongs){
                         
                      let rank = Number(x)+1;
                      $('.rank-container').append(`
                      <div class="rank-box">
                    <div class="rank-info">
                      <span class="rank-num">${rank}</span>
                      <div class="album-art-box">
                        <img src="img/album-art.jpg" class="album-art" height="100px" width="100px">
                      </div>
                      <div class="song-info">
                          <span class="song-title" id='${topSongs[x].track.track_id}'>${topSongs[x].track.track_name}</span>
                          <span class="song-artist">${topSongs[x].track.artist_name}</span>
                          <span class="song-album">${topSongs[x].track.album_name}</span>
                      </div>
                      <div class="play-btn-box">
                        <span class="fas fa-play-circle"></span>
                      </div>
                      
                    </div>
                  </div>
                     
                      `)
                  }

                  

      
              })

             })
             
             
          })


         

        


         
        
});