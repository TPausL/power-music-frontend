import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import React, { memo } from "react";
import { Playlist } from "../PlaylistsProvider/PlaylistsProvider";
export interface ListProps {
  list: Playlist;
}
function ListSvg(props: ListProps) {
  const { list } = props;
  return (
    <>
      <g filter="url(#filter0_d_7_6)">
        <path
          fill={`url(#gradient_${list.source})`}
          d="M0 18C0 8.059 8.059 0 18 0h189a1 1 0 011 1v92c0 13.255-10.745 24-24 24H1a1 1 0 01-1-1V18z"
        ></path>
      </g>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="Lato"
        fontSize="1rem"
        fontWeight="800"
        letterSpacing="0em"
      >
        <tspan x="20" y="63">
          {list.title}
        </tspan>
      </text>
      <text
        fill="#fff"
        style={{ whiteSpace: "pre" }}
        fontFamily="Lato"
        fontSize="0.9rem"
        letterSpacing="0em"
      >
        <tspan x="20" y="82">
          {list.count} Songs
        </tspan>
      </text>
      <rect
        width="32"
        height="32"
        x="13"
        y="11"
        fill={"url(#pattern" + list.id + ")"}
        rx="16"
      ></rect>
      <mask
        id="mask0_7_6"
        style={{ maskType: "alpha" }}
        width="208"
        height="117"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          d="M0 18C0 8.059 8.059 0 18 0h189a1 1 0 011 1v92c0 13.255-10.745 24-24 24H1a1 1 0 01-1-1V18z"
        ></path>
      </mask>
      <g mask="url(#mask0_7_6)">
        <path
          style={{
            transform: "translate(180px, 40px) rotate(10deg) scale(0.1)",
          }}
          fill="#fff"
          d={
            findIconDefinition({ prefix: "fab", iconName: list.source })
              .icon[4] as string
          }
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_7_6"
          width="216"
          height="125"
          x="-4"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7_6"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_7_6"
            result="shape"
          ></feBlend>
        </filter>
        <pattern
          id={"pattern" + list.id}
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00278 0 0 .00278 -.167 0)"
            xlinkHref={"#image" + list.id}
          ></use>
        </pattern>
        <linearGradient
          id="gradient_youtube"
          x1="206.5"
          x2="0"
          y1="1.5"
          y2="117"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BD0606"></stop>
          <stop offset="1" stopColor="#FF6464"></stop>
        </linearGradient>
        <linearGradient
          id="gradient_spotify"
          x1="206.5"
          x2="0"
          y1="1.5"
          y2="117"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E493"></stop>
          <stop offset="1" stopColor="#1DB954"></stop>
        </linearGradient>
        <image
          id={"image" + list.id}
          width="480"
          height="360"
          xlinkHref={list.thumbnail}
        ></image>
      </defs>
    </>
  );
}

export default memo(ListSvg);
