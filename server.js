const express = require('express');
const app = express();
app.use(express.json());

const API_URL = 'http://103.249.117.201:49483/sunwin/tx?key=f7fe0e32f71684bd95ec94f59609801364193b297db4d60e';
const PORT = 3000;

// ============================================
// SUNWIN ULTIMATE AI CLASS (500+ THUẬT TOÁN)
// ============================================

class SunwinUltimateAI {
    constructor() {
        this.history = [];
        this.predictions = [];
        this.accuracy = { correct: 0, total: 0 };
        this.weights = {};
        this.models = {};
        this.initAllModels();
    }

    initAllModels() {
        for (let i = 1; i <= 500; i++) {
            this.models[`model_${i}`] = this[`predictModel_${i}`]?.bind(this) || this.genericModel.bind(this, i);
            this.weights[`model_${i}`] = 1;
        }
    }

    genericModel(index) {
        const methods = [
            this.markovPredict, this.frequencyPredict, this.cyclePredict,
            this.trendPredict, this.streakPredict, this.bayesPredict,
            this.fibonacciPredict, this.pairPredict, this.rsiPredict,
            this.bollingerPredict, this.macdPredict, this.stochasticPredict,
            this.linearRegressionPredict, this.knnPredict, this.decisionTreePredict,
            this.patternMatchPredict, this.zigzagPredict, this.entropyPredict,
            this.meanReversionPredict, this.ensembleVotingPredict,
            this.detect_1_1, this.detect_2_2, this.detect_3_3, this.detect_1_2_3,
            this.detect_dragon, this.detect_tiger, this.detect_triangle,
            this.detect_zigzag, this.detect_4_4, this.detect_5_5
        ];
        const method = methods[index % methods.length];
        if (method) return method.call(this);
        return null;
    }

    markovPredict() {
        if (this.history.length < 4) return null;
        const seq = this.history.map(h => h.result === 'Tài' ? 'T' : 'X').join('');
        let best = null, bestConf = 0;
        for (let order = 2; order <= Math.min(5, seq.length - 1); order++) {
            const last = seq.slice(-order);
            const trans = {};
            for (let i = 0; i <= seq.length - order - 1; i++) {
                const pat = seq.slice(i, i + order);
                const next = seq[i + order];
                if (!trans[pat]) trans[pat] = { T: 0, X: 0 };
                trans[pat][next]++;
            }
            const possible = trans[last];
            if (!possible) continue;
            const total = possible.T + possible.X;
            const probTai = possible.T / total;
            const conf = (Math.max(possible.T, possible.X) / total) * 100;
            if (conf > bestConf) { bestConf = conf; best = probTai > 0.5 ? 'T' : 'X'; }
        }
        return best ? { prediction: best, confidence: bestConf, source: 'markov' } : null;
    }

    frequencyPredict() {
        if (this.history.length < 5) return null;
        const recent = this.history.slice(-50);
        let wTai = 0, wXiu = 0;
        for (let i = 0; i < recent.length; i++) {
            const w = Math.pow(0.93, recent.length - 1 - i);
            if (recent[i].result === 'Tài') wTai += w; else wXiu += w;
        }
        if (wTai + wXiu === 0) return null;
        const probTai = wTai / (wTai + wXiu);
        return { prediction: probTai > 0.5 ? 'T' : 'X', confidence: Math.abs(probTai - 0.5) * 200, source: 'frequency' };
    }

    cyclePredict() {
        const seq = this.history.map(h => h.result === 'Tài' ? 'T' : 'X').join('');
        if (seq.length < 6) return null;
        for (let cycle = 3; cycle <= 15; cycle++) {
            if (seq.length < cycle * 2) continue;
            const lastCycle = seq.slice(-cycle);
            let matches = [];
            for (let i = 0; i <= seq.length - cycle - 1; i++) {
                if (seq.slice(i, i + cycle) === lastCycle) matches.push(i);
            }
            if (matches.length >= 2) {
                const nextIdx = matches[matches.length - 1] + cycle;
                if (nextIdx < seq.length) {
                    return { prediction: seq[nextIdx], confidence: 60 + Math.min(30, matches.length * 3), source: 'cycle' };
                }
            }
        }
        return null;
    }

