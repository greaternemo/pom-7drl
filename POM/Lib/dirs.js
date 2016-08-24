// POM.Lib.dirs
// The sideRefs object is huge, I just want it out of the way.

POM.Lib.dirs.sideRefs = {
//  'x,y':   [N,       NE,      E,       SE,      S,       SW,      W,       NW     ]
    '0,0':   [false,   false,   '1,0',   '1,1',   '0,1',   false,   false,   false  ],
    '0,1':   ['0,0',   '1,0',   '1,1',   '1,2',   '0,2',   false,   false,   false  ],
    '0,2':   ['0,1',   '1,1',   '1,2',   '1,3',   '0,3',   false,   false,   false  ],
    '0,3':   ['0,2',   '1,2',   '1,3',   '1,4',   '0,4',   false,   false,   false  ],
    '0,4':   ['0,3',   '1,3',   '1,4',   '1,5',   '0,5',   false,   false,   false  ],
    '0,5':   ['0,4',   '1,4',   '1,5',   '1,6',   '0,6',   false,   false,   false  ],
    '0,6':   ['0,5',   '1,5',   '1,6',   '1,7',   '0,7',   false,   false,   false  ],
    '0,7':   ['0,6',   '1,6',   '1,7',   '1,8',   '0,8',   false,   false,   false  ],
    '0,8':   ['0,7',   '1,7',   '1,8',   '1,9',   '0,9',   false,   false,   false  ],
    '0,9':   ['0,8',   '1,8',   '1,9',   '1,10',  '0,10',  false,   false,   false  ],
    '0,10':  ['0,9',   '1,9',   '1,10',  '1,11',  '0,11',  false,   false,   false  ],
    '0,11':  ['0,10',  '1,10',  '1,11',  '1,12',  '0,12',  false,   false,   false  ],
    '0,12':  ['0,11',  '1,11',  '1,12',  false,   false,   false,   false,   false  ],
    '1,0':   [false,   false,   '2,0',   '2,1',   '1,1',   '0,1',   '0,0',   false  ],
    '1,1':   ['1,0',   '2,0',   '2,1',   '2,2',   '1,2',   '0,2',   '0,1',   '0,0'  ],
    '1,2':   ['1,1',   '2,1',   '2,2',   '2,3',   '1,3',   '0,3',   '0,2',   '0,1'  ],
    '1,3':   ['1,2',   '2,2',   '2,3',   '2,4',   '1,4',   '0,4',   '0,3',   '0,2'  ],
    '1,4':   ['1,3',   '2,3',   '2,4',   '2,5',   '1,5',   '0,5',   '0,4',   '0,3'  ],
    '1,5':   ['1,4',   '2,4',   '2,5',   '2,6',   '1,6',   '0,6',   '0,5',   '0,4'  ],
    '1,6':   ['1,5',   '2,5',   '2,6',   '2,7',   '1,7',   '0,7',   '0,6',   '0,5'  ],
    '1,7':   ['1,6',   '2,6',   '2,7',   '2,8',   '1,8',   '0,8',   '0,7',   '0,6'  ],
    '1,8':   ['1,7',   '2,7',   '2,8',   '2,9',   '1,9',   '0,9',   '0,8',   '0,7'  ],
    '1,9':   ['1,8',   '2,8',   '2,9',   '2,10',  '1,10',  '0,10',  '0,9',   '0,8'  ],
    '1,10':  ['1,9',   '2,9',   '2,10',  '2,11',  '1,11',  '0,11',  '0,10',  '0,9'  ],
    '1,11':  ['1,10',  '2,10',  '2,11',  '2,12',  '1,12',  '0,12',  '0,11',  '0,10' ],
    '1,12':  ['1,11',  '2,11',  '2,12',  false,   false,   false,   '0,12',  '0,11' ],
    '2,0':   [false,   false,   '3,0',   '3,1',   '2,1',   '1,1',   '1,0',   false  ],
    '2,1':   ['2,0',   '3,0',   '3,1',   '3,2',   '2,2',   '1,2',   '1,1',   '1,0'  ],
    '2,2':   ['2,1',   '3,1',   '3,2',   '3,3',   '2,3',   '1,3',   '1,2',   '1,1'  ],
    '2,3':   ['2,2',   '3,2',   '3,3',   '3,4',   '2,4',   '1,4',   '1,3',   '1,2'  ],
    '2,4':   ['2,3',   '3,3',   '3,4',   '3,5',   '2,5',   '1,5',   '1,4',   '1,3'  ],
    '2,5':   ['2,4',   '3,4',   '3,5',   '3,6',   '2,6',   '1,6',   '1,5',   '1,4'  ],
    '2,6':   ['2,5',   '3,5',   '3,6',   '3,7',   '2,7',   '1,7',   '1,6',   '1,5'  ],
    '2,7':   ['2,6',   '3,6',   '3,7',   '3,8',   '2,8',   '1,8',   '1,7',   '1,6'  ],
    '2,8':   ['2,7',   '3,7',   '3,8',   '3,9',   '2,9',   '1,9',   '1,8',   '1,7'  ],
    '2,9':   ['2,8',   '3,8',   '3,9',   '3,10',  '2,10',  '1,10',  '1,9',   '1,8'  ],
    '2,10':  ['2,9',   '3,9',   '3,10',  '3,11',  '2,11',  '1,11',  '1,10',  '1,9'  ],
    '2,11':  ['2,10',  '3,10',  '3,11',  '3,12',  '2,12',  '1,12',  '1,11',  '1,10' ],
    '2,12':  ['2,11',  '3,11',  '3,12',  false,   false,   false,   '1,12',  '1,11' ],
    '3,0':   [false,   false,   '4,0',   '4,1',   '3,1',   '2,1',   '2,0',   false  ],
    '3,1':   ['3,0',   '4,0',   '4,1',   '4,2',   '3,2',   '2,2',   '2,1',   '2,0'  ],
    '3,2':   ['3,1',   '4,1',   '4,2',   '4,3',   '3,3',   '2,3',   '2,2',   '2,1'  ],
    '3,3':   ['3,2',   '4,2',   '4,3',   '4,4',   '3,4',   '2,4',   '2,3',   '2,2'  ],
    '3,4':   ['3,3',   '4,3',   '4,4',   '4,5',   '3,5',   '2,5',   '2,4',   '2,3'  ],
    '3,5':   ['3,4',   '4,4',   '4,5',   '4,6',   '3,6',   '2,6',   '2,5',   '2,4'  ],
    '3,6':   ['3,5',   '4,5',   '4,6',   '4,7',   '3,7',   '2,7',   '2,6',   '2,5'  ],
    '3,7':   ['3,6',   '4,6',   '4,7',   '4,8',   '3,8',   '2,8',   '2,7',   '2,6'  ],
    '3,8':   ['3,7',   '4,7',   '4,8',   '4,9',   '3,9',   '2,9',   '2,8',   '2,7'  ],
    '3,9':   ['3,8',   '4,8',   '4,9',   '4,10',  '3,10',  '2,10',  '2,9',   '2,8'  ],
    '3,10':  ['3,9',   '4,9',   '4,10',  '4,11',  '3,11',  '2,11',  '2,10',  '2,9'  ],
    '3,11':  ['3,10',  '4,10',  '4,11',  '4,12',  '3,12',  '2,12',  '2,11',  '2,10' ],
    '3,12':  ['3,11',  '4,11',  '4,12',  false,   false,   false,   '2,12',  '2,11' ],
    '4,0':   [false,   false,   '5,0',   '5,1',   '4,1',   '3,1',   '3,0',   false  ],
    '4,1':   ['4,0',   '5,0',   '5,1',   '5,2',   '4,2',   '3,2',   '3,1',   '3,0'  ],
    '4,2':   ['4,1',   '5,1',   '5,2',   '5,3',   '4,3',   '3,3',   '3,2',   '3,1'  ],
    '4,3':   ['4,2',   '5,2',   '5,3',   '5,4',   '4,4',   '3,4',   '3,3',   '3,2'  ],
    '4,4':   ['4,3',   '5,3',   '5,4',   '5,5',   '4,5',   '3,5',   '3,4',   '3,3'  ],
    '4,5':   ['4,4',   '5,4',   '5,5',   '5,6',   '4,6',   '3,6',   '3,5',   '3,4'  ],
    '4,6':   ['4,5',   '5,5',   '5,6',   '5,7',   '4,7',   '3,7',   '3,6',   '3,5'  ],
    '4,7':   ['4,6',   '5,6',   '5,7',   '5,8',   '4,8',   '3,8',   '3,7',   '3,6'  ],
    '4,8':   ['4,7',   '5,7',   '5,8',   '5,9',   '4,9',   '3,9',   '3,8',   '3,7'  ],
    '4,9':   ['4,8',   '5,8',   '5,9',   '5,10',  '4,10',  '3,10',  '3,9',   '3,8'  ],
    '4,10':  ['4,9',   '5,9',   '5,10',  '5,11',  '4,11',  '3,11',  '3,10',  '3,9'  ],
    '4,11':  ['4,10',  '5,10',  '5,11',  '5,12',  '4,12',  '3,12',  '3,11',  '3,10' ],
    '4,12':  ['4,11',  '5,11',  '5,12',  false,   false,   false,   '3,12',  '3,11' ],
    '5,0':   [false,   false,   '6,0',   '6,1',   '5,1',   '4,1',   '4,0',   false  ],
    '5,1':   ['5,0',   '6,0',   '6,1',   '6,2',   '5,2',   '4,2',   '4,1',   '4,0'  ],
    '5,2':   ['5,1',   '6,1',   '6,2',   '6,3',   '5,3',   '4,3',   '4,2',   '4,1'  ],
    '5,3':   ['5,2',   '6,2',   '6,3',   '6,4',   '5,4',   '4,4',   '4,3',   '4,2'  ],
    '5,4':   ['5,3',   '6,3',   '6,4',   '6,5',   '5,5',   '4,5',   '4,4',   '4,3'  ],
    '5,5':   ['5,4',   '6,4',   '6,5',   '6,6',   '5,6',   '4,6',   '4,5',   '4,4'  ],
    '5,6':   ['5,5',   '6,5',   '6,6',   '6,7',   '5,7',   '4,7',   '4,6',   '4,5'  ],
    '5,7':   ['5,6',   '6,6',   '6,7',   '6,8',   '5,8',   '4,8',   '4,7',   '4,6'  ],
    '5,8':   ['5,7',   '6,7',   '6,8',   '6,9',   '5,9',   '4,9',   '4,8',   '4,7'  ],
    '5,9':   ['5,8',   '6,8',   '6,9',   '6,10',  '5,10',  '4,10',  '4,9',   '4,8'  ],
    '5,10':  ['5,9',   '6,9',   '6,10',  '6,11',  '5,11',  '4,11',  '4,10',  '4,9'  ],
    '5,11':  ['5,10',  '6,10',  '6,11',  '6,12',  '5,12',  '4,12',  '4,11',  '4,10' ],
    '5,12':  ['5,11',  '6,11',  '6,12',  false,   false,   false,   '4,12',  '4,11' ],
    '6,0':   [false,   false,   '7,0',   '7,1',   '6,1',   '5,1',   '5,0',   false  ],
    '6,1':   ['6,0',   '7,0',   '7,1',   '7,2',   '6,2',   '5,2',   '5,1',   '5,0'  ],
    '6,2':   ['6,1',   '7,1',   '7,2',   '7,3',   '6,3',   '5,3',   '5,2',   '5,1'  ],
    '6,3':   ['6,2',   '7,2',   '7,3',   '7,4',   '6,4',   '5,4',   '5,3',   '5,2'  ],
    '6,4':   ['6,3',   '7,3',   '7,4',   '7,5',   '6,5',   '5,5',   '5,4',   '5,3'  ],
    '6,5':   ['6,4',   '7,4',   '7,5',   '7,6',   '6,6',   '5,6',   '5,5',   '5,4'  ],
    '6,6':   ['6,5',   '7,5',   '7,6',   '7,7',   '6,7',   '5,7',   '5,6',   '5,5'  ],
    '6,7':   ['6,6',   '7,6',   '7,7',   '7,8',   '6,8',   '5,8',   '5,7',   '5,6'  ],
    '6,8':   ['6,7',   '7,7',   '7,8',   '7,9',   '6,9',   '5,9',   '5,8',   '5,7'  ],
    '6,9':   ['6,8',   '7,8',   '7,9',   '7,10',  '6,10',  '5,10',  '5,9',   '5,8'  ],
    '6,10':  ['6,9',   '7,9',   '7,10',  '7,11',  '6,11',  '5,11',  '5,10',  '5,9'  ],
    '6,11':  ['6,10',  '7,10',  '7,11',  '7,12',  '6,12',  '5,12',  '5,11',  '5,10' ],
    '6,12':  ['6,11',  '7,11',  '7,12',  false,   false,   false,   '5,12',  '5,11' ],
    '7,0':   [false,   false,   '8,0',   '8,1',   '7,1',   '6,1',   '6,0',   false  ],
    '7,1':   ['7,0',   '8,0',   '8,1',   '8,2',   '7,2',   '6,2',   '6,1',   '6,0'  ],
    '7,2':   ['7,1',   '8,1',   '8,2',   '8,3',   '7,3',   '6,3',   '6,2',   '6,1'  ],
    '7,3':   ['7,2',   '8,2',   '8,3',   '8,4',   '7,4',   '6,4',   '6,3',   '6,2'  ],
    '7,4':   ['7,3',   '8,3',   '8,4',   '8,5',   '7,5',   '6,5',   '6,4',   '6,3'  ],
    '7,5':   ['7,4',   '8,4',   '8,5',   '8,6',   '7,6',   '6,6',   '6,5',   '6,4'  ],
    '7,6':   ['7,5',   '8,5',   '8,6',   '8,7',   '7,7',   '6,7',   '6,6',   '6,5'  ],
    '7,7':   ['7,6',   '8,6',   '8,7',   '8,8',   '7,8',   '6,8',   '6,7',   '6,6'  ],
    '7,8':   ['7,7',   '8,7',   '8,8',   '8,9',   '7,9',   '6,9',   '6,8',   '6,7'  ],
    '7,9':   ['7,8',   '8,8',   '8,9',   '8,10',  '7,10',  '6,10',  '6,9',   '6,8'  ],
    '7,10':  ['7,9',   '8,9',   '8,10',  '8,11',  '7,11',  '6,11',  '6,10',  '6,9'  ],
    '7,11':  ['7,10',  '8,10',  '8,11',  '8,12',  '7,12',  '6,12',  '6,11',  '6,10' ],
    '7,12':  ['7,11',  '8,11',  '8,12',  false,   false,   false,   '6,12',  '6,11' ],
    '8,0':   [false,   false,   '9,0',   '9,1',   '8,1',   '7,1',   '7,0',   false  ],
    '8,1':   ['8,0',   '9,0',   '9,1',   '9,2',   '8,2',   '7,2',   '7,1',   '7,0'  ],
    '8,2':   ['8,1',   '9,1',   '9,2',   '9,3',   '8,3',   '7,3',   '7,2',   '7,1'  ],
    '8,3':   ['8,2',   '9,2',   '9,3',   '9,4',   '8,4',   '7,4',   '7,3',   '7,2'  ],
    '8,4':   ['8,3',   '9,3',   '9,4',   '9,5',   '8,5',   '7,5',   '7,4',   '7,3'  ],
    '8,5':   ['8,4',   '9,4',   '9,5',   '9,6',   '8,6',   '7,6',   '7,5',   '7,4'  ],
    '8,6':   ['8,5',   '9,5',   '9,6',   '9,7',   '8,7',   '7,7',   '7,6',   '7,5'  ],
    '8,7':   ['8,6',   '9,6',   '9,7',   '9,8',   '8,8',   '7,8',   '7,7',   '7,6'  ],
    '8,8':   ['8,7',   '9,7',   '9,8',   '9,9',   '8,9',   '7,9',   '7,8',   '7,7'  ],
    '8,9':   ['8,8',   '9,8',   '9,9',   '9,10',  '8,10',  '7,10',  '7,9',   '7,8'  ],
    '8,10':  ['8,9',   '9,9',   '9,10',  '9,11',  '8,11',  '7,11',  '7,10',  '7,9'  ],
    '8,11':  ['8,10',  '9,10',  '9,11',  '9,12',  '8,12',  '7,12',  '7,11',  '7,10' ],
    '8,12':  ['8,11',  '9,11',  '9,12',  false,   false,   false,   '7,12',  '7,11' ],
    '9,0':   [false,   false,   '10,0',  '10,1',  '9,1',   '8,1',   '8,0',   false  ],
    '9,1':   ['9,0',   '10,0',  '10,1',  '10,2',  '9,2',   '8,2',   '8,1',   '8,0'  ],
    '9,2':   ['9,1',   '10,1',  '10,2',  '10,3',  '9,3',   '8,3',   '8,2',   '8,1'  ],
    '9,3':   ['9,2',   '10,2',  '10,3',  '10,4',  '9,4',   '8,4',   '8,3',   '8,2'  ],
    '9,4':   ['9,3',   '10,3',  '10,4',  '10,5',  '9,5',   '8,5',   '8,4',   '8,3'  ],
    '9,5':   ['9,4',   '10,4',  '10,5',  '10,6',  '9,6',   '8,6',   '8,5',   '8,4'  ],
    '9,6':   ['9,5',   '10,5',  '10,6',  '10,7',  '9,7',   '8,7',   '8,6',   '8,5'  ],
    '9,7':   ['9,6',   '10,6',  '10,7',  '10,8',  '9,8',   '8,8',   '8,7',   '8,6'  ],
    '9,8':   ['9,7',   '10,7',  '10,8',  '10,9',  '9,9',   '8,9',   '8,8',   '8,7'  ],
    '9,9':   ['9,8',   '10,8',  '10,9',  '10,10', '9,10',  '8,10',  '8,9',   '8,8'  ],
    '9,10':  ['9,9',   '10,9',  '10,10', '10,11', '9,11',  '8,11',  '8,10',  '8,9'  ],
    '9,11':  ['9,10',  '10,10', '10,11', '10,12', '9,12',  '8,12',  '8,11',  '8,10' ],
    '9,12':  ['9,11',  '10,11', '10,12', false,   false,   false,   '8,12',  '8,11' ],
    '10,0':  [false,   false,   '11,0',  '11,1',  '10,1',  '9,1',   '9,0',   false  ],
    '10,1':  ['10,0',  '11,0',  '11,1',  '11,2',  '10,2',  '9,2',   '9,1',   '9,0'  ],
    '10,2':  ['10,1',  '11,1',  '11,2',  '11,3',  '10,3',  '9,3',   '9,2',   '9,1'  ],
    '10,3':  ['10,2',  '11,2',  '11,3',  '11,4',  '10,4',  '9,4',   '9,3',   '9,2'  ],
    '10,4':  ['10,3',  '11,3',  '11,4',  '11,5',  '10,5',  '9,5',   '9,4',   '9,3'  ],
    '10,5':  ['10,4',  '11,4',  '11,5',  '11,6',  '10,6',  '9,6',   '9,5',   '9,4'  ],
    '10,6':  ['10,5',  '11,5',  '11,6',  '11,7',  '10,7',  '9,7',   '9,6',   '9,5'  ],
    '10,7':  ['10,6',  '11,6',  '11,7',  '11,8',  '10,8',  '9,8',   '9,7',   '9,6'  ],
    '10,8':  ['10,7',  '11,7',  '11,8',  '11,9',  '10,9',  '9,9',   '9,8',   '9,7'  ],
    '10,9':  ['10,8',  '11,8',  '11,9',  '11,10', '10,10', '9,10',  '9,9',   '9,8'  ],
    '10,10': ['10,9',  '11,9',  '11,10', '11,11', '10,11', '9,11',  '9,10',  '9,9'  ],
    '10,11': ['10,10', '11,10', '11,11', '11,12', '10,12', '9,12',  '9,11',  '9,10' ],
    '10,12': ['10,11', '11,11', '11,12', false,   false,   false,   '9,12',  '9,11' ],
    '11,0':  [false,   false,   '12,0',  '12,1',  '11,1',  '10,1',  '10,0',  false  ],
    '11,1':  ['11,0',  '12,0',  '12,1',  '12,2',  '11,2',  '10,2',  '10,1',  '10,0' ],
    '11,2':  ['11,1',  '12,1',  '12,2',  '12,3',  '11,3',  '10,3',  '10,2',  '10,1' ],
    '11,3':  ['11,2',  '12,2',  '12,3',  '12,4',  '11,4',  '10,4',  '10,3',  '10,2' ],
    '11,4':  ['11,3',  '12,3',  '12,4',  '12,5',  '11,5',  '10,5',  '10,4',  '10,3' ],
    '11,5':  ['11,4',  '12,4',  '12,5',  '12,6',  '11,6',  '10,6',  '10,5',  '10,4' ],
    '11,6':  ['11,5',  '12,5',  '12,6',  '12,7',  '11,7',  '10,7',  '10,6',  '10,5' ],
    '11,7':  ['11,6',  '12,6',  '12,7',  '12,8',  '11,8',  '10,8',  '10,7',  '10,6' ],
    '11,8':  ['11,7',  '12,7',  '12,8',  '12,9',  '11,9',  '10,9',  '10,8',  '10,7' ],
    '11,9':  ['11,8',  '12,8',  '12,9',  '12,10', '11,10', '10,10', '10,9',  '10,8' ],
    '11,10': ['11,9',  '12,9',  '12,10', '12,11', '11,11', '10,11', '10,10', '10,9' ],
    '11,11': ['11,10', '12,10', '12,11', '12,12', '11,12', '10,12', '10,11', '10,10'],
    '11,12': ['11,11', '12,11', '12,12', false,   false,   false,   '10,12', '10,11'],
    '12,0':  [false,   false,   false,   false,   '12,1',  '11,1',  '11,0',  false  ],
    '12,1':  ['12,0',  false,   false,   false,   '12,2',  '11,2',  '11,1',  '11,0' ],
    '12,2':  ['12,1',  false,   false,   false,   '12,3',  '11,3',  '11,2',  '11,1' ],
    '12,3':  ['12,2',  false,   false,   false,   '12,4',  '11,4',  '11,3',  '11,2' ],
    '12,4':  ['12,3',  false,   false,   false,   '12,5',  '11,5',  '11,4',  '11,3' ],
    '12,5':  ['12,4',  false,   false,   false,   '12,6',  '11,6',  '11,5',  '11,4' ],
    '12,6':  ['12,5',  false,   false,   false,   '12,7',  '11,7',  '11,6',  '11,5' ],
    '12,7':  ['12,6',  false,   false,   false,   '12,8',  '11,8',  '11,7',  '11,6' ],
    '12,8':  ['12,7',  false,   false,   false,   '12,9',  '11,9',  '11,8',  '11,7' ],
    '12,9':  ['12,8',  false,   false,   false,   '12,10', '11,10', '11,9',  '11,8' ],
    '12,10': ['12,9',  false,   false,   false,   '12,11', '11,11', '11,10', '11,9' ],
    '12,11': ['12,10', false,   false,   false,   '12,12', '11,12', '11,11', '11,10'],
    '12,12': ['12,11', false,   false,   false,   false,   false,   '11,12', '11,11'],
};