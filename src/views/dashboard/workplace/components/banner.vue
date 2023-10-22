<template>
  <a-col class="banner">
    <a-col :span="8">
      <a-typography-title :heading="5" style="margin-top: 0">
        {{ $t('workplace.welcome') }} {{ userInfo.name }}
      </a-typography-title>
    </a-col>
    <a-image width="200" height="200" :src="qrcode">
      <template #loader>
        <a-spin />
      </template>
    </a-image>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useUserStore } from '@/store';

  import { getQrcode } from '@/api/list';

  const qrcode = ref<string>('');
  const isLoading = ref<boolean>(true);

  async function init() {
    try {
      const { data: { qrcodeUrl } } = await getQrcode();
      isLoading.value = false
      qrcode.value = qrcodeUrl
      console.log(qrcodeUrl, ' sadasdadd');
    } catch (err) {
      console.log(err, 'err')
    }
  }

  init();

  const userStore = useUserStore();
  const userInfo = computed(() => {
    return {
      name: userStore.name,
    };
  });
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