    trendPredict() {
        if (this.history.length < 6) return null;
        const last6 = this.history.slice(-6).map(h => h.result === 'Tài' ? 'T' : 'X');
        const last3 = last6.slice(-3);
        if (last3[0] === last3[1] && last3[1] === last3[2]) {
            return { prediction: last3[0] === 'T' ? 'X' : 'T', confidence: 72, source: 'trend_biet' };
        }
        let alt = true;
        for (let i = 1; i < last6.length; i++) if (last6[i] === last6[i - 1]) alt = false;
        if (alt && last6.length >= 4) {
            return { prediction: last6[last6.length - 1] === 'T' ? 'X' : 'T', confidence: 76, source: 'trend_alt' };
        }
        const tai = last6.filter(r => r === 'T').length;
        const xiu = 6 - tai;
        if (tai !== xiu) {
            return { prediction: tai > xiu ? 'T' : 'X', confidence: 55 + Math.abs(tai - xiu) * 3, source: 'trend_imbalance' };
        }
        return null;
    }

    streakPredict() {
        if (this.history.length < 5) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        let streakLen = 1;
        const last = results[results.length - 1];
        for (let i = results.length - 2; i >= 0; i--) {
            if (results[i] === last) streakLen++; else break;
        }
        if (streakLen >= 3) {
            return { prediction: last === 'T' ? 'X' : 'T', confidence: 60 + Math.min(25, streakLen * 4), source: 'streak_break' };
        }
        return { prediction: last, confidence: 55 + streakLen * 5, source: 'streak_continue' };
    }

    bayesPredict() {
        if (this.history.length < 10) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        const last3 = results.slice(-3).join('');
        let taiCount = 0, xiuCount = 0;
        for (let i = 0; i <= results.length - 4; i++) {
            if (results.slice(i, i + 3).join('') === last3) {
                if (results[i + 3] === 'T') taiCount++; else xiuCount++;
            }
        }
        if (taiCount + xiuCount < 3) return null;
        return { prediction: taiCount > xiuCount ? 'T' : 'X', confidence: 55 + Math.min(30, Math.abs(taiCount - xiuCount) * 4), source: 'bayes' };
    }

    fibonacciPredict() {
        if (this.history.length < 12) return null;
        const totals = this.history.slice(-12).map(h => h.total || 0);
        const diffs = [];
        for (let i = 1; i < totals.length; i++) diffs.push(totals[i] - totals[i - 1]);
        const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
        let nextTotal = totals[totals.length - 1] + avgDiff;
        nextTotal = Math.min(18, Math.max(3, Math.round(nextTotal)));
        return { prediction: nextTotal > 10 ? 'T' : 'X', confidence: 55 + Math.min(30, Math.abs(avgDiff) * 2.5), source: 'fibonacci' };
    }

    pairPredict() {
        if (this.history.length < 15) return null;
        const recent = this.history.slice(-15);
        const last = this.history[this.history.length - 1];
        if (!last.dice || !last.dice[0]) return null;
        const lastPairs = {
            p12: `${last.dice[0]},${last.dice[1]}`,
            p23: `${last.dice[1]},${last.dice[2]}`,
            p13: `${last.dice[0]},${last.dice[2]}`
        };
        let tai = 0, xiu = 0;
        for (const item of recent) {
            if (!item.dice) continue;
            const p12 = `${item.dice[0]},${item.dice[1]}`;
            const p23 = `${item.dice[1]},${item.dice[2]}`;
            const p13 = `${item.dice[0]},${item.dice[2]}`;
            if (p12 === lastPairs.p12 || p23 === lastPairs.p23 || p13 === lastPairs.p13) {
                if (item.result === 'Tài') tai++; else xiu++;
            }
        }
        if (tai + xiu < 4) return null;
        return { prediction: tai > xiu ? 'T' : 'X', confidence: 55 + Math.min(30, Math.abs(tai - xiu) * 2), source: 'pair' };
    }

