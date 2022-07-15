<template></template>

<script lang="ts" setup>

import {generateLoginUrl} from "./login.service";

const init = async () => {
  window.location.href = await generateLoginUrl()
}

init();
</script>
