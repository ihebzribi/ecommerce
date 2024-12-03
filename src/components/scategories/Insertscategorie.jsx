// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Insertscategorie = () => {
  const [scategorie, setScategorie] = useState({});
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Ecommerce_cloudinary");
        data.append("cloud_name", "iset-sfax");
        data.append("publicid", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/iset-sfax/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            setScategorie((prevScategorie) => ({
              ...prevScategorie,
              image: data.url,
            }));
            load(data.url);
          })
          .catch((err) => {
            console.error("Erreur lors du téléchargement de l'image :", err);
            error("Échec du téléchargement");
            abort();
          });
      },
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/scategories", scategorie);

      navigate("/scategories");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Erreur ! Insertion non effectuée");
    }
  };

  const handleCancel = () => {
    navigate("/scategories");
  };

  const handleChange = (e) => {
    setScategorie({ ...scategorie, [e.target.name]: e.target.value });
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center>
        <h2>Insertion sous-catégorie</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Form.Group as={Col} md="12">
            <Form.Label>Nom de la sous-catégorie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de la sous-catégorie"
              name="nomscategorie"
              value={scategorie.nomscategorie}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="12">
            <Form.Label>Catégorie principale</Form.Label>
            <Form.Control
              as="select"
              id="categorieID"
              name="categorieID"
              value={scategorie.categorieID}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((categorie) => (
                <option key={categorie._id} value={categorie._id}>
                  {categorie.nomcategorie}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="12">
            <Form.Label>Image</Form.Label>
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}></div>
            <FilePond
              files={files}
              acceptedFileTypes="image/*"
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={serverOptions()}
              name="file"
            />
          </Form.Group>
        </Row>
        <center>
          <button type="submit" className="form-submit-button">
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          &nbsp; &nbsp;
          <button
            type="button"
            className="form-reset-button"
            onClick={handleCancel}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Annuler
          </button>
        </center>
      </form>
    </div>
  );
};

export default Insertscategorie;
