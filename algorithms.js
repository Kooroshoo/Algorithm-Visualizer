/* scripts/algorithms.js */
const algorithms = {
    javascript: {
        bubble: `async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            await visualizeStep(arr, [j, j+1], []);
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                await visualizeStep(arr, [j, j+1], []);
            }
        }
        await visualizeStep(arr, [], [arr.length - i - 1]);
    }
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
}
bubbleSort(array);`,

        selection: `async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            await visualizeStep(arr, [j, minIndex], []);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            await visualizeStep(arr, [i, minIndex], []);
        }
        await visualizeStep(arr, [], [i]);
    }
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
}
selectionSort(array);`,

        insertion: `async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        await visualizeStep(arr, [i], []);
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            await visualizeStep(arr, [j, j+1], []);
            j--;
        }
        arr[j+1] = key;
        await visualizeStep(arr, [], [j+1]);
    }
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
}
insertionSort(array);`,

        binarySearch: `async function binarySearch(arr, target) {
    arr.sort((a, b) => a - b);
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        await visualizeStep(arr, [mid], []);
        if (arr[mid] === target) {
            await visualizeStep(arr, [mid], [mid]);
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    await visualizeStep(arr, [], []);
    return -1;
}
binarySearch(array, array[Math.floor(array.length/2)]);`,

        slidingWindow: `async function slidingWindow(arr, windowSize) {
    if (arr.length < windowSize) {
        return;
    }
    for (let i = 0; i <= arr.length - windowSize; i++) {
        const window = arr.slice(i, i + windowSize);
        await visualizeStep(arr, window.map((_, index) => i + index), []);
    }
}
slidingWindow(array, 3);`,

        twoPointers: `async function twoPointers(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        await visualizeStep(arr, [left, right], []);
        if (arr[left] + arr[right] === 100) {
            await visualizeStep(arr, [left, right], [left, right]);
            return [left, right];
        } else if (arr[left] + arr[right] < 100) {
            left++;
        } else {
            right--;
        }
    }
    await visualizeStep(arr, [], []);
    return [];
}
twoPointers(array);`
    },
    python: {
        bubble: `async def bubble_sort(arr):
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            await visualize_step(arr, [j, j+1], [])
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                await visualize_step(arr, [j, j+1], [])
        await visualize_step(arr, [], [len(arr) - i - 1])
    await visualize_step(arr, [], list(range(len(arr))))
await bubble_sort(array)`,

        selection: `async def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_index = i
        for j in range(i + 1, len(arr)):
            await visualize_step(arr, [j, min_index], [])
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
            await visualize_step(arr, [i, min_index], [])
        await visualize_step(arr, [], [i])
    await visualize_step(arr, [], list(range(len(arr))))
await selection_sort(array)`,

        insertion: `async def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        await visualize_step(arr, [i], [])
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            await visualize_step(arr, [j, j+1], [])
            j -= 1
        arr[j+1] = key
        await visualize_step(arr, [], [j+1])
    await visualize_step(arr, [], list(range(len(arr))))
await insertion_sort(array)`,

        binarySearch: `async def binary_search(arr, target):
    arr.sort()  # Sort the array before searching
    await visualize_step(arr, [], [])
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        await visualize_step(arr, [mid], [])
        if arr[mid] == target:
            await visualize_step(arr, [mid], [mid])
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    await visualize_step(arr, [], [])
    return -1
await binary_search(array, array[len(array)//2])`,

        slidingWindow: `async def sliding_window(arr, window_size):
    if len(arr) < window_size:
        return
    for i in range(len(arr) - window_size + 1):
        window = arr[i:i+window_size]
        await visualize_step(arr, list(range(i, i+window_size)), [])
await sliding_window(array, 3)`,

        twoPointers: `async def two_pointers(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        await visualize_step(arr, [left, right], [])
        if arr[left] + arr[right] == 100:
            await visualize_step(arr, [left, right], [left, right])
            return [left, right]
        elif arr[left] + arr[right] < 100:
            left += 1
        else:
            right -= 1
    await visualize_step(arr, [], [])
    return []
await two_pointers(array)`
    }
};