import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can login");
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64"> <br />
        <h1 className="text-4xl text-center mb-4">S'inscrire</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          /> 
          <button className="primary">S'inscrire</button>
          <div className="text-center py-2 text-gray-500"> <br />
           Déjà membre ?{" "}
            <Link className="underline text-black" to={"/login"}>
            Connectez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
