export const calcLength = (length, pipes) => {

    if (!length) {
        return [];
    }


    let delta = Infinity;
    let result = [];
    let startIndex = 0;
    let lastIndex = pipes.length - 1;
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        const newDelta = pipe.length - length;
        if (newDelta < 0) {
            if (pipe.length * 2 < length) {
                lastIndex = i - 1;
            }
        } else {
            result = [pipe.length]
            startIndex = i + 1;

            delta = newDelta;
        }

    }
    for (let i = startIndex; i <= lastIndex; i++) {
        const pipe = pipes[i];
        if (pipe.count > 1) {
            const newDelta = pipe.length * 2 - length;
            if (newDelta < delta && newDelta >= 0) {

                delta = newDelta;
                result = [pipe.length, pipe.length];
                if (newDelta === 0) {
                    return result
                }
            }
        }
        for (let j = i + 1; j < pipes.length; j++) {
            const newDelta = pipes[i].length + pipes[j].length - length;
            if (newDelta < 0) {
                break;
            }
            if (newDelta < delta) {

                delta = newDelta;
                result = [pipes[i].length, pipes[j].length];
                if (newDelta === 0) {
                    return result
                }
            }
        }

    }
    return result;
}

export const getPipes = (goods) => {
    const pipes = [];
    for (let good of goods) {
        if (good.pipeLength) {
            pipes.push({
                length: good.pipeLength,
                count: good.stock_quantity
            });
        }
    }
    return pipes.sort((a, b) => b.length - a.length);
};