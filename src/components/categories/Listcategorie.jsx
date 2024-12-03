import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Listcategories = () => {
  const [categories, setCategories] = useState([]);
  const getcategories = async () => {
    await axios
      .get("http://localhost:3001/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getcategories();
  }, []);
  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      try {
        await axios.delete(`http://localhost:3001/api/categories/${id}`);
        getcategories(); // Call the function to refresh the categories list
      } catch (error) {
        console.log("Error deleting category:", error);
      }
    }
  };
  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/categories/add"
          style={{
            color: "white",

            textDecoration: "none",
          }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des catégories </h2>

      <table className="table table table-striped">
        <thead>
          <tr>
            <td>Nom catégorie</td>
            <td>Image categorie</td>
            <td>Modifier</td>
            <td>Supprimer</td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((cat, index) => (
              <tr key={index}>
                <td>{cat.nomcategorie}</td>
                <td>
                  <img src={cat.imagecategorie} width={100} height={100} />
                </td>
                <td>
                  <button className="btn btn-warning btn-sm">
                    <Link
                      to={`/categories/edit/${cat._id}`}
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
export default Listcategories;
