/* jslint node: true */

'use strict';

import * as SAT from 'sat';
import {config} from '../constants/configuration';

export function validNick(nickname: string): boolean {
    const regex = /^\w*$/;
    return regex.exec(nickname) !== null;
}

// determine mass from radius of circle
export function massToRadius(mass: number): number {
    return 4 + Math.sqrt(mass) * 6;
}

// overwrite Math.log function
export const log = (() => {
    const log = Math.log;
    return (n: number, base?: number) => {
        return log(n) / (base ? log(base) : 1);
    };
})();

// get the Euclidean distance between the edges of two shapes
export function getDistance(p1: SAT.Vector, p2: SAT.Vector): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) - p1.radius - p2.radius;
}

export function randomInRange(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from)) + from;
}

// generate a random position within the field of play
export function randomPosition(keepAwayBorder: number): SAT.Vector {
    return new SAT.Vector().copy({
        x: randomInRange(keepAwayBorder, config.gameWidth - keepAwayBorder),
        y: randomInRange(keepAwayBorder, config.gameHeight - keepAwayBorder)
    });
}

export function uniformPosition(points: SAT.Vector[], keepAwayBorder: number, candidates?: number): SAT.Vector {
    let bestCandidate: SAT.Vector | undefined;
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

        
        function selectClosest(point: SAT.Vector) {
            const distSq = candidate.clone().sub(point).len2();
            if (distSq < minDistanceSq) {
                minDistanceSq = distSq;
            }
        }
    }

    return bestCandidate!;
}

export function findIndex(arr: { id: string }[], id: string): number {
    let len = arr.length;

    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }

    return -1;
}

export function randomColor(): { fill: string, border: string } {
    const color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    const r = (parseInt(c![1], 16) - 32) > 0 ? (parseInt(c![1], 16) - 32) : 0;
    const g = (parseInt(c![2], 16) - 32) > 0 ? (parseInt(c![2], 16) - 32) : 0;
    const b = (parseInt(c![3], 16) - 32) > 0 ? (parseInt(c![3], 16) - 32) : 0;

    return {
        fill: color,
        border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    };
}
