var New_messages = {"messages": []}

$(document).ready(function(){
    $('#tabs').tabs();
    $('#timeline').accordion({collapsible: true, active: false, heightStyle: 'content'})
    $('#myMsgs').accordion({collapsible: true, active: false, heightStyle: 'content'})

    $.ajaxSetup({cache:false})
    $.getJSON('json/timeline.json', function(json){
        addMsgs(json.messages, '#timeline');
    });

    $.getJSON('json/myline.json', function(json){
        addMsgs(json.messages, '#myMsgs');
    });

    // For a visual animation of new messages
    window.setTimeout(function(){
        $.getJSON('json/update.json', function(json){
            New_messages = json;
            $('#new-messages').html("<p>Tienes " + New_messages.messages.length + " mensajes nuevos.</p>");
            $('#new-messages').slideDown(1000);
            $('#new-messages').click(function(){
                $('#new-messages').slideUp();
                addMsgs(New_messages.messages, '#timeline');
            });
        })}, 2000);
});

function formatMsg(msg){
    return "<div class='msg-header'> \
                <div class='info'> \
                    <img class='profile-image' src='" + msg.avatar + "'/> \
                    <h3 class='title'>" + msg.title + "</h3> \
                    <p class='more-info'>" + msg.author + " - " + msg.date + "</p> \
                </div> \
            </div> \
            <div> \
                <p>" + msg.content + "</p> \
            </div>"
}

function addMsgs(msgsArray, where) {
    msgsArray.forEach(function(msg){
        $(where).prepend(formatMsg(msg));
    });
    $(where).accordion('refresh')
}
