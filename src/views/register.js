import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const template = (onSubmit)=> html `
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>
`

export async function registerPage(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');
        const repass = formData.get('repeatPass');

        if(username == '' || password == '') {
            return alert('There must be no empty fields!');
        };
        if(password != repass) {
            return alert('Passwords don\'t match!');
        }

        await register(username,password);
        ctx.setUserNav();

        ctx.page.redirect('/allListings')
    }
}