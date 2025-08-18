const Footer = ({ width = 22, height = 22, className = "", ...props }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="22" height="22" fill="url(#pattern0_40_160)" />
      <defs>
        <pattern
          id="pattern0_40_160"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlink:href="#image0_40_160" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_40_160"
          width="128"
          height="128"
          preserveAspectRatio="none"
          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAANLAAADSwGv2d4BAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAOdQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFzEZ/AAAAEx0Uk5TAAEDBQcICgsPFBofICEiIyotODw/QENESUxOUVJWWV1iZGVmaG1xeX6Ag4aRlZacn6GkpqestbnDzNTY2uDl5ujr7e7v8PHy9fz9/qd48lkAAAF3SURBVHja7dttUwFRFMBxSo+0KbZIohSl9IDouVao7H7/z9No0btuc7o60/Q/r/+u39jZGS/uiUS+nHy7E/xoOu18RD7RemBh6lExoBxYmQPxD9C1A3iWAhzj0X6jWGz4xmxFCEibDh5kh1l2YOrSQoBrOrgWdjVT504LkAm7jBogFXYpNUAl7CpqgF58mMV7aoDAKzlOyQv0AN8cAH8d4Ldy66LJtXwrgKb8D0XTCsCVA1wrgIQckAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAogKQckrQCqckDVCsArxGSfjxU8S3fL+/ei6XO7HsA/ANzuri1vXegBTuc+us0XJcD1zCjcVwJsjMPonQrgbWFSnqsAHj/LQ51HsDQpL3UAO+Nw/kkH8LA4Ck+m9BYYl16vVofZ7JFp71a69Gpe+30929s+vjFmjhBga/G5K979trT6XZZ+v/7y+2+s/78DjNFNVQUATC0AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default Footer;
