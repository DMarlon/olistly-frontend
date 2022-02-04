<template>
    <div class="navbar-main w-100">
       <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">Olistly</b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/links">Links</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="user" class="ml-auto">
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>{{ user.name }}</em>
                    </template>
                    <b-dropdown-item to="/sessoes">Sessões</b-dropdown-item>
                    <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    computed: {
        user() {
			return this.$store.getters["session/getUser"]
		}
    },
    methods: {
        logout() {
            this.$router.push({ name: "login" });
        }
    }
}
</script>
