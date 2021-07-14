<template>
    <footer class="footer-pokeapp">
        <p class="copyright">
            Powered by
            <a target="_blank" :href="authorURL || '#'">{{ author }}.</a>
            {{ year }}
        </p>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                year: new Date().getFullYear(),
                author: "LM",
                authorURL: "https://github.com/lmelgarejo96"
            }
        }
    }
</script>

<style lang="scss" scoped>
.footer-pokeapp {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: .6em 1em;
    display: flex;
    justify-content: flex-end;
    font-family: "Roboto";
    @media screen and (max-width: 600px) {
        background: rgb(19, 48, 64);;
        justify-content: center;
    }
    .copyright {
        font-size: 13.8px;
        color: #ccc;
        margin-bottom: 0;
        a {
            text-decoration: none;
            font-weight: 700;
            color: rgb(53, 134, 128);
        }
    }
}
</style>