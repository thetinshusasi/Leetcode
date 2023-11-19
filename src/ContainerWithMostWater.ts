function maxArea(height: number[]): number {
    if (!height || height.length < 2) return 0
    let maxVol = 0;
    let firstPtr = 0;
    let lastPtr = height.length - 1;

    while (firstPtr < lastPtr) {
        const diff = lastPtr - firstPtr;

        const minHeight = height[firstPtr] >= height[lastPtr] ? height[lastPtr] : height[firstPtr]
        const updateMaxVol = minHeight * diff

        if (maxVol < updateMaxVol) {
            maxVol = updateMaxVol;
        }
        if (height[firstPtr] >= height[lastPtr]) {
            lastPtr--;
        }
        else {
            firstPtr++;
        }
    }

    return maxVol;

};
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
console.log(maxArea([1, 1]))
console.log(maxArea([4, 3, 2, 1, 4]))
console.log(maxArea([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(maxArea([5, 5, 5, 5, 5]))
console.log(maxArea([1, 2, 3, 4, 5]))