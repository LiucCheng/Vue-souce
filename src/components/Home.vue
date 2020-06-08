<template>
    <div class="home">
        <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
        <p>double-counter:{{ $store.getters.doubleCount }}</p>
        <p>third-counter:{{ $store.getters.thirdCount }}</p>
        <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
        <div>首页内容</div>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {},
}
</script>
