export const config = {
    "debugLevel": 1,
    "foodMass": 1,
    "fireFood": 15,
    "limitSplit": 16,
    "defaultPlayerMass": 10,
    "virus": {
        "defaultMass": {
            "from": 100,
            "to": 150
        },
        "splitMass": 200
    },
    "splitSlowdownStep": 0.5,
    "explodeSlowdownStep": 0.8,
    "pushAwayFactorStep": 0.005,
    "gameWidth": 5000,
    "gameHeight": 5000,
    "minViewZoom": 1000,
    "adminPass": "DEFAULT",
    "gameMass": 20000,
    "maxFood": 1000,
    "maxVirus": 50,
    "slowBase": 4.5,
    "logChat": 0,
    "networkUpdateFactor": 30,
    "maxHeartbeatInterval": 5000,
    "foodPlacementUniformityLevel": 1,
    "virusPlacementUniformityLevel": 3,
    "newPlayerInitialPosition": "farthest",
    "massLossRate": 1,
    "minMassLoss": 50,
    "mergeTimer": 15,
    "sqlinfo":{
        "connectionLimit": 100,
        "host": "DEFAULT",
        "user": "root",
        "password": "DEFAULT",
        "database": "DEFAULT",
        "debug": false
    }
    ,
    "profiling": false,
    "profilingSeries": true,
    "profilingDistribs": true,
    "profilingDistribCollectSec": 60,
    "profilingSerieMaxLength": 30
}
