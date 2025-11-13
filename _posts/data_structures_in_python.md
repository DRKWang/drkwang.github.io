---
layout: post
title: basics summary for leetcode
date: 2025-11-13 12:00
description: 
tags: formatting charts
categories: sample-posts
chart:
  plotly: true
---

Commonly used data structure are introduced here.

### Stack
stack is the most simplest one to organized the data.
```
# init
stack = []
stack.append(x) # push
y = stack.pop() # pop
# check the top one
if stack and stack[-1] > 0:
    y = stack.pop()
while stack:
    y = stack.pop()
    
# check stack empty
if not stack or len(stack) == 0:
    pass
```

### Queue
Queue is the most simplest one to organized the data.
```
# init
Queue = []
idx = 0

# first in
Queue.append(x) 

# last out
idx += 1
if idx >= len(Queue): # make sure idx is a valid idx all the time
    idx -= 1

# output all
while idx <= len(Queue) - 1:
    y = Queue[idx]
    idx += 1
```

### Hashmap
```
# init:
hashmap = dict()

# insert
if x not in hashmap:
    hashmap[x] = 1
else:
    hashmap[x] += 1

# get all val, keys

all_keys = hashmap.keys()
for value in hashmap.values():
    print(value)

for key, value in person.items():
    print(key, value)
```


### Set
```angular2html
# init:
set1 = set()
set2 = set()
# add
set1.add(a)
# remove
set1.remove(a)
# intersect
intersect = set1.intersection(set2)
# union
union = set1.union(set2)
# diff
diff = set1.difference(set2)
# subset check
set1.issubset(set2)
# set to list
lst1 = list(set1)
```

### Special numbers
```angular2html
# the largest one
float("inf")
```

### Sort usage:
```angular2html
# inplace, like a function to a class
list.sort() 
# sorted the list and output, like a standard function
# sort lst based on the second keywords, output from large
lst = sorted(lst, key = lambda x: x[1], revserse = True )
# reverse
lst = lst[::-1]
lst.reverse() #in place
```

### String:
```angular2html
s = str(input)
s = s.lower()

# from str to list
lst = list(s)
# from list to str
s = "".join(lst)
```

### filter function
```angular2html
nums = [1, 2, 3, 4, 5, 6]
def is_even(n):
    return n % 2 == 0
result = list(filter(is_even, nums))

# should be equivalent to this one
result = [x for x in nums if is_even(x)]

```



