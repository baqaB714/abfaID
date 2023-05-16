let serviceTypeID = "1"
let companies = [
    { name: "اراک", code: "934" },
    { name: "خمین", code: "000" },
    { name: "محلات", code: "000" }
]

document.addEventListener('DOMContentLoaded', function () {
    let options = ""
    for (const company of companies) {
        options = options + `<option value = "${company.code}">${company.name}</option>`
    }
    document.getElementById('companies').innerHTML = options


    document.getElementById("Amount").addEventListener("keyup", (e)=>{
        document.getElementById("Amount_show").innerHTML = "<span class='text-danger mx-2'> ریال </span>" + numberWithCommas(e.target.value)
    })


    document.getElementById('confirmBtn').addEventListener('click',

        // bill ID metod  start ================================================================================

        () => {
            let consumerID = document.getElementById('consumerID').value
            let amount = document.getElementById('Amount').value
            let companyID = document.getElementById('companies').value
            let newDate = moment();
            let year = ""+newDate.jYear();
            let month = ""+(newDate.jMonth() + 1);

            if(!consumerID) return alert("شماره اشتراک را وارد کنید")
            if(!amount) return alert("مبلغ را وارد کنید")
            

            var pureID = consumerID + companyID + serviceTypeID;
            let billIDNoZero = pureID + createControlID(pureID)
            let billID = pureID + createControlID(pureID)
            let diffBill = 13 - billID.length

            for (let index = 0; index < diffBill; index++) billID = "0" + billID

            // bill id creatwed  ------------------------
            console.log("شناسه قبض :", billID);
            let billIDHtml = document.getElementById('billID').innerHTML = billID
            // bill id creatwed  ------------------------

            // bill ID metod  end ================================================================================


            // payment ID metod  start ================================================================================
            let amountUsed = amount.slice(0, amount.length - 3)
            let yearUsed = year.slice(3)
            let period = 0
            switch (month) {
                case "1":
                    period = "01"
                    break;
                case "2":
                    period = "01"
                    break;
                case "3":
                    period = "02"
                    break;
                case "4":
                    period = "02"
                    break;
                case "5":
                    period = "03"
                    break;
                case "6":
                    period = "03"
                    break;
                case "7":
                    period = "04"
                    break;
                case "8":
                    period = "04"
                    break;
                case "9":
                    period = "05"
                    break;
                case "10":
                    period = "05"
                    break;
                case "11":
                    period = "06"
                    break;
                case "12":
                    period = "06"
                    break;

                default:
                    break;
            }

            let paymentPureID1 = amountUsed + yearUsed + period;
            let paymentPureID2 = paymentPureID1 + createControlID(paymentPureID1)
            let conCBillPayment2 = billIDNoZero + paymentPureID2
            let paymentID = paymentPureID2 + createControlID(conCBillPayment2)
            let diffPay = 13 - paymentID.length
            for (let index = 0; index < diffPay; index++) paymentID = "0" + paymentID

            // Payment id creatwed  ------------------------
            console.log("شناسه پرداخت:", paymentID);
            let paymentIDHtml = document.getElementById('paymentID').innerHTML = paymentID
            // Payment id creatwed  ------------------------

            // payment ID metod  end ================================================================================
        }

    )


});

// create Contro lID ============================================
const createControlID = (pureID) => {
    
    let reversePureID = [...pureID].reverse().join("");
    var i = 2
    var total = 0
    
    for (const num of reversePureID) {
        if (i == 8) i = 2
        let value = parseInt(num) * i;
        total = total + value;
        i++;
    }
    
    let controlID = 11 - (total % 11)
    if (controlID > 9) {
        controlID = 0
    } else {
        controlID = controlID
    }
    
    return (controlID);
}

// number with commas ============================================
const numberWithCommas = (number)=>{
    number = number || 0
    const numStrArr = number?.toString().split(".")
    const dec = numStrArr?.length > 1 ? numStrArr[1] : null
    const intNum = numStrArr[0];
    const withDecInt =  intNum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " , ");
    return dec && parseInt(dec) != 0 ? withDecInt+"/"+dec : withDecInt
}


