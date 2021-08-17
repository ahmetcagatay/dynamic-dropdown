class Option {
    constructor(text, parameters, path="0") {
        this.path = path;
        this.text = text;
        this.parameters = parameters;
        this.childs = [];
    }
    createChild(text, parameters) {
        this.childs.push(new Option(text, parameters,this.path + "/" + this.childs.length));
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



function createDropwdownDiv(select,path) {
    var newBase = base.getChild(path);

    $div = select.parent().append($('<div class="' + $option.attr("class") + '">')).val(path);
    $div.children("div."+$option.attr("class")).append("<label>").text(newBase.text);
    $div = $div.children("."+$option.attr("class")).append($('<select id="' + newBase.path +  '"class="' + $option.attr("class") + '">'));

    //Options added into select
    $select = $div.children(":last-child");
    //Options added into select
    $select.append($('<option class="dynamic">').val("...").text("Seçiniz"));
    for (const [key, value] of Object.entries(newBase.childs)) {
        if (value.childs.length > 0){
            $select.append($('<option class="dynamic">').val(value.path).text(value.text));
        }
        else{
            $select.append($('<option class="static">').val(value.path).text(value.text));
        }
    }
}





$(document).on("change", "select", function () {
    
    $option = $(this).children("option:selected");

    //delete last child for update
    $(this).siblings("div").remove();
    //if option aa
    // console.log($option.attr("class"));
    if ($option.attr("class") == "dynamic" && $option.val() != "...") {

        createDropwdownDiv($(this),$option.val());
    }
});


let base = new Option("Merhaba", ["a", "b", "c"]);

firstchild = base.createChild("Selamun Aleykum", ["e", "d", "f"]);
aleykum = firstchild.createChild("Aleykum Selam", ["e", "d", "f"]);
aleykum.createChild("Bitti", ["e", "d", "f"]);
aleykum.createChild("Bitti2", ["e", "d", "f"]);
aleykum.createChild("Bitti3", ["e", "d", "f"]);
selam = firstchild.createChild("Ve Aleykum Selam", ["e", "d", "f"]);
selam.createChild("Verahmetullahi", ["e", "d", "f"]);

secondchild = base.createChild("nasılsın?", ["e", "d", "f"]);
cevap = secondchild.createChild("iyiyim?", ["e", "d", "f"]);
secondchild.createChild("Sen nasılsın?", ["e", "d", "f"]);
secondchild.createChild("Nasıl gidiyor", ["e", "d", "f"]);

newBase = base.getChild("0");
console.log(firstchild.path);
console.log(newBase.path);

// $(document).ready( function(){
//     createDropwdownDiv($("body"),"0");
// });