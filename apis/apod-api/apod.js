
// API documentation: https://apodapi.herokuapp.com/
let apodApiUrl = 'https://apodapi.herokuapp.com/api/'

let apodDescription = document.querySelector('#apod-description')
let apodImage = document.querySelector('#apod-image')
let apodVideo = document.querySelector('#apod-video')
let apodOther = document.querySelector('#apod-other')


fetch(apodApiUrl)
    .then(response => response.json())
    .then(data => {
        // Display the media. It could be an image or a video. 
        if (data.media_type === 'image') {
            let imgUrl = data.url
            apodImage.src = imgUrl
            apodImage.style.display = 'block'
        }
        else if (data.media_type === 'video') {
            let videoUrl = data.url
            apodVideo.src = videoUrl
            apodVideo.style.display = 'block'
        }
        else {      // for other
            // What other types could there be?
            apodOther.innerHTML = 'Other'
        }

        // Display description - which may also be in the explanation property. 
        let description = data.description
        let explanation = data.explanation

        if (description) {
            apodDescription.innerHTML = description
        }
        else if (explanation) {
            apodDescription.innerHTML = explanation
        }
        else {
            apodDescription.innerHTML = 'No description available'
        }
    })
    .catch(err => {
        console.log(err)
    })