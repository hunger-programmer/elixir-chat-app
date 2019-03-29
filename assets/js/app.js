// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

var channel = socket.channel('room:lobby', {}); // connect to chat "room"
channel.on('shout', function (payload) { // listen to the 'shout' event
    if (document.getElementById(payload.id) == null) { // check if message exists.

        console.log(payload)
        var name = payload.name || 'guest';    // get name from payload or default


        const $tdCol = $('<td><i class="material-icons prefix">local_drink</i></td>');

        const $tdName = $('<td>').text(name);
        const $tdMsg = $('<td>').text(payload.message);

        const $row = $('<tr>');

        $row.append($tdCol)
        $row.append($tdMsg)
        $row.append($tdName)

        $('#msg-list').prepend($row);                    // append to list
    }
});

channel.join() // join the channel.
    .receive("ok", resp => {
        console.log("Joined chat!", resp)
    })


function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
}

let instances;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    instances = M.Modal.init(elems, {});
});

var ul = document.getElementById('msg-list');        // list of messages.
var name = document.getElementById('name');          // name of message sender
var msg = document.getElementById('msg');            // message input field

$(() => {
    $('#send').on('click', (e) => {
        e.preventDefault();

        const message = stripScripts(msg.value)
        const name2 = stripScripts(name.value)


        if(!message || !name2){
            alert('Fill required fields')
            return;
        }

        channel.push('shout', { // send the message to the server
            name: message,     // get value of "name" of person sending the message
            message: name2// get message text (value) from msg input field.
        });
        msg.value = '';         // reset the message input field for next message.
    })
})

setTimeout(() => {
    $('#cover').fadeOut();
}, 2500)


$(() => {
    $('#submit').on('click', () => {

        $('#text_submit').show();

        $('#cover').show();

        $('.slow-hide').slideUp(500);

        setTimeout(() => {
            $('#cover').fadeOut();

            $('#price2').removeClass('hide');

        }, 5000);
    })


    $('body').on('dblclick', ()=>{
        $('#submit').show();
    })
})

// .receive('ok', resp => {
//   console.log('Joined successfully', resp);
// })
// .receive('error', resp => {
//   console.error('Unable to join', resp);
// });



// Or with jQuery
