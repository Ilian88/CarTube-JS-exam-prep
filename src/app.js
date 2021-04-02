import page from '../node_modules/page/page.mjs';
import {
    html,
    render
} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { logout } from './api/data.js';
import { allCarsPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myPage } from './views/myListings.js';
import { searchPage } from './views/search.js';

const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click',async ()=> {
    await logout();
    setUserNav();
    page.redirect('/');
})

page('/',decorateContext,homePage);
page('/register',decorateContext,registerPage);
page('/login',decorateContext,loginPage);
page('/allListings',decorateContext,allCarsPage);
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id',decorateContext,editPage);
page('/myListings',decorateContext,myPage);
page('/search',decorateContext,searchPage);

setUserNav();
page.start();



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;

    next()
}

function setUserNav() {
    const username = sessionStorage.getItem('username');

    if (username != null) {
        document.getElementById('welcomeMsg').textContent = `Welcome ${username}`;

        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
    } else { 
        document.getElementById('guest').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }
}