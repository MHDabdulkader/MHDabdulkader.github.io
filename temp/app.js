const fetchData=()=>{
    fetch('http://127.0.0.1:5500/apiData.json')
    .then(response=>response.json())
    .then(data=>showDetails(data))
}
fetchData();

// Design and transfer data in funtions
const showDetails=(products)=>{
    const details = document.getElementById('Product_list_menu_item');

    products.forEach(element=>{
         console.log(element.ProductPrice);
        const div=document.createElement('div');
        div.classList.add('col');
       
        div.innerHTML=`
            <div>
                <hr>
                <img src="${element.ProductImage}" width=250px height=300px>
                <h3>Name : ${element.ProductName}</h3>
                <h3>Type    : ${element.ProductType}</h3>
                <h3>Price        : ${element.ProductPrice}</h3>
                <button class="btn button_buy btn-primary" onclick="ToBuy(${element.ProductPrice})">Buy</button>
            </div>
            
        `
        details.appendChild(div);
        
    });
}

let count = 0;
const ToBuy=(price)=>{
    count = count+1;
    document.getElementById('Product').innerHTML=count;
    
    updatePrice(price);
    Total();
    
}

const Total=()=>{
    const price = parseFloat(document.getElementById('Price').innerText);
    const charge = parseFloat(document.getElementById('Charge').innerText);
    const shippingcharge = parseFloat(document.getElementById('ShippingCharge').innerText);
    const total = price + charge+shippingcharge;
    document.getElementById('Total').innerHTML = total.toFixed(2);
    Tax(total);
}

const Tax=(total)=>{
    const tax = (total * 15)/100.0;
    const TotalWithTax = total + tax;
    document.getElementById('Tax').innerHTML = tax.toFixed(2);
    document.getElementById('TotalWithTax').innerHTML = TotalWithTax.toFixed(2);
}

const updatePrice=(price)=>{
    // get price from price in cart
    const oldPrice = document.getElementById('Price').innerText; 
    const oldPriceFoat = parseFloat(oldPrice);// also float parse
    const newPrice = price+oldPriceFoat;
    console.log(oldPrice);
    document.getElementById('Price').innerText=newPrice.toFixed(2);
    deliveryCharge(newPrice);

}

const deliveryCharge=(newPrice)=>{
    if(newPrice >= 1000){
        document.getElementById('Charge').innerText=200.0;
        document.getElementById('ShippingCharge').innerText=200.0;
    }
    else if(newPrice >= 800){
        document.getElementById('Charge').innerText=150.0;
        document.getElementById('ShippingCharge').innerText=150.0;
    }
    else {document.getElementById('Charge').innerText=100.0;
          document.getElementById('ShippingCharge').innerText=100.0;
    }
}

const OrderProduct=()=>{
    const Total = document.getElementById('Total').innerText;
    const TotalCharge = parseFloat(document.getElementById('Charge').innerText) + parseFloat(document.getElementById('ShippingCharge').innerText);
    const Tax = document.getElementById('Tax').innerText;
    const TotalWithTax = document.getElementById('TotalWithTax').innerHTML;
    alert("|=| Total : " + Total + "\n"+
    "|=| Total Charge : "+ TotalCharge + "\n"+
    "|=| Tax : "+Tax + "\n"+
    "|=| Total With Tax : " + TotalWithTax +"\n"+
    "|=| Happy Shopping.."
    );
    
}