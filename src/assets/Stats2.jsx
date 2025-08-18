const Stats2 = ({ width = 46, height = 45, className = "", ...props }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="30" height="30" fill="url(#pattern0_34_136)" />
      <defs>
        <pattern
          id="pattern0_34_136"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlink:href="#image0_34_136" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_34_136"
          width="128"
          height="128"
          preserveAspectRatio="none"
          xlink:href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Stats2;
