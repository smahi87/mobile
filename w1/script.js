let products = [
    {img:"p1.jpg", name:"Headphones", price:7999, desc:"Noise cancelling"},
    {img:"p2.jpg", name:"Smartwatch", price:12999, desc:"Fitness watch"},
    {img:"p3.jpg", name:"Mouse", price:2499, desc:"Gaming mouse"},
    {img:"p4.jpg", name:"Stand", price:1999, desc:"Laptop stand"},
    {img:"p5.jpg", name:"Keyboard", price:2999, desc:"Mechanical"},
    {img:"p6.jpg", name:"Monitor", price:10999, desc:"24 inch"},
    {img:"p7.jpg", name:"Tablet", price:15999, desc:"Android"},
    {img:"p8.jpg", name:"Speaker", price:3499, desc:"Bluetooth"},
    {img:"p9.jpg", name:"Camera", price:25999, desc:"DSLR"},
    {img:"p10.jpg", name:"Printer", price:8999, desc:"Wireless"},
    {img:"p11.jpg", name:"Router", price:1999, desc:"WiFi"},
    {img:"p12.jpg", name:"SSD", price:4999, desc:"Storage"}
];

let page = 1, perPage = 5;

function show() {
    let start = (page - 1) * perPage;
    let end = start+perPage;
    let data = products.slice(start, end);

    document.getElementById("tableBody").innerHTML =
        data.map(p => `
        <tr>
            <td><img src="${p.img}" width="60"></td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.desc}</td>
        </tr>`).join("");

    document.getElementById("pageInfo").innerText =
        `Page ${page} of ${Math.ceil(products.length / perPage)}`;
}

function next() {
    if (page * perPage < products.length) { page++; show(); }
}

function prev() {
    if (page > 1) { page--; show(); }
}

show();