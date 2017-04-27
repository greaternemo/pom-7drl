// NAUTILUS.Ui.Output.View
// Onscreen visual output

/*

*/

NAUTILUS.Ui.Output.View = function (params) {
    // Open your eyes
    
    // This will be passed in to become the loopProc of our loop.
    // This will eventually need to be defined when the View
    // object is instantiated, so this is a placeholder value.
    this.drawProc = function () {};
    
    // This will be passed in to become the loopDelay of our loop.
    // 30 FPS is a fine default.
    this.drawDelay = (1000/30)
    
    // Our draw loop, obv
    this.drawLoop = new NAUTILUS.App.Loop(this.drawProc, this.drawDelay);
    
    // BE CAREFUL WHEN YOU ENGAGE THE LOOP THAT DRAWS THE DANG SCREEN
    // This may well need to be called somewhere else. Probably.
    this.drawLoop.engage();
    
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