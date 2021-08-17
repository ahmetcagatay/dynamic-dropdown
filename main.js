class Option {
    constructor(text, parameters = [], path = "0") {

        this.text = text;
        this.parameters = parameters;
        this.path = path;
        this.childs = [];
    }
    createChild(text, parameters) {
        this.childs.push(new Option(text, parameters, this.path + "/" + this.childs.length));
        return this.childs[this.childs.length - 1]
    }
    getChild(path) {
        var child = this;
        var pathArr = path.split("/");
        pathArr.shift();
        console.log(pathArr.length);
        if (pathArr.length > 0) {
            return child.childs[pathArr[0]].getChild(pathArr.join('/'));
        }
        else {
            return child;
        }

    }
}



function createDropwdownDiv(select, path) {
    var newBase = base.getChild(path);

    $div = select.parent().append($('<div class="' + $option.attr("class") + '">')).val(path);
    $div.children("div." + $option.attr("class")).append("<label>").text(newBase.text);
    $div = $div.children("." + $option.attr("class")).append($('<select id="' + newBase.path + '"class="' + $option.attr("class") + '">'));

    //Options added into select
    $select = $div.children(":last-child");
    //Options added into select
    $select.append($('<option class="static">').text("Choise"));
    for (const [key, value] of Object.entries(newBase.childs)) {
        if (value.childs.length > 0) {
            $select.append($('<option class="dynamic">').val(value.path).text(value.text));
        }
        else {
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
    // && $option.val() != "..."
    if ($option.attr("class") == "dynamic") {

        createDropwdownDiv($(this), $option.val());
    }
});


let base = new Option("Event");

onMessage = base.createChild("On Message");
    
    sendMessage = onMessage.createChild("Send Message");
    
    kickMember = onMessage.createChild("Ban Member");
        kickMember.createChild("Ban");
        kickMember.createChild("Perma Ban");

onVoiceUpdate = base.createChild("On Voice Update");
    onVoiceUpdate.createChild("Add Role");
    onVoiceUpdate.createChild("Send Message");
    onVoiceUpdate.createChild("Mute");


// $(document).ready( function(){
//     createDropwdownDiv($("body"),"0");
// });