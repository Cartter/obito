const bar = async (min, max, size) => {
    size = size || 25;
    let line = "▬";
    let slider = "🔴";

    let current = min
    let total = max


    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
    //let bar = min > max ? [line.repeat(size / 2 * 2), (min / max) * 100] : [line.repeat(Math.round(size / 2 * (min / max))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (min / max)) + 1), min / max];
    if (!String(bar).includes(slider)) return `[${slider}${line.repeat(size - 1)}]`

    return bar[0]
}
module.exports = { bar }