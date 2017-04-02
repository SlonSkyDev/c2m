function findTabLength(code) {
	var currentLineSpaces = 0;
	var previousLineSpaces = 0;
	var spacesDifferenceAmount = [];
	var i;
	var medianValue = 0;
	var countSpaces = true;

	// Find spaces in current line
	for(i = 0; ; i++) {
		if(code[i] == ' ' && countSpaces) {
			previousLineSpaces++;
		} else if(code[i] == '\n') {
			countSpaces = true;
			break;
		} else {
			countSpaces = false;
			continue;
		}
	}

	i = i + 1;

	for(; i < code.length + 1; i++) {
	
	
		if(code[i] == ' ' && countSpaces) {
			currentLineSpaces++;
		} else if(code[i] == '\n' || i == code.length) {
			countSpaces = true;
			if(currentLineSpaces - previousLineSpaces != 0)
				spacesDifferenceAmount.push(Math.abs(currentLineSpaces - previousLineSpaces));
			previousLineSpaces = currentLineSpaces;
			currentLineSpaces = 0;
			if(code[i+1] == '\n')
				i++;
		} else {
			countSpaces = false;
			continue;
		}
	}

	console.log(spacesDifferenceAmount);
	medianValue = Math.round(median(spacesDifferenceAmount));
	console.log(medianValue);
	return medianValue;
}

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}