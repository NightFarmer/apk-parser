<template>
    <div class="checkbox">
        <div class="check_wrap" v-if="!!value">
            <div class="check"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'CheckBox',
    props: ['value']
  }
</script>

<style scoped>
    .checkbox {
        cursor: pointer;
        width: 14px;
        height: 14px;
        border-width: 1px;
        border-style: solid;
        border-color: #cecece;
        background: white;
        border-radius: 2px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .check_wrap {
        transform: translateX(-3px) translateY(1px) scaleX(0.8) scaleY(0.9);
    }

    .check {
        display: inline-block;
        width: 6.5px;
        height: 2px;
        background: #1aad86;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);

    }

    .check:after {
        content: '/';
        display: block;
        width: 12px;
        height: 2px;
        background: #1aad86;
        -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
    }
</style>
