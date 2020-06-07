var config = {
    apiKey: "AIzaSyBi73VvkVQpO1S68mERh8kX62og1Dm1XGc",
    authDomain: "juturuscratchcards.firebaseapp.com",
    databaseURL: "https://juturuscratchcards.firebaseio.com",
    projectId: "juturuscratchcards",
    storageBucket: "juturuscratchcards.appspot.com",
    messagingSenderId: "255330489622"
};
// var config = {
//   apiKey: "AIzaSyDUJo3eYbeJIV_BCHuyOa3XmRcT0ree7-w",
//   authDomain: "juturuscratchcards.firebaseapp.com",
//   databaseURL: "https://scratchcards-staging.firebaseio.com",
//   projectId: "scratchcards-staging",
//   storageBucket: "scratchcards-staging.appspot.com",
//   messagingSenderId: "246763538267",
// }
firebase.initializeApp(config);

var firebaseApp = firebase;
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
var managerRef;
const collecCustomersRef = db.collection("customers");
const collecScratchRef = db.collection("scratchCards");
const collecGiftCardhRef = db.collection("giftCards");
const collecUsers = db.collection("users");
const customerTable = $('#customer_table').DataTable({
    columns: [{
            data: 'name'
        },
        {
            data: 'invoiceNumber'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'phone'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable1 = $('#admin_customer_table1').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable2 = $('#admin_customer_table2').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable3 = $('#admin_customer_table3').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable4 = $('#admin_customer_table4').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable5 = $('#admin_customer_table5').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});
const adminManagerTable6 = $('#admin_customer_table6').DataTable({
    columns: [{
            data: 'invoiceNumber'
        },
        {
            data: 'name'
        },
        {
            data: 'phone'
        },
        {
            data: 'password'
        },
        {
            data: 'amaount'
        },
        {
            data: 'age'
        },
        {
            data: 'giftCard'
        },
        {
            data: 'scratchAmount'
        },
        {
            data: 'date'
        },
    ],
    "order": [
        [8, "desc"]
    ],
    dom: 'Bfrtip',
    buttons: [
        'print'
    ]
});


(function () {
    if (Cookies.get('managerref') == null) {
        if (Cookies.get('adminId') == null) {
            //Admin not present
            document.getElementById("admin_logged_in").style.display = "none";
            document.getElementById("login_div").style.display = "block";
        } else {
            //Admin Logged in.
            document.getElementById("current_user_id_nav").innerHTML = Cookies.get('adminId');
            document.getElementById("navbar_id").style.display = "block";
            document.getElementById("admin_logged_in").style.display = "block";
            document.getElementById("login_div").style.display = "none";
            processAdminData();
        }
    }
})()

function getCurrentManager(email) {
    var arr = email.split("@");
    var currentManager = arr[0];
    if (email != null) {
        if (email.includes("manager1")) {
            currentManager = "manager1";
            return currentManager;
        } else if (email.includes("manager2")) {
            currentManager = "manager2";
            return currentManager;
        } else if (email.includes("manager3")) {
            currentManager = "manager3";
            return currentManager;
        } else if (email.includes("manager4")) {
            return currentManager = "manager4";
            return currentManager;
        } else {
            return currentManager;
        }
    }
}


function adminLogin() {
    const inputAdminId = document.getElementById("admin_email_field").value
    const inputAdminPassword = document.getElementById("admin_password_field").value;

    if (inputAdminId == "" && inputAdminPassword == "") {
        //Empty field show error
        window.alert("Empty username or password");
    } else {
        showSpinner(true);
        //Get all data
        db.collection("admin").get().then(function (querySnapshot) {
            var docs = querySnapshot.docs;
            var isUserPresent = false;
            for (let i = 0; i < docs.length; i++) {
                if (inputAdminId == docs[i].id && docs[i].data().password == inputAdminPassword) {
                    isUserPresent = true;
                    break;
                }
            }

            if (isUserPresent) {
                showSpinner(false);
                Cookies.set('adminId', inputAdminId, {
                    expires: 7
                });
                //Valid username and password
                document.getElementById("current_user_id_nav").innerHTML = Cookies.get('adminId');
                document.getElementById("navbar_id").style.display = "block";
                document.getElementById("admin_logged_in").style.display = "block";
                document.getElementById("login_div").style.display = "none";
                processAdminData();
            } else {
                showSpinner(false);
                window.alert("Invalid username and password");
            }
        });
    }
}

function managerLogin() {
    showSpinner(true);
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(function () {
            currentMangerLoggedIn = userEmail;
            var manager = getCurrentManager(userEmail);
            managerRef = db.collection("managers").doc(manager);
            Cookies.set('managerref', manager, {
                expires: 7
            });
            document.getElementById("current_user_id_nav").innerHTML = Cookies.get('managerref') + "@juturu.com";
            showSpinner(false);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            showSpinner(false);
            window.alert("Error : " + errorMessage);
        });
}

function logout() {
    if (Cookies.get('adminId') == null) {
        Cookies.remove('managerref');
        firebase.auth().signOut();
    } else {
        if (this.unsubscribe != null) {
            unsubscribe();
        }



        document.getElementById("admin_email_field").value = '';
        document.getElementById("admin_password_field").value = '';
        Cookies.remove('adminId');
        document.getElementById("admin_logged_in").style.display = "none";
        document.getElementById("navbar_id").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
}

// Database Related Operations
function addData() {
    var isGiftCardOpted = false;
    var isScratchCardOpted = false;
    var customerCount = 0;
    var today = new Date();

    const inputCustomerName = document.querySelector("#customerName").value;
    if (inputCustomerName == null || inputCustomerName == "") {
        window.alert("Invalid customer name.");
        showSpinner(false);
        return;
    }
    const inputCustomerPhone = document.querySelector("#customerPhone").value;
    if (inputCustomerPhone == null || inputCustomerPhone == "" || inputCustomerPhone.length < 10) {
        window.alert("Invalid customer phone number.");
        showSpinner(false);
        return;
    }
    const inputCustomerInvoiceNumber = document.getElementById('customerInvoiceNumber').value;
    if (inputCustomerInvoiceNumber == null || inputCustomerInvoiceNumber == "") {
        window.alert("Invalid customer invoice number.");
        showSpinner(false);
        return;
    }
    const inputCustomerAge = document.querySelector("#customerAge").value;
    if (inputCustomerAge == null || inputCustomerAge == "" || (inputCustomerAge < 1 && inputCustomerAge > 120)) {
        window.alert("Invalid customer age.");
        showSpinner(false);
        return;
    }
    const inputCustomerAmount = document.getElementById('customerAmount').value;
    if (inputCustomerAmount == null || inputCustomerAmount == "" || inputCustomerAmount < 1) {
        window.alert("Invalid amount.");
        showSpinner(false);
        return;
    }
    var scratchCardCheckBox = document.getElementById("scratch_card_checkbox");
    var giftCardCheckBox = document.getElementById("gift_card_checkbox");



    if (inputCustomerAmount < 1000) {
        window.alert("Scratch Card or Gift Card won't be genrated.");
    }

    const currentDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    managerRef = db.collection("managers").doc(getCurrentManager(firebase.auth().currentUser.email));
    var password = generatePassword();
    showSpinner(true);

    managerRef.get().then(function (doc) {
            var managerData = {};
            managerData.customerCount = 0;
            managerData.giftOptions = null;
            if (doc.exists) {
                managerData.lastIndex = doc.data().lastCardIndexValue;
                customerCount = doc.data().customerCount;
                managerData.giftOptions = doc.data().giftPanel;
                return managerData;
            } else {
                managerData.lastIndex = -1;
                customerCount = 0;
                return managerData;
                console.log("No such document!");
            }
        })
        .then(function (managerData) {
            var finalData = {};
            var cards = {};
            if (inputCustomerAmount >= 1000) {
                if (scratchCardCheckBox.checked) {
                    cards.scratch = utils.generateScratchCard(inputCustomerAmount, managerData.lastIndex, finalData);
                    isScratchCardOpted = true;
                } else {
                    cards.scratch = null;
                    isScratchCardOpted = false;
                }

                if (giftCardCheckBox.checked) {
                    cards.gift = generateGiftCard(customerCount, managerData.giftOptions);
                    isGiftCardOpted = true;
                } else {
                    cards.gift = null;
                    isGiftCardOpted = false;
                }
                return cards;
            } else {
                cards.scratch = null;
                cards.gift = null;
                return cards;
            }
        })
        .then(function (scratchCards) {
            var scratchCardTotalAmount = 0;
            if (scratchCards.scratch != null) {
                scratchCardTotalAmount = getScratchCardTotalAmount(scratchCards.scratch);
            }
           .doc db.collection("users").doc(inputCustomerInvoiceNumber).set({
                    name: inputCustomerName,
                    phone: inputCustomerPhone,
                    invoiceNumber: inputCustomerInvoiceNumber,
                    password: password,
                    age: inputCustomerAge,
                    amaount: inputCustomerAmount,
                    giftCard: scratchCards.gift,
                    customerCount: customerCount + 1,
                    scratchAmount: scratchCardTotalAmount,
                    date: currentDate,
                    scratchCards: scratchCards.scratch,
                    manager: getCurrentManager(firebase.auth().currentUser.email)
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", inputCustomerInvoiceNumber);
                    managerRef.update({
                        users: firebase.firestore.FieldValue.arrayUnion(inputCustomerInvoiceNumber)
                    });
                    var message = "Thanks for your purchase at JUTURU. Bill no. " + inputCustomerInvoiceNumber + " for amount of Rs. " + inputCustomerAmount + ". Visit https://bit.ly/2NsLJbY with password " + password + " for scratch cards";
                    sendMessage(message, inputCustomerPhone);

                    // if (isGiftCardOpted == true || isScratchCardOpted == true) {
                    //   var message = "Thanks for your purchase at JUTURU. Bill no. " + inputCustomerInvoiceNumber + " for amount of Rs. " + inputCustomerAmount + ". Visit https://bit.ly/2NsLJbY with password " + password + " for scratch cards";
                    //   sendMessage(message, inputCustomerPhone);
                    // }
                    resetInput();
                    //update list
                    displayCustomerList(managerRef);
                })
                .then(function () {
                    managerRef.update({
                        customerCount: customerCount + 1
                    })
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    showSpinner(false);
                    resetInput();
                    window.alert("Failed to save data. Please try again");
                });
            return scratchCards.scratch;
        })
        .then(function (scratch) {
            if (scratch != null) {
                managerRef.update({
                        lastCardIndexValue: scratch.lastIndexValue
                    })
                    .then(function () {
                        showSpinner(false);
                        resetInput();
                        console.log("Document successfully updated!");
                        displayCustomerList(managerRef);
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        showSpinner(false);
                        resetInput();
                        console.error("Error updating document: ", error);
                    });
            } else {
                showSpinner(false);
                resetInput();
            }
        })
        .catch(function (error) {
            console.log("Error final:", error);
            showSpinner(false);
            resetInput();
            window.alert("Some error occured. Please try again");
            //document.location.reload(true);
        });
}

function generatePassword() {
    var length = 6,
        charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function showSpinner(show) {
    if (show) {
        document.getElementById("progress_bar").style.display = "block";
    } else {
        document.getElementById("progress_bar").style.display = "none";
    }
}

function showCustomerInfo(show) {
    if (show) {
        document.getElementById("").style.display = "block";
    } else {
        document.getElementById("").style.display = "none";
    }
}


//------------------------------Generate Gift Cards-------------------

function generateGiftCard(customerCount, gifts) {
    var unCosumedGift = null;

    if (customerCount < 0 || gifts == null) {
        console.log("Gifts are null or Customer count is below 0");
        return null;
    }
    if (checkAllGiftsConsumed()) {
        gifts = allUnCosumedGifts;
        unCosumedGift = getUnconsumedGift();
        resetGifts();
    } else {
        unCosumedGift = getUnconsumedGift();
        setGifts();
    }

    function getUnconsumedGift() {
        var randomIndex = 0;
        var consumedCounter = 0;
        while (true) {
            for (let i = 0; i < gifts.length; i++) {
                randomIndex = Math.floor(Math.random() * 10);
                //Gifts are not consumed
                if (!gifts[randomIndex].isConsumed) {
                    gifts[randomIndex].isConsumed = true;
                    unCosumedGift = gifts[randomIndex].gift;
                    break;
                }
            }
            if (unCosumedGift != null)
                return unCosumedGift;

            if (checkAllGiftsConsumed())
                return null;
        }
    }

    function checkAllGiftsConsumed() {
        var consumedIndex = 0;
        for (let i = 0; i < gifts.length; i++) {
            if (gifts[i].isConsumed) {
                consumedIndex++;
            }
        }
        if (consumedIndex == gifts.length)
            return true;
        else
            return false;
    }

    function resetGifts() {
        managerRef.update({
            giftPanel: allUnCosumedGifts
        })
    }

    function setGifts() {
        managerRef.update({
            giftPanel: gifts
        })
    }

    //Finall return uncosumedGift.
    return unCosumedGift;
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Ends^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^-

function displayCustomerList(mngrRef) {
    var today = new Date();
    const currentDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    var options = {
        valueNames: ['age', 'amaount', 'invoiceNumber', 'name', 'password', 'phone', 'giftCard', 'scratchAmount', 'date'],
        item: '<li><h3 class="name"></h3><p class="invoiceNumber"></p><p class="password"></p><p class="amaount"></p><p class="phone"></p><p class="age"></p><p class="giftCard"></p><p class="scratchAmount"></p><p class="date"></p></li>'
    };
    var values = [];
    var i = 0;

    mngrRef.get().then(function (managerDoc) {
        if (managerDoc.exists) {
            var existingList = [];
            var listOfUsersFromManager = managerDoc.data().users;

            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        if (listOfAllUser[index].data().date.includes(currentDate))
                            existingList.push(listOfAllUser[index].data());
                    }

                    customerTable.clear();
                    customerTable.rows.add(existingList).draw(true);
                    values = [];
                    showSpinner(false);
                }
            });
        } else {
            showSpinner(false);
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
        showSpinner(false);
    });

}

function updateCustomerList(newlyAddedData) {
    customerTable.rows.add(existingList).draw(true);
}

function getScratchCardTotalAmount(scratchCards) {
    var noOfCards = scratchCards.noOfCards;
    var values = scratchCards.values;
    var totalAmount = 0;

    if (noOfCards <= 0) {
        console.log("Zero Cards retrieved");
    } else {
        for (let i = 0; i < noOfCards; i++) {
            var starIndex = values[i].startIndex;
            var endIndex = values[i].endIndex;

            if (starIndex == endIndex) {
                //Only 1 element
                totalAmount = totalAmount + scratchCardValues[starIndex];
            } else if (endIndex < starIndex) {
                //Is out of bound, first process x to 99 followed by 0 to x

                //Process x to 99
                for (let j = starIndex; j <= 99; j++) {
                    totalAmount = totalAmount + scratchCardValues[j];
                }

                //Process 0 to x
                for (let j = 0; j <= endIndex; j++) {
                    totalAmount = totalAmount + scratchCardValues[j];
                }

            } else {
                //Range is under control, process normally
                for (let j = starIndex; j <= endIndex; j++) {
                    totalAmount = totalAmount + scratchCardValues[j];
                }
            }

        }
    }
    console.log("Total Sum", totalAmount);
    return totalAmount;
}


function processAdminData() {
    this.unsubscribe = db.collection("managers").doc("manager1")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable1.clear();
                    adminManagerTable1.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });

    this.unsubscribe = db.collection("managers").doc("manager2")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable2.clear();
                    adminManagerTable2.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });

    this.unsubscribe = db.collection("managers").doc("manager3")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable3.clear();
                    adminManagerTable3.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });

    this.unsubscribe = db.collection("managers").doc("manager4")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable4.clear();
                    adminManagerTable4.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });
    this.unsubscribe = db.collection("managers").doc("manager5")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable5.clear();
                    adminManagerTable5.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });
    this.unsubscribe = db.collection("managers").doc("manager6")
        .onSnapshot(function (manager1Data) {
            var listOfUsersFromManager = manager1Data.data().users;
            var existingList = [];
            collecUsers.get().then(function (querySnapshot) {
                if (!querySnapshot.docs.empty) {
                    var listOfAllUser = querySnapshot.docs;
                    var docIds = [];

                    for (let i = 0; i < listOfAllUser.length; i++) {
                        docIds.push(querySnapshot.docs[i].id);
                    }

                    for (let i = 0; i < listOfUsersFromManager.length; i++) {
                        var index = $.inArray(listOfUsersFromManager[i], docIds);
                        existingList.push(listOfAllUser[index].data());
                    }

                    adminManagerTable6.clear();
                    adminManagerTable6.rows.add(existingList).draw(true);
                    showSpinner(false);
                }
            });
            console.log("Current data: ", existingList);
        });
}

function printDiv(divName) {}

function resetInput() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerInvoiceNumber').value = '';
    document.getElementById('customerAmount').value = '';
    document.getElementById('customerAge').value = '';
    document.getElementById("scratch_card_checkbox").checked = false;
    document.getElementById("gift_card_checkbox").checked = false;
}