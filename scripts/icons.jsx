/* Minimal stroke icon set (geometric only — no illustration). */
/* Shared React hooks — declared once here (first-loaded JSX) so every
   other in-browser-compiled script can use them without re-declaring
   (top-level const is shared across the page's classic scripts). */
const { useState, useEffect, useRef } = React;
const Ic = {};
function mk(paths, opts = {}) {
  return function (props) {
    const { size = 16, ...rest } = props || {};
    return React.createElement(
      "svg",
      { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
        stroke: "currentColor", strokeWidth: opts.sw || 1.7,
        strokeLinecap: "round", strokeLinejoin: "round", ...rest },
      paths.map((d, i) => React.createElement("path", { key: i, d }))
    );
  };
}
Ic.File = mk(["M14 3v5h5", "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"]);
Ic.Folder = mk(["M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"]);
Ic.Home = mk(["M3 11l9-8 9 8", "M5 10v10h14V10"]);
Ic.Cube = mk(["M12 2 3 7v10l9 5 9-5V7z", "M3 7l9 5 9-5", "M12 12v10"]);
Ic.User = mk(["M4 21v-1a6 6 0 0 1 12 0v1", "M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"], { sw: 1.6 });
Ic.Pulse = mk(["M3 12h4l2 6 4-14 2 8h6"]);
Ic.Pen = mk(["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"]);
Ic.Terminal = mk(["M4 17l6-5-6-5", "M12 19h8"]);
Ic.Chevron = mk(["M9 6l6 6-6 6"]);
Ic.Search = mk(["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"]);
Ic.Arrow = mk(["M5 12h14", "M13 6l6 6-6 6"]);
Ic.ArrowUpRight = mk(["M7 17 17 7", "M8 7h9v9"]);
Ic.Github = mk(["M9 19c-4 1.4-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C7.3 2.3 6.3 2.6 6.3 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.9 9c0 4.5 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.7V20"], { sw: 1.5 });
Ic.Sun = mk(["M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z", "M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"]);
Ic.Moon = mk(["M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"]);
Ic.Mail = mk(["M3 6h18v12H3z", "M3 7l9 6 9-6"]);
Ic.Chat = mk(["M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4A8.4 8.4 0 1 1 21 11.5z"]);
Ic.Git = mk(["M6 3v12", "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 6a9 9 0 0 1-9 9"]);
Ic.Sliders = mk(["M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"], { sw: 1.6 });
Ic.Dot = mk(["M12 12.01"], { sw: 3 });
Ic.Menu = mk(["M4 6h16M4 12h16M4 18h16"]);
Ic.Close = mk(["M6 6l12 12M18 6 6 18"]);
window.Ic = Ic;
