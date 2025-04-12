import "../../styles/404.css";
import '../../styles/home.css';

const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found-container">
        <img className="image-404" src="/404.svg" alt="page not found image" />
        <div className="title-404 sub-title-font">
          Looks Like You Are Lost. Page Not Found.
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
