<template>
    <div class="pad pad-border">
        <span class="pad-title">
            <slot name="title"></slot>
        </span>
        <div class="pad-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style scoped>
.pad {
    margin-top: .8em;
}
.pad-border{
    border: 1px solid #000;
}

.pad-title {
    background-color: #fff;
    position: relative;
    top: -0.8em;
    width: 40px;
    text-align: center;
    padding: 0 4px;
}

.pad-body {
    margin-top: -0.8em;
    padding: 4px;
    white-space: break-spaces;
}
</style>