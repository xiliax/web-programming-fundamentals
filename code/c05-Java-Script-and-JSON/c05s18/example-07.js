// Example of using 'continue' in loops

// initialize loop variable
var MAX_MESSAGES = 10

// skip count = 2, 5, or 8
for (var count = 0; count < MAX_MESSAGES; count++) {
    switch (count) {
    case 2:
    case 5:
    case 8:
        continue;
        break;
    }

    console.log("count = ", count)
}

/* === Output ====
count =  0
count =  1
count =  3
count =  4
count =  6
count =  7
count =  9
*/
