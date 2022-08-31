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

const app = {
    currentIndex: 0,

    isPlaying: false,

    songs: [
      {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "./assets/music/Adele - Hello.mp3",
        image: "./assets/Image/Adele.JPG"

      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./assets/music/Hoàng Thùy Linh - Em Đây Chẳng Phải Thúy Kiều (I Am Not Thuy Kieu) - Official Lyrics Video.mp3",
        image: "./assets/Image/Hoang thuy linh.JPG"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path: "./assets/music/Ellie Goulding - Love Me Like You Do (Official Video).mp3",
        image: "./assets/Image/love me like you do.JPG"
      },
      {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "./assets/music/SOOBIN X SLIMV - THE PLAYAH (Special Performance - Official Music Video).mp3",
        image: "./assets/Image/Soobin.JPG"
      },
      {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "./assets/music/Taylor Swift - Love Story.mp3",
        image: "./assets/Image/Taylor.JPG"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path: "./assets/music/Vicetone - Nevada.mp3",
        image: "./assets/Image/Vicetone - Nevada.jpg"
      },
      {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
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
        }
        
        //Khi bai hat bi dung lai
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')

        }

        //Khi tua bai hat (tien do bai hat thay doi)
        audio.ontimeupdate = function() {
            console.log(audio.currentTime/audio.duration)

        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
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



  