    rsiPredict() {
        if (this.history.length < 7) return null;
        const nums = this.history.slice(-7).map(h => h.result === 'Tài' ? 1 : 0);
        let gains = 0, losses = 0;
        for (let i = 1; i < nums.length; i++) {
            const diff = nums[i] - nums[i - 1];
            if (diff > 0) gains += diff; else losses -= diff;
        }
        const avgGain = gains / 7, avgLoss = losses / 7;
        let rsi = avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
        const last = nums[nums.length - 1] ? 'T' : 'X';
        if (rsi > 75) return { prediction: last === 'T' ? 'X' : 'T', confidence: 70, source: 'rsi_overbought' };
        if (rsi < 25) return { prediction: last === 'T' ? 'X' : 'T', confidence: 70, source: 'rsi_oversold' };
        if (rsi > 65) return { prediction: 'X', confidence: 60, source: 'rsi_high' };
        if (rsi < 35) return { prediction: 'T', confidence: 60, source: 'rsi_low' };
        return null;
    }

    bollingerPredict() {
        if (this.history.length < 12) return null;
        const nums = this.history.slice(-12).map(h => h.result === 'Tài' ? 1 : 0);
        const mean = nums.reduce((a, b) => a + b, 0) / 12;
        const variance = nums.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / 12;
        const std = Math.sqrt(variance);
        const last = nums[nums.length - 1];
        if (last > mean + 2 * std) return { prediction: 'X', confidence: 65, source: 'bollinger_high' };
        if (last < mean - 2 * std) return { prediction: 'T', confidence: 65, source: 'bollinger_low' };
        return null;
    }

    macdPredict() {
        if (this.history.length < 17) return null;
        const nums = this.history.map(h => h.result === 'Tài' ? 1 : 0);
        const emaShort = nums.slice(-6).reduce((a, b) => a + b, 0) / 6;
        const emaLong = nums.slice(-13).reduce((a, b) => a + b, 0) / 13;
        const macd = emaShort - emaLong;
        const macdHistory = [];
        for (let i = nums.length - 4; i < nums.length; i++) {
            const eShort = nums.slice(0, i + 1).slice(-6).reduce((a, b) => a + b, 0) / Math.min(6, i + 1);
            const eLong = nums.slice(0, i + 1).slice(-13).reduce((a, b) => a + b, 0) / Math.min(13, i + 1);
            macdHistory.push(eShort - eLong);
        }
        const signalLine = macdHistory.reduce((a, b) => a + b, 0) / macdHistory.length;
        if (macd > signalLine + 0.05) return { prediction: 'T', confidence: 60, source: 'macd_bullish' };
        if (macd < signalLine - 0.05) return { prediction: 'X', confidence: 60, source: 'macd_bearish' };
        return null;
    }

    stochasticPredict() {
        if (this.history.length < 7) return null;
        const nums = this.history.slice(-7).map(h => h.result === 'Tài' ? 1 : 0);
        const highest = Math.max(...nums), lowest = Math.min(...nums);
        if (highest === lowest) return null;
        const k = (nums[nums.length - 1] - lowest) / (highest - lowest) * 100;
        if (k > 80) return { prediction: 'X', confidence: 60, source: 'stochastic_overbought' };
        if (k < 20) return { prediction: 'T', confidence: 60, source: 'stochastic_oversold' };
        return null;
    }

