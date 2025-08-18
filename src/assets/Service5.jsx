const Service5 = ({ width = 19, height = 19, className = "", ...props }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="19" height="19" fill="url(#pattern0_38_149)" />
      <defs>
        <pattern
          id="pattern0_38_149"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlink:href="#image0_38_149" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_38_149"
          width="128"
          height="128"
          preserveAspectRatio="none"
          xlink:href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Service5;
