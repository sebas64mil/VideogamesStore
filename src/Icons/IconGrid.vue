<script setup>  

const props = defineProps({
  size: {
    type: Number,
    default: 24
  }
})
</script>
<template>
<svg
  :width="size"
  :height="size"
  viewBox="0 0 26 26"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
     <path
             fill-rule="evenodd"
        clip-rule="evenodd"
d="M1.08337 23.8333V14.0833H7.58337V23.8333H1.08337ZM9.75004 23.8333V14.0833H16.25V23.8333H9.75004ZM18.4167 23.8333V14.0833H24.9167V23.8333H18.4167ZM11.9167 21.6667H14.0834V16.25H11.9167V21.6667ZM1.08337 11.9167V2.16666H7.58337V11.9167H1.08337ZM9.75004 11.9167V2.16666H16.25V11.9167H9.75004ZM18.4167 11.9167V2.16666H24.9167V11.9167H18.4167ZM3.25004 9.75H5.41671V4.33333H3.25004V9.75ZM20.5834 9.75H22.75V4.33333H20.5834V9.75Z"    fill="currentColor"
      />

</svg>
</template>    


