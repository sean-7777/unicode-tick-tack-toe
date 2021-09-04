// generate the unicode board from the array
export default function UnicodeGenerate(board) {
  let result = "";
  const char = {
    basic: {
      vertical: "║",
      horizontal: "═",
    },
    corner: {
      top: {
        left: "╔", right: "╗"
      },
      bottom: {
        left: "╚", right: "╝",
      }
    },
    intersection: {
      cross: "╬",
      triple: {
        top: "╦", bottom: "╩",
        "left": "╠", right: "╣"
      }
    },
    symbol: {
      circle: "⭕️",
      cross: "❌"
    }
  };
}