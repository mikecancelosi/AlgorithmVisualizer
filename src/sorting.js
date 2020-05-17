
class Sorter {
    swap(arr, first_Index, second_Index){
        var temp = arr[first_Index];
        arr[first_Index] = arr[second_Index];
        arr[second_Index] = temp;
    }

    BubbleSort(){
        
    }


    GenerateDataSet(count){
        var increment = 1/count;
        var set = [];
        for (var i = 1; i <= count; i++) {
            set.push(i*increment);
        }
        this.shuffle(set);
        
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
}