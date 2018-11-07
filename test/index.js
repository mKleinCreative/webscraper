const Nightmare = require('nightmare');
const chai = require('chai');
const cherrio = require('cheerio');

describe('log into holberton', () => {
    it('should attr the auth page', function (done) {
        this.timeout('10s')

        const nightmare = Nightmare()
        nightmare
            .goto('https://intranet.hbtn.io/auth/sign_in')
            .wait('#user_login', '#user_password')
            .type('input[id="user_login"]', '535@holbertonschool.com')
            .type('input[id="user_password"]', 'Ilawhdy66^')
            .click('input[type="submit"]')
            .wait('body[class="signed_in"]')
            .goto('https://intranet.hbtn.io/projects/232')
            .evaluate(function() {
                console.log('I am the body', document.body.outerHTML)
                return document.body.outerHTML
            })
            .then(async (x) => {
                const $ = await cherrio.load(x)
                const lists = $('h2.gap').nextUntil('p.lg-gap').hasClass('formatted-content').outerHTML();
                console.log('lists (╯°□°)╯︵ ┻━┻ ', lists);
                // console.log('lists[0] (╯°□°)╯︵ ┻━┻ ', Object.values(lists[0]));
                // console.log('lists[0].children[0].data (╯°□°)╯︵ ┻━┻ ', Object.keys(lists[0].children[0].data));
                done()
            })
    })
})