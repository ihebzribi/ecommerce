import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Listscategories = () => {
  const [scategories, setScategories] = useState([]);
  const getscategories = async () => {
    await axios
      .get("http://localhost:3001/api/scategories")
      .then((res) => {
        setScategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getscategories();
  }, []);
  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette scatégorie ?")
    ) {
      try {
        await axios.delete(`http://localhost:3001/api/scategories/${id}`);
        getscategories(); // Call the function to refresh the categories list
      } catch (error) {
        console.log("Error deleting category:", error);
      }
    }
  };
  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/scategories/add"
          style={{
            color: "white",

            textDecoration: "none",
          }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des sous-catégories </h2>

      <table className="table table table-striped">
        <thead>
          <tr>
            <td>Nom </td>
            <td>Image </td>

            <td>Modifier</td>
            <td>Supprimer</td>
          </tr>
        </thead>
        <tbody>
          {scategories &&
            scategories.map((cat, index) => (
              <tr key={index}>
                <td>{cat.nomscategorie}</td>

                <td>
                  <img src={cat.imagescategorie} width={100} height={100} />
                </td>

                <td>
                  <button className="btn btn-warning btn-sm">
                    <Link
                      to={`/scategories/edit/${cat._id}`}
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
export default Listscategories;
