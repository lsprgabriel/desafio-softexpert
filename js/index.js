const getCartStorage = () => JSON.parse(localStorage.getItem('db_cart')) ?? []
const setCartStorage = (dbCart) => localStorage.setItem("db_cart", JSON.stringify(dbCart))

const addCartData = (data) => {
    const dbCart = getCartStorage();
    dbCart.push(data);
    setCartStorage(dbCart);
}

const deleteCartData = (index) => {
    const dbCart = getCartStorage();
    dbCart.splice(index, 1);
    setCartStorage(dbCart);
}

const clearCartStorage = () => {
    setCartStorage([]);
}

let storage = getCartStorage();

const setInitialCartStorage = () => {
    if (storage.length == 0) {
        let initCartData = [
            {
                product: "Rice",
                price: "$2.00",
                amount: "2",
                total: "$4.00",
            },
            {
                product: "Corn",
                price: "$6.00",
                amount: "3",
                total: "$18.00",
            },
            {
                product: "Potato",
                price: "$0.50",
                amount: "21",
                total: "$10.50",
            }
        ]
        initCartData.map((data) => {
            addCartData({
                product: data.product,
                price: data.price,
                amount: data.amount,
                total: data.total,
            })
        })
    }
}

setInitialCartStorage();

for(let i = 0; i < storage.length; i++) {
    let data = storage[i];
    let cellData = [ data.product, data.price, data.amount, data.total,
        `<td><button onClick='onProductDelete(${i})'>Delete</button></td>`
    ]

    var tbodyRef = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    var newRow = tbodyRef.insertRow();

    for(let j = 0; j < 5; j++) {
        let cell = newRow.insertCell(j);
        cell.innerHTML = cellData[j]
    }
}


const onProductSubmit = (form) => {
    alert("Produto adicionado com sucesso!");
    
    addCartData({
        product: form.product.value,
        price: `$${form.price.value}`,
        amount: `$${form.amount.value}`,
        total: `$${form.price.value * form.amount.value}`,
    })
}

const onProductDelete = (index) => {
    deleteCartData(index);
    window.location.reload();
}

const onCancel = () => {
    alert("Purchase successfully canceled!");
    clearCartStorage();
    window.location.reload();
}

const onFinish = () => {
    alert("Success! You finished your purchase!");
    clearCartStorage();
    window.location.reload();
}