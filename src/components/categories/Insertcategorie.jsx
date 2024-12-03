// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./categorie.css";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Insertcategorie = () => {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({});
  const [files, setFiles] = useState([]);
  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Ecommerce_cloudinary");
        data.append("cloud_name", "iset-sfax");
        data.append("publicid", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/iset-sfax/image/upload", data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setCategorie({ ...categorie, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    //faire le add dans la BD
    await axios
      .post("http://localhost:3001/api/categories", categorie)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        navigate("/categories");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        alert("Erreur ! Insertion non effectuée");
      });
  };
  const handleCancel = () => {
    navigate("/categories"); // Redirect to the list page
  };
  return (
    <div className="form-container">
      <form className="categorie-form">
        <center>
          <h2>Ajouter Catégorie</h2>
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
export default Insertcategorie;
