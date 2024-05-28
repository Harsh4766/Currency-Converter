let dropdowns=document.querySelectorAll(".dropdowns select");
let BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";
let btn=document.querySelector(".btn");
let fromcurr=document.querySelector(".from select").value;
let tocurr=document.querySelector(".to select").value;
let msg=document.querySelector(".msg");
for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD")
        {
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR")
        {
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

let updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let img=element.parentElement.querySelector("img");
    let source=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    img.src=source;
}
let updateexchange=async ()=>{
    fromcurr=document.querySelector(".from select").value;
    tocurr=document.querySelector(".to select").value;
    let amount=document.querySelector(".amount input").value;
    if(amount===""|| amount<1)
    {
        alert("Please enter valid value");
    }
    else{
    let URL=`${BASE_URL}/${fromcurr.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(data);
    let rate=data[fromcurr.toLowerCase()][tocurr.toLowerCase()];
    let finalamount=amount*rate;
    console.log(amount,rate);
    console.log(finalamount);
    msg.innerHTML=`${amount} ${fromcurr} = ${finalamount} ${tocurr}`;
    }
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchange();
});

document.addEventListener("DOMContentLoaded",()=>{
    updateexchange();
});