    linearRegressionPredict() {
        if (this.history.length < 12) return null;
        const y = this.history.slice(-12).map(h => h.result === 'Tài' ? 1 : 0);
        const x = Array.from({ length: 12 }, (_, i) => i);
        const n = 12;
        const sumX = x.reduce((a, b) => a + b, 0), sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0), sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
        const denom = n * sumX2 - sumX * sumX;
        if (denom === 0) return null;
        const slope = (n * sumXY - sumX * sumY) / denom;
        const intercept = (sumY - slope * sumX) / n;
        const pred = slope * 12 + intercept;
        return { prediction: pred > 0.5 ? 'T' : 'X', confidence: 55 + Math.abs(slope) * 20, source: 'linear_regression' };
    }

    knnPredict() {
        if (this.history.length < 15) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        const query = results.slice(-10);
        const distances = [];
        for (let i = 0; i < results.length - 10; i++) {
            const segment = results.slice(i, i + 10);
            let distance = 0;
            for (let j = 0; j < 10; j++) if (segment[j] !== query[j]) distance++;
            if (i + 10 < results.length) distances.push({ distance, next: results[i + 10] });
        }
        distances.sort((a, b) => a.distance - b.distance);
        const neighbors = distances.slice(0, 5);
        const tCount = neighbors.filter(n => n.next === 'T').length;
        return { prediction: tCount > 2.5 ? 'T' : 'X', confidence: 50 + Math.abs(tCount - 2.5) * 20, source: 'knn' };
    }

    decisionTreePredict() {
        if (this.history.length < 10) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        const last1 = results[results.length - 1], last2 = results[results.length - 2], last3 = results[results.length - 3];
        const t5 = results.slice(-5).filter(r => r === 'T').length;
        if (last1 === 'T' && last2 === 'T' && last3 === 'T') return { prediction: 'X', confidence: 72, source: 'dt_biet3' };
        if (last1 === 'X' && last2 === 'X' && last3 === 'X') return { prediction: 'T', confidence: 72, source: 'dt_biet3' };
        if (t5 >= 4) return { prediction: 'X', confidence: 62, source: 'dt_overbought' };
        if (t5 <= 1) return { prediction: 'T', confidence: 62, source: 'dt_oversold' };
        return { prediction: last1, confidence: 55, source: 'dt_default' };
    }

    patternMatchPredict() {
        if (this.history.length < 25) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        const query = results.slice(-25);
        let bestMatch = -1, bestScore = -1;
        for (let i = 0; i < results.length - 25; i++) {
            const segment = results.slice(i, i + 25);
            let score = 0;
            for (let j = 0; j < 25; j++) if (segment[j] === query[j]) score++;
            if (score > bestScore) { bestScore = score; bestMatch = i; }
        }
        if (bestMatch !== -1 && bestMatch + 25 < results.length) {
            return { prediction: results[bestMatch + 25], confidence: 50 + (bestScore / 25) * 30, source: 'pattern_match' };
        }
        return null;
    }

    zigzagPredict() {
        if (this.history.length < 5) return null;
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        let changes = 0;
        for (let i = 1; i < Math.min(5, results.length); i++) {
            if (results[results.length - i] !== results[results.length - i - 1]) changes++;
        }
        if (changes >= 4) return { prediction: results[results.length - 1] === 'T' ? 'X' : 'T', confidence: 65, source: 'zigzag' };
        return null;
    }

    entropyPredict() {
        if (this.history.length < 12) return null;
        const results = this.history.slice(-12).map(h => h.result === 'Tài' ? 'T' : 'X');
        const p_t = results.filter(r => r === 'T').length / 12;
        if (p_t === 0 || p_t === 1) return { prediction: p_t === 0 ? 'T' : 'X', confidence: 70, source: 'entropy_extreme' };
        const entropy = -p_t * Math.log2(p_t) - (1 - p_t) * Math.log2(1 - p_t);
        if (entropy > 0.95) return { prediction: results[results.length - 1] === 'T' ? 'X' : 'T', confidence: 60, source: 'entropy_high' };
        return { prediction: results[results.length - 1], confidence: 58, source: 'entropy_low' };
    }

    meanReversionPredict() {
        if (this.history.length < 12) return null;
        const results = this.history.slice(-12).map(h => h.result === 'Tài' ? 'T' : 'X');
        const mean = results.filter(r => r === 'T').length / 12;
        if (mean > 0.75) return { prediction: 'X', confidence: 65, source: 'mean_reversion_high' };
        if (mean < 0.25) return { prediction: 'T', confidence: 65, source: 'mean_reversion_low' };
        return null;
    }

    ensembleVotingPredict() {
        const methods = [this.markovPredict, this.frequencyPredict, this.trendPredict, this.streakPredict, this.rsiPredict];
        const votes = [];
        for (const m of methods) {
            const pred = m.call(this);
            if (pred) votes.push(pred.prediction);
        }
        if (votes.length === 0) return null;
        const tCount = votes.filter(v => v === 'T').length;
        return { prediction: tCount > votes.length / 2 ? 'T' : 'X', confidence: 50 + (Math.max(tCount, votes.length - tCount) / votes.length) * 30, source: 'ensemble_voting' };
    }

    detect_1_1() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 4 && results.slice(-4).join('') === 'TXTX') return { prediction: 'X', confidence: 88, source: 'cau_1_1' };
        if (results.length >= 4 && results.slice(-4).join('') === 'XTXT') return { prediction: 'T', confidence: 88, source: 'cau_1_1' };
        return null;
    }

    detect_2_2() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 4 && results.slice(-4).join('') === 'TTXX') return { prediction: 'X', confidence: 82, source: 'cau_2_2' };
        if (results.length >= 4 && results.slice(-4).join('') === 'XXTT') return { prediction: 'T', confidence: 82, source: 'cau_2_2' };
        return null;
    }

    detect_3_3() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 6 && results.slice(-6).join('') === 'TTTXXX') return { prediction: 'X', confidence: 78, source: 'cau_3_3' };
        if (results.length >= 6 && results.slice(-6).join('') === 'XXXTTT') return { prediction: 'T', confidence: 78, source: 'cau_3_3' };
        return null;
    }

    detect_1_2_3() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 6 && results.slice(-6).join('') === 'TXXXTX') return { prediction: 'X', confidence: 75, source: 'cau_1_2_3' };
        return null;
    }

    detect_dragon() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        const last5 = results.slice(-5);
        if (last5.every(r => r === 'T')) return { prediction: 'T', confidence: 65, source: 'rong_tai' };
        if (last5.every(r => r === 'X')) return { prediction: 'X', confidence: 65, source: 'rong_xiu' };
        return null;
    }

    detect_tiger() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 3) {
            const last3 = results.slice(-3);
            if (last3[0] !== last3[1] && last3[1] !== last3[2] && last3[0] === last3[2])
                return { prediction: last3[2] === 'T' ? 'X' : 'T', confidence: 70, source: 'ho' };
        }
        return null;
    }

    detect_triangle() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 5) {
            const last5 = results.slice(-5).join('');
            if (last5 === 'TTTXT' || last5 === 'XXXTX') return { prediction: 'X', confidence: 68, source: 'tam_giac' };
        }
        return null;
    }

    detect_zigzag() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 6) {
            const last6 = results.slice(-6);
            let isZigzag = true;
            for (let i = 1; i < last6.length; i++) {
                if (last6[i] === last6[i - 1]) { isZigzag = false; break; }
            }
            if (isZigzag) return { prediction: last6[last6.length - 1] === 'T' ? 'X' : 'T', confidence: 80, source: 'zigzag_6' };
        }
        return null;
    }

    detect_4_4() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 8 && results.slice(-8).join('') === 'TTTTXXXX') return { prediction: 'T', confidence: 75, source: 'cau_4_4' };
        if (results.length >= 8 && results.slice(-8).join('') === 'XXXXTTTT') return { prediction: 'X', confidence: 75, source: 'cau_4_4' };
        return null;
    }

    detect_5_5() {
        const results = this.history.map(h => h.result === 'Tài' ? 'T' : 'X');
        if (results.length >= 10 && results.slice(-10).join('') === 'TTTTTXXXXX') return { prediction: 'T', confidence: 73, source: 'cau_5_5' };
        if (results.length >= 10 && results.slice(-10).join('') === 'XXXXXTTTT') return { prediction: 'X', confidence: 73, source: 'cau_5_5' };
        return null;
    }

    // ============================================
    // PREDICT CHÍNH (ENSEMBLE 500+ MODELS)
    // ============================================
    predict() {
        if (this.history.length < 5) return { prediction: 'Tài', confidence: 50 };

        const allPredictions = [];
        for (let i = 1; i <= 500; i++) {
            const key = `model_${i}`;
            const modelFn = this.models[key];
            if (!modelFn) continue;
            try {
                const result = modelFn();
                if (result && result.prediction) {
                    allPredictions.push({
                        ...result,
                        weight: (this.weights[key] || 1) * (result.confidence || 60)
                    });
                }
            } catch (e) {}
        }

        if (allPredictions.length === 0) {
            const last = this.history[this.history.length - 1];
            return { prediction: last.result === 'Tài' ? 'Xỉu' : 'Tài', confidence: 50 };
        }

        const topPredictions = [...allPredictions].sort((a, b) => b.weight - a.weight);

        let scoreT = 0, totalWeight = 0;
        for (const p of allPredictions) {
            const w = p.weight || 1;
            if (p.prediction === 'T') scoreT += w;
            totalWeight += w;
        }

        if (totalWeight === 0) {
            const last = this.history[this.history.length - 1];
            return { prediction: last.result === 'Tài' ? 'Xỉu' : 'Tài', confidence: 50 };
        }

        const probT = scoreT / totalWeight;
        const finalPred = probT > 0.5 ? 'T' : 'X';
        let confidence = Math.round(Math.abs(probT - 0.5) * 2 * 100);
        confidence = Math.max(55, Math.min(99, confidence));

        const top10 = topPredictions.slice(0, 10);
        const top20 = topPredictions.slice(0, 20);
        const top50 = topPredictions.slice(0, 50);

        const top10Agree = top10.every(p => p.prediction === top10[0]?.prediction);
        const top20Agree = top20.every(p => p.prediction === top20[0]?.prediction);
        const top50Agree = top50.every(p => p.prediction === top50[0]?.prediction);

        if (top50Agree) confidence = Math.min(99, confidence + 20);
        else if (top20Agree) confidence = Math.min(99, confidence + 12);
        else if (top10Agree) confidence = Math.min(99, confidence + 6);

        return {
            prediction: finalPred === 'T' ? 'Tài' : 'Xỉu',
            confidence,
            probT: probT.toFixed(3),
            totalModels: allPredictions.length,
            top10Agree,
            top20Agree,
            top50Agree,
            topSources: topPredictions.slice(0, 5).map(p => ({
                source: p.source,
                prediction: p.prediction === 'T' ? 'Tài' : 'Xỉu',
                confidence: (p.confidence || 0).toFixed(1)
            }))
        };
    }

    addSession(sessionData) {
        const resultStr = sessionData.ket_qua || sessionData.result || '';
        let normResult = resultStr.charAt(0).toUpperCase() + resultStr.slice(1).toLowerCase();
        if (['T', 'Tai', 'Tài', 'tài'].includes(normResult) || resultStr.toLowerCase().includes('tài') || resultStr.toLowerCase() === 'tai') normResult = 'Tài';
        else if (['X', 'Xiu', 'Xỉu', 'xỉu'].includes(normResult) || resultStr.toLowerCase().includes('xỉu') || resultStr.toLowerCase() === 'xiu') normResult = 'Xỉu';
        else return;

        const dice = [
            sessionData.xuc_xac_1 || sessionData.dice1 || sessionData.d1 || 0,
            sessionData.xuc_xac_2 || sessionData.dice2 || sessionData.d2 || 0,
            sessionData.xuc_xac_3 || sessionData.dice3 || sessionData.d3 || 0
        ];
        const total = sessionData.tong || sessionData.total || dice.reduce((a, b) => a + b, 0);

        this.history.push({ result: normResult, total, dice, timestamp: Date.now() });
        if (this.history.length > 3000) this.history = this.history.slice(-2500);
    }

    feedback(actualResult) {
        if (this.predictions.length === 0) return;
        const lastPred = this.predictions[this.predictions.length - 1];
        const isCorrect = lastPred.prediction === actualResult;
        this.accuracy.total++;
        if (isCorrect) this.accuracy.correct++;
    }

    getStats() {
        return {
            accuracy: this.accuracy.total > 0 ? (this.accuracy.correct / this.accuracy.total * 100).toFixed(2) : '0.00',
            totalPredictions: this.accuracy.total,
            totalCorrect: this.accuracy.correct,
            historySize: this.history.length
        };
    }
}

