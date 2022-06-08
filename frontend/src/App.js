function App() {
  const get = async() => {
  //  awaits for the response then the next code runs
    const  res = await fetch('http://localhost:8000');
    console.log(res)
  };
  return <div>welcome to frontend</div>;
}

export default App;
