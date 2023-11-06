var employeeJSON;
var selectedEmployeeListItem;

var firstThumbIndex;
var lastThumbIndex;

$(document).ready(function() {
    $.cookie.destroy('currentEmployee');

    employeeJSON = sessvars.employeeJSON;
    populateEmployeeThumbs();
    searchInit();
});

function populateEmployeeThumbs() {
    var listItems = "";
    for(var i = 0; i<employeeJSON.length; i++) {
        var imageSource = "images/employee-" + employeeJSON[i].id + ".jpg";
        listItems += '<li onclick="selectItem(this)" ' +
            'class="col-md-2 employee-thumbs-item list-group-item" id="' + employeeJSON[i].id + '" ' +
            'style="display : none;">' +
            '<div class="thumbnail"><img class="img-responsive employee-avatar" src="' + imageSource + '" alt="Avatar"></div>' +
            '<div class="caption"><p>' + employeeJSON[i].name + '</p><p>' + employeeJSON[i].position + '</p></div></li>';
    }
    var ul = document.getElementById("employee-thumbs");
    ul.innerHTML = listItems;

    var items = ul.getElementsByTagName("li");
    for(i = 0; i<6; i++) {
        items[i].style.display = "";
    }

    var thumbnailClass = $(".thumbnail");
    var width = thumbnailClass.outerWidth();
    thumbnailClass.css("height", width+"px");
    equalHeight($(".employee-thumbs-item"));
    setDefaultImages();

    firstThumbIndex = 0;
    lastThumbIndex = 5;
}

function equalHeight(group) {
    var tallest = 0;
    group.each(function() {
        var thisHeight = $(this).height();
        if(thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.each(function() { $(this).height(tallest); });
}

function setDefaultImages() {
    $('.visitor-avatar').error(function(){
        $(this).attr('src', 'images/visitor-0.jpg');
    });
}

function searchInit() {
    $('#visitor-search').fastLiveFilter('#visitor-thumbs');
}

function filterVisitorThumbs(position) {
    var firstPosition = position;
    var lastPosition;

    if(firstPosition<0 || firstPosition>(visitorJSON.length-1)) {
        return;
    }
    firstThumbIndex = firstPosition;

    var ul = document.getElementById("visitor-thumbs");
    var items = ul.getElementsByTagName("li");
    for(var i = 0; i<items.length; i++) {
        if(i>=firstPosition && i<=(firstPosition+5)) {
            items[i].style.display = "";
            lastPosition = i;
        } else {
            items[i].style.display = "none";
        }
    }

    if(firstPosition == 0) {
        $('#previous-visitors-thumbs').addClass('disabled');
    } else {
        $('#previous-visitors-thumbs').removeClass('disabled');
    }
    if(lastPosition == (visitorJSONJSON.length-1)) {
        $('#next-visitor-thumbs').addClass('disabled');
    } else {
        $('#next-visitor-thumbs').removeClass('disabled');
    }

    lastThumbIndex = lastPosition;
}

function previousVisitorThumbs() {
    if(searchText.length == 0) {
        filterVisitorThumbs(firstThumbIndex-6);
    } else {
        searchFilterPrevious()
    }
}

function nextVisitorThumbs() {
    if(searchText.length == 0) {
        filterVisitorThumbs(lastThumbIndex+1);
    } else {
        searchFilterNext();
    }
}

function selectItem(element) {
    if (selectedVisitorListItem != null) {
        selectedVisitorListItem.removeClass("active");
    }
    selectedVisitorListItem = $(element);
    selectedVisitorListItem.addClass("active");

    var selectedVisitorID = selectedVisitorListItem.attr('id');
    for(var i=0; i<visitorJSON.length; i++) {
        if(visitorJSON[i].id == selectedVisitorID) {
            $.cookie.write('currentVisitor', JSON.stringify(visitorJSON[i]));
            confirmVisitor();
        }
    }
}

function confirmVisitor() {
    window.location = "visitor-form.html";
}

function cancelForm() {
    bootbox.confirm("Are You Sure?", function(result) {
        if(result == true) {
            window.location = 'index.html';
        }
    });
}