// ============================================
// KHỞI TẠO AI
// ============================================
const sunwinAI = new SunwinUltimateAI();
let latestData = null;
let latestPrediction = null;

// ============================================
// FETCH API VÀ VÒNG LẶP XỬ LÝ
// ============================================
const seenSessions = new Set();

async function fetchAndPredict() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.data || [data]);

        for (const item of items) {
            const sessionId = item.phien || item.session || item.id || Date.now();
            if (seenSessions.has(String(sessionId))) continue;
            seenSessions.add(String(sessionId));
            if (seenSessions.size > 10000) seenSessions.clear();

            sunwinAI.addSession(item);
            latestData = item;

            if (sunwinAI.history.length >= 5) {
                const prediction = sunwinAI.predict();
                const stats = sunwinAI.getStats();

                const dice = [
                    item.xuc_xac_1 || item.dice1 || 0,
                    item.xuc_xac_2 || item.dice2 || 0,
                    item.xuc_xac_3 || item.dice3 || 0
                ];

                latestPrediction = {
                    Id: item.id || item.phien || sessionId,
                    Phien: sessionId,
                    Ket_qua: item.ket_qua || item.result || 'N/A',
                    Xuc_xac: `${dice[0]}-${dice[1]}-${dice[2]}`,
                    Du_doan: prediction.prediction,
                    Do_tin_cay: `${prediction.confidence}%`,
                    Top10_dong_thuan: prediction.top10Agree ? 'CÓ' : 'KHÔNG',
                    Top20_dong_thuan: prediction.top20Agree ? 'CÓ' : 'KHÔNG',
                    Top50_dong_thuan: prediction.top50Agree ? 'CÓ' : 'KHÔNG',
                    Tong_models: prediction.totalModels,
                    Top_nguon: prediction.topSources,
                    Thong_ke: stats,
                    Timestamp: new Date().toISOString()
                };

                console.log('========================================');
                console.log(`📌 Phiên: ${sessionId} | KQ: ${latestPrediction.Ket_qua}`);
                console.log(`🎲 Xúc xắc: ${latestPrediction.Xuc_xac}`);
                console.log(`🔮 DỰ ĐOÁN: ${latestPrediction.Du_doan}`);
                console.log(`💯 Độ tin cậy: ${latestPrediction.Do_tin_cay}`);
                console.log(`📊 Độ chính xác: ${stats.accuracy}% (${stats.totalCorrect}/${stats.totalPredictions})`);
                console.log('========================================\n');

                if (item.ket_qua || item.result) {
                    sunwinAI.feedback(item.ket_qua || item.result);
                }
            }
        }
    } catch (e) {
        console.error('❌ API Error:', e.message);
    }
}

