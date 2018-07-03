'use strict';

var jsonmlParse = require('./create-element'),
    w3 = require('./w3'),
    skins = require('./wave-skin');
    
    var waveSkin  = skins.WaveSkin;
    var waveColor = skins.WaveColor;

function insertSVGTemplate (index, parent, source, lane) {
    var node, first, e, color;

    // cleanup
    while (parent.childNodes.length) {
        parent.removeChild(parent.childNodes[0]);
    }

    for (first in waveSkin) { break; }

    e = waveSkin.default || waveSkin[first];
    color = '#0041c4';

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        e = waveSkin[source.config.skin];
        color = waveColor[source.config.skin];
    }

    if (index === 0) {
        lane.xs     = Number(e[3][1][2][1].width);
        lane.ys     = Number(e[3][1][2][1].height);
        lane.xlabel = Number(e[3][1][2][1].x);
        lane.ym     = Number(e[3][1][2][1].y);
    } else {
        e = ['svg',
            {
                id: 'svg',
                xmlns: w3.svg,
                'xmlns:xlink': w3.xlink,
                height: '0'
            },
            ['g',
                {
                    id: 'waves'
                },
                ['g', {id: 'lanes'}],
                ['g', {id: 'groups'}]
            ]
        ];
    }

    e[e.length - 1][1].id    = 'waves_'  + index;
    e[e.length - 1][2][1].id = 'lanes_'  + index;
    e[e.length - 1][3][1].id = 'groups_' + index;
    e[1].id = 'svgcontent_' + index;
    e[1].height = 0;

    node = jsonmlParse(e);
    parent.insertBefore(node, null);
    return color;
}

module.exports = insertSVGTemplate;

/* eslint-env browser */
