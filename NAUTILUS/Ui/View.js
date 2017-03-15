// NAUTILUS.Ui.View
// Onscreen visual output

/*

*/

NAUTILUS.Ui.View = function (params) {
    // Open your eyes
}

/*
What are the things we need a View system to do? What are its verbs?
VSA = Visible Screen Area, our main canvas
SBA = Screen Buffer Area, our work canvas that is redrawn over the main
VO = View Object, a thing that can be drawn, can be composed of multiple VOs
     Can also contain multiple layers

Draw whole SBA over VSA,
Draw smaller portion of SBA over VSA,
See if anything needs to be drawn,
Draw whole SBA offscreen,
A) Draw a single VO on SBA -> E,
B) Draw a composite VO on SBA -> C,
C) Draw all pieces of a composite VO on SBA -> A,
D) Draw a single layer of a single VO on SBA
E) Draw all layers of a single VO on SBA -> D,


*/



/*
*
*
* Courtesy Spaces
*
*
*/