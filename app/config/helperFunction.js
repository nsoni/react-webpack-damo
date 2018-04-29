var timeout;
export function debounce(func, wait, immediate) {
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function checkBalance(braces){
  let stack = {};
  let error = "";
  let size = 0;
  let beginners = ['(', '[', '{'];
  let enders = [')', ']', '}'];
  for(let i = 0; i < braces.length; i++){
    if( beginners.indexOf(braces[i]) !== -1 ){
    	error = i + 1
      stack[size] = braces[i];
      size++;
    } else if( enders.indexOf(braces[i]) !== -1 ){
      if(size === 0) { 
      	error = i + 1 
      	return {result: false, index: error}; 
      }
      let index = enders.indexOf(braces[i]);
      if(stack[size-1] === beginners[index] ){
        size --;
        error =  i+1
      } else {
        return {result: false, index: i};
      }
    }
  }

  return {result: size === 0, index:  size === 0 ? "" : error};
};
