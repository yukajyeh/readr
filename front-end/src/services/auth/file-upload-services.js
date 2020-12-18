import axios from 'axios'

class FileUpload {
  constructor(){
     let service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
    this.service = service
  }

  errorHandler = err => {
      throw err;
    }
   
  handleUpload (theFile) {
    return this.service.post('/api/upload', theFile)
        .then(res => res.data)
        .catch(this.errorHandler); 
  }
   
}

export default FileUpload