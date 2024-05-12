import React from "react";

const Carasol = () => {
  return (
    <>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={
                "https://www.enterprise.com/es/exotic-car-rental/_jcr_content/root/container/container/container_1060086341/teaser.coreimg.jpeg/1708936909048/explore-our-vehicles-1920x1080-vehicles.jpeg"
              }
              alt="Los Angeles"
              className="d-block"
            />
          </div>
          <div className="carousel-item">
            <img
              src={
                "https://st1.uvnimg.com/fa/47/e036a4d04115a883846765d369e6/autos-galeria.jpg"
              }
              alt="Chicago"
              className="d-block"
            />
          </div>
          <div className="carousel-item">
            <img
              src={
                "https://www.vwcomerciales.com.mx/idhub/content/dam/onehub_nfz/importers/mx/mundo-vwvc/combi-historia/schema/combi-historia_schema_combi-verde_16x9_1920x1080px_jun2022.jpg"
              }
              alt="New York"
              className="d-block"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
};

export default Carasol;
