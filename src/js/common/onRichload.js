var preLoader;

function onRichload(animName){

    var parentObj = window.parent;
    if(parentObj){
        
        var parentWindow = window.parent.document;
        var animCss = document.getElementById("revealCss");
        if(animCss){
            var animCssText = animCss.innerHTML;
            var head = parentWindow.head;
            var link = parentWindow.createElement('style');
            link.innerHTML = animCssText;

            //console.log(animCssText);

            head.appendChild(link);
        }
        
        preLoader = parentWindow.getElementById('loading');
        
    }
    
    if(!preLoader){
        window.addEventListener("DOMContentLoaded", function(){
            preLoader = document.getElementById('loading');
            window.setTimeout(function(){
                preLoader.classList.add(animName);
            }, 1);
        }, false);
    }else{
        window.setTimeout(function(){
            preLoader.classList.add(animName);
        }, 1);
    }
    
    
    
    
}