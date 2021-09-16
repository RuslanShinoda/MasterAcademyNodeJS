const fruitsData = [
    {"item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$3"},
    {"item": "orange", "type": "Clementine", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Nova", "quantity": 1, "pricePerItem": "$5"},
    {"item": "orange", "type": "Navel", "weight": 6, "pricePerKilo": "$7"},
    {"item": "pineapple", "type": "Queen", "quantity": 4, "pricePerItem": "$15"},
    {"item": "pineapple", "type": "Pernambuco", "quantity": 3, "pricePerItem": "$12"},
    {"item": "apple", "type": "Cameo", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Trio", "quantity": 2, "pricePerItem": "$9"},
    {"item": "pineapple", "type": "Red Spanish", "quantity": 3, "pricePerItem": "$9.99"},
    {"item": "watermelon", "type": "Millionaire", "quantity": 2, "pricePerItem": "$7"},
    {"item": "orange", "type": "Tangerine", "weight": 4, "pricePerKilo": "$4.99"},
    {"item": "apple", "type": "Jazz", "weight": 4, "pricePerKilo": "$5"},
];

const countCost = (data) => {
    validateFruitsDataTypes(data);

    // - Print to the console the total quantity of all watermelons (Watermelons - ${quantity});

    /*
    let watermelonsCounter = 0;

    for (let i = 0; i < data.length; i++) {
        if(data[i].item === 'watermelon') {
            watermelonsCounter += data[i].quantity
        }
    }

    console.log(`Watermelons - ${watermelonsCounter}`);
    */

    const watermelonQuantity = data.reduce((totalWatermelons, currentItem) => {
        if (currentItem.item === 'watermelon') {
            return totalWatermelons + currentItem.quantity;
        }

        return totalWatermelons;
    }, 0);

    console.log(`Watermelons - ${watermelonQuantity}`);

    // - Print to the console the total weight of all apples (Apples - ${weight});

    const applesWeight = data.reduce((totalApples, currentItem) => {
        if (currentItem.item === 'apple') {
            return totalApples + currentItem.weight;
        }

        return totalApples;
    }, 0);

    console.log(`Apples - ${applesWeight}`);


    // - Sort the array in alphabetical order by item field and print it to the console;

    const dataToSortByItem = [...data];

    dataToSortByItem.sort((a, b) => a.item.localeCompare(b.item));

    console.log(dataToSortByItem);


    // - Sort the array by cost of the record and print it to the console;

    const dataToSortByCost = [...data];

    dataToSortByCost.sort((a, b) => {
        const countItemCost = item => {
            let currentCost = 0;
            if (item.weight) {
                currentCost = item.weight * (+item.pricePerKilo.slice(1, item.pricePerKilo.length));
            } else {
                currentCost = a.quantity * (+item.pricePerItem.slice(1, item.pricePerItem.length));
            }
            return currentCost;
        };
        return countItemCost(a) - countItemCost(b);
    });
    console.log(dataToSortByCost);

    // - Print to the terminal the type of oranges with the least price (The cheapest orange type is: ${type});

    const oranges = data.filter(item => item.item === "orange");

    oranges.sort((a, b) => {
        return +a.pricePerKilo.slice(1, a.pricePerKilo.length) - (+b.pricePerKilo.slice(1, b.pricePerKilo.length));
    });

    const cheapestOrangesType = oranges[0].type;
    console.log(`The cheapest orange type is: ${cheapestOrangesType}`);

    // - Print to the console the cost of the goods by item name
    // (Apples - ${costApples}, Pineapples - ${costPineapples}, Watermelons - ${costWatermelons}, Oranges - ${costOranges});

    const costPerGoods = data.reduce((counter, currentItem) => {
        let currentCost = 0;
        if (currentItem.weight) {
            currentCost = currentItem.weight * (+currentItem.pricePerKilo.slice(1, currentItem.pricePerKilo.length)) * 100;
        } else {
            currentCost = currentItem.quantity * (+currentItem.pricePerItem.slice(1, currentItem.pricePerItem.length)) * 100;
        }
        if (counter.hasOwnProperty(currentItem.item)) {
            counter[currentItem.item] += currentCost;
        } else {
            counter[currentItem.item] = currentCost;
        }
        return counter;
    }, {});

    let totalCostCoins = 0;

    for (let item in costPerGoods) {
        if (!costPerGoods.hasOwnProperty(item)) continue;
        console.log(`${item} - $${costPerGoods[item] / 100}`);
        totalCostCoins += costPerGoods[item];
    }

    // - Print to the console the result of the execution of this function.

    const totalCost = totalCostCoins / 100;
    console.log(`totalCost is $${totalCost}`);
};

const validateFruitsDataTypes = data => {
    data.map((element) => {
        if (typeof element.item !== 'string') {
            console.error("Wrong type");
            return;
        }
        if (typeof element.type !== 'string') {
            console.error("Wrong type");
            return;
        }
        if (element.quantity && typeof element.quantity !== 'number') {
            console.error("Wrong type");
            return;
        }
        if (element.weight && typeof element.weight !== 'number') {
            console.error("Wrong type");
            return;
        }
        if (element.pricePerKilo
            && typeof element.pricePerKilo !== 'string'
            && element.pricePerKilo[0] !== '$'
            && typeof (+element.pricePerKilo.slice(1, element.pricePerKilo.length)) !== "number"
        ) {
            console.error("Wrong type");
            return;
        }
        if (element.pricePerItem
            && typeof element.pricePerItem !== 'string'
            && element.pricePerItem[0] !== '$'
            && typeof (+element.pricePerItem.slice(1, element.pricePerItem.length)) !== "number"
        ) {
            console.error("Wrong type");
        }
    });
};
countCost(fruitsData);