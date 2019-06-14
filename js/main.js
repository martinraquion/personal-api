  $( document ).ready(function() {
      const apikey = '1c8ab2ee6c9278c1787402e27c011570';
      const allowCORS = `https://cors-anywhere.herokuapp.com/`
      const musixBaseURL = `https://api.musixmatch.com/ws/1.1/`
      let musixUrl = `${allowCORS}https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=xy&f_has_lyrics=1@&apikey=${apikey}`
      let itunesUrl = `${allowCORS}https://itunes.apple.com/search?term=bad+guy`;
      countriesURL = `https://restcountries.eu/rest/v2/all`
      
      // console.log(musixUrl);

      $('.countries-bar').hide()
      $('.searchbox').hide()
      $('#cur-country').hide()
      $('#info-bar').hide()  
      // $('.other-songs').hide()
      // $('.sub-title').hide()

     

      $('#globe').click(function(){
        $('.countries-bar').slideToggle(100) 
        $('#searchcountry').focus() 
      })

  
      $('.ctoggle').click(function(){
        $('.countries-bar').slideToggle(100)
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
                  <div class="rank-box" id="${topSongs[x].track.commontrack_id}">
                <div class="rank-info" id="${topSongs[x].track.track_id}">
                  <span class="rank-num">${rank}</span>
                  
                  <div class="song-info">
                      <span class="song-title">${topSongs[x].track.track_name}</span>
                      <span class="song-artist">${topSongs[x].track.artist_name}</span>
                      <span class="song-album">${topSongs[x].track.album_name}</span>
                  </div>

                  <div class="hover-btn-box">
                    <span class='hover-text'>view info and lyrics &nbsp; 
                    <span class='fas fa-caret-right'></span>
                    </span>
                  </div>
                  
                 
                </div>
              </div>
                
                  `)
                }

                $('.hover-text').hide()  

                $('.rank-box').on('mouseenter', function(){
                  console.log($(this).children().children().last().children().show())
                })
                $('.rank-box').on('mouseleave', function(){
                  console.log($(this).children().children().last().children().hide())
                })
                

                // $('.hover-text').hover(function(){
                //   $('.hover-text').show()
                // })

                // <div class="album-art-box">
                //     <img src="img/album-art.jpg" class="album-art" height="100px" width="100px">
                //   </div>

              //   <div class="play-btn-box">
              //   <span class="fas fa-play-circle"></span>
              // </div>
              



              //FOR SEARCHING SONGS
              $('#song-search').click(function(){
                $('.searchbox').slideToggle(200)
                $('.searchInp').focus()
                $('#searchInp').on('keyup', function(){
                  var word = $(this).val(),
                  count = 0;
               $('.rank-box').each(function() {      
               if ($(this).text().search(new RegExp(word, "i")) < 0) {
                 $(this).hide();  // MY CHANGE
               } else {
                $(this).show(); // MY CHANGE
                 count++;
               }
                });
                
                })
              })

              // END SEARCH SONGS
              


              
              // FOR THE INFO BOX
              $('.rank-info').on('click', function(){
                // $('.hover-text').show()  
                $('.other-songs').html(' ')
                $('#info-bar').slideDown(100) 
                $('.genre-container').html(' ')
                // $('.rank-info').show()
                $('.lyrics-here').text('')
                let trackID = this.id            
                fetch(`${allowCORS}https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&apikey=${apikey}`)
                .then(res => res.json())
                .then(function(data){
                  let lyrics = data.message.body.lyrics.lyrics_body;
                  $('.lyrics-here').append(lyrics)
                  // console.log(lyrics)
                })

                let commonTrackID = $(this).parent().attr('id');
                console.log(commonTrackID)
                // console.log(commonTrackID)
                fetch(`${allowCORS}${musixBaseURL}track.get?commontrack_id=${commonTrackID}&apikey=${apikey}`)
                .then(res => res.json())
                .then(function(trackData){
                  let trackName = trackData.message.body.track.track_name
                  let trackArtist = trackData.message.body.track.artist_name
                  let trackAlbum = trackData.message.body.track.album_name
                  let trackAlbumID = trackData.message.body.track.album_id
                  let genrelist = trackData.message.body.track.primary_genres.music_genre_list 
                  // console.log(trackName);
                  // console.log(trackArtist)
                  // console.log(trackAlbum)
                  // console.log(genrelist)

                  $('.track-title').text(trackName)
                  $('.track-artist').text(trackArtist)
                  $('.track-album').text(trackAlbum)
                  $('.track-album').attr('id', trackAlbumID)
                  $('.albumAll-btn').attr('id', trackAlbumID)

                  for(let x in genrelist){
                  
                    $('.genre-container').append(`
                      <span class="genre"> ${genrelist[x].music_genre.music_genre_name}
                      </span>`
                      )
                  }

                })

                $('.albumAll-btn').off('click').on('click', function(){
                  
                  $('.other-songs').html('')
                  // $('.other-songs').show()
                  let albumIDother = this.id;
                  // console.log(albumIDother)
                  fetch(`${allowCORS}${musixBaseURL}album.tracks.get?album_id=${albumIDother}&page=1&apikey=${apikey}`)
                  .then(res => res.json())
                  .then(function(album){
                    let albumTRACKS = album.message.body.track_list;

                    for(let x in albumTRACKS){
                      $('.other-songs').append(`
                      <div class="other-song-info">
                      <span class='other-song-title'>${albumTRACKS[x].track.track_name}</span>  
                      </div>
                      `)
                     
                    }
                  })
                  // <span class='other-song-title'>LANGIT</span>
                  // $('.other-song-info').append()

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
                <span class='hide'>${country[x].name}</span>
                </div>
              </div>
                `)
                // <option value='${countryCode.toLowerCase()}'>${country[x].alpha3Code}</option>
               }

            // SEARCHING COUNTRY 
            $('#searchcountry').on('keyup', function(){
                var cword = $(this).val(),
                count = 0;
             $('.cb-box').each(function() {      
             if ($(this).text().search(new RegExp(cword, "i")) < 0) {
               $(this).hide();  // MY CHANGE
             } else {
              $(this).show(); // MY CHANGE
               count++;
             }
              });
              
              })
              // END SEARCH

               $('.cb-box').on('click', function(){
                
                
                // console.log('changed')
                let newcountry = $(this).attr('id')
                console.log(newcountry)

                if(this.id==='xy'){
                  $('#cur-country').hide()
                  $('#globe').show()
                }else{
                $('#cur-country').show()
                let flagUrl = $(this).children().first().children().attr('src')
                
                $('#cur-countryIMG').attr('src', flagUrl)
                $('#globe').hide()
                }

                $('.rank-container').html('')
                let newmusixUrl = `${allowCORS}https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=100&country=${newcountry}&f_has_lyrics=1@&apikey=${apikey}`


               fetch(newmusixUrl)  
               .then(res => res.json())
               .then(function(chart){

                const topSongs = chart.message.body.track_list;
              
                for(let x in topSongs){
                      
                    let rank = Number(x)+1;
                    $('.rank-container').append(`
                    <div class="rank-box" id="${topSongs[x].track.commontrack_id}">
                  <div class="rank-info" id="${topSongs[x].track.track_id}">
                    <span class="rank-num">${rank}</span>
                   
                    <div class="song-info">
                        <span class="song-title">${topSongs[x].track.track_name}</span>
                        <span class="song-artist">${topSongs[x].track.artist_name}</span>
                        <span class="song-album">${topSongs[x].track.album_name}</span>
                    </div>
                    <div class="hover-btn-box">
                    <span class='hover-text'>view info and lyrics &nbsp; 
                    <span class='fas fa-caret-right'></span>
                    </span>
                  </div>
                    
                  </div>
                </div>
                  
                    `)
                } 

                $('.hover-text').hide()  

                $('.rank-box').on('mouseenter', function(){
                  console.log($(this).children().children().last().children().show())
                })
                $('.rank-box').on('mouseleave', function(){
                  console.log($(this).children().children().last().children().hide())
                })


                // FOR THE INFO BOX
              $('.rank-info').on('click', function(){
                $('.other-songs').html(' ')
                $('#info-bar').slideDown(100) 
                $('.genre-container').html(' ')
                // $('.rank-info').show()
                $('.lyrics-here').text('')
                let trackID = this.id            
                fetch(`${allowCORS}https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&apikey=${apikey}`)
                .then(res => res.json())
                .then(function(data){
                  let lyrics = data.message.body.lyrics.lyrics_body;
                  $('.lyrics-here').append(lyrics)
                  // console.log(lyrics)
                })

                let commonTrackID = $(this).parent().attr('id');
                console.log(commonTrackID)
                // console.log(commonTrackID)
                fetch(`${allowCORS}${musixBaseURL}track.get?commontrack_id=${commonTrackID}&apikey=${apikey}`)
                .then(res => res.json())
                .then(function(trackData){
                  let trackName = trackData.message.body.track.track_name
                  let trackArtist = trackData.message.body.track.artist_name
                  let trackAlbum = trackData.message.body.track.album_name
                  let trackAlbumID = trackData.message.body.track.album_id
                  let genrelist = trackData.message.body.track.primary_genres.music_genre_list 
                  // console.log(trackName);
                  // console.log(trackArtist)
                  // console.log(trackAlbum)
                  // console.log(genrelist)

                  $('.track-title').text(trackName)
                  $('.track-artist').text(trackArtist)
                  $('.track-album').text(trackAlbum)
                  $('.track-album').attr('id', trackAlbumID)
                  $('.albumAll-btn').attr('id', trackAlbumID)

                  for(let x in genrelist){
                  
                    $('.genre-container').append(`
                      <span class="genre"> ${genrelist[x].music_genre.music_genre_name}
                      </span>`
                      )
                  }

                })

                $('.albumAll-btn').off('click').on('click', function(){
                  
                  $('.other-songs').html('')
                  // $('.other-songs').show()
                  let albumIDother = this.id;
                  // console.log(albumIDother)
                  fetch(`${allowCORS}${musixBaseURL}album.tracks.get?album_id=${albumIDother}&page=1&apikey=${apikey}`)
                  .then(res => res.json())
                  .then(function(album){
                    let albumTRACKS = album.message.body.track_list;

                    for(let x in albumTRACKS){
                      $('.other-songs').append(`
                      <div class="other-song-info">
                      <span class='other-song-title'>${albumTRACKS[x].track.track_name}</span>  
                      </div>
                      `)
                     
                    }
                  })

                  // fetch(`${allowCORS}https://api.musixmatch.com/ws/1.1/album.get?album_id=${albumIDother}&apikey=1c8ab2ee6c9278c1787402e27c011570`)
                  // .then(res => res.json())
                  // .then(function(data){
                  //   picAlbum =  data.message.body.album
                  //   console.log(picAlbum);
                  // })

                })

              
              })

               })


               })
              

         })

          
          
  }); //document ready end