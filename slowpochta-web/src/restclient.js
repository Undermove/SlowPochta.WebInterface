// export const url = "https://localhost:5003/";
export const url = "https://slowpochta.ru:9080/";

export function GetMethod(callbackOnSuccess, route, needAnswer, callbackOnError){
    var xhr = new XMLHttpRequest();
    xhr.open("get", url+route, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            if(needAnswer){
                callbackOnSuccess(JSON.parse(xhr.responseText));
            }
            else
            {
                callbackOnSuccess();
            }
        }
        else
        {
            callbackOnError(xhr.status + " " + xhr.responseText);
        }
    };
    xhr.send();
}

export function PostMethod(callbackOnSuccess, route, data, needAnswer, callbackOnError){
    var xhr = new XMLHttpRequest();
         
    xhr.open("post", url+route, true);
    xhr.setRequestHeader("Content-type", "application/json");    
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            if(needAnswer){
                callbackOnSuccess(JSON.parse(xhr.responseText));
            }
            else
            {
                callbackOnSuccess();
            }
        }
        else
        {
            callbackOnError(xhr.status + " " + xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}

export function PostMultipartMethod(callbackOnSuccess, route, data, needAnswer){
    var xhr = new XMLHttpRequest();
         
    xhr.open("post", url+route, true);
    //xhr.setRequestHeader("Content-type", "multipart/form-data");    
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            if(needAnswer){
                callbackOnSuccess(JSON.parse(xhr.responseText));
            }
            else
            {
                callbackOnSuccess();
            }
        }
    };
    xhr.send(data);
}

export function PutMultipartMethod(callbackOnSuccess, route, data, needAnswer, callbackOnError){
    var xhr = new XMLHttpRequest();
         
    xhr.open("put", url+route, true);
    //xhr.setRequestHeader("Content-type", "multipart/form-data");    
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            if(needAnswer){
                callbackOnSuccess(JSON.parse(xhr.responseText));
            }
            else
            {
                callbackOnSuccess();
            }
        }
        else
        {
            callbackOnError(xhr.status + " " + xhr.responseText);
        }
    };
    xhr.send(data);
}

export function PutMethod(callbackOnSuccess, route, data, needAnswer, callbackOnError){
    var xhr = new XMLHttpRequest();
         
    xhr.open("put", url+route, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            if(needAnswer){
                callbackOnSuccess(JSON.parse(xhr.responseText));
            }
            else
            {
                callbackOnSuccess();
            }
        }
        else
        {
            callbackOnError(xhr.status + " " + xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(data));
}

export function DeleteMethod(callbackOnSuccess, route, callbackOnError){
    var xhr = new XMLHttpRequest();
    xhr.open("delete", url+route, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "bearer "+sessionStorage.getItem("ttc.token"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            callbackOnSuccess(JSON.parse(xhr.responseText));
        }
        else
        {
            callbackOnError(xhr.status + " " + xhr.responseText);
        }
    };
    xhr.send();
}
