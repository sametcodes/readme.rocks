export const getUser = (result: any, platform: any) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350" height="210">
    <title>Github Total Contributions</title>
    <g>
        <title>Layer 1</title>
        <rect stroke="#6F5C2A" rx="13" id="svg_6" height="210" width="350" y="-0.19041" x="-0.18937" fill="#022924" />
        <text transform="matrix(0.692341 0 0 0.692341 16.6748 19.5494)" stroke="#6F5C2A" font-weight="normal" font-style="normal" xml:space="preserve" text-anchor="start" font-family="'Azeret Mono'" font-size="24" id="svg_7" y="20.02539" x="-3.41748" stroke-width="0" fill="#ffffff">
            ${platform}
        </text>
        <text transform="matrix(1.45007 0 0 1.45007 -42.1256 -81.6498)" stroke="#6F5C2A" font-weight="normal" font-style="normal" xml:space="preserve" text-anchor="start" font-family="'Azeret Mono'" font-size="24" id="svg_14" y="113.0063" x="39.41688" stroke-width="0" fill="#ffffff">
            Total
        </text>
        <text transform="matrix(1.50144 0 0 1.50144 -105.472 -175.722)" stroke="#6F5C2A" font-weight="normal" font-style="normal" xml:space="preserve" text-anchor="start" font-family="'Azeret Mono'" font-size="24" id="svg_15" y="199.30771" x="81.02007" stroke-width="0" fill="#ffffff">
            Contributions
        </text>
        <text transform="matrix(1.7336 0 0 1.7336 -78.3109 -332.963)" stroke="#6F5C2A" font-weight="bold" font-style="normal" xml:space="preserve" text-anchor="start" font-family="'Azeret Mono'" font-size="24" id="svg_16" y="292.36791" x="166.20408" stroke-width="0" fill="#ffffff">
            ${0}
        </text>
    </g>
    </svg>`.replace(/\t/g, "");
};
