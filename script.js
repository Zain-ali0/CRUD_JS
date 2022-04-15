let ProductName = document.getElementById('productname');
let Count = document.getElementById('count');
let Catgegory = document.getElementById('category');
let price = document.getElementById('price');
let Taxes = document.getElementById('taxes');
let Discount = document.getElementById('discount');
let  Total = document.getElementById('total');
let Submit = document.getElementById('submit');
let Search = document.getElementById('search');
let SearchCategory = document.getElementById('searchCategory');
let SearchTitle = document.getElementById('searchTitle');
let DeleteAllBtn = document.getElementById('deleteAll');
let mode = true;
let SearchMode = true;
let global;



//get total
function getTotal(){

    if(price.value != ''){
        let result = (+price.value + +Taxes.value) - +Discount.value;
        Total.innerHTML = result;
        Total.style.background = 'brown';
    }else{
        Total.innerHTML = '';
        Total.style.background = '#333';
    }

}

//create product & Save
let datepro;

if(localStorage.product != null){
    datepro = JSON.parse(localStorage.product)
}else{
    datepro = [];
}

Submit.onclick = function () {

    let newpro = {
        ProductName:ProductName.value.toLowerCase(),
        price:price.value,
        Taxes:Taxes.value,
        Discount: Discount.value,
        Count:Count.value,
        Catgegory: Catgegory.value.toLowerCase(),
        Total: Total.innerHTML,
    }

    if(ProductName.value != ''){
        if(mode === true){
            //craete more one product
            if(newpro.Count > 1){
                for(let i = 0; i < newpro.Count; i++){
                    datepro.push(newpro);
                }
            }else{
                datepro.push(newpro);
            }
        }if(mode == false){
            datepro[global] = newpro;
            mode = 'create';
            Submit.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
            Count.style.display = 'inline';
        }
        clearDate();
    }


    localStorage.setItem('product',JSON.stringify(datepro));
    
    showDate();
    mode = true;
}

//clear date
function clearDate (){
    ProductName.value = '';
    price.value = '';
    Taxes.value = '';
    Discount.value = '';
    Count.value = '';
    Catgegory.value = '';
    Total.innerHTML = '';
}

//show date
function showDate(){

    getTotal();
    let table = '';
    for(let i = 0; i < datepro.length; i++){
        table += 
        `
            <tr>
                <td>${i}</td>
                <td>${datepro[i].ProductName}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].Taxes}</td>
                <td>${datepro[i].Discount}</td>
                <td>${datepro[i].Total}</td>
                <td>${datepro[i].Catgegory}</td>
                <td><button onclick="update(${i})"><ion-icon name="reload-outline"></ion-icon></button></td>
                <td><button onclick="deleteProduct(${i})"><ion-icon name="trash-outline"></ion-icon></button</td>
            </tr>
        `;
    }

    document.getElementById('tobady').innerHTML = table;


        //show deleteAll product btn
        if(datepro.length > 0){
            DeleteAllBtn.innerHTML = 
            `
            <button onclick="deleteAll()" >Delete All Product(${datepro.length})</button>
            `
        }else{
            DeleteAllBtn.innerHTML = '';
        }


}

showDate();

//delete product
function deleteProduct(i){
    localStorage.clear();
    datepro.splice(i,1);
    showDate();
}

//deleteAll product
function deleteAll(){

    localStorage.clear();
    datepro.splice(0)
    showDate();
}

//update
function update(i){

    ProductName.value = datepro[i].ProductName;
    price.value = datepro[i].price;
    Taxes.value = datepro[i].Taxes;
    Discount.value = datepro[i].Discount;
    getTotal();
    Count.style.display = 'none'
    Catgegory.value = datepro[i].Catgegory;
    Submit.innerHTML = '<ion-icon name="reload-outline">';
    mode = false;
    global = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//search

function search(id){
    
    if(id == 'searchNameproduct'){
        SearchMode = true;
        Search.placeholder = 'Search by Name Product'
    }if(id == 'searchCategory'){
        SearchMode = false;
        Search.placeholder = 'Search By Category'
    }
    Search.focus();
    Search.value = '';
    showDate();
}

function Searchproduct(value){

    let table = '';

    if(SearchMode == true){
        for(let i=0; i < datepro.length; i++){
            if(datepro[i].ProductName.includes(value.toLowerCase())){
                table += 
                `
                    <tr>
                        <td>${i}</td>
                        <td>${datepro[i].ProductName}</td>
                        <td>${datepro[i].price}</td>
                        <td>${datepro[i].Taxes}</td>
                        <td>${datepro[i].Discount}</td>
                        <td>${datepro[i].Total}</td>
                        <td>${datepro[i].Catgegory}</td>
                        <td><button onclick="update(${i})"><ion-icon name="reload-outline"></ion-icon></button></td>
                        <td><button onclick="deleteProduct(${i})"><ion-icon name="trash-outline"></ion-icon></button</td>
                    </tr>
                `;
            }
        }

    }if(SearchMode == false){
        for(let i=0; i < datepro.length; i++){
            if(datepro[i].Catgegory.includes(value.toLowerCase())){
                table += 
                `
                    <tr>
                        <td>${i}</td>
                        <td>${datepro[i].ProductName}</td>
                        <td>${datepro[i].price}</td>
                        <td>${datepro[i].Taxes}</td>
                        <td>${datepro[i].Discount}</td>
                        <td>${datepro[i].Total}</td>
                        <td>${datepro[i].Catgegory}</td>
                        <td><button onclick="update(${i})"><ion-icon name="reload-outline"></ion-icon></button></td>
                        <td><button onclick="deleteProduct(${i})"><ion-icon name="trash-outline"></ion-icon></button</td>
                    </tr>
                `;
            }
        }
    }

    document.getElementById('tobady').innerHTML = table;
}

//clean Date
