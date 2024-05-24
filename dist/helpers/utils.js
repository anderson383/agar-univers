/* jslint node: true */
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomColor = exports.findIndex = exports.uniformPosition = exports.randomPosition = exports.randomInRange = exports.getDistance = exports.log = exports.massToRadius = exports.validNick = void 0;
const SAT = __importStar(require("sat"));
const configuration_1 = require("../constants/configuration");
function validNick(nickname) {
    const regex = /^\w*$/;
    return regex.exec(nickname) !== null;
}
exports.validNick = validNick;
// determine mass from radius of circle
function massToRadius(mass) {
    return 4 + Math.sqrt(mass) * 6;
}
exports.massToRadius = massToRadius;
// overwrite Math.log function
exports.log = (() => {
    const log = Math.log;
    return (n, base) => {
        return log(n) / (base ? log(base) : 1);
    };
})();
// get the Euclidean distance between the edges of two shapes
function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) - p1.radius - p2.radius;
}
exports.getDistance = getDistance;
function randomInRange(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}
exports.randomInRange = randomInRange;
// generate a random position within the field of play
function randomPosition(keepAwayBorder) {
    return new SAT.Vector().copy({
        x: randomInRange(keepAwayBorder, configuration_1.config.gameWidth - keepAwayBorder),
        y: randomInRange(keepAwayBorder, configuration_1.config.gameHeight - keepAwayBorder)
    });
}
exports.randomPosition = randomPosition;
function uniformPosition(points, keepAwayBorder, candidates) {
    let bestCandidate;
    let bestCandidateDistSq = 0;
    let attemptsLeft = candidates || 10;
    if (points.length === 0) {
        return randomPosition(keepAwayBorder);
    }
    // Generate the candidates
    while (--attemptsLeft >= 0) {
        let minDistanceSq = Number.MAX_VALUE;
        const candidate = randomPosition(keepAwayBorder);
        points.forEach(selectClosest);
        if (minDistanceSq > bestCandidateDistSq) {
            bestCandidate = candidate;
            bestCandidateDistSq = minDistanceSq;
        }
        function selectClosest(point) {
            const distSq = candidate.clone().sub(point).len2();
            if (distSq < minDistanceSq) {
                minDistanceSq = distSq;
            }
        }
    }
    return bestCandidate;
}
exports.uniformPosition = uniformPosition;
function findIndex(arr, id) {
    let len = arr.length;
    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function randomColor() {
    const color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    const r = (parseInt(c[1], 16) - 32) > 0 ? (parseInt(c[1], 16) - 32) : 0;
    const g = (parseInt(c[2], 16) - 32) > 0 ? (parseInt(c[2], 16) - 32) : 0;
    const b = (parseInt(c[3], 16) - 32) > 0 ? (parseInt(c[3], 16) - 32) : 0;
    return {
        fill: color,
        border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    };
}
exports.randomColor = randomColor;
