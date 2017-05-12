function frameAnimation(obj, time) {
    
    /* Frame object should follow these rules, errors in console
    
    duration : 30 (time in seconds)
    frames : [
        {
            duration : 2 (time in seconds),
            name : class name to control anim
        }
    ],
    containers : [
        elements of containers
    ]
    
    */
    
    var _frames = null;
    var _framesCount = 0;
    var _framesLength = 0;
    var _startTime = new Date();
    var _duration = 30000;
    var _frameTimeout = null;
    if(time){
        _startTime = (_startTime - time);
        console.log("Time already elapsed : " + (time / 1000));
    }
    
    var _playThroughtime = 0;
    
    var _stepCount = 0;
    
    
    var _originalClasses = [];
    
    
    if(obj.frames){
        if(obj.frames.length > 1){
            
            console.log("Starting frames");
            _frames = obj.frames;
            _framesLength = _frames.length;
            if(obj.duration){
                _duration = Number(obj.duration) * 1000;
                if(time){
                    _duration = _duration - time;
                    console.log("Time remaining : " + _duration);
                }
            }
            
            for(var i = 0; i < _framesLength; i++){
                
                var frame = _frames[i];
                var containers = frame.containers;
                _playThroughtime += Number(frame.duration);
                
                for(var ii = 0; ii < containers.length; ii++){
                    
                    var containerCheck = containers[ii];
                    
                    var addContainer = true;
                    
                    for(var iii = 0; iii < _originalClasses.length; iii++){
                        
                        var checkElem = _originalClasses[iii];
                        
                        if(checkElem.id == containerCheck.id){
                            addContainer = false;
                            break;
                        }
                        
                    }
                    
                    if(addContainer){
                        var containerObj = {
                            "id" : containerCheck.id,
                            "classes" : containerCheck.element.className
                        }
                        _originalClasses.push(containerObj);
                    }
                    
                }
                
                
            }
            
            _playThroughtime = _playThroughtime * 1000;
            
            console.log("Play through time : " + (_playThroughtime / 1000) + " seconds");
            console.log("Will loop : " + Math.floor(_duration / _playThroughtime) + " times");
            
            console.log(_originalClasses);
            
        }else{
            console.error("Not enough frames supplied for frame animation");
        }
    }else{
        console.error("No frame information passed, specify durations for all frames");
    }
    
    if(!_frames){
        
        return;
        
    }
    
    function startAnim(){
        
        _framesCount = 0;
        _frameTimeout = window.setTimeout(nextFrame, 1000);
    }
    
    function nextFrame(){
        
        
        var frame = _frames[_framesCount];
        var duration = frame.duration * 1000;
        var containers = frame.containers;
        var functions = frame.functions;
        
        if(functions){
            for(var i = 0; i < functions.length; i++){
                var runFunc = functions[i];
                runFunc();
            }
        }
        
        if(containers){
            for(var i = 0; i < containers.length; i++){

                var container = containers[i];
                var element = container.element;
                var id = container.id;
                var className = container.class;
                var shouldReset = container.reset;
                if(shouldReset !== false){
                    shouldReset = true;
                }

                for(var ii = 0; ii < _originalClasses.length; ii++){

                    if(_originalClasses[ii].id == id){
                        element.className = _originalClasses[ii].classes;
                        break;
                    }

                }

                if(className == "animate"){
                    console.log("animate");
                }

                if(shouldReset) {
                    void element.offsetWidth;
                }

                if(className == "gifReset"){
                    resetGif(element);
                }else{
                    element.classList.add(className);
                }

                element.classList.add("step-" + _stepCount);

            }
        }
        
        _frameTimeout = window.setTimeout(frameCount, duration);
        
    }
    
    
    
    function frameCount(){
        
        var frame = _frames[_framesCount];
        if(frame.isEndFrame){
            var nowTime = getLapsedTime();
            if((nowTime + _playThroughtime) > _duration){
                console.log("Time limit reached");
                return;
            }
        }
        
        _framesCount++;
        _stepCount++;
        if(_framesCount == _framesLength){
            _framesCount = 0;
            console.log("Loop");
        }
        console.log("Frame : " + (_framesCount + 1));
        
        nextFrame();
    }
    
    startAnim();
    
    //helpers
    
    function getLapsedTime(){
        
        var currentTime = new Date();
        var lapsedTime = currentTime - _startTime;
        
        console.log("time lapsed : ", (lapsedTime / 1000));
        
        return lapsedTime;
    }
    
    function resetGif(element){
        
        var elem = element;
        
        if(!elem.src){
            elem = element.getElementsByTagName("img")[0];
        }
        
        var src = elem.src;
        elem.src = "";
        _frameTimeout = window.setTimeout( function(){
            elem.src = src;
        }, 0);
    }
    
    frameAnimation.prototype.initGif = function(elem){
        resetGif(elem);
    }
    frameAnimation.prototype.setFrame = function(no){
        resetGif(elem);
        _framesCount = no;
        nextFrame();
    }
    frameAnimation.prototype.stop = function(){
        window.clearTimeout(_frameTimeout);
    }
}