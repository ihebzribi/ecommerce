// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editscategorie = () => {
  const { id } = useParams(); // Récupérer l'ID de la catégorie depuis l'URL
  const navigate = useNavigate();

  const [scategorie, setScategorie] = useState({});
  const [files, setFiles] = useState([]);

  // Charger les détails de la catégorie
  const loadScategorie = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/scategories/${id}`
      );
      setScategorie(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement de la scatégorie :", error);
    }
  };

  useEffect(() => {
    loadScategorie();
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
          setScategorie((prevCategorie) => ({
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
      await axios.put(
        `http://localhost:3001/api/scategories/${id}`,
        scategorie
      );

      navigate("/scategories");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour !");
    }
  };

  // Annuler et retourner à la liste des catégories
  const handleCancel = () => navigate("/scategories");

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center>
        <h2>Modification sous-categorie</h2>
      </center>
      <form>
        <Row className="mb-2">
          <Form.Group as={Col} md="12">
            <Form.Label>Nom de la sous-catégorie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de la sous-catégorie"
              value={scategorie.nomscategorie || ""}
              onChange={(e) =>
                setScategorie({ ...scategorie, nomscategorie: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Form.Group as={Col} md="6">
          <Form.Label>Image</Form.Label>
          <FilePond
            files={files}
            acceptedFileTypes="image/*"
            onupdatefiles={setFiles}
            allowMultiple={true}
            server={serverOptions()}
            name="file"
          />
        </Form.Group>

        <center>
          <button
            type="submit"
            className="form-submit-button"
            onClick={(e) => handleSubmit(e)}
          >
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          &nbsp; &nbsp;
          <button
            type="button"
            className="form-reset-button"
            onClick={handleCancel}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Annuler
          </button>
        </center>
      </form>
    </div>
  );
};

export default Editscategorie;
