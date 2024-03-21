import { useState, useEffect } from "react";
import axios from "axios";
import Head from "../components/Head";
const App = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fastFetch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/cats");
      const data = await response.data;
      setCats(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fastFetch();
  }, []);

  // Handle like
  const handleLike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cats.length);
    const id = cats[currentIndex]._id;
    axios
      .patch(`http://localhost:3000/cats/${id}`, {
        likes: cats[currentIndex].likes + 1,
      })
      .then((response) => {
        console.log(response.data);
        // Update the local state with the new like count
        setCats((prevCats) =>
          prevCats.map((cat) =>
            cat._id === id ? { ...cat, likes: cat.likes + 1 } : cat
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleDislike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cats.length);
    const id = cats[currentIndex]._id;
    axios
      .patch(`http://localhost:3000/cats/${id}`, {
        dislikes: cats[currentIndex].dislikes + 1,
      })
      .then((response) => {
        console.log(response.data);
        // Update the local state with the new dislike count
        setCats((prevCats) =>
          prevCats.map((cat) =>
            cat._id === id ? { ...cat, dislikes: cat.dislikes + 1 } : cat
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % cats.length);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    const currCat = cats[currentIndex];
    return (
      <div className="bg-slate-200">
        <Head/>
          <button hidden={currentIndex === 0 || currentIndex === 19 }
            onClick={handleBack}
            className="bg-green-500 hover:bg-blue-400 p-1 pl-2 pr-2 rounded-lg text-white"
          >
            Back
          </button>
        {currCat && (
          <div
            key={currCat._id}
            className="grid place-content-center h-screen w-full"
          >
            <img src={currCat.url} alt="image Loading..." width={250} />
            <div className="flex justify-between mt-4">
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleLike}
                className="bg-green-500 hover:bg-blue-400 p-1 pl-2 pr-2 rounded-lg text-white"
              >
                Like
              </button>
              <button
                onClick={handleDislike}
                className="bg-green-500 hover:bg-red-400 p-1 pl-2 pr-2 rounded-lg text-white"
              >
                Dislike
              </button>
            </div>
          </div>
        )}
        {cats.length === 0 && <p>No cats sedlife</p>}
      </div>
    );
  }
};

export default App;
