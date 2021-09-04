// generate the unicode board from the array
export default function UnicodeGenerator(board) {
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
    }
  };
  // test

  // top line, ex: ╔═══╦═══╦═══╗
  for (let i in board[0]) {
    if (i === "0") result += char.corner.top.left;
    else result += char.intersection.triple.top;
    result += char.basic.horizontal.repeat(3);
  }
  result += char.corner.top.right;
  result += "\n";

  // middle, ex:
  /*
  ║ o ║ x ║ o ║
  ╠═══╬═══╬═══╣
  ║ x ║ x ║ o ║
  ╠═══╬═══╬═══╣
  ║ x ║ o ║ x ║
  */
 let counter = 0;
 for (let row of board) {
   // top section, ex. ╠═══╬═══╬═══╣
   // first time should not have this
   if (counter !== 0) {
     for (let i in row) {
       if (i === "0") result += char.intersection.triple.left;
       else result += char.intersection.cross;
       result += char.basic.horizontal.repeat(3);
     }
     result += char.basic.vertical;
     result += "\n";
   }
   counter++;

   // body, ex. ║ x ║ x ║ o ║
   for (let col of row) result += `${char.basic.vertical} ${col} `;
   result += char.basic.vertical;
   result += "\n";
 }

 // bottom, ex. ╚═══╩═══╩═══╝
 for (let i in board[0]) {
   if (i === "0") result += char.corner.bottom.left;
   else result += char.intersection.triple.bottom;
   result += char.basic.horizontal.repeat(3);
 }
 result += char.corner.bottom.right;

 return result;
}