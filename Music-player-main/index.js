// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,

    songs: [
        {
          name: "Em Đây Chẳng Phải Thúy Kiều",
          singer: "Hoàng Thùy Linh",
          path: "./assets/music/Hoàng Thùy Linh - Em Đây Chẳng Phải Thúy Kiều (I Am Not Thuy Kieu) - Official Lyrics Video.mp3",
          image: "./assets/Image/Hoang thuy linh.JPG"
        },
      {
        name: "Hello",
        singer: "Adele",
        path: "./assets/music/Adele - Hello.mp3",
        image: "./assets/Image/Adele.JPG"

      },
      {
        name: "Love Me Like You Do",
        singer: "Ellie Goulding",
        path: "./assets/music/Ellie Goulding - Love Me Like You Do (Official Video).mp3",
        image: "./assets/Image/love me like you do.JPG"
      },
      {
        name: "THE PLAYAH",
        singer: "SOOBIN X SLIMV",
        path: "./assets/music/SOOBIN X SLIMV - THE PLAYAH (Special Performance - Official Music Video).mp3",
        image: "./assets/Image/Soobin.JPG"
      },
      {
        name: "Love Story",
        singer: "Taylor Swift",
        path: "./assets/music/Taylor Swift - Love Story.mp3",
        image: "./assets/Image/Taylor.JPG"
      },
      {
        name: "Nevada",
        singer: "Vicetone",
        path: "./assets/music/Vicetone - Nevada.mp3",
        image: "./assets/Image/Vicetone - Nevada.jpg"
      },
      {
        name: "My Love",
        singer: "Westlife",
        path: "./assets/music/Westlife - My Love (Official Video).mp3",
        image: "./assets/Image/Westlife.JPG"
      }
    ],
    
    render: function(){
        const html = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        $('.playlist').innerHTML = html.join('')
    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function(){
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xu ly CD quay
       const cdThumbAnimate = cdThumb.animate([
            {transform:'rotate(360deg'}
        ], {
            duration:10000,
            iteration: Infinity
        })

        cdThumbAnimate.pause()

        //Xu ly phong to, thu nho CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0? newCdWidth + 'px' : 0

            cd.style.opacity = newCdWidth/cdWidth
        }

        //Xu ly khi click play
        playBtn.onclick = function(){
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        
        //Khi bai hat duoc chay
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

        }
        
        //Khi bai hat bi dung lai
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }

        //Khi tua bai hat (tien do bai hat thay doi)
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration * 100)
                progress.value = progressPercent
            }

        }

        //Xu ly khi tua
        progress.onchange = function(e) {
            const seekTime = e.target.value* audio.duration/100 
            audio.currentTime = seekTime
        }


        //Khi next song
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()
        }

        //Khi prev song
        prevBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        }  

        //Khi random song
        randomBtn.onclick = function(e){
            if(_this.isRandom) {
                
            }
            randomBtn.classList.add('active')
        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },


    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()

    },

    start: function() {
        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //Lang nghe va xu ly cac su kien
        this.handleEvents()

        //Tai thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()

        //Render ra playlist
        this.render()
    }
}

app.start()



  