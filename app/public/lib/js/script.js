var form = document.getElementById('form-login');

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    var obj = {
        email: document.getElementById('email').value,
        pw: document.getElementById('pw').value
    }
    sendReq('POST', '/', obj, function(res){
        console.log(res);
    });
});

function sendReq(method, url, data, callback){
    var req = new XMLHttpRequest();
    data = JSON.stringify(data);
    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    
    req.send(data);
    req.onreadystatechange = function(){
        if(req.readyState === 4){
            callback(req.responseText);
        }
    }
}