import "./App.css";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { Logo } from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import { Rank } from "./components/Rank/Rank";
import { useState } from "react";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { SignIn } from "./components/SignIn/SignIn";
import { Register } from "./components/Register/Register";

const particleOptions = {
  fpsLimit: 30,
  pauseOnOutsideViewport: true,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 200,
      enable: true,
      opacity: 0.7,
      width: 2,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 900,
      },
      value: 90,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "square",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
};

function App() {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const [inputUrl, setInputUrl] = useState("");
  const [arrayBox, setArrayBox] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("_signin_");
  //const [isSignin, setIsSignin] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  }

  function clearStates() {
    setInputUrl("");
    setArrayBox([]);
    setImageUrl("");
    setUser({
      id: 0,
      name: "",
      email: "",
      entries: 0,
      joined: "",
    });
  }

  /*function calculateFaceLocation(data) {
    const clarifiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const widthImage = Number(image.width);
    const heightImage = Number(image.height);
    console.log(widthImage, heightImage);
    console.log(clarifiFace);
    const boundingBox = {
      leftCol: clarifiFace.left_col * widthImage,
      topRow: clarifiFace.top_row * heightImage,
      rightCol: widthImage - clarifiFace.right_col * widthImage,
      bottomRow: heightImage - clarifiFace.bottom_row * heightImage,
    };

    return boundingBox;
  }*/

  function calculateFaceLocation(data) {
    const image = document.getElementById("inputImage");
    const widthImage = Number(image.width);
    const heightImage = Number(image.height);
    const clarifiArray = data.outputs[0].data.regions.map((region) => {
      const clarifiFace = region.region_info.bounding_box;
      const boundingBox = {
        leftCol: clarifiFace.left_col * widthImage,
        topRow: clarifiFace.top_row * heightImage,
        rightCol: widthImage - clarifiFace.right_col * widthImage,
        bottomRow: heightImage - clarifiFace.bottom_row * heightImage,
      };

      return boundingBox;
    });
    return clarifiArray;
  }

  function displayFaceBox(box) {
    setArrayBox(box);
  }

  function getImageUrl(event) {
    setInputUrl(event.target.value);
  }

  //"https://img.freepik.com/foto-gratis/diseno-collage-personas_23-2148888275.jpg?w=2000";
  function onSubmit() {
    //----------------------------------------------------------------
    setImageUrl(inputUrl);

    async function getData() {
      try {
        const response = await fetch("http://localhost:3000/image/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: inputUrl,
          }),
        });
        //----------------------------------------------------------------
        const jsonResponse = await response.json();
        displayFaceBox(calculateFaceLocation(jsonResponse));
        if (jsonResponse) {
          const increaseEntry = await fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          });
          const entryResponse = await increaseEntry.json();
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            entries: entryResponse,
            joined: user.joined,
          });
        }
      } catch (error) {
        console.log("Error detected: " + error.message);
      }
    }
    getData();
  }

  function onRouteChange(route) {
    setRoute(route);
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
      />
      <Navigation
        onRouteChange={onRouteChange}
        isSignedIn={route}
        onSignOut={clearStates}
      />
      {
        {
          _home_: (
            <>
              <Logo />
              <Rank user={user} />
              <ImageLinkForm getImageUrl={getImageUrl} onSubmit={onSubmit} />
              <FaceRecognition arrayBox={arrayBox} imgUrl={imageUrl} />
            </>
          ),
          _signin_: (
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          ),
          _register_: (
            <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          ),
        }[route]
      }
    </>
  );
}

export default App;
