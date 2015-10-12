var ParseInstrument = function(text, cursorPosition) {

    var lines = text.split("\n");
    var instruments = [];
    var startline;
    var endline;
    for (var i = 0; i < lines.length; ++i) {


        if (lines[i].indexOf("instr") != -1) {

            startline = i;
        }

        if (lines[i].indexOf("endin") != -1) {
        
            endline = i; 
            instruments.push({startline:startline, endline:endline});
        }
    }

    for (var i = 0; i < instruments.length; ++i) {
   
        if (cursorPosition >= instruments[i].startline 
           &&
           cursorPosition <= instruments[i].endline) {
       
               var instrument = "";

               for (var j = instruments[i].startline; j <= instruments[i].endline; ++j) {
               
               
                       instrument += lines[j] + "\n";
               }
          
               return {text:instrument, startline:instruments[i].startline, endline:instruments[i].endline};
        }
    
    }

    return {text:text, startline:0, endline:lines.length};
};
