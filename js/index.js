// ITERATION 1

function updateSubtotal(product) {

    //... your code goes here
    const price = product.querySelector('.price span');
    const quantity = product.querySelector('.quantity input');
    const subtotal = product.querySelector('.subtotal span');

    subtotal.innerHTML = price.innerHTML * quantity.value;
    return subtotal.innerHTML;
}

function calculateAll() {


    // ITERATION 2
    //... your code goes here
    const products = document.getElementsByClassName('product');
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += Number(updateSubtotal(products[i]));
    }
    // ITERATION 3
    //... your code goes here
    const totalElement = document.querySelector('#total-value span');
    totalElement.innerText = total;
    return totalElement.innerText;
}

// ITERATION 4

function removeProduct(event) {
    const target = event.currentTarget;
    console.log('The target in remove is:', target);
    // Remove the targeted product
    target.parentNode.parentNode.remove();
}

// ITERATION 5

function createProduct() {
    //... your code goes here
    const inputs = document.querySelectorAll('.create-product input[type="text"], .create-product input[type="number"]');
    const values = Array.from(inputs).map(input => input.value);

    const newRow = document.getElementById('cart').getElementsByTagName('tbody')[0].insertRow(-1);
    newRow.classList.add('product');

    const cells = ['name', 'price', 'quantity', 'subtotal'];
    cells.forEach((cell, index) => {
        const newCell = newRow.insertCell(index);
        newCell.classList.add(cell);
        newCell.innerHTML = index === 1 ? `$<span>${values[index]}</span>` : index === 2 ? `<input type="number" value="0" min="0" placeholder="Quantity" />` : index === 3 ? '$<span>0</span>' : `<span>${values[index]}</span>`;
    });

    newRow.insertCell(cells.length).innerHTML = '<button class="btn btn-remove">Remove</button>';
}

window.addEventListener('load', () => {
    const calculatePricesBtn = document.getElementById('calculate');
    calculatePricesBtn.addEventListener('click', calculateAll);

    // Remove the event listener for removing a product
    const removeButtons = document.getElementsByClassName('btn-remove');
    for (let button of removeButtons) {
        button.removeEventListener('click', removeProduct);
    }

    const create = document.getElementById('create');
    create.addEventListener('click', () => {
        createProduct();
        // Re-add event listener for remove button after creating a new product
        const removeButtons = document.getElementsByClassName('btn-remove');
        for (let button of removeButtons) {
            button.addEventListener('click', function(event) {
                event.target.closest('.product').remove();
            });
        }
    });
});