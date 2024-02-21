const table = "cart_document"

const getCartStorage = () => JSON.parse(localStorage.getItem(table)) ?? []
const setCartStorage = (data) => localStorage.setItem(table, JSON.stringify(data))

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
                price: 2.00,
                amount: 2,
                total: 4.00,
            },
            {
                product: "Corn",
                price: 6.00,
                amount: 3,
                total: 18.00,
            },
            {
                product: "Potato",
                price: 0.50,
                amount: 21,
                total: 10.50,
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

let totalPrice = 0;

for(let i = 0; i < storage.length; i++) {
    let data = storage[i];
    totalPrice = totalPrice + data.total;
    let cellData = [ data.product, data.price, data.amount, data.total,
        `<td><button onClick='onCartDelete(${i})'>Delete</button></td>`
    ]
    
    var tbodyRef = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    
    var newRow = tbodyRef.insertRow();
    
    for(let j = 0; j < 5; j++) {
        let cell = newRow.insertCell(j);
        if (j == 1 || j == 3) {
            cell.innerHTML = `$${cellData[j]}`
        } else {
            cell.innerHTML = cellData[j]
        }
    }
    console.log(totalPrice)
}

document.getElementById("totalPrice").value = `$${ totalPrice }`;

const onCartSubmit = (form) => {
    alert("Product successfully added!");
    
    addCartData({
        product: form.product.value,
        price: form.price.value,
        amount: form.amount.value,
        total: form.price.value * form.amount.value,
    })
}

const onCartDelete = (index) => {
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