class CommentInteractor {
    constructor(video_url) {
        this.videoId = this._extractVideoId(video_url);
        this.apiKey = process.env.API_KEY;
        console.log(this.apiKey)
        this.url = 'https://www.googleapis.com/youtube/v3/commentThreads';
        this.allComments = [];
    }

    // getVideoId(url) {
    //     const match = url.match(/[?&]v=([^&]+)/);
    //     return match ? match[1] : null;
    // }

    // extractVideoId(url) {
    //     // Regular expression to match the video ID
    //     const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    //     const match = url.match(regex); // Use match method to extract the video ID

    //     if (match && match[1]) {
    //         return match[1]; // Return the extracted video ID
    //     } else {
    //         return null; // Return null if the URL doesn't match the pattern
    //     }
    // }

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


    async getComments(pageToken = null) {
        const params = new URLSearchParams({
            'part': 'snippet',
            'videoId': this.videoId,
            'key': this.apiKey
        });
        if (pageToken) {
            params.set('pageToken', pageToken);
        }
        try {
            const response = await fetch(`${this.url}?${params.toString()}`);
            const data = await response.json();

            // Process comments here...
            const comments = data.items;
            comments.forEach((comment, _) => {
                //   const commentData = comment.snippet.topLevelComment.snippet;
                const commentTextOriginal = comment.snippet.topLevelComment.snippet.textOriginal;
                //   console.log(commentTextOriginal);
                const result = { text: commentTextOriginal }
                this.allComments.push(result);  // Push comment to the array

            });

            if ('nextPageToken' in data) {
                // If there's a nextPageToken, make a recursive call with the new token
                await this.getComments(data.nextPageToken);
            }
        } catch (error) {
            console.log("Error in fetching comments ", error);
        }

        return this.allComments;  // Return the array after the recursion is complete
    }

    async getAllComments() {
        this.allComments = [];
        if (this.videoId) {
            const result = await this.getComments();
            return result
        }
    }
}


export default CommentInteractor;
// const link = "https://www.youtube.com/watch?v=d-Eq6x1yssU";
// const newComment = new CommentInteractor(link); 
// newComment.getAllComments()

