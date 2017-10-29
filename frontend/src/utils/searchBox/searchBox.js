// export function createSearchBox(event, inputID) {
//     let ulID = "" + inputID + "ul",
//         select = event.target,
//         selectInput = ('<input type="text" id="' + inputID + '" class="form-control" required>'),
//         mainUl = ('<ul id="' + ulID + '" class="search-box_ul " data=""></ul>');
//
//
//     searchByLi(inputID, ulID);
//
//
// }
//
//
//
//
//     export function searchByLi(inputID, ulID) {
//         let input, filter, ul, li, a, i;
//         input = document.getElementById(inputID);
//         filter = input.value.toUpperCase();
//         ul = document.getElementById(ulID);
//         li = ul.getElementsByTagName("li");
//         for (i = 0; i < li.length; i++) {
//             if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//                 li[i].style.display = "block";
//             } else {
//                 li[i].style.display = "none";
//             }
//         }
//     }