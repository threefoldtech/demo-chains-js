<template></template>
<script lang="ts" setup>

import {derivedSeed, login, state, username} from "./login.service";
import {useRouter} from "vue-router";

const router = useRouter();

const init = async () => {
  const redirectUrl = new URL(window.location.href)

  const profileData = await login.parseAndValidateRedirectUrl(redirectUrl, state.value);

  const user = profileData.profile.doubleName
  const dSeed = profileData.profile.derivedSeed

  username.value = user as string;
  derivedSeed.value = dSeed as string;

  await router.push({name: 'core'})
}

init()


</script>
<!--snP3ssGkDkYiI1UJVgM77xxG13tGvmC2-->
