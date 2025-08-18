import React from "react";

const Home = ({ width = 46, height = 45, className = "", ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="46" height="45" fill="url(#pattern0_26_101)" />
      <defs>
        <pattern
          id="pattern0_26_101"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_26_101"
            transform="scale(0.0217391 0.0222222)"
          />
        </pattern>
        <image
          id="image0_26_101"
          width="46"
          height="45"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAtCAYAAADRLVmZAAAAAXNSR0IArs4c6QAAA6tJREFUaEPtmUtoXFUcxn/fuTepD1ARK5a2YhFURBBE1CZUERfSplBdibS+Ko24c+/GR30sC75q1W4iiKK4SaELHwtNq6DYVkyxwU11UUFQ20pMc+/59M7cNJNkMpMxiZmEOcs759z/73z/7/zPOXfEMm1aptysXHDb5ycnyc0yZDsANxDjZuAsIRyQ9Euzca3+3lBx25dwjmsI2WpieopuTko6M1sQ2xeRZbdGeafQAwW4zVshjQPQPSIpaxVwtv6zgttOgFtiHp8SbDF8GPKwh26GpytfZuVS8nzrvyl5BnxtTcBzwBcyL5KmhyT9vRDwDcGzLLsrkXaD7gANKup5uvimFrwKPbYhZsmjkh4EbwCKSde2ceCY8OskXR9J+nO+8M3A70ykF0AbS/DnasFtd5NlG6PcL3QPsBooPF6vjWNGKplL8wFY9dNc1sx/skqWZZtKxXtBBxQ1AR5tl9bwTqAHuGAOKhaL+1fjT4O1nzQdkjQ2h3EzujRTvBb8YyV6WtJx22uIcbvhYRxvgpbLauH7IaH9JMmgpD9ahW8EntYo3lNaZTfmrxjiDokdwFqIrcac7G+GFcJ7hPCBpBOtvKgReOHVHud5sTg3IX5w5HNJa8B3A1dUA80DvDI+/GYYDI4DpOmXkopsNG3N6vjtzv0yuBcoanAOXDi1aswbvIAcAx0ScV9pnbPNyBspfnGe55uD9Szi+jolrnz3goBXU1dkFd4JIQwCPzdSvy647cvzPO8NITxE9P1AOrsCCwZeCWHxOzAQQngf+E7SaL3YM8BtXxVj3A70A9c1P50sOHjBOSrpqxjj3iRJDko6PR1+CrjtK4nZkza7qhVjSVuxpk5J4SVCeHc6fAW8sm1XdkDtEu4rd8AlpZ4MHs7YvB3SsEfSyYnnsr2WmD1isw24GVjVJsQlRuUEcRr0mZy/qa6ug8UDxWx8CLit8QJcyqmcP/qMIn40DAPHC/BPgMuAG8savZSUdWJPObONWowAhwurJOR5n/FrwLo2o5562BTfK4QnJB2uLs7x8Xst7wNd3ebgRxTCY5KOVMGzbIuJe0Hr2xz8qEJ4XNK3E+B9Rm8A6+d/aFrEqYujCunKAN9aKr5uuSneAV9EhxcXxBke7yjeUbz+7aGeVVzU8cktX+UFofINs01afY93wBcvPR3FF0/b+m/uKN6Wiv/fUHOJV8cq9xm90p5Xt5oZiWMKoV/S1xMXiW1Gry478Llkqd36rNw/aNtN6QmefwCXwfM/AQ78tgAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export default Home;