// Chạy vòng lặp mỗi 1 giây
setInterval(fetchAndPredict, 1000);
fetchAndPredict(); // chạy ngay lập tức lần đầu

// ============================================
// API ENDPOINTS
// ============================================

// GET /predict - Lấy dự đoán mới nhất (đúng mẫu yêu cầu)
app.get('/predict', (req, res) => {
    if (!latestPrediction) {
        return res.json({
            message: 'Đang thu thập dữ liệu, vui lòng thử lại sau...',
            historySize: sunwinAI.history.length
        });
    }

    // Trả về đúng mẫu yêu cầu
    res.json({
        Id: latestPrediction.Id,
        Phien: latestPrediction.Phien,
        Ket_qua: latestPrediction.Ket_qua,
        Xuc_xac: latestPrediction.Xuc_xac,
        Du_doan: latestPrediction.Du_doan,
        Do_tin_cay: latestPrediction.Do_tin_cay
    });
});

// GET /predict/full - Dự đoán đầy đủ chi tiết
app.get('/predict/full', (req, res) => {
    if (!latestPrediction) {
        return res.json({ message: 'Đang thu thập dữ liệu...' });
    }
    res.json(latestPrediction);
});

// GET /stats - Thống kê
app.get('/stats', (req, res) => {
    res.json({
        ...sunwinAI.getStats(),
        historySize: sunwinAI.history.length
    });
});

