window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your HTML above 

    var form = document.getElementById("my-form");
   // var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");

    // Succecss and Error functions for after the form is submitted

    function success() {
        form.reset();
        status.classList.add('success');
        status.innerHTML = "Tak!";
    }
    function error(){
        status.classList.add('error'); 
        status.innerHTML = "Oops! There was a problem.";

    }
    // handle the form submissions event 

    form.addEventListener("submit", function (ev){
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending on AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 200){
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}



/* AJAX script to avoid the default FormSpree behavior */

    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)