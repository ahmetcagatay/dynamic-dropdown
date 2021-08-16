option1 = {
    id: "1",
    text: "option1",
    paramaters: {
        x: "5",
        y: "10"
    },
    options: {
        option11: {
            id: "11",
            text: "option11",
            paramaters: {
                a: "2",
                b: "3"
            }
        },

        option12: {
            id: "12",
            text: "option12",
            paramaters: {
                c: "1",
                d: "2"
            }
        }
    }
}


const obj = option1;

console.log(obj);

$(document).on("change", "select.base", function () {

    $option = $(this).children("option:selected");

    //delete last child for update
    console.log($(this).siblings("div").remove());
    //if option aa
    console.log($option.attr("class"));
    console.log("aa bb");
    console.log($option.attr("class") == "aa bb");

    //
    if ($option.attr("class") == "aa") {
        var el = $(this);
        $div = el.parent().append($('<div class="' + $option.attr("class") + '">'));
        $div = $div.children("." + $option.attr("class")).text("some").append($('<select class="' + $option.attr("class") + '">'));

        // add options
        var options = { x: "X", y: "Y" }
        $select = $div.children(":last-child");
        for (const [key, value] of Object.entries(options)) {
            $select.append($('<option>').val(key).text(value));
        }
    }
});