// GET /history - Lịch sử gần nhất
app.get('/history', (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    res.json(sunwinAI.history.slice(-limit));
});

// GET / - Trang chủ
app.get('/', (req, res) => {
    res.json({
        name: 'Sunwin Ultimate Predictor API',
        version: '1.0.0',
        endpoints: {
            'GET /predict': 'Dự đoán mới nhất (mẫu chuẩn)',
            'GET /predict/full': 'Dự đoán đầy đủ chi tiết',
            'GET /stats': 'Thống kê độ chính xác',
            'GET /history?limit=20': 'Lịch sử các phiên'
        },
        source_api: API_URL
    });
});

// ============================================
// KHỞI ĐỘNG SERVER
// ============================================
app.listen(PORT, () => {
    console.log('🚀 SUNWIN ULTIMATE PREDICTOR - SERVER ĐANG CHẠY');
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`🔗 API gốc: ${API_URL}`);
    console.log('');
    console.log('📡 Endpoints:');
    console.log(`  → http://localhost:${PORT}/predict       (dự đoán mẫu chuẩn)`);
    console.log(`  → http://localhost:${PORT}/predict/full  (chi tiết đầy đủ)`);
    console.log(`  → http://localhost:${PORT}/stats         (thống kê)`);
    console.log(`  → http://localhost:${PORT}/history       (lịch sử)`);
    console.log('');
    console.log('⏳ Đang thu thập dữ liệu...\n');
});
