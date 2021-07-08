import numpy as np

arr = [1,2,4,1,7,8,3]

def rec_opt(arr, n):
    if n ==0:
        return arr[0]
    elif n == 1:
        return max(arr[0], arr[1])
    else:
        A = rec_opt(arr, n - 2) + arr[n]
        B = rec_opt(arr, n - 1)
        return max(A, B)
    
rec_opt(arr, 6)
    
def dp_opt(arr):
    opt = np.zeros(len(arr))
    opt[0] = arr[0]
    opt[1] = max(arr[0], arr[1])
    for i in range(2, len(arr)):
        A = arr[i] + opt[i - 2]
        B = opt[i - 1]
        opt[i] = max(A, B)
    return opt[len(arr) - 1]
print(dp_opt(arr))