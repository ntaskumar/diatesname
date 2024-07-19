import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    axios
      .get("https://test.create.diagnal.com/data/page1.json")
      .then((res) => {
        const contentItems = res.data.page["content-items"].content;
        const images = contentItems.map((item) => ({
          id: item.name,
          download_url: `https://test.create.diagnal.com/images/${item["poster-image"]}`,
          author: item.name,
        }));
        setPhotoList(images);
        setFilteredPhotos(images);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterPhotos(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const loaderRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreImages();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadedCount]);

  const filterPhotos = (input) => {
    const filtered = photoList.filter((el) =>
      el.author.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredPhotos(filtered);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    filterPhotos(inputValue);
  };

  const loadMoreImages = () => {
    setTimeout(() => {
      setLoadedCount(loadedCount + 10);
    }, 1000);
  };

  const renderPhotos = () => {
    const photosToRender =
      searchInput.trim() !== "" ? filteredPhotos : photoList;

    if (photosToRender.length === 0 && searchInput.trim() !== "") {
      return (
        <div className="no-data-found">
          <p>No records found</p>
        </div>
      );
    }

    return photosToRender
      .slice(0, loadedCount > 0 ? loadedCount : photosToRender.length)
      .map((el, index) => (
        <div className="column" key={`${el.id}-${index}`}>
          <img src={el.download_url} alt="random" />
          <span className="author">{el.author}</span>
        </div>
      ));
  };

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".right-align")) {
      setShowSearchInput(false);  
    }
  };

 
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBackClick = () => {
    setSearchInput("");
    setFilteredPhotos(photoList);
    setShowSearchInput(false);
  };

  return (
    <div className="App">
 
      <div className="fixed-elements">
        <div className="left-align">
          <div className="back-image">
            <img
              src="https://test.create.diagnal.com/images/Back.png"
              alt="back"
              onClick={handleBackClick}  
              style={{ cursor: "pointer" }}
            />
          </div>
          <header className="header">
            <h2>Romantic Comedy</h2>
          </header>
        </div>
        <div className="right-align">
          <div className="back-image">
            <img
              src="https://test.create.diagnal.com/images/search.png"
              alt="search"
              onClick={toggleSearchInput}  
              style={{ cursor: "pointer" }}
            />
          </div>
          {showSearchInput && (
            <div className="search-container">
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search by author..."
                className="search-input"
              />
            </div>
          )}
        </div>
      </div>

      <div className="photo-grid">
        {filteredPhotos.length > 0
          ? renderPhotos(filteredPhotos)
          : renderPhotos(photoList)}
        <div ref={loaderRef}></div>
      </div>
    </div>
  );
};

export default App;
