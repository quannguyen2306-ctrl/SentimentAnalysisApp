class YouTubeVideo {
    constructor(videoUrl) {
        this.videoUrl = videoUrl;
        this.videoId = this._extractVideoId(videoUrl);
        this.apiKey = process.env.API_KEY;
    }

    _extractVideoId(videoUrl) {
        let videoId;
        if (videoUrl.includes('youtube.com')) {
            videoId = videoUrl.split('v=')[1];
            if (videoId.includes('&')) {
                videoId = videoId.split('&')[0];
            }
        } else if (videoUrl.includes('youtu.be')) {
            videoId = videoUrl.split('/').pop().split("?")[0];
        } else {
            throw new Error('Invalid YouTube URL');
        }
        console.log(videoId)
        return videoId;
    }

    async getInfo() {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${this.apiKey}&part=snippet`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const videoInfo = data.items[0].snippet;
                const title = videoInfo.title;
                const author = videoInfo.channelTitle;
                const thumbnail = videoInfo.thumbnails.default.url;
                return {
                    title: title,
                    author: author,
                    thumbnail: thumbnail
                };
            } else {
                throw new Error('Video not found or API request failed');
            }
        } catch (error) {
            throw new Error('Failed to fetch video info');
        }
    }
}

// Example usage
// const youtubeVideo = new YouTubeVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// youtubeVideo.getInfo()
//     .then(videoInfo => {
//         console.log('Title:', videoInfo.title);
//         console.log('Author:', videoInfo.author);
//         console.log('Thumbnail URL:', videoInfo.thumbnail);
//     })
//     .catch(error => {
//         console.error(error.message);
//     });


export default YouTubeVideo