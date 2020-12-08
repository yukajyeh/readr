import axios from 'axios'

class FileUpload {
  constructor(){
    let service = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      withCredentials: true
    });
    this.service = service
  }

  errorHandler = err => {
      throw err;
    }
   
  handleUpload = (theFile) => {
      console.log('file in service: ', theFile)
      return this.service.post('/api/upload', theFile)
        .then(res => {
          console.log(res.data)
          return res.data
        } )
        .catch(this.errorHandler);
  }
   
}

export default FileUpload