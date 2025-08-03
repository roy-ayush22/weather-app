const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="mt-8 text-3xl">
        <h1>Weather App</h1>
      </div>
      <div className="flex-1 flex items-center -mt-90">
        <div className="flex gap-4">
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" 
            type="text" 
            placeholder="search for a city" 
          />
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors" 
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
