class Option {
    constructor(path, text, parameters) {
        this.path = path;
        this.text = text;
        this.parameters = parameters;
        this.childs = [];
    }
    createChild(text, parameters) {
        this.childs.push(new Option(this.path + "/" + this.childs.length, text, parameters));
        return this.childs[this.childs.length - 1]
    }
    getChild(path){
        var child = this;
        var pathArr = path.split("/");
        pathArr.shift();
        console.log(pathArr.length);
        if (pathArr.length > 0){
            return child.childs[pathArr[0]].getChild(pathArr.join('/'));
        }
        else{
            return child;
        }
        
    }
}

let base = new Option("0", "Merhaba", ["a", "b", "c"]);
firstchild = base.createChild("Selamun", ["e", "d", "f"]);
firstchild.createChild("Aleykum", ["e", "d", "f"]);
selam = firstchild.createChild("Aleykum Selam", ["e", "d", "f"]);
selam.createChild("Verahmetullahi", ["e", "d", "f"]);
secondchild = base.createChild("nasılsın?", ["e", "d", "f"]);
cevap = secondchild.createChild("iyiyim?", ["e", "d", "f"]);
newBase = base.getChild("0");
console.log(firstchild.path);
console.log(newBase.path);

function createDropwdownDiv(select,path) {
    var newBase = base.getChild(path);
    debugger;
    $div = select.parent().append($('<div class="' + $option.attr("class") + '">'));
    debugger;
    $div = $div.children("." + $option.attr("class")).text(newBase.text).append($('<select id="' + newBase.path +  '"class="' + $option.attr("class") + '">'));
    debugger;
    $select = $div.children(":last-child");
    for (const [key, value] of Object.entries(newBase.childs)) {
        if (value.childs.length > 0){
            $select.append($('<option class="dynamic">').val(value.path).text(value.text));
        }
        else{
            $select.append($('<option class="static">').val(value.path).text(value.text));

        }
    }
}


// console.log(firstchild.text);

// base.getChild("0/1");

$(document).on("change", "select", function () {

    $option = $(this).children("option:selected");

    //delete last child for update
    // $(this).siblings("div").remove();
    //if option aa
    // console.log($option.attr("class"));

    if ($option.attr("class") == "dynamic") {
        
        createDropwdownDiv($(this),$option.val());
    }
});
