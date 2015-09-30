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
                id: 'Symbol_1',
                type: 'rect',
                rect: ['-320', '-15','auto','auto','auto', 'auto']
            },
            {
                id: 'brand5',
                type: 'image',
                rect: ['24px', '14px','289px','43px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"brand.png",'0px','0px']
            }],
            symbolInstances: [
            {
                id: 'Symbol_1',
                symbolName: 'Symbol_1'
            }
            ]
        },
    states: {
        "Base State": {
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "width", '320px'],
                ["style", "height", '480px'],
                ["style", "overflow", 'hidden']
            ],
            "${_brand5}": [
                ["style", "top", '14px'],
                ["style", "height", '43px'],
                ["style", "left", '24px'],
                ["style", "width", '289px']
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
                    autoplay: 'autoplay',
                    rect: ['0px', '0px', '960px', '510px', 'auto', 'auto'],
                    source: ['video/37622100.mp4'],
                    preload: 'auto',
                    id: '_37622100',
                    loop: 'loop',
                    type: 'video',
                    tag: 'video'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '510px'],
                ["style", "width", '960px']
            ],
            "${__37622100}": [
                ["style", "height", '510px'],
                ["style", "top", '0px'],
                ["style", "left", '0px'],
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
