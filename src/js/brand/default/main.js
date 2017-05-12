var animHolder = document.getElementById("animContainer");

onRichload("revealIn");

var framesObj = {
    "duration" : 30,
    "frames" : [
        {
            "duration" : 2,
            "containers" : [
                {
                    "id" : "animContainer",
                    "element" : animHolder,
                    "class" : "frame-1"
                }
            ],
            "isEndFrame" : false
        },{
            "duration" : 2,
            "containers" : [
                {
                    "id" : "animContainer",
                    "element" : animHolder,
                    "class" : "frame-2"
                }
            ],
            "isEndFrame" : false
        },{
            "duration" : 0.6,
            "containers" : [
                {
                    "id" : "animContainer",
                    "element" : animHolder,
                    "class" : "frame-2"
                },{
                    "id" : "loading",
                    "element" : preLoader,
                    "class" : "transition",
                    'reset' : true
                }
            ],
            "isEndFrame" : false
        },{
            "duration" : 2.6,
            "containers" : [
                {
                    "id" : "animContainer",
                    "element" : animHolder,
                    "class" : "frame-3"
                },{
                    "id" : "loading",
                    "element" : preLoader,
                    "class" : "transition",
                    'reset' : false
                }
            ],
            "isEndFrame" : false
        },{
            "duration" : 3,
            "containers" : [
                {
                    "id" : "animContainer",
                    "element" : animHolder,
                    "class" : "frame-4"
                }
            ],
            "isEndFrame" : true
        }
    ]
}

frameAnimation(framesObj);
myFT.on("instantads", function(){
    var dynamicCT = myFT.instantAds.clickTag;
    myFT.applyClickTag(animHolder, 2, dynamicCT);
});