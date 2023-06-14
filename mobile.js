let highestZ = 1;
var x = document.getElementsByTagName("BODY")[0];
x.style.opacity = 0
window.addEventListener("load", event => {
  var images = Array.from(document.querySelectorAll('img'))
  var imagesLength = images.length
  var i = 0
  images.forEach((image) => {
    var isLoaded = image.complete && image.naturalHeight !== 0;
    if(isLoaded) {
      i++
    }
  })
  if(i === imagesLength) {
    setTimeout(() => {
      x.style.opacity = 1
    }, 1000)
  }
});

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(!this.rotating) {
        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;
        
        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;
      }
        
      const dirX = e.touches[0].clientX - this.touchStartX;
      const dirY = e.touches[0].clientY - this.touchStartY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('touchstart', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
const play1 = document.getElementById('play1')
const video1 = document.getElementById('video1')
const play2 = document.getElementById('play2')
const vpause3 = document.getElementById('vpause3')
const video2 = document.getElementById('video2')
const aplay1 = document.getElementById('aplay1')
const audio1 = document.getElementById('audio1')
const audio2 = document.getElementById('audio2')
const audio3 = document.getElementById('audio3')
const audio4 = document.getElementById('audio4')
aplay1.addEventListener('touchend', e => {
  audio1.play()
})
play1.addEventListener('touchend', e => {
  audio1.pause()
})
play1.addEventListener('touchend', e => {
  video1.play()
})
const vpause1 = document.getElementById('vpause1')
vpause1.addEventListener('touchend', e => {
  video1.pause()
  audio2.play()
})
const apause2 = document.getElementById('apause2')
apause2.addEventListener('touchend', e => {
  audio2.pause()
  audio3.play()
})
play2.addEventListener('touchend', e => {
  audio3.pause()
  video2.play()
  audio4.play()
})
vpause3.addEventListener('touchend', e => {
  audio4.pause()
  video2.pause()
})
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
