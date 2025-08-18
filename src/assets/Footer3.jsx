const Footer3 = ({ width = 22, height = 22, className = "", ...props }) => {
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
      <rect width="22" height="22" fill="url(#pattern0_40_161)" />
      <defs>
        <pattern
          id="pattern0_40_161"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlink:href="#image0_40_161" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_40_161"
          width="128"
          height="128"
          preserveAspectRatio="none"
          xlink:href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Footer3;
