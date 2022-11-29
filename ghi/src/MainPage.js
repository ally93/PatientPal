import familyphoto from './images/familyphoto.jpeg'
function MainPage() {
  return (
    <>
      <h1>My Patient Portal</h1>
      <div>
        <img src={familyphoto} alt="fam" />
      </div>
    </>
  );
}

export default MainPage;
