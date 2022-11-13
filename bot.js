function launch() {
    var users = getUsers();
    var main_user = getMainUser(users);

    console.log("launching");

    if (isUserInRaffle(users, main_user) == true) {
        console.log("user in raffle");
    }

    if (isUserInRaffle(users, main_user) == false) {
        clickEnterButton();
        console.log("relaunching")
    }

    if (checkReloadNeeded() == true) {
        location.reload();
    }

    if (checkReloadNeeded() == false) {
        console.log("no reload needed");
    }
    reCheck();
}

async function reCheck() {
    await sleep(30000);
    console.log("rechecking");
    launch();
}

function isUserInRaffle(users, main_user_avatar) {
    console.log("checking raffle");
    let i = 0;

    for (user in users) {
        if (users[i] && users[i]["src"] != undefined) {
            user_avatar = users[i]["src"].replace('medium.jpg', '');

            if (main_user_avatar == user_avatar) {
                console.log(user_avatar);
                return true
            }
        }
        i++;
    }
    return false
}

function getMainUser() {
    console.log("getting main user");
    var main_user_avatar = document.getElementsByClassName("avatar")

    main_user_avatar = main_user_avatar[0]["currentSrc"].replace('full.jpg', '');

    return main_user_avatar
}

function getUsers() {
    console.log("getting users");
    let i = 0;
    const raffle_container = document.querySelectorAll('[class="is-flex is-wrap"]');

    return raffle_container[0]["children"]        
}

function checkReloadNeeded() {
    const reload_class = document.getElementsByClassName('components-reconnect-rejected');

    if (reload_class[0] != undefined) {
        return true
    }
    return false
}

async function clickEnterButton() {
    console.log("clicking enter button");
    await sleep(10000)
    console.log("done");
    document.getElementsByClassName("button is-large is-primary")[0].click();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

launch();
