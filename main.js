
function to_second_page(){
    document.getElementById("page2").scrollIntoView();

}

function to_third_page(){
    document.getElementById("page3").scrollIntoView();

}

function validatePhone(phone) {
    var a = document.getElementById(phone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        alert("the phone number format enterred is wrong")
        return false;
    }
}
function validate_informations(){
    var msg = document.createElement("p");
    valid = true;
    service_selected = false;

    if(!validate_name()){
        msg.appendChild(document.createTextNode("Please give your first name and your last name"));
        msg.appendChild(document.createElement("br"));
        valid = false;
    }
    if(!validate_name()){
        msg.appendChild(document.createTextNode("Please give your pet's name"));
        msg.appendChild(document.createElement("br"));
        valid = false;
    }

    if(!validate_phone()){
        msg.appendChild(document.createTextNode("Please give phone number in the following format : 123-456-7891"));
        msg.appendChild(document.createElement("br"));
        valid = false;
    }

    for(let i = 0; i<services.length;i++){
        var service = document.getElementById(services[i].id);

        if(service.checked){
            service_selected = true;
            console.log("service selected");
            break;
        }
    }
    console.log("service_selected = "+service_selected);
    if(!service_selected){
    msg.appendChild(document.createTextNode("Please select at least one service"));
    msg.appendChild(document.createElement("br"));
        valid = false;
    }

    if(document.getElementById("expert_name_input").value == "option0"){
        msg.appendChild(document.createTextNode("Please select an expert"));
        msg.appendChild(document.createElement("br"));
        valid = false;
    }

    if(valid){
        return true
    }else{
        return msg
    }

}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2020","07/07/2020","07/10/2020"];
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) === -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone");
            $("#phone").val("123-456-7890");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });


});
var dates1 = ["2021-06-01","2021-06-21","2021-07-08","2021-07-07","2021-07-03","2021-07-10","2021-07-15","2021-07-27"]
var dates2 = ["2021-06-02","2021-07-04","2021-06-09","2021-06-11","2021-07-17","2021-07-19","2021-07-23","2021-07-25"]
var dates3 = ["2021-06-03","2021-06-07","2021-08-02","2021-06-14","2021-06-19","2021-06-20","2021-07-29","2021-07-14"]


var expert_name = "";

var time = "";

var total_price = 0;

var services = [
    {
        name : "CONSULTATION",
        price :  70,
        id : "service1",
        selected : false
    },
    {
        name : "VACCINATION",
        price : 40,
        id : "service2",
        selected : false
    },
    {
        name : "SURGICAL CARE",
        price : 150,
        id : "service3",
        selected : false
    },
    {
        name : "NEW BORN EXAMINATION",
        price : 60,
        id : "service4",
        selected : false
    },
    {
        name : "DENTAL CARE",
        price : 80,
        id : "service5",
        selected : false
    },
    {
        name : "NUTRITION",
        price : 45,
        id : "service6",
        selected : false
    }
]
