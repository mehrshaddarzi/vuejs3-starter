<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">نام برند</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">{{ $t('menu.home') }}</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'users' }">{{ $t('menu.users') }}</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'posts' }">{{ $t('menu.posts') }}</router-link>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.router-link-active {
    border-bottom: 2px solid #1b1b1b;
}
</style>