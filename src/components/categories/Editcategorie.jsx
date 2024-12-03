// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./categorie.css";

import { useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editcategorie = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie depuis l'URL
  const navigate = useNavigate();

  const [categorie, setCategorie] = useState({});
  const [files, setFiles] = useState([]);

  // Charger les détails de la catégorie
  const loadCategorie = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/categories/${id}`);
      setCategorie(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement de la catégorie :", error);
    }
  };

  useEffect(() => {
    loadCategorie();
  }, []);

  // Configuration pour FilePond
  const serverOptions = () => ({
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Ecommerce_cloudinary");
      formData.append("cloud_name", "iset-sfax");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/iset-sfax/image/upload",
          formData
        )
        .then((res) => {
          setCategorie((prevCategorie) => ({
            ...prevCategorie,
            imagecategorie: res.data.url,
          }));
          load(res.data.url);
        })
        .catch((err) => {
          console.error("Erreur lors de l'upload de l'image :", err);
          error("Erreur d'upload");
          abort();
        });
    },
  });

  // Soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/categories/${id}`, categorie);

      navigate("/categories");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour !");
    }
  };

  // Annuler et retourner à la liste des catégories
  const handleCancel = () => navigate("/categories");

  return (
    <div className="form-container">
      <form className="categorie-form">
        <center>
          <h2>Modification Categorie</h2>
        </center>
        <div className="form-group">
          <label htmlFor="Nom">Nom catégorie</label>
          <input
            type="text"
            id="reference"
            value={categorie.nomcategorie}
            onChange={(e) =>
              setCategorie({ ...categorie, nomcategorie: e.target.value })
            }
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <div style={{ width: "80%", margin: "auto", padding: "1%" }}></div>
          <FilePond
            files={files}
            acceptedFileTypes="image/*"
            onupdatefiles={setFiles}
            allowMultiple={true}
            server={serverOptions()}
            name="file"
          />
        </div>

        <button
          type="button"
          className="form-submit-button"
          onClick={(e) => handleSubmit(e)}
        >
          <i className="fa-solid fa-floppy-disk"></i> Enregistrer
        </button>
        <button
          type="button"
          className="form-reset-button"
          onClick={handleCancel}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default Editcategorie;
