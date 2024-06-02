import React, { useEffect, useState, ChangeEvent } from "react";
import { useMainContext } from "../context/mainContext";
import { Settings } from "../../types";
import { Player } from "@lottiefiles/react-lottie-player";

const CustomizePopup: React.FC = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    sources: "",
    categories: "",
    authors: "",
  });
  const { setShowCustomize } = useMainContext();

  const handleCancel = () => {
    setShowCustomize(false);
  };

  // {"sources":"tbsnews, The New York Times, irishmirror, irishmirror, metro","categories":"health, science, sports, technology, general","authors":"Matthew Neschis, Andrew Gamble,  Phil Haigh, Ray Haber"}
  const handleSave = () => {
    localStorage.setItem("customField", JSON.stringify(settings));
    setSaving(true);
    setTimeout(() => {
      setShowCustomize(false);
      window.location.reload();
    }, 5000);
  };

  useEffect(() => {
    const currentSettings = localStorage.getItem("customField");
    if (currentSettings) {
      const parsedSettings = JSON.parse(currentSettings);
      setSettings(parsedSettings);
    }

    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleClickOnBg = () => {
    setShowCustomize(false);
  };
  return (
    <div className="mx-2">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-30 bg-[#05062d9e] w-full h-full"
        onClick={handleClickOnBg}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full md:w-4/5 lg:w-2/5 bg-white rounded-xl">
        {saving ? (
          <>
            <p className="mx-auto text-center text-gray-400 my-6">yahooooooo</p>
            <p className="mx-auto text-center text-gray-400 mb-6">
              Fasten your belt, we are landing on your favourit feed
            </p>
            <Player
              autoplay
              loop
              src="https://lottie.host/ba895924-0d71-45e0-b744-731b0902acea/lF2PNNetjq.json"
              style={{ height: "300px", width: "300px" }}
            />
          </>
        ) : (
          <>
            <form
              className="flex flex-col px-5 py-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="mx-auto mb-6 text-gray-400 font-semibold">
                From here, you can customize your feed to your liking!
              </h1>
              <div className="flex flex-row space-x-3">
                <label htmlFor="sources">Sources</label>
                <input
                  className="border-b border-gray-200 outline-none w-full"
                  type="text"
                  name="sources"
                  value={settings.sources || ""}
                  onChange={handleChange}
                  placeholder="CNN, BBC, NYTimes"
                />
              </div>
              <div className="flex flex-row space-x-3 my-6">
                <label htmlFor="categories">Categories</label>
                <input
                  className="border-b border-gray-200 outline-none w-full"
                  type="text"
                  name="categories"
                  value={settings.categories || ""}
                  onChange={handleChange}
                  placeholder="Technology, Sports"
                />
              </div>
              <div className="flex flex-row space-x-3">
                <label htmlFor="authors">Authors</label>
                <input
                  className="border-b border-gray-200 outline-none w-full"
                  type="text"
                  name="authors"
                  value={settings.authors || ""}
                  onChange={handleChange}
                  placeholder="John Doe, Jane Smith"
                />
              </div>
              <div className="flex flex-row justify-between items-center mt-6">
                <button
                  type="button"
                  className="bg-yellow-50 border-2 border-yellow-300 px-3 py-2 rounded-md"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-50 border-2 border-green-300 px-3 py-2 rounded-md"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
            <p className="text-orange-300 px-5 pb-6">
              Dear user: to ensure the correct search and filtering of your
              favourate feed, kindly separate your enteries with a comma ','
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomizePopup;
