<template>
  <a-col class="banner">
    <a-col :span="8">
      <a-space style="margin-bottom: 10px">
        <a-button type="primary" :loading="previewing" @click="handlePreview">{{
          previewing ? '二维码生成中' : '预览'
        }}</a-button>
        <a-button type="outline" :loading="uploading" @click="handleUpload">{{
          uploading ? '代码上传中' : '上传'
        }}</a-button>
      </a-space>
    </a-col>
    <a-image width="200" height="200" :src="qrcode">
      <template #loader>
        <a-spin />
      </template>
    </a-image>
    <a-modal
      v-model:visible="previewVisible"
      title="预览小程序"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" size="medium" :model="previewForm">
        <a-form-item field="appid" label="appid">
          <a-input
            v-model="previewForm.appId"
            :placeholder="`请输入本次预览的appid`"
          />
        </a-form-item>
        <a-form-item field="page" label="启动页面">
          <a-select
            v-model="previewForm.page"
            placeholder="请选择启动页面"
            allow-clear
          >
            <a-option v-for="option in defaultPageOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="sence" label="场景值">
          <a-select
            v-model="previewForm.sence"
            placeholder="请选择场景值"
            allow-clear
          >
            <a-option v-for="option in senceOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-for="item in previewList"
          :key="item"
          :field="item"
          :label="item"
        >
          <a-input
            v-model="previewModel[item]"
            :placeholder="`本次预览的页面参数${item}`"
          />
        </a-form-item>
        <a-form-item
          v-for="item in configList"
          :key="item"
          :field="item"
          :label="item"
        >
          <a-input
            v-model="configModel[item]"
            :placeholder="`本次预览需要修改的参数${item}`"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="uploadVisible"
      title="上传小程序"
      @ok="handleUploadOk"
      @cancel="handleUploadCancel"
    >
      <a-form ref="formRef" size="medium" :model="uploadForm">
        <a-form-item field="section" label="分支">
          <a-select
            v-model="uploadForm.branch"
            placeholder="请选择分支"
            allow-clear
          >
            <a-option v-for="option in senceOptions" :key="option">{{
              option
            }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="branch" label="版本号">
          <a-input v-model="uploadForm.version" placeholder="请输入版本号" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  import {
    uploadBundle,
    getLocalPage,
    getFormList,
    getConfigList,
    previewAlipay,
  } from '@/api/list';

  const qrcode = ref<string>('');
  const previewing = ref(false);
  const uploading = ref(false);
  const previewForm = ref({
    appId: '',
    sence: '',
    page: '/pages/index/index',
  });

  const previewList = ref<string[]>([]);
  const previewModel = ref<Record<string, any>>({});
  const configList = ref<string[]>([]);
  const configModel = ref<Record<string, any>>({});

  const uploadForm = reactive({
    branch: '',
    version: '',
  });
  const host = ref('');

  const senceOptions = ref([
    'ch_appcenter',
    'ch_tinycenter',
    'ch_appcollect',
    'ch_alipaysearch',
    'ch_share',
    'ch_scan',
    'ch_messageservice',
    'ch_life',
    'ch_desktop',
    'ch_othertinyapp',
    'ch_backfromtinyapp',
    'ch_tinylongpress',
    'ch_cityservice',
    'ch_zhima',
    'ch_carservice',
    'ch_medicalservice',
    'ch_college',
    'ch_school',
    'ch_sharebike',
    'ch_insurance',
    'ch_ttyl',
    'ch_membership',
    'ch_outerUrl',
  ]);
  const defaultPageOptions = ref([]);
  const previewVisible = ref(false);
  const uploadVisible = ref(false);

  const handlePreview = async () => {
    try {
      const { data: pages } = await getLocalPage(host.value);
      const { data: list } = await getFormList(host.value, {
        platform: 'alipay',
      });
      const { data: configData } = await getConfigList(host.value, {
        platform: 'alipay',
      });
      defaultPageOptions.value = pages;
      previewModel.value = list;
      previewList.value = Object.keys(list);
      configModel.value = configData.configList;
      configList.value = Object.keys(configData.configList);
      previewForm.value.appId = configData.appid;
    } catch (err) {
      console.log(err, 'rr')
    } finally {
      previewVisible.value = true;
    }
  };

  const handleUpload = () => {
    uploadVisible.value = true;
  };
  const handleUploadOk = async () => {
    uploadVisible.value = false;
    uploading.value = true;
    const { data } = await uploadBundle({
      branch: uploadForm.branch,
      version: uploadForm.version,
      repo: 'uni-flower-mall',
    });
    uploading.value = false;
    qrcode.value = data;
  };
  const handleUploadCancel = () => {
    previewVisible.value = false;
  };

  const handleOk = async () => {
    previewVisible.value = false;
    previewing.value = true;
    console.log(host.value, 'handleOk');
    try {
      const { data } = await previewAlipay(host.value, {
        previewValue: { ...previewForm.value, ...previewModel.value },
        fileValue: { ...configModel.value },
      });
      previewing.value = false;
      qrcode.value = data;
      console.log(data, 'resss');
    } catch (err) {
      previewing.value = false;
    }
  };
  const handleCancel = () => {
    previewVisible.value = false;
  };

  const getIP = () => {
    console.log(window.location.origin, ' window.location.href');
    host.value = window.location.origin;
  };

  const createdHook = () => {
    getIP();
  };

  createdHook();
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
