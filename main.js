async function getCsrfToken() {
    const response = await fetch("https://www.tumblr.com/dashboard", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });

    const text = await response.text();
    const csrfTokenMatch = text.match(/"csrfToken":\s*"([^"]+)"/);
    if (csrfTokenMatch) {
        return csrfTokenMatch[1];
    } else {
        throw new Error("CSRF token not found in the dashboard HTML");
    }
}

function nameParser(namez) {
    return namez.split(' ');
}

let handlez = nameParser("name1 name2 name3"); // enter usernames here
const TOKEN = await getCsrfToken();

for (const handle of handlez) {
    try {
        await fetch("https://www.tumblr.com/api/v2/user/follow", {
              "headers": {
                "accept": "application/json;format=camelcase",
                "accept-language": "en-us",
                "authorization": "Bearer",
                "cache-control": "no-cache",
                "content-type": "application/json; charset=utf8",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-ad-blocker-enabled": "1",
                "x-csrf": TOKEN,
                "x-version": "redpop/3/0//redpop/"
              },
              "referrer": "https://www.tumblr.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": JSON.stringify({
                "url": `https://${handle}.tumblr.com/`,
              }),
              "method": "POST",
              "mode": "cors",
              "credentials": "include"
            }).then(res => res.json());
    } catch (error) {
        console.log(`Oopsie woopsie! We did a fucky wucky! A wittle fucko boingo: ${error}`);
    }
    console.log(`Followed ${handle}`);
}

console.log("Donezo!");
