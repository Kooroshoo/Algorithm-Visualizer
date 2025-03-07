/* scripts/algorithms.js */
const algorithms = {
    array: {
        javascript: {
            // Basic Array Operations
            insertion: `async function insertElement(arr, element, index) {
    // Shift elements to the right starting from the end of the array to the index
    for (let i = arr.length - 1; i > index; i--) {
        arr[i] = arr[i - 1];  // Shift element to the right
        await visualizeStep(arr, [i, i - 1], []); // Visualize shifting elements
    }
    
    // Insert the new element at the specified index
    arr[index] = element;
    await visualizeStep(arr, [index], []); // Visualize the insertion of the new element
    
    return arr;
}

insertElement(array, 42, 2);`,

            deletion: `async function deleteElement(arr, index) {
    // Shift elements left starting from the deletion index
    for (let i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
        await visualizeStep(arr, [i, i + 1], []);
    }
    // Set the last element to zero
    arr[arr.length - 1] = 0;
    await visualizeStep(arr, [arr.length - 1], []);
    return arr;
}

deleteElement(array, 2);`,

            linearSearch: `async function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        await visualizeStep(arr, [i], []);
        if (arr[i] === target) {
            await visualizeStep(arr, [i], [i]);
            return i;
        }
    }
    return -1;
}
linearSearch(array, array[10]);`,

            // Intermediate Array Operations
            reverse: `async function reverseArray(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        await visualizeStep(arr, [left, right], []);
        left++;
        right--;
    }
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
    return arr;
}
reverseArray(array);`,

            rotate: `async function rotateArray(arr, d) {
    let rotated = arr.slice(d).concat(arr.slice(0, d));
    await visualizeStep(rotated, [], []);
    return rotated;
}
rotateArray(array, 2);`,

            // Advanced Array Techniques
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
twoPointers(array);`,

            prefixSuffixSum: `async function prefixSuffixSum(arr) {
    let prefix = [];
    let suffix = [];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        prefix.push(sum);
        await visualizeStep(prefix, [i], []);
    }
    sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        sum += arr[i];
        suffix[i] = sum;
        await visualizeStep(suffix, [i], []);
    }
    return {prefix, suffix};
}
prefixSuffixSum(array);`,

            dpFibonacci: `async function dpFibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
        await visualizeStep(fib, [i - 1, i - 2, i], []);
    }
    return fib;
}
dpFibonacci(20);`,

            // Optimization & Advanced Sorting
            quickSort: `async function quickSort(arr) {
    async function partition(items, left, right) {
        let pivot = items[Math.floor((left + right) / 2)];
        let i = left, j = right;
        while (i <= j) {
            while (items[i] < pivot) { i++; }
            while (items[j] > pivot) { j--; }
            if (i <= j) {
                [items[i], items[j]] = [items[j], items[i]];
                await visualizeStep(items, [i, j], []);
                i++;
                j--;
            }
        }
        return i;
    }
    async function sort(items, left, right) {
        if (items.length > 1) {
            let index = await partition(items, left, right);
            if (left < index - 1) {
                await sort(items, left, index - 1);
            }
            if (index < right) {
                await sort(items, index, right);
            }
        }
    }
    await sort(arr, 0, arr.length - 1);
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
    return arr;
}
quickSort(array);`,

            mergeSort: `async function mergeSort(arr) {
    async function merge(left, right) {
        let result = [];
        while (left.length && right.length) {
            await visualizeStep(result.concat(left, right), [], []);
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        return result.concat(left).concat(right);
    }
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = await mergeSort(arr.slice(0, mid));
    let right = await mergeSort(arr.slice(mid));
    let merged = await merge(left, right);
    await visualizeStep(merged, [], Array.from({length: merged.length}, (_, i) => i));
    return merged;
}
mergeSort(array);`,

            heapSort: `async function heapSort(arr) {
    function heapify(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        await visualizeStep(arr, [0, i], []);
        heapify(arr, i, 0);
    }
    await visualizeStep(arr, [], Array.from({length: arr.length}, (_, i) => i));
    return arr;
}
heapSort(array);`,

            bubbleSort: `async function bubbleSort(arr) {
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

            selectionSort: `async function selectionSort(arr) {
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

            insertionSort: `async function insertionSort(arr) {
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

            // Advanced Searching
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

            // Array Applications in DSA
            kmpSearch: `async function kmpSearch(text, pattern) {
    function buildLPS(pattern) {
        let lps = Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
    let lps = buildLPS(pattern);
    let i = 0, j = 0;
    while (i < text.length) {
        await visualizeStep(text.split(''), [i], []);
        if (text[i] === pattern[j]) {
            i++;
            j++;
            if (j === pattern.length) {
                return i - j;
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1;
}
kmpSearch("abxabcabcabyabxabxab", "abcabc");`,


            // Advanced Topics (Optional)
            matrixMultiply: `async function matrixMultiply(A, B) {
    const initialZeros = new Array(20).fill(0);
    await visualizeStep(initialZeros, [], []);
    let result = [];
    for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
            await visualizeStep(result.flat(), [], []);
        }
    }
    return result;
}
matrixMultiply([[1,2],[3,4]], [[5,6],[7,8]]);`,


            bitManipulation: `async function countSetBits(n) {
    // Visualize an initial array of zeros, using the length of a global "array"
    await visualizeStep(new Array(array.length).fill(0), [], []);
    
    // Save the original number and compute its bit length
    let original = n;
    let bitLength = n.toString(2).length;
    // Create a fixed-length array of bits from the original number
    let originalBits = original
      .toString(2)
      .padStart(bitLength, '0')
      .split('')
      .map(Number);
    
    // Visualize an array of zeros with length equal to the bit length
    await visualizeStep(new Array(bitLength).fill(0), [], []);
    
    let count = 0;
    // Process the number bit by bit
    while (n) {
        // Get the current binary representation (this one shrinks as n is shifted)
        let bits = n.toString(2).split('').map(Number);
        await visualizeStep(bits, [], []);
        
        // Process the least significant bit and shift right
        count += n & 1;
        n = n >>> 1;
    }
    
    console.log("count is: " + count);
    // Visualize the original bits with a trailing -1
    await visualizeStep(originalBits.concat([-1]), [], []);
    
    return count;
}

countSetBits(77);`,


        },

        python: {          
            // Basic Array Operations 
            insertion: `async def insert_element(arr, element, index):
    # Shift elements to the right step by step
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]  # Shift element to the right
        await visualize_step(arr, [i, i - 1], [])  # Visualize each shift

    # Insert the new element at the specified index
    arr[index] = element
    await visualize_step(arr, [index], [])  # Visualize the insertion of the new element
    
    return arr

await insert_element(array, 42, 2)`,
            
            deletion: `async def delete_element(arr, index):
    # Shift elements left starting from the deletion index
    for i in range(index, len(arr) - 1):
        arr[i] = arr[i + 1]
        await visualize_step(arr, [i, i+1], [])
    # Set the last element to zero
    arr[-1] = 0
    await visualize_step(arr, [len(arr)-1], [])
    return arr

await delete_element(array, 2)`,
            
            linearSearch: `async def linear_search(arr, target):
    for i in range(len(arr)):
        await visualize_step(arr, [i], [])
        if arr[i] == target:
            await visualize_step(arr, [i], [i])
            return i
    return -1
await linear_search(array, array[10])`,
            
            
            // Intermediate Array Operations
            reverse: `async def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        await visualize_step(arr, [left, right], [])
        left += 1
        right -= 1
    await visualize_step(arr, [], list(range(len(arr))))
    return arr
await reverse_array(array)`,
            
            rotate: `async def rotate_array(arr, d):
    # Convert arr to a Python list
    arr_list = list(arr)
    rotated = arr_list[d:] + arr_list[:d]
    await visualize_step(rotated, [], [])
    return rotated

await rotate_array(array, 2)`,
            
            // Advanced Array Techniques
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
await two_pointers(array)`,
            
            prefixSuffixSum: `async def prefix_suffix_sum(arr):
    prefix = []
    suffix = [0] * len(arr)
    total = 0
    for i in range(len(arr)):
        total += arr[i]
        prefix.append(total)
        await visualize_step(prefix, [i], [])
    total = 0
    for i in range(len(arr)-1, -1, -1):
        total += arr[i]
        suffix[i] = total
        await visualize_step(suffix, [i], [])
    return prefix, suffix
await prefix_suffix_sum(array)`,
            
            dpFibonacci: `async def dp_fibonacci(n):
    fib = [0, 1]
    for i in range(2, n+1):
        fib.append(fib[i-1] + fib[i-2])
        await visualize_step(fib, [i-1, i-2, i], [])
    return fib
await dp_fibonacci(20)`,
            
            // Optimization & Advanced Sorting
            quickSort: `async def quick_sort(arr):
    async def partition(items, left, right):
        pivot = items[(left + right) // 2]
        i = left
        j = right
        while i <= j:
            while items[i] < pivot:
                i += 1
            while items[j] > pivot:
                j -= 1
            if i <= j:
                items[i], items[j] = items[j], items[i]
                await visualize_step(items, [i, j], [])
                i += 1
                j -= 1
        return i
    async def sort(items, left, right):
        if left < right:
            index = await partition(items, left, right)
            if left < index - 1:
                await sort(items, left, index - 1)
            if index < right:
                await sort(items, index, right)
    await sort(arr, 0, len(arr) - 1)
    await visualize_step(arr, [], list(range(len(arr))))
    return arr
await quick_sort(array)`,
            
            mergeSort: `async def merge_sort(arr):
    async def merge(left, right):
        # Convert left and right to native Python lists
        left, right = list(left), list(right)
        result = []
        while left and right:
            # Convert left and right again in the visualization if needed
            await visualize_step(result + left + right, [], [])
            if left[0] < right[0]:
                result.append(left.pop(0))
            else:
                result.append(right.pop(0))
        # Ensure left and right are native lists before concatenation
        return result + left + right

    # Convert arr to a Python list (in case it's a JsProxy)
    arr = list(arr)
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = await merge_sort(arr[:mid])
    right = await merge_sort(arr[mid:])
    merged = await merge(left, right)
    await visualize_step(merged, [], list(range(len(merged))))
    return merged

await merge_sort(array)`,
            
            heapSort: `async def heap_sort(arr):
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    n = len(arr)
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        await visualize_step(arr, [0, i], [])
        heapify(arr, i, 0)
    await visualize_step(arr, [], list(range(len(arr))))
    return arr
await heap_sort(array)`,

            bubbleSort: `async def bubble_sort(arr):
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            await visualize_step(arr, [j, j+1], [])
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                await visualize_step(arr, [j, j+1], [])
        await visualize_step(arr, [], [len(arr) - i - 1])
    await visualize_step(arr, [], list(range(len(arr))))
await bubble_sort(array)`,
        
        selectionSort: `async def selection_sort(arr):
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
        
        insertionSort: `async def insertion_sort(arr):
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
            
            // Stage 6: Advanced Searching
            binarySearch: `async def binary_search(arr, target):
    # Convert to a Python list if arr is a JsProxy
    arr = list(arr)
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
            
            
            // Stage 7: Array Applications in DSA
            kmpSearch: `async def kmp_search(text, pattern):
    def build_lps(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length-1]
                else:
                    lps[i] = 0
                    i += 1
        return lps
    lps = build_lps(pattern)
    i = 0
    j = 0
    while i < len(text):
        await visualize_step(list(text), [i], [])
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        else:
            if j != 0:
                j = lps[j-1]
            else:
                i += 1
    return -1
await kmp_search("abxabcabcabyabxabxab", "abcabc")`,
            
            
            // Advanced Topics (Optional)
            matrixMultiply: `async def matrix_multiply(A, B):
    await visualize_step([0] * len(array), [], [])
    result = [[0 for _ in range(len(B[0]))] for _ in range(len(A))]
    for i in range(len(A)):
        for j in range(len(B[0])):
            for k in range(len(A[0])):
                result[i][j] += A[i][k] * B[k][j]
            await visualize_step(sum(result, []), [], [])
    return result
await matrix_multiply([[1,2],[3,4]], [[5,6],[7,8]])`,
            
            
            bitManipulation: `async def count_set_bits(n):
    await visualize_step([0] * len(array), [], [])
    original = n  # Save the original number
    bit_length = len(bin(n)[2:])
    # Store the original binary representation as a fixed-length array
    original_bits = [int(b) for b in bin(original)[2:].zfill(bit_length)]
    
    await visualize_step([0] * bit_length, [], [])
    count = 0
    while n:
        # Get the current binary representation (this one shrinks as n is shifted)
        bits = [int(b) for b in bin(n)[2:]]
        await visualize_step(bits, [], [])
        
        # Process the least significant bit and shift right
        count += n & 1
        n >>= 1
        
    print("count is: " + str(count))
    # Visualize the original bits with a trailing -1
    await visualize_step(original_bits + [-1], [], [])
    return

await count_set_bits(77)`

        }
    },
    string: {
        javascript: {
            palindrome: `async function checkPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        await visualizeStep(str, [left, right], \`Comparing \${str[left]} and \${str[right]}\`);
        if (str[left] !== str[right]) {
            await visualizeStep(str, [left, right], "Mismatch found - not a palindrome", true);
            return false;
        }
        left++;
        right--;
    }
    await visualizeStep(str, [], "All characters match - palindrome!");
    return true;
}
checkPalindrome(currentString);`,
    
            reverse: `async function reverseString(str) {
    const arr = str.split('');
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        await visualizeStep(arr.join(''), [left, right], \`Swapping \${arr[left]} and \${arr[right]}\`);
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    await visualizeStep(arr.join(''), [], "String reversed!");
    return arr.join('');
}
reverseString(currentString);`,
    
            substring: `async function findSubstring(str, pattern = "abc") {
    for (let i = 0; i <= str.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            await visualizeStep(str, [i + j], \`Comparing \${str[i + j]} with \${pattern[j]}\`);
            if (str[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            await visualizeStep(str, Array.from({length: pattern.length}, (_, k) => i + k), "Pattern found!");
            return i;
        }
    }
    await visualizeStep(str, [], "Pattern not found");
    return -1;
}
findSubstring(currentString);`,
    
            anagram: `async function isAnagram(str1, str2) {
    if (str1.length !== str2.length) {
        await visualizeStep(str1 + " | " + str2, [], "Not an anagram!", true);
        return false;
    }
    const count = {};
    for (let char of str1) count[char] = (count[char] || 0) + 1;
    for (let char of str2) {
        if (!count[char]) {
            await visualizeStep(str1 + " | " + str2, [], "Not an anagram!", true);
            return false;
        }
        count[char]--;
    }
    await visualizeStep(str1 + " | " + str2, [], "Strings are anagrams!");
    return true;
}
isAnagram(currentString, "listen");`,
    
            caesar: `async function caesarCipher(str, shift = 3) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        await visualizeStep(str, [i], \`Processing character \${char}\`);
        if (char.match(/[a-zA-Z]/)) {
            let code = char.charCodeAt(0);
            let base = code >= 65 && code <= 90 ? 65 : 97;
            char = String.fromCharCode(((code - base + shift) % 26) + base);
        }
        result += char;
    }
    await visualizeStep(result, [], \`Cipher applied (shift=\${shift})\`);
    return result;
}
caesarCipher(currentString);`
        },
        python: {
            palindrome: `async def check_palindrome(s):
    left = 0
    right = len(s) - 1
    
    while left < right:
        await visualize_step(s, [left, right], f"Comparing {s[left]} and {s[right]}")
        if s[left] != s[right]:
            await visualize_step(s, [left, right], "Mismatch found - not a palindrome", True)
            return False
        left += 1
        right -= 1
    await visualize_step(s, [], "All characters match - palindrome!")
    return True
await check_palindrome(current_string)`,
            
            reverse: `async def reverse_string(s):
    arr = list(s)
    left, right = 0, len(arr) - 1
    
    while left < right:
        await visualize_step("".join(arr), [left, right], f"Swapping {arr[left]} and {arr[right]}")
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    reversed_str = "".join(arr)
    await visualize_step(reversed_str, [], "String reversed!")
    return reversed_str
await reverse_string(current_string)`,
            
            substring: `async def find_substring(s, pattern="abc"):
    for i in range(len(s) - len(pattern) + 1):
        match = True
        for j in range(len(pattern)):
            await visualize_step(s, [i + j], f"Comparing {s[i + j]} with {pattern[j]}")
            if s[i + j] != pattern[j]:
                match = False
                break
        if match:
            await visualize_step(s, list(range(i, i + len(pattern))), "Pattern found!")
            return i
    await visualize_step(s, [], "Pattern not found")
    return -1
await find_substring(current_string)`,
            
            anagram: `async def is_anagram(s1, s2):
    if len(s1) != len(s2):
        await visualize_step(s1 + " | " + s2, [], "Not an anagram!", True)
        return False
    count = [0] * 256
    
    for c in s1:
        count[ord(c)] += 1
    for c in s2:
        count[ord(c)] -= 1
    
    for i in count:
        if i != 0:
            await visualize_step(s1 + " | " + s2, [], "Not an anagram!", True)
            return False
    await visualize_step(s1 + " | " + s2, [], "Strings are anagrams!")
    return True
await is_anagram(current_string, "listen")`,
            
            caesar: `async def caesar_cipher(s, shift=3):
    result = []
    for i, c in enumerate(s):
        await visualize_step(s, [i], f"Processing character {c}")
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result.append(chr((ord(c) - base + shift) % 26 + base))
        else:
            result.append(c)
    transformed = ''.join(result)
    await visualize_step(transformed, [], f"Cipher applied (shift={shift})")
    return transformed
await caesar_cipher(current_string)`
        }
    }
    
};
