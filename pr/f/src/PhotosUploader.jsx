import axios from "axios";
import {useState} from "react";
import Image from "./Image.jsx";

export default function PhotosUploader({addedPhotos,onChange}) {
  const [photoLink,setPhotoLink] = useState('');
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      onChange(prev => {
        return [...prev, ...filenames];
      });
    })
  }
  function removePhoto(ev,filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }
  function selectAsMainPhoto(ev,filename) {
    ev.preventDefault();
    onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
  }
  return (
    <>
      <div className="flex gap-2">
        <input value={photoLink}
               onChange={ev => setPhotoLink(ev.target.value)}
               type="text" placeholder={'Ajouter en utilisant un lien ....jpg'}/>
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Ajouter une&nbsp;photo</button>
      </div>
      
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>

          Télécharger
        </label>
    </>
  );
}