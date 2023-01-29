import "./Footer.scss";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="footer">
      <p>{date} FitFlix - All rights reserved</p>
      <p>Privacy . Terms . Sitemap . Company Details</p>
    </div>
  );
};

export default Footer;
