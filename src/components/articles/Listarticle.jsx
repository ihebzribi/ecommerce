import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Listarticles = () => {
  const [articles, setArticles] = useState([]);

  const getarticles = async () => {
    await axios
      .get("http://localhost:3001/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getarticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`http://localhost:3001/api/articles/${id}`);
        getarticles(); // Rafraîchir la liste des articles
      } catch (error) {
        console.log("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/articles/add"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des articles</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Designation</td>
            <td>Image</td>
            <td>Marque</td>
            <td>Prix</td>
            <td>Qte stock</td>
            <td>Référence</td>
            <td>Modifier</td>
            <td>Supprimer</td>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((cat, index) => (
              <tr key={index}>
                <td>{cat.designation}</td>
                <td>
                  <img
                    src={cat.imageart}
                    alt="Article"
                    width={100}
                    height={100}
                  />
                </td>
                <td>{cat.marque}</td>
                <td>{cat.prix}</td>
                <td>{cat.qtestock}</td>
                <td>{cat.reference}</td>
                <td>
                  <button className="btn btn-warning btn-sm">
                    <Link
                      to={`/article/edit/${cat._id}`}
                      style={{
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Modifier
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <i className="fa-solid fa-trash"></i> Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listarticles;
