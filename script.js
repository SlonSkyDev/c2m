'use strict';

/**
 * Take string of code and find difference in spaces amount at start of
 * line between two lines. If line contain tabulation that consist both
 * of tabs and spaces - we do not take this line in count. After we find out
 * spaces amount in one tab we convert all tabs to spaces. If there was no line
 * with spaces (or amount of lines with spaces is too small), we assume that one
 * tab four spaces long.
 * @param  {String} code
 * @return {String} code
 */
function findTabLength(code) {

    let spacesInTab = 4;
    let currentLineSpaces = 0;
    let previousLineSpaces = null;
    let lineStartIndex = 0;
    let codeStartIndex = 0;
    let codeStartFound = false;
    let spacesDifference = null;
    let spacesDifferenceArray = [];

    for(let i = 0; i < code.length; i++) {
        if(code[i] != ' ') {
            if(!codeStartFound) {
                codeStartIndex = i;
                codeStartFound = true;
            }
            if(code[i] == '\n') {
                currentLineSpaces = codeStartIndex - lineStartIndex;

                if(previousLineSpaces !== null)
                    spacesDifference = Math.abs(currentLineSpaces -
                                                    previousLineSpaces);

                // If there is some difference in amount of spaces between
                // current and previous lines and line does not
                // contain '\t' push difference to array.
                if(spacesDifference != 0 && spacesDifference !== null &&
                            !code.substring(lineStartIndex, i).includes('\t')) {
                    spacesDifferenceArray.push(spacesDifference);
                }
                lineStartIndex = i + 1;
                codeStartFound = false;
            }
        }
    }

    console.log(spacesDifferenceArray);
}

/**
* Find median value in given array.
* @param  {Number array} values
* @return {Number} medianValue
*/
function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

/**
* Return true, if code contain tabs ('\t'), false otherwise.
* @param  {String} code
* @return {Boolean} containTabs
*/
function isContainTabs(code) {
    let containTabs = false;

    for(let i = 0; i < code.length; i++) {
        if(code[i] == '\t')
            containTabs = false;
    }

    return containTabs;
}

/**
* Replace all tabs in given string with amount of spaces
* given in tabLength spaces.
* @param  {String} code
* @param  {Number} tabLength 
* @return {String} code
*/
function replaceTabs(code, tabLength) {
    let spaces = '';

    for(let i = 0; i < tabLength; i++) {
        spaces += ' ';
    }

    for(let i = 0; i < code.length; i++) {
        if(code[i] == '\t') {
            code.splice(i, 1, spaces);
        }
    }

    return code;
}