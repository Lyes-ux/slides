import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Titre', 'Titre de votre logement. Il doit être court et accrocheur, comme dans une publicité.')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Votre titre"/>
        {preInput('Adresse', 'Adresse de ce logement')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="Adresse"/>
        {preInput('Photos','Plus = Mieux')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','Description du logement')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Avantages','Sélectionnez tous les avantages de votre logement')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Informations supplémentaires','Règlement intérieur, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Heures d arrivée et de départ','ajoutez les heures d arrivée et de départ, n oubliez pas de prévoir un créneau pour le nettoyage de la chambre entre les invités')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Heure d'arrivée</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Heure de départ</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Nombre de voyageurs</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(1, ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Tarif par nuit</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(1, ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Enregistrer</button>
      </form>
    </div>
  );
}