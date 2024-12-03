// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./article.css";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Insertarticle = () => {
  const [scat, setScat] = useState([]);
  const loadscategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/scategories");
      setScat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadscategories();
  }, []);
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
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
            setArticle((prevArticle) => ({
              ...prevArticle,
              imageart: data.url,
            }));
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
    // faire le add dans la BD
    await axios
      .post("http://localhost:3001/api/articles", article)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        navigate("/articles");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        alert("Erreur ! Insertion non effectuée");
      });
  };

  const handleCancel = () => {
    navigate("/articles"); // Redirect to the list page
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center>
        <h2>Insertion article</h2>
      </center>
      <form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control
              type="text"
              placeholder="Référence"
              value={article.reference}
              onChange={(e) =>
                setArticle({ ...article, reference: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Désignation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Désignation"
              value={article.designation}
              onChange={(e) =>
                setArticle({ ...article, designation: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              type="text"
              placeholder="Marque"
              value={article.marque}
              onChange={(e) =>
                setArticle({ ...article, marque: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              placeholder="Prix"
              value={article.prix}
              onChange={(e) => setArticle({ ...article, prix: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              value={article.qtestock}
              onChange={(e) =>
                setArticle({ ...article, qtestock: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Sous catégorie</Form.Label>
            <Form.Control
              as="select"
              value={article.scategorieID || ""}
              onChange={(e) =>
                setArticle({ ...article, scategorieID: e.target.value })
              }
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {scat.map((sc, index) => (
                <option key={index} value={sc._id}>
                  {sc.nomscategorie}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <center>
          <Form.Group as={Col} md="6">
            <Form.Label>Image</Form.Label>
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}></div>
            <FilePond
              files={files}
              acceptedFileTypes="image/*"
              onupdatefiles={setFiles}
              allowMultiple={true}
              server={serverOptions()}
              name="file"
            />
          </Form.Group>
        </center>
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

export default Insertarticle;
