import axios from "axios";
import { useEffect, useState } from "react";

const Final = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cats");
        const data = await response.data;
        setCats(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCats();
  }, []);
  return (
    <>
      {cats.map((cat) => (
        <div key={cat._id} className=" grid place-content-center">
          <img
            src={cat.url}
            alt="image loading..."
            width="300px"
            className="p-2"
          />
          <div className="flex justify-between">
            <p>Likes: {cat.likes}</p>
            <p>dislikes: {cat.dislikes}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Final;
