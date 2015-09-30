/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
var opts = {
    'gAudioPreloadPreference': 'auto',

    'gVideoPreloadPreference': 'auto'
};
var resources = [
];
var symbols = {
"stage": {
    version: "4.0.0",
    minimumCompatibleVersion: "4.0.0",
    build: "4.0.0.359",
    baseState: "Base State",
    scaleToFit: "width",
    centerStage: "horizontal",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: '_37622100',
                type: 'video',
                tag: 'video',
                rect: ['-322px', '0px','963px','480px','auto', 'auto'],
                autoplay: 'autoplay',
                loop: 'loop',
                source: ['video/37622100.mp4'],
                preload: 'auto'
            },
            {
                id: 'brand5',
                type: 'image',
                rect: ['15px', '12px','289px','43px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"brand.png",'0px','0px']
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "overflow", 'hidden'],
                ["style", "height", '480px'],
                ["style", "width", '320px']
            ],
            "${_brand5}": [
                ["style", "height", '43px'],
                ["style", "top", '12px'],
                ["style", "left", '15px'],
                ["style", "width", '289px']
            ],
            "${__37622100}": [
                ["style", "top", '0px'],
                ["style", "height", '480px'],
                ["style", "left", '-322px'],
                ["style", "width", '963px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"Symbol_1": {
    version: "4.0.0",
    minimumCompatibleVersion: "4.0.0",
    build: "4.0.0.359",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    preload: 'auto',
                    rect: ['0px', '0px', '960px', '510px', 'auto', 'auto'],
                    source: ['video/37622100.mp4'],
                    autoplay: 'autoplay',
                    id: '_37622100',
                    type: 'video',
                    loop: 'loop',
                    tag: 'video'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${__37622100}": [
                ["style", "top", '0px'],
                ["style", "height", '510px'],
                ["style", "left", '0px'],
                ["style", "width", '960px']
            ],
            "${symbolSelector}": [
                ["style", "height", '510px'],
                ["style", "width", '960px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-170573621");
