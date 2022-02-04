<template>
  <div id="app" v-if="logged">
    <NavBar />
    <router-view/>
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";  
import Login from "@/views/Login";  

import jwt from "@/utilitaries/jwt";
import cookies from "@/utilitaries/cookies";
import httprequester from "@/utilitaries/httprequester";

export default {
	name: "App",
	components: { NavBar, Login },
	created() {
		this.verifySessionToken();
	},
	computed: {
		logged() {
			const logged = this.$store.getters["session/getUser"] != null;
			console.log(logged)
			return logged;
		}
	},
	methods: {
		async verifySessionToken() {
			console.log("aqui", "passou App.vue")
			const token = cookies.getJWTCookie();
			if (token) {
				const payload = jwt.getPayload(token);
				this.$store.dispatch("session/setUser", { name: payload.sub });

				try {
					const user = await this.$http.authenticated().get(this.$pathapi.auth.user.me());
					console.log(user.data)
					this.$store.dispatch("session/setUser", user.data ?? null);
				} catch (error) {
					console.log(error)
					httprequester.removeToken(this.$http);
					this.$router.push({ name: "login" });
				}
			}
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
