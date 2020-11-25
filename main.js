const lightboxSlide = document.querySelector(".lightbox-slide")
const initialLightboxImages = document.querySelectorAll(".image-wrapper")
const lightboxImages = [
  initialLightboxImages[initialLightboxImages.length - 1],
  ...initialLightboxImages,
  initialLightboxImages[0],
]

let lightboxWidth = 0
let lightboxHeight = 0

function getLightboxSize() {
  console.log("getLightboxSize()")
  lightboxWidth = document.querySelector(".lightbox-container").offsetWidth
  lightboxHeight = document.querySelector(".lightbox-container").offsetHeight
  console.log(lightboxWidth, lightboxHeight)
}

getLightboxSize()

let html = ""
lightboxImages.map(image => {
  html += image.outerHTML
})
lightboxSlide.innerHTML = html

// Size images
function sizeImages() {
  console.log("sizeImages()")
  const imageNode = document.querySelectorAll(".lightbox-image")
  const images = [...imageNode]
  console.log(images)
  images.map(image => {
    aspectRatioImage = image.naturalWidth / image.naturalHeight
    aspectRatioBox = lightboxWidth / lightboxHeight
    console.log(
      "Image:",
      image.naturalWidth,
      image.naturalHeight,
      aspectRatioImage,
      "Box:",
      lightboxWidth,
      lightboxHeight,
      aspectRatioBox
    )
    if (aspectRatioImage >= aspectRatioBox) {
      console.log("aspectRatioImage >= aspectRatioBox")
      image.width = lightboxWidth
      image.height = lightboxWidth / aspectRatioImage
    } else {
      console.log("aspectRatioImage < aspectRatioBox")
      image.width = lightboxHeight * aspectRatioImage
      image.height = lightboxHeight
    }
  })
}

sizeImages()

let counter = 1

lightboxImages[counter].style.visibility = "visible"

console.log(lightboxImages[counter])

const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")

lightboxSlide.style.transform = "translateX(calc(-90vw * " + counter + "))"

prevBtn.addEventListener("click", () => {
  if (counter > 0) {
    lightboxSlide.style.transition = "transform 0.2s ease-in-out"
    counter--
    lightboxSlide.style.transform = "translateX(calc(-90vw * " + counter + "))"
  }
})

nextBtn.addEventListener("click", () => {
  if (counter < lightboxImages.length - 1) {
    lightboxSlide.style.transition = "transform 0.2s ease-in-out"
    counter++
    lightboxSlide.style.transform = "translateX(calc(-90vw * " + counter + "))"
  }
})

lightboxSlide.addEventListener("transitionend", () => {
  if (counter === 0) {
    lightboxSlide.style.transition = "none"
    counter = lightboxImages.length - 2
    lightboxSlide.style.transform = "translateX(calc(-90vw * " + counter + "))"
  }
  if (counter === lightboxImages.length - 1) {
    lightboxSlide.style.transition = "none"
    counter = 1
    lightboxSlide.style.transform = "translateX(calc(-90vw * " + counter + "))"
  }
})

function resizeOnResize() {
  console.log("\n\nresizeOnResize()")
  getLightboxSize()
  sizeImages()
}

window.onresize = resizeOnResize
