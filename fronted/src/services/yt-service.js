import axios from "axios";
class YTService {
  constructor() {
    this.api = "https://www.googleapis.com/youtube/v3/";
    this.key = "AIzaSyB7JQz4lL9YUO9yOu8rP0k0k0k0k0k0k0";
  }
  async getVideos(query) {
    const { data } = await axios.get(`http://localhost:8000/api/process_youtube`);
    console.log(data);
    console.log(query);
    return data;
  }
}

export default new YTService();
