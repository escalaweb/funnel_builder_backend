// Determine whether the sentiment of text is positive
// Use a web service to determine the sentiment of $(selector).text();




[

    {
        path: "comments", model: "Comment",
    },
    {
        path: "artists", model: "Artists",
        populate: [
            {
                path: "albums", model: "Albums",
            },
            {
                path: "songs", model: "Songs",
                populate: [
                    {
                        path: "images", model: "Files",
                    }
                ]
            }
        ]
    },
]





{
    "funnel_id": "2lyrcjMkH02IXjJuLEhG",
    "name": "Nombre de embudo #1",
    "type": "byResult",
    "stages": [
        {
            "value": 0,
            "type": "funnelItem",
            "items": [
                {
                    "name": "Etapa 1",
                    "selected": false,
                    "typeFunnel": "none"
                }
            ]
        },
        {
            "value": 0,
            "type": "funnelItem",
            "items": [
                {
                    "name": "Etapa 2",
                    "selected": false,
                    "typeFunnel": "none"
                }
            ]
        },
        {
            "value": 0,
            "type": "funnelItem",
            "items": [
                {
                    "name": "Etapa 3",
                    "selected": false,
                    "typeFunnel": "none"
                }
            ]
        },
        {
            "value": 0,
            "type": "funnelItem",
            "items": [
                {
                    "name": "Etapa 4",
                    "selected": false,
                    "typeFunnel": "none"
                }
            ]
        },
        {
            "value": 0,
            "type": "objetiveFunnel",
            "items": [
                {
                    "name": "Venta",
                    "typeFunnel": "none"
                }
            ]
        }
    ],
    "relations": [
        {
            "porcent": 0
        },
        {
            "porcent": 0
        },
        {
            "porcent": 0
        },
        {
            "porcent": 0
        }
    ]
}


let aaaa = [
    {
      funnel_id: [Object],
      name: [Object],
      type: [Object],
      stages: [Object],
      relations: [Object],
      _id: 'aaaa'
    },
    {
      funnel_id: [Object],
      name: [Object],
      type: [Object],
      stages: [Object],
      relations: [Object],
      _id: 'aaaa'
    }
]

//Create array from another array with only unique values from aaaa


map [
  '89880af1-cbba-47ff-945c-5b531d10d17b',
  '0effd735-ec6c-4b81-b739-408e77ac5774'
]

//generate code SQL DELETE FROM FUNNELS WHERE ID HAVE 1 CHARACTER
