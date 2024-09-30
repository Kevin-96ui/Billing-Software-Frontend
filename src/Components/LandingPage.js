import React from "react";
import Navbar from "./Navbar";
import { Carousel } from "antd";

// Import images from your assets folder
import img1 from "../Assets/image1.jpg";
import img2 from "../Assets/image2.jpg";
import img3 from "../Assets/image3.jpg";
import img4 from "../Assets/image4.jpg";

export default function LandingPage() {
  // Inline styles for responsiveness
  const styles = {
    container: {
      width: "100%",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "auto",
    },
    carouselItem: {
      width: "100%",
      height: "555px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    navbar: {
      position: "fixed",
      top: 0,
      zIndex: 1000,
      width: "100%",
    },
  };

  // Responsive adjustments with media queries
  const responsiveStyles = `
    .carousel-item img {
      height: 555px;
    }
    @media (max-width: 768px) {
      .carousel-item img {
        height: 300px;
      }
    }
    @media (max-width: 576px) {
      .carousel-item img {
        height: 200px;
      }
    }
  `;

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <style>{responsiveStyles}</style>
      <Carousel autoplay>
        <div className="carousel-item" style={styles.carouselItem}>
          <img src={img1} alt="Slide 1" style={styles.image} />
        </div>
        <div className="carousel-item" style={styles.carouselItem}>
          <img src={img2} alt="Slide 2" style={styles.image} />
        </div>
        <div className="carousel-item" style={styles.carouselItem}>
          <img src={img3} alt="Slide 3" style={styles.image} />
        </div>
        <div className="carousel-item" style={styles.carouselItem}>
          <img src={img4} alt="Slide 4" style={styles.image} />
        </div>
      </Carousel>
    </div>
  );
}
